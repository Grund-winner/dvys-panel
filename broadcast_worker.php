<?php
// ============================================
// BROADCAST WORKER - RENDER HOSTING
// Envoie les messages en masse aux utilisateurs
// ============================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// Vérification auth
checkAdminAuth();

// Récupération des paramètres
$type    = $_POST['type'] ?? 'text';
$message = $_POST['message'] ?? '';
$filter  = $_POST['filter'] ?? 'all';
$broadcastId = uniqid('bc_');

// Gestion du fichier (Photo/Vidéo)
$fileData = null;
$tempFile = null;

if ($type !== 'text' && isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
    $uploadDir = 'uploads/';
    @mkdir($uploadDir, 0755, true);
    
    $tempFile = $uploadDir . 'temp_bc_' . time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "_", $_FILES['file']['name']);
    if (move_uploaded_file($_FILES['file']['tmp_name'], $tempFile)) {
        $fileData = new CURLFile(realpath($tempFile), $_FILES['file']['type'], $_FILES['file']['name']);
    }
}

// Récupération des utilisateurs
$allUsers = $supabase->getUsers() ?: [];
$users = [];

foreach ($allUsers as $row) {
    $isReg = (($row['isregistered'] ?? '') === 'yes');
    $isDep = (($row['isdeposit'] ?? '') === 'yes');

    if ($filter === 'all') {
        $users[] = $row['user_id'];
    } elseif ($filter === 'reg_only') {
        if ($isReg && !$isDep) $users[] = $row['user_id'];
    } elseif ($filter === 'deposited') {
        if ($isDep) $users[] = $row['user_id'];
    }
}

$total = count($users);

// Log de la diffusion
$supabase->insert('broadcast_logs', [
    'broadcast_id' => $broadcastId,
    'filter_type' => $filter,
    'message_type' => $type,
    'total_users' => $total,
    'message_content' => substr($message, 0, 1000),
    'started_at' => date('c'),
    'status' => 'running',
    'initiated_by' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
]);

$sent = 0;
$failed = 0;

// Fonction de mise à jour du progrès
function update_progress_file($broadcastId, $sent, $failed, $total, $status) {
    $data = [
        'broadcast_id' => $broadcastId,
        'sent' => $sent,
        'failed' => $failed,
        'total' => $total,
        'status' => $status,
        'percent' => $total > 0 ? round((($sent + $failed) / $total) * 100) : 0,
        'last_update' => time()
    ];
    
    $file = 'progress/' . $broadcastId . '.json';
    @mkdir('progress', 0755, true);
    @file_put_contents($file, json_encode($data));
    
    return $data;
}

// Initialisation
update_progress_file($broadcastId, 0, 0, $total, 'running');

// Envoi des messages
foreach ($users as $userId) {
    $postData = ['chat_id' => $userId, 'parse_mode' => 'HTML'];
    
    if ($type === 'text') {
        $method = "sendMessage";
        $postData['text'] = $message;
    } elseif ($type === 'photo' || $type === 'image') {
        $method = "sendPhoto";
        $postData['photo'] = $fileData;
        $postData['caption'] = $message;
    } elseif ($type === 'video') {
        $method = "sendVideo";
        $postData['video'] = $fileData;
        $postData['caption'] = $message;
    }

    $ch = curl_init("https://api.telegram.org/bot".TOKEN."/".$method);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10
    ]);
    
    $res = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http == 200) {
        $sent++;
    } else {
        $failed++;
    }

    // Mise à jour du progrès
    update_progress_file($broadcastId, $sent, $failed, $total, ($sent + $failed >= $total) ? 'done' : 'running');
    
    // Pause pour éviter le rate limit
    usleep(100000); // 0.1s
}

// Nettoyage
if ($tempFile && file_exists($tempFile)) {
    @unlink($tempFile);
}

// Mise à jour finale
$finalStatus = ($sent + $failed >= $total) ? 'done' : 'partial';
update_progress_file($broadcastId, $sent, $failed, $total, $finalStatus);

// Mettre à jour le log de diffusion
$supabase->request('PATCH', '', [
    'sent_count' => $sent,
    'failed_count' => $failed,
    'completed_at' => date('c'),
    'status' => $finalStatus
], "broadcast_id=eq.{$broadcastId}");

// Réponse
jsonResponse([
    'status' => $finalStatus,
    'broadcast_id' => $broadcastId,
    'sent' => $sent,
    'failed' => $failed,
    'total' => $total
]);
?>
