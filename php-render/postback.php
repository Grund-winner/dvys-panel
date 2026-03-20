<?php
// ============================================
// POSTBACK.PHP - RENDER HOSTING
// Reçoit les postbacks de 1Win et met à jour Supabase
// ============================================
require_once 'config.php';

// Log des requêtes (désactivable en prod)
if (DEBUG_MODE) {
    $logFile = 'logs/postback_' . date('Y-m-d') . '.log';
    @mkdir('logs', 0755, true);
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . json_encode($_REQUEST) . "\n", FILE_APPEND);
}

// Récupération des données
$data = $_REQUEST;
$event = $_GET['event'] ?? null;

// Le paramètre sub1 contient l'ID Telegram
$telegramId = $data['sub1'] ?? null;

// Validation
if (!$event || !$telegramId) {
    http_response_code(400);
    jsonResponse(['error' => 'Missing event or telegramId (sub1)'], 400);
}

// Log du postback reçu
$supabase->insert('postback_logs', [
    'user_id' => $telegramId,
    'event_type' => $event,
    'data' => json_encode($data),
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
    'received_at' => date('c'),
    'processed' => false
]);

// Mise à jour dans Supabase
$success = false;
$updateData = [];

if ($event === "registration") {
    $updateData = ['isregistered' => 'yes'];
    $res = $supabase->updateUser($telegramId, $updateData);
    if ($res !== false) $success = true;
    
    // Envoyer notification à l'utilisateur (optionnel)
    if ($success) {
        notifyUser($telegramId, "🎉 Félicitations ! Votre inscription est confirmée.");
    }
    
} elseif ($event === "deposit") {
    $updateData = ['isdeposit' => 'yes'];
    $res = $supabase->updateUser($telegramId, $updateData);
    if ($res !== false) $success = true;
    
    // Envoyer notification à l'utilisateur (optionnel)
    if ($success) {
        notifyUser($telegramId, "💰 Dépôt confirmé ! Vous avez maintenant accès aux signaux.");
    }
    
} elseif ($event === "first_deposit") {
    $updateData = ['isdeposit' => 'yes'];
    $res = $supabase->updateUser($telegramId, $updateData);
    if ($res !== false) $success = true;
}

// Marquer comme traité
if ($success) {
    // Mettre à jour le log
    $supabase->request('PATCH', '', ['processed' => true], "user_id=eq.{$telegramId}&event_type=eq.{$event}&processed=eq.false");
}

// Réponse
if ($success) {
    echo "OK - User $telegramId updated for $event";
} else {
    http_response_code(500);
    echo "Error updating database for user $telegramId";
}

// ============================================
// FONCTION: Notifier l'utilisateur via Telegram
// ============================================
function notifyUser($userId, $message) {
    global $supabase;
    
    // Récupérer la langue de l'utilisateur
    $user = $supabase->getUserById($userId);
    if (!$user) return false;
    
    $ch = curl_init("https://api.telegram.org/bot" . TOKEN . "/sendMessage");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode([
            'chat_id' => $userId,
            'text' => $message,
            'parse_mode' => 'HTML'
        ]),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 10
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
}
?>
