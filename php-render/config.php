<?php
// ============================================
// CONFIGURATION - RENDER HOSTING
// ============================================
// Utilise les variables d'environnement pour la sécurité

// Supabase Configuration
define('SUPABASE_URL', getenv('SUPABASE_URL') ?: 'https://fpcioaiiykttexprlkpz.supabase.co');
define('SUPABASE_KEY', getenv('SUPABASE_KEY') ?: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY2lvYWlpeWt0dGV4cHJsa3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDIyMzksImV4cCI6MjA4ODMxODIzOX0.WIX1TmE3ELKNqISp9jE4QYtQ3GFFf7N37hKVkO20_NI');
define('SUPABASE_TABLE', 'users');

// Bot configuration
define('TOKEN', getenv('BOT_TOKEN') ?: '7020321073:AAF3vjc_DGe8sf_CfGiz48rXKl-BPO9F2Ng');
define('CHANNEL', 'dsc_tg');
define('PROMOCODE', 'DVYS');
define('P_PARAM', 'sub1');

// Admin Panel Password (depuis variable d'environnement)
define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: 'Wu9GYt_T_vGALHdD');

// Mode debug (désactivé en production)
define('DEBUG_MODE', getenv('DEBUG_MODE') === 'true');

// ============================================
// CLASSE SUPABASE CLIENT
// ============================================
class SupabaseClient {
    private $url;
    private $key;
    private $table;

    public function __construct($url, $key, $table) {
        $this->url = rtrim($url, '/');
        $this->key = $key;
        $this->table = $table;
    }

    /**
     * Effectue une requête à l'API Supabase
     */
    private function request($method, $endpoint = '', $data = null, $query = '') {
        $url = $this->url . '/rest/v1/' . $this->table . $endpoint;
        if ($query) {
            $url .= '?' . $query;
        }

        $ch = curl_init($url);
        
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->key,
            'apikey: ' . $this->key,
            'Prefer: return=representation'
        ];

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CONNECTTIMEOUT => 10
        ]);

        if ($data !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            error_log("Curl Error: " . $curlError);
            return false;
        }

        if (DEBUG_MODE) {
            error_log("Supabase Request ($method $url): HTTP $httpCode - Response: " . substr($response, 0, 500));
        }

        if ($httpCode < 200 || $httpCode >= 300) {
            error_log("Supabase Error ($method): HTTP $httpCode - " . $response);
            return false;
        }

        $result = json_decode($response, true);
        return is_array($result) ? $result : [];
    }

    /**
     * Récupère tous les utilisateurs avec filtre optionnel
     */
    public function getUsers($filter = null) {
        $query = "select=*";
        if ($filter) {
            $filter = str_replace([" = '", "'", " = "], ["=eq.", "", "=eq."], $filter);
            $query .= "&" . $filter;
        }
        return $this->request('GET', '', null, $query);
    }

    /**
     * Récupère un utilisateur par ID
     */
    public function getUserById($userId) {
        $query = "select=*&user_id=eq.{$userId}";
        $result = $this->request('GET', '', null, $query);
        return !empty($result) ? $result[0] : null;
    }

    /**
     * Insère un nouvel utilisateur
     */
    public function insertUser($userId, $data = []) {
        $payload = array_merge([
            'user_id' => $userId,
            'isregistered' => 'no',
            'isdeposit' => 'no',
            'created_at' => date('c'),
            'updated_at' => date('c')
        ], $data);

        return $this->request('POST', '', $payload);
    }

    /**
     * Met à jour un utilisateur
     */
    public function updateUser($userId, $data) {
        $data['updated_at'] = date('c');
        $query = "user_id=eq.{$userId}";
        return $this->request('PATCH', '', $data, $query);
    }

    /**
     * Supprime un utilisateur
     */
    public function deleteUser($userId) {
        $query = "user_id=eq.{$userId}";
        return $this->request('DELETE', '', null, $query);
    }

    /**
     * Insère des données dans une table spécifique
     */
    public function insert($table, $data) {
        $url = $this->url . '/rest/v1/' . $table;
        
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->key,
                'apikey: ' . $this->key,
                'Prefer: return=representation'
            ],
            CURLOPT_TIMEOUT => 30
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300) {
            error_log("Insert Error: HTTP $httpCode - " . $response);
            return false;
        }

        return json_decode($response, true);
    }
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Envoie une réponse JSON
 */
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

/**
 * Vérifie le mot de passe admin
 */
function checkAdminAuth() {
    $pass = $_GET['pass'] ?? $_POST['pass'] ?? '';
    if ($pass !== ADMIN_PASSWORD) {
        jsonResponse(['status' => 'error', 'message' => 'Accès refusé'], 403);
    }
}

/**
 * Log une erreur
 */
function logError($message, $context = []) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'message' => $message,
        'context' => $context,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    error_log(json_encode($logEntry));
}

// Instance globale
$supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY, SUPABASE_TABLE);
?>
