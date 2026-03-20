# 📋 FICHES TECHNIQUES - DVYS BOT

> Ce document contient toutes les informations techniques importantes à conserver précieusement.

---

## 🔑 INFORMATIONS DE CONNEXION

### Supabase (Base de données)
| Information | Valeur |
|-------------|--------|
| **Project URL** | `https://fpcioaiiykttexprlkpz.supabase.co` |
| **anon public key** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY2lvYWlpeWt0dGV4cHJsa3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDIyMzksImV4cCI6MjA4ODMxODIzOX0.WIX1TmE3ELKNqISp9jE4QYtQ3GFFf7N37hKVkO20_NI` |
| **Mot de passe BDD** | Généré automatiquement lors de la création |

### Telegram Bot
| Information | Valeur |
|-------------|--------|
| **Bot Token** | `8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ` |
| **Nom du bot** | `@dvys_official_bot` (à confirmer après création) |
| **Canal requis** | `@dvyschan` |
| **Lien canal** | `https://t.me/dvyschan` |

### Render (Panel Admin)
| Information | Valeur |
|-------------|--------|
| **URL du service** | `https://dvys-panel.onrender.com` |
| **Mot de passe admin** | `Wu9GYt_T_vGALHdD` |
| **URL du panel** | `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD` |
| **URL du postback** | `https://dvys-panel.onrender.com/postback.php` |

### 1Win Partners
| Information | Valeur |
|-------------|--------|
| **Code affilié** | `ufjv` |
| **Domaine** | `https://1wrlst.com` |
| **Code promo** | `DVYS` |

### Cloudflare Workers
| Information | Valeur |
|-------------|--------|
| **Nom du Worker** | `dvys-bot` |
| **URL du Worker** | `https://dvys-bot.[votre-compte].workers.dev` |
| **Webhook URL** | `https://dvys-bot.[votre-compte].workers.dev/webhook` |

---

## 🖼️ IMAGES DU BOT

Les images sont hébergées sur Telegram. Voici les liens :

| Type | URL |
|------|-----|
| **Image de démarrage** | `https://t.me/Ddvys/3` |
| **Image du menu** | `https://t.me/Ddvys/10` |
| **Image langue** | `https://t.me/Ddvys/3` |
| **Image inscription** | `https://t.me/Ddvys/11` |
| **Image instructions** | `https://t.me/Ddvys/9` |
| **Image dépôt** | `https://t.me/Ddvys/12` |
| **Image signal** | `https://t.me/Ddvys/11` |

### Page de prédiction
| Information | Valeur |
|-------------|--------|
| **URL** | `https://consultant-business-ia.free.nf/admin.php?i=1` |

---

## 🌍 LANGUES SUPPORTÉES

Le bot supporte **10 langues** :

| Code | Langue | Drapeau |
|------|--------|---------|
| `fr` | Français | 🇫🇷 |
| `en` | English | 🇬🇧 |
| `es` | Español | 🇪🇸 |
| `pt` | Brazilian | 🇧🇷 |
| `ru` | Русский | 🇷🇺 |
| `hi` | हिंदी | 🇮🇳 |
| `uz` | O'zbek | 🇺🇿 |
| `az` | Azərbaycan | 🇦🇿 |
| `tr` | Türkçe | 🇹🇷 |
| `ar` | العربية | 🇸🇦 |

---

## 📊 TABLES SUPABASE

### Table `users`
Stocke les informations des utilisateurs du bot.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | ID auto-incrémenté |
| `user_id` | BIGINT | ID Telegram de l'utilisateur |
| `language` | VARCHAR(10) | Langue choisie (fr, en, es...) |
| `channel_joined` | BOOLEAN | A rejoint le canal ? |
| `isregistered` | VARCHAR(10) | Inscrit sur 1Win ? (yes/no) |
| `isdeposit` | VARCHAR(10) | A déposé ? (yes/no) |
| `created_at` | TIMESTAMP | Date d'inscription |
| `updated_at` | TIMESTAMP | Dernière mise à jour |
| `last_activity` | TIMESTAMP | Dernière activité |
| `username` | VARCHAR | Nom d'utilisateur Telegram |
| `first_name` | VARCHAR | Prénom Telegram |
| `last_name` | VARCHAR | Nom Telegram |

### Table `postback_logs`
Stocke les logs des postbacks reçus de 1Win.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | ID auto-incrémenté |
| `user_id` | BIGINT | ID Telegram |
| `event_type` | VARCHAR(50) | Type d'événement (registration/deposit) |
| `data` | JSONB | Données complètes du postback |
| `ip_address` | INET | IP de la requête |
| `received_at` | TIMESTAMP | Date de réception |
| `processed` | BOOLEAN | Traité ? |

### Table `broadcast_logs`
Stocke l'historique des diffusions.

| Colonne | Type | Description |
|---------|------|-------------|
| `broadcast_id` | VARCHAR(100) | ID unique de la diffusion |
| `filter_type` | VARCHAR(50) | Filtre utilisé (all/reg_only/deposited) |
| `message_type` | VARCHAR(50) | Type (text/photo/video) |
| `total_users` | INTEGER | Nombre total d'utilisateurs |
| `sent_count` | INTEGER | Messages envoyés |
| `failed_count` | INTEGER | Messages échoués |
| `status` | VARCHAR(50) | Statut (running/done/partial) |

---

## 🔗 URLS IMPORTANTES

### URLs du bot
```
Webhook Telegram    : https://api.telegram.org/bot[BOT_TOKEN]/setWebhook?url=[WORKER_URL]/webhook
Health Check        : https://[WORKER_URL]/health
```

### URLs du panel
```
Panel Admin         : https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD
Postback            : https://dvys-panel.onrender.com/postback.php?event=registration&sub1={sub1}
Progression         : https://dvys-panel.onrender.com/get_progress.php?pass=Wu9GYt_T_vGALHdD
```

### URLs 1Win
```
Inscription         : https://1wrlst.com/?open=register&p=ufjv&sub1=[USER_ID]
Postback Reg        : https://dvys-panel.onrender.com/postback.php?event=registration&sub1={sub1}
Postback Dep        : https://dvys-panel.onrender.com/postback.php?event=deposit&sub1={sub1}
```

---

## 🛠️ GUIDE DE GESTION QUOTIDIENNE

### Accéder au panel admin
1. Ouvrez votre navigateur
2. Allez sur : `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD`
3. Vous voyez :
   - **Total Membres** : Nombre d'utilisateurs du bot
   - **Inscrits** : Utilisateurs inscrits sur 1Win
   - **Déposants** : Utilisateurs ayant fait un dépôt

### Envoyer une diffusion
1. Dans le panel, cliquez sur le menu ☰ (hamburger)
2. Cliquez sur **"Diffusion"**
3. Choisissez la **cible** :
   - 🚀 Tous les membres
   - 📩 Inscrits sans dépôt
   - 💰 Déposants uniquement
4. Choisissez le **type** :
   - 📝 Texte uniquement
   - 📷 Photo + Texte
   - 🎥 Vidéo + Texte
5. Écrivez votre message
6. Cliquez sur **"Lancer la diffusion"**
7. Attendez la barre de progression

### Voir la liste des membres
1. Dans le panel, cliquez sur le menu ☰
2. Cliquez sur **"Liste Membres"**
3. Vous voyez :
   - L'ID Telegram de chaque membre
   - ✅ Vert = Inscrit sur 1Win
   - 💚 Vert = A fait un dépôt
   - ❌ Rouge = Non inscrit / Pas de dépôt

### Voir l'historique des diffusions
1. Dans le panel, cliquez sur le menu ☰
2. Cliquez sur **"Historique"**
3. Vous voyez toutes les diffusions passées avec :
   - La date
   - Le nombre de messages envoyés
   - Le nombre d'échecs

---

## 🔧 MODIFICATIONS FRÉQUENTES

### Changer le texte d'un message
1. Allez sur GitHub
2. Ouvrez le fichier `bot.js`
3. Trouvez la section `TRANSLATIONS`
4. Modifiez le texte entre guillemets
5. Committez les changements
6. Redéployez sur Cloudflare Workers

### Changer une image
1. Envoyez votre nouvelle image sur Telegram (dans un canal privé)
2. Faites un clic droit sur l'image > **"Copier le lien"**
3. Allez sur GitHub
4. Ouvrez `bot.js`
5. Remplacez l'URL dans la section `IMAGES`
6. Committez et redéployez

### Ajouter un administrateur
1. Allez sur Supabase
2. Cliquez sur **"Table Editor"**
3. Cliquez sur la table `admin_users`
4. Cliquez sur **"Insert row"** (insérer une ligne)
5. Remplissez :
   - `user_id` : Votre ID Telegram (demandez à @userinfobot)
   - `username` : Votre nom d'utilisateur
   - `role` : `superadmin`
6. Cliquez sur **"Save"**

---

## ⚠️ LIMITATIONS À CONNAÎTRE

### Render (Gratuit)
- Le service s'endort après **15 minutes** d'inactivité
- Limite de **512 MB** de RAM
- Les diffusions de plus de 500 utilisateurs peuvent échouer
- **Solution** : Pour les grosses diffusions, faites plusieurs envois de 500

### Cloudflare Workers (Gratuit)
- **100 000 requêtes par jour**
- Limite de **10 ms** par exécution
- **Solution** : Le bot est optimisé, vous ne devriez pas atteindre ces limites

### Supabase (Gratuit)
- **500 MB** de stockage
- **2 GB** de transfert par mois
- **Solution** : Suffisant pour plusieurs milliers d'utilisateurs

---

## 🆘 DÉPANNAGE RAPIDE

### Problème : Le bot ne répond plus
| Cause possible | Solution |
|---------------|----------|
| Webhook incorrect | Reconfigurez le webhook (étape 4.6 du guide) |
| Token invalide | Vérifiez le token dans `bot.js` |
| Worker en erreur | Redéployez sur Cloudflare |

### Problème : Le panel ne s'affiche pas
| Cause possible | Solution |
|---------------|----------|
| Mauvais mot de passe | Vérifiez `?pass=Wu9GYt_T_vGALHdD` |
| Service endormi | Attendez 30 secondes et rafraîchissez |
| Variables manquantes | Vérifiez les variables d'environnement sur Render |

### Problème : Les postbacks ne fonctionnent pas
| Cause possible | Solution |
|---------------|----------|
| URL incorrecte | Vérifiez l'URL dans 1Win Partners |
| Clé Supabase invalide | Vérifiez `SUPABASE_KEY` sur Render |
| Table non créée | Recréez les tables dans Supabase |

---

## 📞 CONTACTS ET RESSOURCES

### Liens utiles
- **Dashboard Supabase** : https://supabase.com/dashboard
- **Dashboard Render** : https://dashboard.render.com
- **Dashboard Cloudflare** : https://dash.cloudflare.com
- **1Win Partners** : https://1win-partners.com
- **BotFather** : https://t.me/BotFather

### Outils en ligne
- **Tester un webhook** : https://webhook.site
- **Formater du JSON** : https://jsonformatter.org
- **Vérifier une URL** : https://httpstatus.io

---

**Document créé le** : Mars 2026  
**Version** : 2.0  
**À mettre à jour** : À chaque changement de configuration
