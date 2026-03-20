# 📋 Récapitulatif de votre Configuration

Voici les informations mises à jour dans votre projet et les étapes à suivre pour finaliser le déploiement.

## 🔗 Liens de Webhook et Postback
Ces liens sont basés sur votre URL Render : `https://dvys-panel.onrender.com`

### 1. Webhook Telegram (à configurer une seule fois)
Exécutez cette commande (ou ouvrez l'URL dans votre navigateur) pour lier votre bot Cloudflare à Telegram :
`https://api.telegram.org/bot8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ/setWebhook?url=https://dvys-bot.workers.dev/webhook`
*(Note : Remplacez `dvys-bot.workers.dev` par votre URL réelle une fois le worker déployé sur Cloudflare).*

### 2. Postbacks 1Win (à configurer sur 1win-partners.com)
Ajoutez ces deux URLs dans la section Postbacks de votre compte partenaire :

*   **Inscription (Registration) :**
    `https://dvys-panel.onrender.com/postback.php?event=registration&sub1={sub1}`
*   **Dépôt (Deposit) :**
    `https://dvys-panel.onrender.com/postback.php?event=deposit&sub1={sub1}`

---

## 📂 Ce que vous devez importer

### Sur votre dépôt GitHub (`https://github.com/Grund-winner/dvys-panel.git`) :
Vous devez importer le contenu du dossier `php-render` à la racine de votre dépôt pour que Render puisse le déployer.
1. `broadcast.php`
2. `broadcast_worker.php`
3. `config.php` (Mis à jour avec votre Token et Code Promo)
4. `get_progress.php`
5. `postback.php`
6. `composer.json`
7. `.htaccess`

### Sur Cloudflare Workers :
Utilisez le fichier `bot.js` mis à jour. Il contient déjà vos identifiants Supabase, votre Token Bot et votre Code Promo `ufjv`.

---

## 🔑 Identifiants du Panel Admin
*   **URL :** `https://dvys-panel.onrender.com/broadcast.php`
*   **Mot de passe :** `Wu9GYt_T_vGALHdD` (Vous pouvez le changer dans `config.php`)

---

## 🛠️ Rappel des étapes suivantes
1. **Supabase :** Si ce n'est pas déjà fait, exécutez le fichier `supabase_schema.sql` dans l'éditeur SQL de votre projet Supabase.
2. **GitHub :** Poussez les fichiers PHP sur votre dépôt.
3. **Render :** Connectez votre dépôt GitHub à Render (choisissez le runtime PHP).
4. **Cloudflare :** Déployez `bot.js` sur un Worker.
5. **1Win :** Configurez les URLs de postback ci-dessus.
