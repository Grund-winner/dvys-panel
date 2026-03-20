#!/bin/bash
# ============================================
# SCRIPT DE DÉPLOIEMENT DVYS BOT
# ============================================

set -e

echo "🚀 DVYS Bot - Script de déploiement"
echo "===================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier les dépendances
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 n'est pas installé${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ $1 est installé${NC}"
    return 0
}

echo ""
echo "📋 Vérification des dépendances..."
check_dependency "node" || exit 1
check_dependency "npm" || exit 1
check_dependency "git" || exit 1
check_dependency "wrangler" || echo -e "${YELLOW}⚠️  Wrangler non installé. Installation...${NC}"

# Installer Wrangler si nécessaire
if ! command -v wrangler &> /dev/null; then
    npm install -g wrangler
fi

# Vérifier la connexion Wrangler
echo ""
echo "🔐 Vérification de la connexion Cloudflare..."
wrangler whoami || {
    echo -e "${YELLOW}⚠️  Non connecté. Connexion en cours...${NC}"
    wrangler login
}

# Déployer le bot
echo ""
echo "☁️  Déploiement sur Cloudflare Workers..."
if [ -f "wrangler.toml" ]; then
    wrangler deploy
    echo -e "${GREEN}✅ Bot déployé!${NC}"
else
    echo -e "${YELLOW}⚠️  wrangler.toml non trouvé. Création...${NC}"
    cat > wrangler.toml << 'EOF'
name = "dvys-bot"
main = "bot.js"
compatibility_date = "2026-03-20"
EOF
    wrangler deploy
fi

# Afficher l'URL
echo ""
echo "🌐 Configuration du webhook Telegram..."
echo -e "${YELLOW}URL du bot: https://$(wrangler info | grep -oP '(?<=Worker Name: ).*').workers.dev${NC}"

echo ""
echo "📚 Prochaines étapes:"
echo "===================="
echo "1. Configurer les secrets:"
echo "   wrangler secret put BOT_TOKEN"
echo "   wrangler secret put SUPABASE_URL"
echo "   wrangler secret put SUPABASE_KEY"
echo ""
echo "2. Configurer le webhook Telegram:"
echo "   curl -X POST 'https://api.telegram.org/bot<VOTRE_TOKEN>/setWebhook' \\"
echo "     -d '{\"url\": \"https://<VOTRE_WORKER>.workers.dev/webhook\"}'"
echo ""
echo "3. Déployer le panel sur Render.com"
echo ""
echo -e "${GREEN}✨ Déploiement terminé!${NC}"
