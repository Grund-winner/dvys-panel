# 🚀 GUIDE DE DÉPLOIEMENT 100% MANUEL - DVYS BOT

> **⚠️ Aucune ligne de commande nécessaire !** Ce guide utilise uniquement des clics dans des interfaces web.

---

## 📋 SOMMAIRE

1. [Étape 1 : Créer la base de données Supabase](#etape1)
2. [Étape 2 : Déployer sur Render (Panel Admin + Postback)](#etape2)
3. [Étape 3 : Connecter le bot Telegram (BotFather)](#etape3)
4. [Étape 4 : Configurer Cloudflare Workers](#etape4)
5. [Étape 5 : Configurer le Postback 1Win](#etape5)
6. [Vérification finale](#verification)

---

## ÉTAPE 1 : Créer la base de données Supabase <a name="etape1"></a>

### 1.1 Créer un compte Supabase

1. Ouvrez votre navigateur et allez sur : **https://supabase.com**
2. Cliquez sur le bouton **"Start your project"** (démarrer votre projet)
3. Cliquez sur **"Sign up with GitHub"** (s'inscrire avec GitHub)
4. Connectez-vous avec votre compte GitHub
5. Autorisez Supabase à accéder à votre compte GitHub

### 1.2 Créer un nouveau projet

1. Une fois connecté, cliquez sur **"New project"** (nouveau projet)
2. Remplissez le formulaire :
   - **Organization** : Choisissez votre organisation (ou créez-en une)
   - **Project name** : Tapez `dvys-bot`
   - **Database password** : Cliquez sur **"Generate a password"** (générer un mot de passe)
   - **Region** : Sélectionnez `West Europe (Frankfurt)` pour la France
3. Cliquez sur **"Create new project"** (créer un nouveau projet)
4. **Attendez 2-3 minutes** que le projet soit créé

### 1.3 Récupérer les informations importantes

1. Dans le menu de gauche, cliquez sur **"Project Settings"** (paramètres du projet)
2. Cliquez sur **"API"** dans le sous-menu
3. Vous verrez deux informations importantes :
   - **Project URL** : `https://fpcioaiiykttexprlkpz.supabase.co` (copiez cette URL)
   - **anon public** : La clé qui commence par `eyJhbGciOiJIUzI1NiIs...` (copiez cette clé)
4. **Gardez ces informations dans un fichier texte** sur votre ordinateur, vous en aurez besoin plus tard

### 1.4 Créer les tables dans la base de données

1. Dans le menu de gauche, cliquez sur **"SQL Editor"** (éditeur SQL)
2. Cliquez sur **"New query"** (nouvelle requête)
3. Un grand espace blanc s'affiche pour écrire du SQL
4. **Copiez-collez** tout le contenu du fichier `supabase_schema.sql` (que vous avez sur GitHub) dans cet espace
5. Cliquez sur le bouton **"Run"** (exécuter) en bas à droite
6. Attendez que l'exécution se termine (vous verrez un message vert "Success")

### 1.5 Vérifier que les tables sont créées

1. Dans le menu de gauche, cliquez sur **"Table Editor"** (éditeur de tables)
2. Vous devriez voir 6 tables :
   - `admin_users`
   - `broadcast_logs`
   - `message_history`
   - `postback_logs`
   - `user_sessions`
   - `users`
3. Si vous voyez ces 6 tables, **c'est parfait !** Passez à l'étape suivante.

---

## ÉTAPE 2 : Déployer sur Render (Panel Admin + Postback) <a name="etape2"></a>

### 2.1 Créer un compte Render

1. Allez sur : **https://render.com**
2. Cliquez sur **"Get Started for Free"** (commencer gratuitement)
3. Cliquez sur **"Sign up with GitHub"** (s'inscrire avec GitHub)
4. Connectez-vous avec votre compte GitHub
5. Autorisez Render à accéder à vos dépôts GitHub

### 2.2 Connecter votre dépôt GitHub

1. Une fois connecté à Render, cliquez sur le bouton bleu **"New +"** en haut à droite
2. Cliquez sur **"Web Service"** (service web)
3. Une liste de vos dépôts GitHub s'affiche
4. Trouvez et cliquez sur le dépôt nommé **"dvys-bot"** (ou le nom de votre projet)
5. Cliquez sur **"Connect"** (connecter)

### 2.3 Configurer le service web

Un formulaire de configuration s'affiche. Remplissez comme ceci :

| Champ | Valeur à entrer |
|-------|-----------------|
| **Name** | `dvys-panel` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` (ou `master` selon votre dépôt) |
| **Runtime** | Sélectionnez `PHP` dans la liste déroulante |
| **Build Command** | Laissez **vide** |
| **Start Command** | Tapez exactement : `php -S 0.0.0.0:$PORT` |

Cliquez sur **"Create Web Service"** (créer le service web)

### 2.4 Ajouter les variables d'environnement (TRÈS IMPORTANT)

1. Attendez que le déploiement commence (vous verrez des logs qui défilent)
2. Dans le menu du haut, cliquez sur **"Environment"** (environnement)
3. Vous voyez un tableau vide avec les colonnes "Key" et "Value"
4. Cliquez sur **"Add Environment Variable"** (ajouter une variable)
5. Ajoutez **une par une** ces 5 variables :

| Key (clé) | Value (valeur) |
|-----------|----------------|
| `SUPABASE_URL` | `https://fpcioaiiykttexprlkpz.supabase.co` |
| `SUPABASE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY2lvYWlpeWt0dGV4cHJsa3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDIyMzksImV4cCI6MjA4ODMxODIzOX0.WIX1TmE3ELKNqISp9jE4QYtQ3GFFf7N37hKVkO20_NI` |
| `BOT_TOKEN` | `8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ` |
| `ADMIN_PASSWORD` | `Wu9GYt_T_vGALHdD` |
| `DEBUG_MODE` | `false` |

6. Pour chaque variable :
   - Tapez le nom dans **"Key"**
   - Tapez la valeur dans **"Value"**
   - Cliquez sur **"Add"** (ajouter)

7. Une fois les 5 variables ajoutées, cliquez sur **"Save Changes"** (sauvegarder)

### 2.5 Vérifier le déploiement

1. En haut de la page, cliquez sur l'onglet **"Logs"** (logs)
2. Attendez de voir le message : `Server running on port ...`
3. En haut de la page, vous voyez l'URL de votre site : `https://dvys-panel.onrender.com`
4. **Copiez cette URL**, vous en aurez besoin

### 2.6 Tester le panel admin

1. Ouvrez un nouvel onglet dans votre navigateur
2. Tapez cette URL (remplacez par votre URL) :
   ```
   https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD
   ```
3. Si vous voyez le panel admin avec les statistiques, **c'est parfait !**

---

## ÉTAPE 3 : Connecter le bot Telegram (BotFather) <a name="etape3"></a>

### 3.1 Créer un bot avec BotFather

1. Ouvrez l'application **Telegram** sur votre téléphone ou ordinateur
2. Dans la barre de recherche, tapez : **@BotFather**
3. Cliquez sur le compte officiel avec la coche bleue ✅
4. Cliquez sur le bouton **"Démarrer"** ou **"Start"**
5. Envoyez ce message : `/newbot`
6. BotFather vous demande : **"Alright, a new bot. How are we going to call it?"**
7. Envoyez le nom de votre bot : `DVYS Bot`
8. BotFather demande : **"Good. Now let's choose a username for your bot..."**
9. Envoyez un nom d'utilisateur qui doit finir par **bot** : `dvys_official_bot`
   - ⚠️ Si ce nom est pris, essayez : `dvys_signals_bot` ou `dvys_casino_bot`
10. BotFather vous envoie un message avec votre **token** (clé API)
11. **Copiez ce token** (il ressemble à : `8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ`)
12. **Gardez ce token secret !**

### 3.2 Configurer les commandes du bot

1. Toujours dans BotFather, envoyez : `/setcommands`
2. Sélectionnez votre bot dans la liste
3. Envoyez ce texte :
   ```
   start - Démarrer le bot
   menu - Afficher le menu principal
   lang - Changer de langue
   help - Aide
   ```

---

## ÉTAPE 4 : Configurer Cloudflare Workers <a name="etape4"></a>

### 4.1 Créer un compte Cloudflare

1. Allez sur : **https://workers.cloudflare.com**
2. Cliquez sur **"Sign up"** (s'inscrire)
3. Remplissez le formulaire avec votre email et un mot de passe
4. Cliquez sur **"Create Account"** (créer un compte)
5. Vérifiez votre email en cliquant sur le lien reçu

### 4.2 Créer un Worker

1. Connectez-vous au dashboard Cloudflare
2. Cliquez sur **"Workers & Pages"** dans le menu de gauche
3. Cliquez sur le bouton bleu **"Create application"** (créer une application)
4. Cliquez sur **"Create Worker"** (créer un worker)
5. Vous voyez un champ **"Name"** : tapez `dvys-bot`
6. Cliquez sur **"Deploy"** (déployer)
7. Une page de confirmation s'affiche, cliquez sur **"Edit code"** (éditer le code)

### 4.3 Copier le code du bot

1. Vous êtes dans l'éditeur de code
2. **Sélectionnez tout le texte** (Ctrl+A sur PC ou Cmd+A sur Mac)
3. **Supprimez-le** (touche Suppr)
4. Ouvrez votre dépôt GitHub dans un autre onglet
5. Trouvez le fichier `bot.js` et cliquez dessus
6. Cliquez sur le bouton **"Raw"** (brut) en haut à droite
7. **Sélectionnez tout le code** (Ctrl+A)
8. **Copiez** (Ctrl+C)
9. Retournez dans l'éditeur Cloudflare
10. **Collez** le code (Ctrl+V)

### 4.4 Modifier le token du bot

1. Dans le code, trouvez cette ligne (ligne 8 environ) :
   ```javascript
   BOT_TOKEN: "8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ",
   ```
2. Remplacez le token par celui que BotFather vous a donné à l'étape 3.1
3. **Important** : Gardez les guillemets `"` autour du token

### 4.5 Déployer le Worker

1. Cliquez sur le bouton **"Save and deploy"** (sauvegarder et déployer) en haut à droite
2. Confirmez en cliquant sur **"Save and deploy"** dans la fenêtre qui s'ouvre
3. Attendez 10-20 secondes
4. En haut de la page, vous voyez l'URL de votre worker : `https://dvys-bot.votre-nom.workers.dev`
5. **Copiez cette URL**, vous en aurez besoin

### 4.6 Configurer le webhook Telegram

1. Ouvrez un nouvel onglet dans votre navigateur
2. Tapez cette URL (remplacez TOKEN par votre token BotFather) :
   ```
   https://api.telegram.org/bot8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ/setWebhook?url=https://dvys-bot.votre-nom.workers.dev/webhook
   ```
   - Remplacez `8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ` par votre token
   - Remplacez `dvys-bot.votre-nom.workers.dev` par votre URL Cloudflare
3. Appuyez sur Entrée
4. Si vous voyez `{"ok":true}`, **c'est parfait !**

---

## ÉTAPE 5 : Configurer le Postback 1Win <a name="etape5"></a>

### 5.1 Se connecter à 1Win Partners

1. Allez sur : **https://1win-partners.com**
2. Connectez-vous avec votre compte affilié
3. Si vous n'avez pas de compte, créez-en un

### 5.2 Configurer le postback Registration

1. Dans le menu, cliquez sur **"Postbacks"** ou **"API"**
2. Cliquez sur **"Add postback"** (ajouter un postback)
3. Remplissez le formulaire :
   - **Event** : Sélectionnez `registration`
   - **URL** : Tapez (remplacez par votre URL Render) :
     ```
     https://dvys-panel.onrender.com/postback.php?event=registration&sub1={sub1}
     ```
   - **Method** : Sélectionnez `GET`
4. Cliquez sur **"Save"** (sauvegarder)

### 5.3 Configurer le postback Deposit

1. Cliquez sur **"Add postback"** (ajouter un postback)
2. Remplissez le formulaire :
   - **Event** : Sélectionnez `deposit` ou `first_deposit`
   - **URL** : Tapez (remplacez par votre URL Render) :
     ```
     https://dvys-panel.onrender.com/postback.php?event=deposit&sub1={sub1}
     ```
   - **Method** : Sélectionnez `GET`
3. Cliquez sur **"Save"** (sauvegarder)

### 5.4 Vérifier la configuration

1. Dans la liste des postbacks, vous devriez voir 2 lignes :
   - Une pour `registration`
   - Une pour `deposit`
2. Les deux doivent avoir le statut **"Active"**

---

## VÉRIFICATION FINALE <a name="verification"></a>

### Test 1 : Le bot répond

1. Ouvrez Telegram
2. Cherchez votre bot (par exemple : `@dvys_official_bot`)
3. Cliquez sur **"Démarrer"** ou envoyez `/start`
4. Le bot doit vous envoyer un message avec une image de bienvenue

### Test 2 : Le canal est vérifié

1. Le bot vous demande de rejoindre le canal `@dvyschan`
2. Cliquez sur **"Rejoindre"**
3. Revenez au bot et cliquez sur **"Vérifier"**
4. Le menu principal doit s'afficher

### Test 3 : Le panel admin fonctionne

1. Ouvrez votre navigateur
2. Allez sur : `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD`
3. Vous devez voir :
   - Le nombre total de membres
   - Le nombre d'inscrits
   - Le nombre de déposants

### Test 4 : Le postback fonctionne

1. Demandez à un ami de s'inscrire via votre lien 1Win
2. Attendez 5 minutes
3. Rafraîchissez le panel admin
4. Le compteur "Inscrits" doit augmenter

---

## 🎉 FÉLICITATIONS !

Votre bot DVYS est maintenant **100% opérationnel** !

### Récapitulatif des URLs importantes

| Service | URL | À garder précieusement |
|---------|-----|------------------------|
| **Bot Telegram** | `@dvys_official_bot` | ✅ |
| **Panel Admin** | `https://dvys-panel.onrender.com/broadcast.php?pass=Wu9GYt_T_vGALHdD` | ✅ |
| **Cloudflare Worker** | `https://dvys-bot.votre-nom.workers.dev` | ✅ |
| **Postback** | `https://dvys-panel.onrender.com/postback.php` | ✅ |

### Prochaines étapes recommandées

1. **Testez toutes les fonctionnalités** du bot
2. **Personnalisez les images** dans le fichier `bot.js` (lignes 17-25)
3. **Modifiez les textes** des messages dans les traductions
4. **Ajoutez votre ID Telegram** dans la table `admin_users` de Supabase

---

## ❓ PROBLÈMES FRÉQUENTS

### Le bot ne répond pas
- Vérifiez que le webhook est bien configuré (étape 4.6)
- Vérifiez que le token dans `bot.js` est correct
- Redéployez le Worker sur Cloudflare

### Le panel affiche "Accès refusé"
- Vérifiez que le mot de passe dans l'URL est correct : `?pass=Wu9GYt_T_vGALHdD`
- Vérifiez que la variable `ADMIN_PASSWORD` est bien définie sur Render

### Le postback ne fonctionne pas
- Vérifiez l'URL dans 1Win Partners
- Vérifiez que les variables d'environnement `SUPABASE_URL` et `SUPABASE_KEY` sont correctes sur Render
- Consultez les logs sur Render (onglet "Logs")

---

## 📞 BESOIN D'AIDE ?

Si vous êtes bloqué :
1. Vérifiez les **logs** sur Render (onglet "Logs")
2. Vérifiez les **logs** sur Cloudflare (onglet "Logs")
3. Consultez la documentation officielle des services utilisés

---

**Guide créé le** : Mars 2026  
**Version** : 2.0 - 100% Manuel
