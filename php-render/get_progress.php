<?php
// ============================================
// GET PROGRESS - RENDER HOSTING
// Récupère la progression d'une diffusion
// ============================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

// Vérification auth
checkAdminAuth();

$broadcastId = $_GET['broadcast_id'] ?? null;

if ($broadcastId) {
    // Progression spécifique
    $file = 'progress/' . $broadcastId . '.json';
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        jsonResponse(['status' => 'not_found', 'broadcast_id' => $broadcastId]);
    }
} else {
    // Dernière progression active
    $progressDir = 'progress/';
    $latest = null;
    $latestTime = 0;
    
    if (is_dir($progressDir)) {
        foreach (glob($progressDir . '*.json') as $file) {
            $mtime = filemtime($file);
            if ($mtime > $latestTime) {
                $latestTime = $mtime;
                $latest = $file;
            }
        }
    }
    
    if ($latest && file_exists($latest)) {
        echo file_get_contents($latest);
    } else {
        jsonResponse(['sent' => 0, 'failed' => 0, 'total' => 0, 'status' => 'idle']);
    }
}
?>
