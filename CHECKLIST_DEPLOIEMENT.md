# ✅ CHECKLIST DE DÉPLOIEMENT - DVYS BOT

> Cochez chaque étape au fur et à mesure pour ne rien oublier !

---

## 📋 AVANT DE COMMENCER

- [ ] J'ai lu le guide complet `GUIDE_DEPLOIEMENT_100pct_MANUEL.md`
- [ ] J'ai les fichiers `bot.js` et `supabase_schema.sql` accessibles
- [ ] J'ai un compte GitHub actif
- [ ] J'ai l'application Telegram installée

---

## ÉTAPE 1 : SUPABASE (Base de données)

### Création du compte
- [ ] Je vais sur https://supabase.com
- [ ] Je clique sur "Start your project"
- [ ] Je m'inscris avec GitHub
- [ ] J'autorise Supabase à accéder à mon compte

### Création du projet
- [ ] Je clique sur "New project"
- [ ] Je choisis mon organisation
- [ ] Je tape `dvys-bot` comme nom de projet
- [ ] Je clique sur "Generate a password"
- [ ] Je sélectionne "West Europe (Frankfurt)"
- [ ] Je clique sur "Create new project"
- [ ] J'attends 2-3 minutes que le projet soit créé

### Récupération des informations
- [ ] Je vais dans "Project Settings" > "API"
- [ ] Je copie le "Project URL" : `https://fpcioaiiykttexprlkpz.supabase.co`
- [ ] Je copie la clé "anon public"
- [ ] Je garde ces informations dans un fichier texte

### Création des tables
- [ ] Je vais dans "SQL Editor"
- [ ] Je clique sur "New query"
- [ ] Je copie-colle le contenu de `supabase_schema.sql`
- [ ] Je clique sur "Run"
- [ ] Je vois le message "Success"

### Vérification
- [ ] Je vais dans "Table Editor"
- [ ] Je vois 6 tables créées :
  - [ ] `admin_users`
  - [ ] `broadcast_logs`
  - [ ] `message_history`
  - [ ] `postback_logs`
  - [ ] `user_sessions`
  - [ ] `users`

**✅ ÉTAPE 1 TERMINÉE**

---

## ÉTAPE 2 : RENDER (Panel Admin + Postback)

### Création du compte
- [ ] Je vais sur https://render.com
- [ ] Je clique sur "Get Started for Free"
- [ ] Je m'inscris avec GitHub
- [ ] J'autorise Render à accéder à mes dépôts

### Connexion du dépôt
- [ ] Je clique sur "New +" > "Web Service"
- [ ] Je trouve mon dépôt "dvys-bot" dans la liste
- [ ] Je clique sur "Connect"

### Configuration du service
- [ ] Name : `dvys-panel`
- [ ] Region : `Frankfurt (EU Central)`
- [ ] Branch : `main` (ou `master`)
- [ ] Runtime : `PHP`
- [ ] Build Command : (vide)
- [ ] Start Command : `php -S 0.0.0.0:$PORT`
- [ ] Je clique sur "Create Web Service"

### Variables d'environnement
- [ ] Je vais dans l'onglet "Environment"
- [ ] J'ajoute la variable `SUPABASE_URL` avec la valeur copiée
- [ ] J'ajoute la variable `SUPABASE_KEY` avec la valeur copiée
- [ ] J'ajoute la variable `BOT_TOKEN` avec `8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ`
- [ ] J'ajoute la variable `ADMIN_PASSWORD` avec `Wu9GYt_T_vGALHdD`
- [ ] J'ajoute la variable `DEBUG_MODE` avec `false`
- [ ] Je clique sur "Save Changes"

### Vérification
- [ ] Je vais dans l'onglet "Logs"
- [ ] J'attends de voir "Server running on port ..."
- [ ] Je note l'URL : `https://dvys-panel.onrender.com`
- [ ] Je teste le panel : `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD`
- [ ] Je vois les statistiques s'afficher

**✅ ÉTAPE 2 TERMINÉE**

---

## ÉTAPE 3 : TELEGRAM (BotFather)

### Création du bot
- [ ] J'ouvre Telegram
- [ ] Je cherche @BotFather
- [ ] Je clique sur "Démarrer"
- [ ] J'envoie `/newbot`
- [ ] J'envoie le nom : `DVYS Bot`
- [ ] J'envoie le username : `dvys_official_bot`
- [ ] Je reçois le token
- [ ] Je copie le token (gardez-le secret !)

### Configuration des commandes
- [ ] J'envoie `/setcommands` à BotFather
- [ ] Je sélectionne mon bot
- [ ] J'envoie :
  ```
  start - Démarrer le bot
  menu - Afficher le menu principal
  lang - Changer de langue
  help - Aide
  ```

**✅ ÉTAPE 3 TERMINÉE**

---

## ÉTAPE 4 : CLOUDFLARE WORKERS (Bot)

### Création du compte
- [ ] Je vais sur https://workers.cloudflare.com
- [ ] Je clique sur "Sign up"
- [ ] Je remplis le formulaire
- [ ] Je vérifie mon email

### Création du Worker
- [ ] Je vais dans "Workers & Pages"
- [ ] Je clique sur "Create application"
- [ ] Je clique sur "Create Worker"
- [ ] Name : `dvys-bot`
- [ ] Je clique sur "Deploy"
- [ ] Je clique sur "Edit code"

### Copie du code
- [ ] Je sélectionne tout le code (Ctrl+A)
- [ ] Je supprime (Suppr)
- [ ] J'ouvre `bot.js` sur GitHub
- [ ] Je clique sur "Raw"
- [ ] Je copie tout le code
- [ ] Je colle dans l'éditeur Cloudflare

### Modification du token
- [ ] Je trouve la ligne avec `BOT_TOKEN`
- [ ] Je remplace le token par celui de BotFather
- [ ] Je garde les guillemets `"`

### Déploiement
- [ ] Je clique sur "Save and deploy"
- [ ] Je confirme
- [ ] J'attends 10-20 secondes
- [ ] Je note l'URL : `https://dvys-bot.[compte].workers.dev`

### Configuration du webhook
- [ ] J'ouvre un nouvel onglet
- [ ] Je tape :
  ```
  https://api.telegram.org/bot[MON_TOKEN]/setWebhook?url=https://dvys-bot.[compte].workers.dev/webhook
  ```
- [ ] Je vois `{"ok":true}`

**✅ ÉTAPE 4 TERMINÉE**

---

## ÉTAPE 5 : 1WIN PARTNERS (Postback)

### Connexion
- [ ] Je vais sur https://1win-partners.com
- [ ] Je me connecte avec mon compte affilié

### Postback Registration
- [ ] Je vais dans "Postbacks"
- [ ] Je clique sur "Add postback"
- [ ] Event : `registration`
- [ ] URL : `https://dvys-panel.onrender.com/postback.php?event=registration&sub1={sub1}`
- [ ] Method : `GET`
- [ ] Je clique sur "Save"

### Postback Deposit
- [ ] Je clique sur "Add postback"
- [ ] Event : `deposit` (ou `first_deposit`)
- [ ] URL : `https://dvys-panel.onrender.com/postback.php?event=deposit&sub1={sub1}`
- [ ] Method : `GET`
- [ ] Je clique sur "Save"

### Vérification
- [ ] Je vois 2 postbacks actifs dans la liste
- [ ] Les deux ont le statut "Active"

**✅ ÉTAPE 5 TERMINÉE**

---

## 🧪 TESTS FINAUX

### Test 1 : Le bot répond
- [ ] J'ouvre Telegram
- [ ] Je cherche mon bot (@dvys_official_bot)
- [ ] J'envoie `/start`
- [ ] Le bot répond avec une image de bienvenue

### Test 2 : Vérification du canal
- [ ] Je clique sur "Rejoindre" pour @dvyschan
- [ ] Je reviens au bot
- [ ] Je clique sur "Vérifier"
- [ ] Le menu principal s'affiche

### Test 3 : Panel admin
- [ ] J'ouvre `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD`
- [ ] Je vois les statistiques
- [ ] Le nombre de membres est à jour

### Test 4 : Postback (optionnel)
- [ ] Je demande à un ami de s'inscrire via mon lien 1Win
- [ ] J'attends 5 minutes
- [ ] Je rafraîchis le panel
- [ ] Le compteur "Inscrits" a augmenté

**✅ TOUS LES TESTS SONT RÉUSSIS**

---

## 🎉 FÉLICITATIONS !

Votre bot DVYS est maintenant **100% opérationnel** !

### URLs à sauvegarder

| Service | URL |
|---------|-----|
| Bot Telegram | `@dvys_official_bot` |
| Panel Admin | `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD` |
| Cloudflare Worker | `https://dvys-bot.[compte].workers.dev` |
| Postback | `https://dvys-panel.onrender.com/postback.php` |

### Prochaines étapes
- [ ] Tester toutes les fonctionnalités du bot
- [ ] Personnaliser les images si nécessaire
- [ ] Modifier les textes si nécessaire
- [ ] Partager le bot avec vos contacts

---

**Date de déploiement** : _______________  
**Déployé par** : _______________
