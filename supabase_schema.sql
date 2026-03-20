-- ============================================
-- SCHÉMA SUPABASE - BOT TELEGRAM DVYS
-- ============================================
-- Ce schéma crée toutes les tables nécessaires pour le bot
-- Exécuter dans l'éditeur SQL de Supabase Dashboard

-- ============================================
-- 1. TABLE PRINCIPALE : users
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    language VARCHAR(10) DEFAULT 'fr' CHECK (language IN ('fr', 'en', 'es', 'pt', 'ru', 'hi', 'uz', 'az', 'tr', 'ar')),
    channel_joined BOOLEAN DEFAULT FALSE,
    isregistered VARCHAR(10) DEFAULT 'no',
    isdeposit VARCHAR(10) DEFAULT 'no',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

-- Commentaires sur la table
COMMENT ON TABLE public.users IS 'Table principale des utilisateurs du bot';
COMMENT ON COLUMN public.users.user_id IS 'ID Telegram unique de l''utilisateur';
COMMENT ON COLUMN public.users.language IS 'Langue préférée (fr, en, es, pt, ru, ar)';
COMMENT ON COLUMN public.users.channel_joined IS 'L''utilisateur a rejoint le canal requis';
COMMENT ON COLUMN public.users.isregistered IS 'Statut d''inscription sur 1Win (yes/no)';
COMMENT ON COLUMN public.users.isdeposit IS 'Statut de dépôt sur 1Win (yes/no)';

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_users_user_id ON public.users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_language ON public.users(language);
CREATE INDEX IF NOT EXISTS idx_users_isregistered ON public.users(isregistered);
CREATE INDEX IF NOT EXISTS idx_users_isdeposit ON public.users(isdeposit);
CREATE INDEX IF NOT EXISTS idx_users_channel_joined ON public.users(channel_joined);

-- ============================================
-- 2. TABLE : message_history
-- ============================================
CREATE TABLE IF NOT EXISTS public.message_history (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    chat_id BIGINT NOT NULL,
    message_id BIGINT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'photo',
    content TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auto_delete_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN DEFAULT FALSE
);

COMMENT ON TABLE public.message_history IS 'Historique des messages envoyés pour auto-suppression';

CREATE INDEX IF NOT EXISTS idx_message_history_user_id ON public.message_history(user_id);
CREATE INDEX IF NOT EXISTS idx_message_history_auto_delete ON public.message_history(auto_delete_at) WHERE is_deleted = FALSE;

-- ============================================
-- 3. TABLE : postback_logs
-- ============================================
CREATE TABLE IF NOT EXISTS public.postback_logs (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    data JSONB,
    ip_address INET,
    user_agent TEXT,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed BOOLEAN DEFAULT FALSE
);

COMMENT ON TABLE public.postback_logs IS 'Logs des postbacks reçus de 1Win';

CREATE INDEX IF NOT EXISTS idx_postback_logs_user_id ON public.postback_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_postback_logs_event ON public.postback_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_postback_logs_received ON public.postback_logs(received_at);

-- ============================================
-- 4. TABLE : broadcast_logs
-- ============================================
CREATE TABLE IF NOT EXISTS public.broadcast_logs (
    id SERIAL PRIMARY KEY,
    broadcast_id VARCHAR(100) UNIQUE NOT NULL,
    filter_type VARCHAR(50) DEFAULT 'all',
    message_type VARCHAR(50) DEFAULT 'text',
    total_users INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    message_content TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'running',
    initiated_by VARCHAR(255)
);

COMMENT ON TABLE public.broadcast_logs IS 'Logs des diffusions envoyées';

CREATE INDEX IF NOT EXISTS idx_broadcast_logs_status ON public.broadcast_logs(status);
CREATE INDEX IF NOT EXISTS idx_broadcast_logs_broadcast_id ON public.broadcast_logs(broadcast_id);

-- ============================================
-- 5. TABLE : user_sessions
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id SERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    current_menu VARCHAR(100) DEFAULT 'start',
    last_message_id BIGINT,
    session_data JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.user_sessions IS 'Sessions utilisateurs pour la navigation';

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);

-- ============================================
-- 6. TABLE : admin_users
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id SERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    username VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE public.admin_users IS 'Administrateurs du panel';

-- ============================================
-- 7. FONCTION : Mise à jour automatique updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour users
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour user_sessions
DROP TRIGGER IF EXISTS update_sessions_updated_at ON public.user_sessions;
CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON public.user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. FONCTION : Nettoyage auto des anciens messages
-- ============================================
CREATE OR REPLACE FUNCTION cleanup_old_messages()
RETURNS void AS $$
BEGIN
    -- Marquer comme supprimés les messages de plus de 24h
    UPDATE public.message_history
    SET is_deleted = TRUE
    WHERE auto_delete_at < NOW() AND is_deleted = FALSE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. POLITIQUES RLS (Row Level Security)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.postback_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Politique pour users (lecture/écriture anonyme pour le bot)
DROP POLICY IF EXISTS "Allow anonymous access" ON public.users;
CREATE POLICY "Allow anonymous access"
    ON public.users
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Politique pour message_history
DROP POLICY IF EXISTS "Allow anonymous access message_history" ON public.message_history;
CREATE POLICY "Allow anonymous access message_history"
    ON public.message_history
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Politique pour postback_logs
DROP POLICY IF EXISTS "Allow anonymous access postback_logs" ON public.postback_logs;
CREATE POLICY "Allow anonymous access postback_logs"
    ON public.postback_logs
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Politique pour broadcast_logs
DROP POLICY IF EXISTS "Allow anonymous access broadcast_logs" ON public.broadcast_logs;
CREATE POLICY "Allow anonymous access broadcast_logs"
    ON public.broadcast_logs
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Politique pour user_sessions
DROP POLICY IF EXISTS "Allow anonymous access user_sessions" ON public.user_sessions;
CREATE POLICY "Allow anonymous access user_sessions"
    ON public.user_sessions
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- Politique pour admin_users
DROP POLICY IF EXISTS "Allow anonymous access admin_users" ON public.admin_users;
CREATE POLICY "Allow anonymous access admin_users"
    ON public.admin_users
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- ============================================
-- 10. DONNÉES INITIALES
-- ============================================

-- Insérer l'administrateur principal (remplacer YOUR_TELEGRAM_ID)
-- INSERT INTO public.admin_users (user_id, username, role) 
-- VALUES (YOUR_TELEGRAM_ID, 'admin', 'superadmin');

-- ============================================
-- 11. VUES POUR STATISTIQUES
-- ============================================

-- Vue des statistiques globales
CREATE OR REPLACE VIEW public.stats_overview AS
SELECT
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE channel_joined = TRUE) as joined_users,
    COUNT(*) FILTER (WHERE isregistered = 'yes') as registered_users,
    COUNT(*) FILTER (WHERE isdeposit = 'yes') as deposit_users,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as new_users_24h,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as new_users_7d
FROM public.users;

-- Vue des statistiques par langue
CREATE OR REPLACE VIEW public.stats_by_language AS
SELECT
    language,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE isregistered = 'yes') as registered,
    COUNT(*) FILTER (WHERE isdeposit = 'yes') as deposited
FROM public.users
GROUP BY language;

-- ============================================
-- FIN DU SCHÉMA
-- ============================================
