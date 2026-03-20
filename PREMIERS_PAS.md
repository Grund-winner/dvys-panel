# 🚀 PREMIERS PAS - DVYS BOT

> Guide de démarrage rapide pour les non-développeurs

---

## 📦 QU'AVEZ-VOUS REÇU ?

Ce dossier contient **tout ce dont vous avez besoin** pour déployer votre bot DVYS. Voici ce que contient chaque fichier :

### 📄 Documents principaux

| Fichier | À quoi ça sert ? | Quand l'utiliser ? |
|---------|------------------|-------------------|
| **GUIDE_DEPLOIEMENT_100pct_MANUEL.md** | Guide complet étape par étape | ⭐ **COMMENCEZ PAR ICI** |
| **CHECKLIST_DEPLOIEMENT.md** | Liste de vérification pour ne rien oublier | Pendant le déploiement |
| **FICHES_TECHNIQUES.md** | Toutes les infos techniques importantes | Après le déploiement, pour référence |
| **PREMIERS_PAS.md** | Ce fichier - introduction rapide | Maintenant ! |

### 💻 Code source

| Fichier | À quoi ça sert ? | Où le mettre ? |
|---------|------------------|----------------|
| **bot.js** | Le code du bot Telegram | Cloudflare Workers |
| **supabase_schema.sql** | Structure de la base de données | Supabase (éditeur SQL) |

### 📁 Dossier `php-render/`

Ce dossier contient les fichiers pour le panel d'administration :

| Fichier | À quoi ça sert ? |
|---------|------------------|
| **config.php** | Configuration de la connexion à Supabase |
| **broadcast.php** | Panel admin (interface graphique) |
| **broadcast_worker.php** | Envoi des messages en masse |
| **get_progress.php** | Suivi des diffusions |
| **postback.php** | Réception des notifications 1Win |
| **composer.json** | Configuration PHP |
| **.htaccess** | Sécurité du site |

---

## 🎯 COMMENT DÉMARRER ?

### Étape 0 : Lire le guide principal
👉 Ouvrez le fichier **GUIDE_DEPLOIEMENT_100pct_MANUEL.md**

Ce guide contient **toutes les étapes détaillées** pour :
1. Créer votre base de données Supabase
2. Déployer le panel admin sur Render
3. Créer votre bot Telegram avec BotFather
4. Connecter le bot à Cloudflare Workers
5. Configurer le postback 1Win

### Étape 1 : Suivre la checklist
👉 Ouvrez le fichier **CHECKLIST_DEPLOIEMENT.md**

Cochez chaque case au fur et à mesure pour être sûr de ne rien oublier.

### Étape 2 : Conserver les infos techniques
👉 Ouvrez le fichier **FICHES_TECHNIQUES.md**

Ce document contient toutes les URLs, tokens et informations importantes à garder précieusement.

---

## 🗺️ SCHÉMA DU PROJET

```
┌─────────────────────────────────────────────────────────────┐
│                      VOTRE BOT DVYS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  TELEGRAM    │───▶│  CLOUDFLARE  │───▶│   SUPABASE   │  │
│  │    (Bot)     │    │   (Worker)   │    │   (BDD)      │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   ▲          │
│         │                   │                   │          │
│         │            ┌──────▼──────┐            │          │
│         │            │   RENDER    │────────────┘          │
│         │            │  (Panel +   │                       │
│         │            │  Postback)  │                       │
│         │            └──────┬──────┘                       │
│         │                   │                              │
│         └───────────────────▶│                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │  1WIN        │                      │
│                       │  (Postback)  │                      │
│                       └──────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ DÉPLOIEMENT RAPIDE (Résumé)

### 1. Supabase (15 min)
- Créez un compte sur https://supabase.com
- Créez un projet nommé `dvys-bot`
- Exécutez le fichier `supabase_schema.sql` dans l'éditeur SQL
- Notez l'URL et la clé API

### 2. Render (15 min)
- Créez un compte sur https://render.com
- Connectez votre dépôt GitHub
- Créez un Web Service PHP
- Ajoutez les variables d'environnement
- Notez l'URL du service

### 3. Telegram (10 min)
- Ouvrez @BotFather sur Telegram
- Créez un nouveau bot
- Notez le token reçu

### 4. Cloudflare (15 min)
- Créez un compte sur https://workers.cloudflare.com
- Créez un Worker nommé `dvys-bot`
- Copiez le code de `bot.js`
- Remplacez le token par celui de BotFather
- Configurez le webhook

### 5. 1Win (10 min)
- Connectez-vous à https://1win-partners.com
- Ajoutez 2 postbacks (registration et deposit)
- Utilisez l'URL de votre service Render

**⏱️ Temps total estimé : 65 minutes**

---

## 📱 CE QUE VOUS POURREZ FAIRE APRÈS

### Avec le bot Telegram
- ✅ Les utilisateurs pourront démarrer le bot avec `/start`
- ✅ Ils devront rejoindre votre canal @dvyschan
- ✅ Ils pourront choisir parmi 10 langues
- ✅ Ils pourront s'inscrire sur 1Win via votre lien
- ✅ Le bot vérifiera automatiquement les inscriptions et dépôts

### Avec le panel admin
- 📊 Voir le nombre total de membres
- 📊 Voir combien sont inscrits sur 1Win
- 📊 Voir combien ont fait un dépôt
- 📢 Envoyer des messages à tous les membres
- 📢 Envoyer des messages uniquement aux inscrits
- 📢 Envoyer des messages uniquement aux déposants
- 👥 Voir la liste complète des membres
- 📜 Voir l'historique des envois

### Avec le postback 1Win
- 🔄 Les inscriptions sont automatiquement détectées
- 🔄 Les dépôts sont automatiquement détectés
- 🔄 Les statistiques se mettent à jour en temps réel

---

## 🆘 BESOIN D'AIDE ?

### Problèmes courants

**Le bot ne répond pas ?**
- Vérifiez que le webhook est bien configuré
- Vérifiez que le token dans `bot.js` est correct
- Redéployez le Worker sur Cloudflare

**Le panel ne s'affiche pas ?**
- Vérifiez que le mot de passe dans l'URL est correct
- Attendez 30 secondes (Render peut être lent au démarrage)
- Vérifiez les variables d'environnement

**Les postbacks ne fonctionnent pas ?**
- Vérifiez l'URL dans 1Win Partners
- Vérifiez que Supabase est bien configuré
- Consultez les logs sur Render

### Où trouver de l'aide ?

1. **Relisez le guide** : `GUIDE_DEPLOIEMENT_100pct_MANUEL.md`
2. **Vérifiez la checklist** : `CHECKLIST_DEPLOIEMENT.md`
3. **Consultez les fiches techniques** : `FICHES_TECHNIQUES.md`
4. **Vérifiez les logs** :
   - Sur Render : Dashboard > Logs
   - Sur Cloudflare : Dashboard > Workers > Logs
   - Sur Supabase : Dashboard > Logs

---

## 💡 CONSEILS

### Avant de commencer
- ⏰ Prévoyez **1 heure** de temps libre
- 📱 Ayez votre téléphone à portée (pour Telegram)
- 📧 Ayez accès à votre email (pour les vérifications)
- 📝 Ayez un bloc-notes pour noter les informations importantes

### Pendant le déploiement
- ✅ Suivez la checklist étape par étape
- 🔄 Ne sautez aucune étape
- 💾 Copiez-collez les valeurs (ne les tapez pas à la main)
- 🧪 Testez chaque étape avant de passer à la suivante

### Après le déploiement
- 🔒 Gardez les fichiers techniques en lieu sûr
- 📝 Notez vos URLs et tokens
- 📅 Prévoyez de vérifier le fonctionnement régulièrement
- 💾 Faites des sauvegardes de votre base de données

---

## 📞 CONTACTS UTILES

### Services utilisés
| Service | Site | Support |
|---------|------|---------|
| Supabase | https://supabase.com | https://supabase.com/support |
| Render | https://render.com | https://render.com/docs |
| Cloudflare | https://cloudflare.com | https://support.cloudflare.com |
| Telegram | https://telegram.org | @BotFather |
| 1Win | https://1win-partners.com | Contact affilié |

---

## ✅ PRÊT À COMMENCER ?

1. Ouvrez **GUIDE_DEPLOIEMENT_100pct_MANUEL.md**
2. Suivez les étapes une par une
3. Cochez la checklist au fur et à mesure
4. Testez votre bot à la fin

**Bonne chance ! 🚀**

---

**Version** : 2.0  
**Date** : Mars 2026  
**Pour** : Utilisateurs non-développeurs
