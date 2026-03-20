# 🚀 GUIDE DE DÉPLOIEMENT COMPLET - BOT DVYS PRO

## 📋 Table des matières
1. [Architecture du système](#architecture)
2. [Configuration Supabase](#supabase)
3. [Déploiement Cloudflare Workers](#cloudflare)
4. [Déploiement Render](#render)
5. [Configuration 1Win Postback](#postback)
6. [Intégration page de prédiction](#prediction)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture du système <a name="architecture"></a>

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                             │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │   TELEGRAM (Bot DVYS)   │
        └────────────┬────────────┘
                     │
    ┌────────────────┼────────────────┐
    │                │                │
    ▼                ▼                ▼
┌─────────┐    ┌──────────┐    ┌──────────┐
│Cloudflare│    │ Supabase │    │  Render  │
│ Workers  │◄──►│  (BDD)   │◄───│  (PHP)   │
│  (Bot)   │    │          │    │ (Panel)  │
└─────────┘    └──────────┘    └──────────┘
                                      │
                                      ▼
                              ┌──────────────┐
                              │ 1Win Partners│
                              │  (Postback)  │
                              └──────────────┘
```

### Composants
| Service | Fonction | URL |
|---------|----------|-----|
| **Cloudflare Workers** | Bot Telegram (JS) | `https://votre-bot.workers.dev` |
| **Supabase** | Base de données PostgreSQL | `https://fpcioaiiykttexprlkpz.supabase.co` |
| **Render** | Panel Admin PHP + Postback | `https://votre-app.onrender.com` |
| **1Win** | Plateforme d'affiliation | `https://1win-partners.com` |

---

## 🗄️ Configuration Supabase <a name="supabase"></a>

### Étape 1: Créer le projet
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'**URL** et la **clé anon** (Settings > API)

### Étape 2: Créer les tables
1. Allez dans l'**éditeur SQL** (SQL Editor)
2. Copiez et exécutez le contenu de `supabase_schema.sql`

### Tables créées
| Table | Description |
|-------|-------------|
| `users` | Utilisateurs du bot |
| `message_history` | Historique pour auto-suppression |
| `postback_logs` | Logs des postbacks 1Win |
| `broadcast_logs` | Historique des diffusions |
| `user_sessions` | Sessions utilisateurs |
| `admin_users` | Administrateurs du panel |

### Étape 3: Configurer RLS (Row Level Security)
Les politiques sont déjà dans le schéma SQL. Vérifiez:
```sql
-- Vérifier que RLS est actif
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

---

## ☁️ Déploiement Cloudflare Workers <a name="cloudflare"></a>

### Étape 1: Préparer le code
1. Modifiez `bot.js` avec vos paramètres:
```javascript
const CONFIG = {
    BOT_TOKEN: "VOTRE_BOT_TOKEN",  // ← Remplacez
    SUPABASE_URL: "https://votre-projet.supabase.co",  // ← Remplacez
    SUPABASE_KEY: "votre-cle-anon",  // ← Remplacez
    CHANNEL_ID: "@votrecanal",  // ← Remplacez
    CHANNEL_LINK: "https://t.me/votrecanal",  // ← Remplacez
    ONE_WIN_DOMAIN: "https://1wrlst.com",
    AFFILIATE_CODE: "votre-code",  // ← Remplacez
    PREDICTION_URL: "https://votre-site.com/prediction",  // ← Remplacez
    // ...
};
```

### Étape 2: Déployer sur Cloudflare
```bash
# Installer Wrangler
npm install -g wrangler

# Se connecter
wrangler login

# Créer le worker
wrangler init dvys-bot --template worker

# Copier bot.js dans src/index.js

# Déployer
wrangler deploy
```

### Étape 3: Configurer le webhook Telegram
```bash
# Remplacez par votre URL Cloudflare
curl -X POST "https://api.telegram.org/botVOTRE_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://votre-bot.workers.dev/webhook"}'
```

### Vérifier le webhook
```bash
curl "https://api.telegram.org/botVOTRE_TOKEN/getWebhookInfo"
```

---

## 🖥️ Déploiement Render <a name="render"></a>

### Étape 1: Créer le dépôt Git
```bash
mkdir dvys-php-panel
cd dvys-php-panel
git init

# Copier les fichiers PHP
cp /chemin/vers/php-render/* .

# Créer .gitignore
echo "logs/\nprogress/\nuploads/\n.env" > .gitignore

git add .
git commit -m "Initial commit"
```

### Étape 2: Créer le fichier `composer.json`
```json
{
  "name": "dvys/panel",
  "description": "DVYS Admin Panel",
  "require": {
    "php": ">=8.0"
  }
}
```

### Étape 3: Déployer sur Render
1. Allez sur [render.com](https://render.com)
2. Créez un **New Web Service**
3. Connectez votre dépôt GitHub/GitLab
4. Configuration:
   - **Name**: `dvys-panel`
   - **Runtime**: `PHP`
   - **Build Command**: *laisser vide*
   - **Start Command**: `php -S 0.0.0.0:$PORT`

### Étape 4: Variables d'environnement
Dans Render Dashboard > Settings > Environment:
```
SUPABASE_URL=https://fpcioaiiykttexprlkpz.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BOT_TOKEN=7020321073:AAF3vjc_DGe8sf_CfGiz48rXKl-BPO9F2Ng
ADMIN_PASSWORD=Wu9GYt_T_vGALHdD
DEBUG_MODE=false
```

### Étape 5: Tester
```bash
# Test health check
curl https://votre-app.onrender.com/

# Test panel admin
curl "https://votre-app.onrender.com/broadcast.php?pass=VOTRE_MDP"
```

---

## 🔗 Configuration 1Win Postback <a name="postback"></a>

### URL de postback
```
https://votre-app.onrender.com/postback.php?event=registration&sub1={sub1}
```

### Configuration dans 1Win Partners
1. Connectez-vous à [1win-partners.com](https://1win-partners.com)
2. Allez dans **Postbacks**
3. Ajoutez un nouveau postback:
   - **Event**: `registration`
   - **URL**: `https://votre-app.onrender.com/postback.php?event=registration&sub1={sub1}`
   - **Method**: `GET` ou `POST`

4. Ajoutez un second postback:
   - **Event**: `deposit` ou `first_deposit`
   - **URL**: `https://votre-app.onrender.com/postback.php?event=deposit&sub1={sub1}`

### Paramètres supportés
| Paramètre | Description |
|-----------|-------------|
| `sub1` | ID Telegram de l'utilisateur |
| `event` | Type d'événement (registration/deposit) |

### Tester le postback
```bash
# Test registration
curl "https://votre-app.onrender.com/postback.php?event=registration&sub1=123456789"

# Test deposit
curl "https://votre-app.onrender.com/postback.php?event=deposit&sub1=123456789"
```

---

## 🔮 Intégration page de prédiction <a name="prediction"></a>

### Configuration dans bot.js
```javascript
const CONFIG = {
    // ... autres configs
    PREDICTION_URL: "https://votre-site.com/prediction",
    // ...
};
```

### Options d'intégration

#### Option 1: Lien externe (simple)
Le bouton "Prédictions" ouvre directement votre site:
```javascript
{ text: "🔮 Voir les prédictions", url: CONFIG.PREDICTION_URL }
```

#### Option 2: Web App Telegram (avancé)
Créez une Web App intégrée:
```javascript
{ text: "🔮 Prédictions", web_app: { url: CONFIG.PREDICTION_URL } }
```

### Sécurité de la page de prédiction
Ajoutez une vérification sur votre site:
```javascript
// Vérifier que l'utilisateur vient du bot
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user_id');

// Vérifier dans Supabase que l'utilisateur a fait un dépôt
async function checkAccess(userId) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?user_id=eq.${userId}&isdeposit=eq.yes`);
    const users = await response.json();
    return users.length > 0;
}
```

---

## 🐛 Troubleshooting <a name="troubleshooting"></a>

### Problème: Le bot ne répond pas
```bash
# Vérifier le webhook
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"

# Vérifier le health check
curl "https://votre-bot.workers.dev/health"
```

### Problème: Postback ne fonctionne pas
1. Vérifier les logs Render: Dashboard > Logs
2. Vérifier que Supabase est accessible
3. Tester manuellement:
```bash
curl -v "https://votre-app.onrender.com/postback.php?event=registration&sub1=TEST"
```

### Problème: Panel admin inaccessible
1. Vérifier le mot de passe dans les variables d'environnement
2. Vérifier les logs d'erreur PHP
3. Tester directement:
```bash
curl "https://votre-app.onrender.com/broadcast.php?pass=VOTRE_MDP"
```

### Problème: Diffusion bloquée
- Render a une limite de 512MB RAM
- Les diffusions longues peuvent être interrompues
- Solution: Envoyer par lots de 500 utilisateurs max

---

## 📊 Fonctionnalités implémentées

### ✅ Bot Telegram
- [x] Vérification adhésion canal obligatoire
- [x] 10 langues supportées (FR, EN, ES, PT, RU, HI, UZ, AZ, TR, AR)
- [x] Menu principal avec boutons inline
- [x] Auto-suppression des anciens messages
- [x] Intégration lien de prédiction
- [x] Tracking inscription/dépôt

### ✅ Panel Admin
- [x] Statistiques en temps réel
- [x] Diffusion ciblée (tous/inscrits/déposants)
- [x] Support texte/photo/vidéo
- [x] Historique des diffusions
- [x] Liste des utilisateurs avec filtres

### ✅ Postback 1Win
- [x] Réception événements registration
- [x] Réception événements deposit
- [x] Mise à jour automatique BDD
- [x] Logs des postbacks

---

## 🔒 Sécurité

### Bonnes pratiques
1. **Ne jamais** committer les tokens dans le code
2. Utiliser des variables d'environnement
3. Limiter l'accès au panel par IP si possible
4. Activer HTTPS partout (déjà fait par Render/Cloudflare)

### Variables sensibles
```bash
# Cloudflare Workers - Secrets
wrangler secret put BOT_TOKEN
wrangler secret put SUPABASE_KEY

# Render - Environment Variables
# (Configurer dans le dashboard)
```

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifier les logs dans Render Dashboard
2. Vérifier les logs dans Cloudflare Workers
3. Consulter la documentation Supabase
4. Vérifier la documentation 1Win Partners

---

**Version**: 2.0  
**Dernière mise à jour**: Mars 2026  
**Auteur**: DVYS Team
