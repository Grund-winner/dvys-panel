# DVYS Admin Panel - PHP

Panel d'administration pour le bot DVYS, hébergé sur Render.

## 🚀 Déploiement sur Render

### Étape 1: Créer le dépôt GitHub

```bash
# Créer un nouveau dépôt sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/votre-user/dvys-panel.git
git push -u origin main
```

### Étape 2: Déployer sur Render

1. Allez sur [render.com](https://render.com)
2. Cliquez sur **"New +"** > **"Web Service"**
3. Connectez votre compte GitHub et sélectionnez le dépôt
4. Configuration:
   - **Name**: `dvys-panel`
   - **Runtime**: `PHP`
   - **Branch**: `main`
   - **Build Command**: *laisser vide*
   - **Start Command**: `php -S 0.0.0.0:$PORT`
5. Cliquez sur **"Create Web Service"**

### Étape 3: Variables d'environnement

Dans le dashboard Render:
1. Allez dans **Settings** > **Environment**
2. Ajoutez les variables:

```
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BOT_TOKEN=7020321073:AAF3vjc_DGe8sf_CfGiz48rXKl-BPO9F2Ng
ADMIN_PASSWORD=Wu9GYt_T_vGALHdD
DEBUG_MODE=false
```

### Étape 4: Tester

```bash
# Test de santé
curl https://votre-app.onrender.com/

# Test du panel
curl "https://votre-app.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD"

# Test du postback
curl "https://votre-app.onrender.com/postback.php?event=registration&sub1=123456789"
```

## 📁 Structure

```
php-render/
├── config.php              # Configuration Supabase
├── postback.php            # Réception postbacks 1Win
├── broadcast.php           # Panel admin (interface)
├── broadcast_worker.php    # Worker de diffusion
├── get_progress.php        # Progression des diffusions
├── composer.json           # Configuration PHP
├── .htaccess              # Sécurité Apache
└── README.md              # Ce fichier
```

## 🔗 URLs

| Endpoint | Description |
|----------|-------------|
| `/` | Health check |
| `/broadcast.php?pass=MDP` | Panel admin |
| `/postback.php` | Réception postbacks |
| `/broadcast_worker.php?pass=MDP` | Worker diffusion (POST) |
| `/get_progress.php?pass=MDP` | Progression diffusion |

## 🔒 Sécurité

- Le panel nécessite le paramètre `pass` dans l'URL
- Le mot de passe est défini dans la variable d'environnement `ADMIN_PASSWORD`
- Les fichiers `.env`, `.log`, `.sql` sont protégés par `.htaccess`

## 🐛 Debugging

Activer le mode debug:
```
DEBUG_MODE=true
```

Les logs seront écrits dans `logs/`.

## 📊 Limitations Render (Gratuit)

- **RAM**: 512MB
- **CPU**: Partagé
- **Sleep**: Après 15min d'inactivité
- **Diffusions**: Limiter à 500 utilisateurs par lot

## 📝 License

Propriétaire - DVYS Team
