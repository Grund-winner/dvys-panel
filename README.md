# 🤖 DVYS PRO - Bot Telegram 1Win

Bot Telegram multilingue pour la promotion de la plateforme 1Win avec vérification d'adhésion canal, tracking des inscriptions/dépôts, et panel d'administration.

## ✨ Fonctionnalités

### Bot Telegram
- ✅ **Vérification obligatoire** d'adhésion au canal
- 🌍 **10 langues** supportées :
  - 🇫🇷 Français
  - 🇬🇧 English
  - 🇪🇸 Español
  - 🇧🇷 Brazilian
  - 🇷🇺 Русский
  - 🇮🇳 हिंदी
  - 🇺🇿 O'zbek
  - 🇦🇿 Azərbaycan
  - 🇹🇷 Türkçe
  - 🇸🇦 العربية
- 🖼️ **Images** pour chaque menu
- 🗑️ **Auto-suppression** des anciens messages
- 🔗 **Intégration** page de prédiction
- 📊 **Tracking** inscription et dépôt

### Panel Admin
- 📈 **Statistiques** en temps réel
- 📢 **Diffusion** ciblée (tous/inscrits/déposants)
- 🖼️ **Support** texte/photo/vidéo
- 📜 **Historique** des diffusions
- 👥 **Liste** des utilisateurs avec filtres

### Postback 1Win
- 📝 Réception événements `registration`
- 💰 Réception événements `deposit`
- 🔄 Mise à jour automatique BDD
- 📋 Logs des postbacks

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    UTILISATEUR                      │
└──────────────┬──────────────────────────────────────┘
               │
    ┌──────────▼──────────┐
    │  TELEGRAM (Bot)     │
    └──────────┬──────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│Cloudflare│ │Supabase│ │ Render │
│ Workers│ │  (BDD) │ │ (PHP)  │
└────────┘ └────────┘ └────────┘
                              │
                              ▼
                       ┌────────────┐
                       │ 1Win Postback
                       └────────────┘
```

## 📁 Structure des fichiers

```
output/
├── bot.js                    # Code du bot (Cloudflare Workers)
├── supabase_schema.sql       # Schéma de la base de données
├── GUIDE_DEPLOIEMENT.md      # Guide complet de déploiement
├── php-render/
│   ├── config.php           # Configuration et classe Supabase
│   ├── postback.php         # Réception des postbacks 1Win
│   ├── broadcast.php        # Panel admin (interface)
│   ├── broadcast_worker.php # Worker de diffusion
│   ├── get_progress.php     # Progression des diffusions
│   ├── composer.json        # Dépendances PHP
│   └── .htaccess           # Configuration Apache
└── README.md               # Ce fichier
```

## 🚀 Déploiement rapide

### 1. Supabase (Base de données)
```sql
-- Exécuter dans l'éditeur SQL de Supabase
-- Voir supabase_schema.sql
```

### 2. Cloudflare Workers (Bot)
```bash
# Installer Wrangler
npm install -g wrangler

# Se connecter
wrangler login

# Créer et déployer
wrangler init dvys-bot
cp bot.js src/index.js
wrangler deploy

# Configurer le webhook
curl -X POST "https://api.telegram.org/botTOKEN/setWebhook" \
  -d '{"url": "https://votre-bot.workers.dev/webhook"}'
```

### 3. Render (Panel Admin + Postback)
```bash
# Créer le dépôt
git init
git add .
git commit -m "Initial commit"
git push origin main

# Déployer sur Render.com
# - Connecter le dépôt
# - Runtime: PHP
# - Start Command: php -S 0.0.0.0:$PORT
```

### 4. Configuration 1Win Postback
```
URL: https://votre-app.onrender.com/postback.php?event=registration&sub1={sub1}
```

## ⚙️ Configuration

### Variables d'environnement (Render)
```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-cle-anon
BOT_TOKEN=votre-token-telegram
ADMIN_PASSWORD=mot-de-passe-admin
DEBUG_MODE=false
```

### Configuration bot.js
```javascript
const CONFIG = {
    BOT_TOKEN: "votre-token",
    SUPABASE_URL: "https://votre-projet.supabase.co",
    SUPABASE_KEY: "votre-cle",
    CHANNEL_ID: "@votrecanal",
    CHANNEL_LINK: "https://t.me/votrecanal",
    ONE_WIN_DOMAIN: "https://1wrlst.com",
    AFFILIATE_CODE: "votre-code",
    PREDICTION_URL: "https://votre-site.com/prediction",
    // ...
};
```

## 📊 Tables Supabase

| Table | Description |
|-------|-------------|
| `users` | Utilisateurs du bot (id, langue, statuts) |
| `message_history` | Historique pour auto-suppression |
| `postback_logs` | Logs des postbacks reçus |
| `broadcast_logs` | Historique des diffusions |
| `user_sessions` | Sessions utilisateurs |
| `admin_users` | Administrateurs |

## 🔗 URLs importantes

| Service | URL |
|---------|-----|
| Bot Webhook | `https://votre-bot.workers.dev/webhook` |
| Health Check | `https://votre-bot.workers.dev/health` |
| Panel Admin | `https://votre-app.onrender.com/broadcast.php?pass=MDP` |
| Postback | `https://votre-app.onrender.com/postback.php` |

## 🛠️ Commandes utiles

### Tester le bot
```bash
# Vérifier le webhook
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"

# Tester le health check
curl "https://votre-bot.workers.dev/health"
```

### Tester le postback
```bash
# Test registration
curl "https://votre-app.onrender.com/postback.php?event=registration&sub1=123456"

# Test deposit
curl "https://votre-app.onrender.com/postback.php?event=deposit&sub1=123456"
```

## 🐛 Troubleshooting

### Le bot ne répond pas
1. Vérifier le webhook: `getWebhookInfo`
2. Vérifier les logs Cloudflare
3. Vérifier que le token est correct

### Postback ne fonctionne pas
1. Vérifier les logs Render
2. Tester manuellement avec curl
3. Vérifier les variables d'environnement

### Diffusion bloquée
- Render a une limite de 512MB RAM
- Envoyer par lots de 500 utilisateurs max
- Utiliser le filtre pour cibler

## 📚 Documentation

- [Guide de déploiement complet](GUIDE_DEPLOIEMENT.md)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Documentation Render](https://render.com/docs)
- [Documentation 1Win Partners](https://1win-partners.com/fr/blog/posts/how-to-set-up-postbacks-via-telegram/)

## 🔒 Sécurité

- ✅ HTTPS partout (Cloudflare + Render)
- ✅ Variables d'environnement pour les secrets
- ✅ RLS activé sur Supabase
- ✅ Authentification requise pour le panel
- ✅ Headers de sécurité configurés

## 📝 License

Propriétaire - DVYS Team

## 🤝 Support

Pour toute question ou problème:
1. Consulter le [Guide de déploiement](GUIDE_DEPLOIEMENT.md)
2. Vérifier les logs dans les dashboards
3. Ouvrir une issue sur le dépôt

---

**Version**: 2.0  
**Dernière mise à jour**: Mars 2026
