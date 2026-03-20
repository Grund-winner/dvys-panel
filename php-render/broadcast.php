<?php
require_once 'config.php';
if (!isset($_GET['pass']) || $_GET['pass'] !== ADMIN_PASSWORD) { 
    die('Accès refusé.'); 
}

$allUsers = $supabase->getUsers() ?: [];
$totalUsers = count($allUsers);
$registeredCount = 0; 
$depositCount = 0;

foreach($allUsers as $u) {
    if(($u['isregistered'] ?? '') == 'yes') $registeredCount++;
    if(($u['isdeposit'] ?? '') == 'yes') $depositCount++;
}

// Récupérer les dernières diffusions
$broadcasts = $supabase->request('GET', '', null, 'select=*&order=started_at.desc&limit=10');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>DVYS ADMIN PANEL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root { 
            --ios-blue: #0A84FF; 
            --ios-bg: #000000; 
            --ios-card: #1C1C1E; 
            --ios-green: #32D74B; 
            --ios-red: #FF453A; 
            --ios-orange: #FF9F0A;
            --ios-purple: #BF5AF2;
            --ios-pink: #FF375F;
        }
        body { 
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); 
            color: white; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 0;
            min-height: 100vh;
        }
        
        .sidebar { 
            position: fixed; 
            left: -280px; 
            top: 0; 
            width: 280px; 
            height: 100%; 
            background: rgba(28, 28, 30, 0.98); 
            backdrop-filter: blur(20px); 
            z-index: 2000; 
            transition: 0.3s; 
            padding-top: 60px; 
            border-right: 1px solid #333; 
        }
        .sidebar.active { left: 0; }
        .nav-link-ios { 
            padding: 18px 20px; 
            color: white; 
            text-decoration: none; 
            display: flex; 
            align-items: center; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s;
        }
        .nav-link-ios:hover { 
            background: rgba(255,255,255,0.05);
            color: var(--ios-blue);
        }
        .nav-link-ios i { width: 35px; color: var(--ios-blue); font-size: 20px; }
        .sidebar-overlay { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.7); 
            display: none; 
            z-index: 1999;
            backdrop-filter: blur(5px);
        }
        .sidebar-overlay.active { display: block; }
        
        .top-bar { 
            padding: 15px; 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            background: rgba(0,0,0,0.8); 
            backdrop-filter: blur(15px); 
            position: sticky; 
            top: 0; 
            z-index: 1000; 
            border-bottom: 0.5px solid #333; 
        }
        
        .app-section { display: none; padding: 15px; }
        .app-section.active { display: block; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .stat-card { 
            background: linear-gradient(145deg, var(--ios-card), #2a2a3e); 
            border-radius: 20px; 
            padding: 25px 20px; 
            margin-bottom: 15px; 
            text-align: center; 
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .stat-value { 
            font-size: 2.5rem; 
            font-weight: 800; 
            background: linear-gradient(135deg, var(--ios-blue), var(--ios-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .stat-label { 
            font-size: 0.85rem; 
            color: #888; 
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 5px;
        }
        
        .ios-input { 
            background: #2C2C2E; 
            border: 1px solid rgba(255,255,255,0.1);
            color: white; 
            border-radius: 15px; 
            padding: 18px; 
            width: 100%; 
            margin-bottom: 15px;
            transition: all 0.2s;
        }
        .ios-input:focus {
            outline: none;
            border-color: var(--ios-blue);
            box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.2);
        }
        .ios-btn { 
            background: linear-gradient(135deg, var(--ios-blue), var(--ios-purple)); 
            color: white; 
            border: none; 
            border-radius: 15px; 
            padding: 18px; 
            width: 100%; 
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 5px 20px rgba(10, 132, 255, 0.3);
        }
        .ios-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(10, 132, 255, 0.4);
        }
        .ios-btn:active {
            transform: translateY(0);
        }

        .user-item { 
            background: linear-gradient(145deg, var(--ios-card), #2a2a3e); 
            padding: 18px 15px; 
            border-radius: 15px; 
            margin-bottom: 10px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            border: 0.5px solid #333;
            transition: all 0.2s;
        }
        .user-item:hover {
            border-color: var(--ios-blue);
            transform: translateX(5px);
        }
        .status-group { display: flex; gap: 12px; }
        
        .status-box { 
            width: 42px; 
            height: 42px; 
            border-radius: 12px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 18px; 
            background: #2C2C2E;
            transition: all 0.2s;
        }
        .status-yes { 
            background: linear-gradient(135deg, rgba(50, 215, 75, 0.2), rgba(50, 215, 75, 0.1)); 
            color: var(--ios-green); 
            border: 1px solid var(--ios-green);
            box-shadow: 0 0 10px rgba(50, 215, 75, 0.3);
        }
        .status-no { 
            background: linear-gradient(135deg, rgba(255, 69, 58, 0.2), rgba(255, 69, 58, 0.1)); 
            color: var(--ios-red); 
            border: 1px solid var(--ios-red);
        }
        
        .hidden { display: none; }
        
        .progress-container {
            background: var(--ios-card);
            border-radius: 15px;
            padding: 20px;
            margin-top: 20px;
        }
        .progress {
            height: 12px;
            background: #333;
            border-radius: 10px;
            overflow: hidden;
        }
        .progress-bar {
            background: linear-gradient(90deg, var(--ios-blue), var(--ios-purple));
            border-radius: 10px;
            transition: width 0.3s ease;
        }
        
        .broadcast-item {
            background: var(--ios-card);
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 10px;
            border: 0.5px solid #333;
        }
        .broadcast-status {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: bold;
        }
        .status-done { background: rgba(50, 215, 75, 0.2); color: var(--ios-green); }
        .status-running { background: rgba(10, 132, 255, 0.2); color: var(--ios-blue); }
        .status-partial { background: rgba(255, 159, 10, 0.2); color: var(--ios-orange); }
        
        .filter-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 10px;
            font-size: 0.7rem;
            background: rgba(255,255,255,0.1);
            margin-left: 10px;
        }
        
        h3.section-title {
            font-size: 1.3rem;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .menu-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <div class="sidebar-overlay" id="overlay" onclick="toggleMenu()"></div>

    <div class="top-bar">
        <button class="menu-btn" onclick="toggleMenu()"><i class="fas fa-bars text-primary"></i></button>
        <span class="fw-bold" id="title">TABLEAU DE BORD</span>
        <div style="width: 30px;"></div>
    </div>

    <div class="sidebar" id="menu">
        <a href="#" class="nav-link-ios" onclick="showSec('dash', 'TABLEAU DE BORD')"><i class="fas fa-chart-pie"></i> Accueil</a>
        <a href="#" class="nav-link-ios" onclick="showSec('broadcast', 'DIFFUSION')"><i class="fas fa-paper-plane"></i> Diffusion</a>
        <a href="#" class="nav-link-ios" onclick="showSec('history', 'HISTORIQUE')"><i class="fas fa-history"></i> Historique</a>
        <a href="#" class="nav-link-ios" onclick="showSec('users', 'UTILISATEURS')"><i class="fas fa-users"></i> Liste Membres</a>
    </div>

    <!-- DASHBOARD -->
    <div id="dash" class="app-section active">
        <div class="stat-card">
            <div class="stat-value"><?= number_format($totalUsers) ?></div>
            <div class="stat-label">Total Membres</div>
        </div>
        <div class="row g-3">
            <div class="col-6">
                <div class="stat-card">
                    <div class="stat-value" style="background: linear-gradient(135deg, var(--ios-green), #30d158); -webkit-background-clip: text;"><?= number_format($registeredCount) ?></div>
                    <div class="stat-label">Inscrits</div>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-card">
                    <div class="stat-value" style="background: linear-gradient(135deg, var(--ios-orange), #ff9500); -webkit-background-clip: text;"><?= number_format($depositCount) ?></div>
                    <div class="stat-label">Déposants</div>
                </div>
            </div>
        </div>
        
        <div class="mt-4">
            <h3 class="section-title"><i class="fas fa-chart-line me-2"></i>Statistiques</h3>
            <div class="stat-card text-start">
                <div class="d-flex justify-content-between mb-3">
                    <span>Taux d'inscription</span>
                    <span class="text-primary fw-bold"><?= $totalUsers > 0 ? round(($registeredCount / $totalUsers) * 100, 1) : 0 ?>%</span>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <span>Taux de conversion</span>
                    <span class="text-success fw-bold"><?= $registeredCount > 0 ? round(($depositCount / $registeredCount) * 100, 1) : 0 ?>%</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Membres non inscrits</span>
                    <span class="text-danger fw-bold"><?= number_format($totalUsers - $registeredCount) ?></span>
                </div>
            </div>
        </div>
    </div>

    <!-- BROADCAST -->
    <div id="broadcast" class="app-section">
        <div class="stat-card text-start">
            <h3 class="section-title"><i class="fas fa-paper-plane me-2"></i>Nouvelle Diffusion</h3>
            <form id="bcForm">
                <label class="text-secondary small fw-bold mb-2">CIBLE</label>
                <select name="filter" class="ios-input">
                    <option value="all">🚀 Tous les membres (<?= $totalUsers ?>)</option>
                    <option value="reg_only">📩 Inscrits sans dépôt (<?= $registeredCount - $depositCount ?>)</option>
                    <option value="deposited">💰 Déposants uniquement (<?= $depositCount ?>)</option>
                </select>
                
                <label class="text-secondary small fw-bold mb-2">TYPE DE MESSAGE</label>
                <select name="type" class="ios-input" onchange="toggleMedia(this.value)">
                    <option value="text">📝 Texte uniquement</option>
                    <option value="photo">📷 Photo + Texte</option>
                    <option value="video">🎥 Vidéo + Texte</option>
                </select>
                
                <div id="mediaInput" class="hidden">
                    <label class="text-secondary small fw-bold mb-2">FICHIER</label>
                    <input type="file" name="file" class="ios-input" accept="image/*,video/*">
                </div>
                
                <label class="text-secondary small fw-bold mb-2">MESSAGE</label>
                <textarea name="message" class="ios-input" rows="5" placeholder="Votre message... Vous pouvez utiliser du HTML: <b>gras</b>, <i>italique</i>"></textarea>
                
                <button type="button" class="ios-btn" onclick="startSend()">
                    <i class="fas fa-paper-plane me-2"></i>Lancer la diffusion
                </button>
            </form>
        </div>
        
        <div id="pBox" class="progress-container d-none">
            <div class="d-flex justify-content-between mb-2">
                <span id="pStat">Envoi en cours...</span>
                <span id="pPercent">0%</span>
            </div>
            <div class="progress">
                <div id="pBar" class="progress-bar" style="width: 0%;"></div>
            </div>
            <div class="mt-3 text-center">
                <small class="text-secondary">
                    <span id="pSent">0</span> envoyés / 
                    <span id="pFailed">0</span> échoués / 
                    <span id="pTotal">0</span> total
                </small>
            </div>
        </div>
    </div>

    <!-- HISTORIQUE -->
    <div id="history" class="app-section">
        <h3 class="section-title"><i class="fas fa-history me-2"></i>Dernières diffusions</h3>
        <?php if (!empty($broadcasts)): ?>
            <?php foreach($broadcasts as $bc): 
                $statusClass = match($bc['status']) {
                    'done' => 'status-done',
                    'running' => 'status-running',
                    default => 'status-partial'
                };
                $statusText = match($bc['status']) {
                    'done' => 'Terminé',
                    'running' => 'En cours',
                    default => 'Partiel'
                };
            ?>
            <div class="broadcast-item">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold"><?= date('d/m/Y H:i', strtotime($bc['started_at'])) ?></span>
                    <span class="broadcast-status <?= $statusClass ?>"><?= $statusText ?></span>
                </div>
                <div class="text-secondary small mb-2">
                    <?= ucfirst($bc['filter_type']) ?> 
                    <span class="filter-badge"><?= $bc['message_type'] ?></span>
                </div>
                <div class="d-flex justify-content-between">
                    <small>✅ <?= $bc['sent_count'] ?> / ❌ <?= $bc['failed_count'] ?> / 📊 <?= $bc['total_users'] ?></small>
                </div>
            </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="text-center text-secondary py-5">
                <i class="fas fa-inbox fa-3x mb-3"></i>
                <p>Aucune diffusion effectuée</p>
            </div>
        <?php endif; ?>
    </div>

    <!-- USERS -->
    <div id="users" class="app-section">
        <h3 class="section-title"><i class="fas fa-users me-2"></i>Liste des membres</h3>
        <div class="mb-3">
            <input type="text" id="userSearch" class="ios-input" placeholder="🔍 Rechercher un ID..." onkeyup="filterUsers()">
        </div>
        <div id="usersList">
        <?php foreach(array_slice(array_reverse($allUsers), 0, 100) as $u): 
            $reg = ($u['isregistered'] ?? 'no') === 'yes';
            $dep = ($u['isdeposit'] ?? 'no') === 'yes';
            $lang = $u['language'] ?? 'fr';
            $flags = ['fr' => '🇫🇷', 'en' => '🇬🇧', 'es' => '🇪🇸', 'pt' => '🇧🇷', 'ru' => '🇷🇺', 'hi' => '🇮🇳', 'uz' => '🇺🇿', 'az' => '🇦🇿', 'tr' => '🇹🇷', 'ar' => '🇸🇦'];
        ?>
        <div class="user-item" data-userid="<?= $u['user_id'] ?>">
            <div>
                <div class="fw-bold"><?= $flags[$lang] ?? '🌐' ?> ID: <?= $u['user_id'] ?></div>
                <div class="text-secondary" style="font-size: 11px;">
                    <?= substr($u['created_at'], 0, 16) ?> | 
                    <?= $u['username'] ? '@' . $u['username'] : 'No username' ?>
                </div>
            </div>
            <div class="status-group">
                <div class="status-box <?= $reg ? 'status-yes' : 'status-no' ?>" title="Inscrit">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="status-box <?= $dep ? 'status-yes' : 'status-no' ?>" title="Déposant">
                    <i class="fas fa-wallet"></i>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
        </div>
        <?php if (count($allUsers) > 100): ?>
        <div class="text-center mt-3 text-secondary">
            <small>Affichage des 100 derniers utilisateurs sur <?= number_format(count($allUsers)) ?></small>
        </div>
        <?php endif; ?>
    </div>

    <script>
        function toggleMenu() {
            document.getElementById('menu').classList.toggle('active');
            document.getElementById('overlay').classList.toggle('active');
        }
        
        function showSec(id, t) {
            document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.getElementById('title').innerText = t;
            toggleMenu();
        }
        
        function toggleMedia(val) { 
            document.getElementById('mediaInput').classList.toggle('hidden', val === 'text'); 
        }
        
        function filterUsers() {
            const search = document.getElementById('userSearch').value.toLowerCase();
            document.querySelectorAll('.user-item').forEach(item => {
                const userId = item.getAttribute('data-userid');
                item.style.display = userId.includes(search) ? 'flex' : 'none';
            });
        }
        
        let currentBroadcastId = null;
        
        async function startSend() {
            const form = document.getElementById('bcForm');
            const fd = new FormData(form);
            
            document.getElementById('pBox').classList.remove('d-none');
            
            // Démarrer la diffusion
            fetch("broadcast_worker.php?pass=<?= ADMIN_PASSWORD ?>", { 
                method: "POST", 
                body: fd 
            })
            .then(r => r.json())
            .then(data => {
                if (data.broadcast_id) {
                    currentBroadcastId = data.broadcast_id;
                }
            });
            
            // Vérifier la progression
            const check = setInterval(async () => {
                const url = currentBroadcastId 
                    ? `get_progress.php?pass=<?= ADMIN_PASSWORD ?>&broadcast_id=${currentBroadcastId}`
                    : "get_progress.php?pass=<?= ADMIN_PASSWORD ?>";
                    
                const r = await fetch(url + "&t=" + Date.now());
                const d = await r.json();
                
                if(d.total > 0) {
                    const p = Math.round(((d.sent + d.failed) / d.total) * 100);
                    document.getElementById('pBar').style.width = p + "%";
                    document.getElementById('pPercent').innerText = p + "%";
                    document.getElementById('pSent').innerText = d.sent;
                    document.getElementById('pFailed').innerText = d.failed;
                    document.getElementById('pTotal').innerText = d.total;
                    document.getElementById('pStat').innerText = d.status === 'done' ? 'Terminé!' : 'Envoi en cours...';
                    
                    if(d.status === 'done' || p >= 100) { 
                        clearInterval(check); 
                        document.getElementById('pStat').innerText = '✅ Terminé!';
                        setTimeout(() => {
                            document.getElementById('pBox').classList.add('d-none');
                            document.getElementById('bcForm').reset();
                        }, 3000);
                    }
                }
            }, 1500);
        }
    </script>
</body>
</html>
