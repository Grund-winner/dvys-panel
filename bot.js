// ============================================
// BOT TELEGRAM - DVYS PRO
// Cloudflare Workers - Version Multilingue
// Support: 10 langues selon captures écran
// ============================================

const CONFIG = {
    BOT_TOKEN: "8608984092:AAFMpElCmpTFMZAKj4tsBSBQ26n7F3z0zRQ",
    SUPABASE_URL: "https://fpcioaiiykttexprlkpz.supabase.co",
    SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY2lvYWlpeWt0dGV4cHJsa3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDIyMzksImV4cCI6MjA4ODMxODIzOX0.WIX1TmE3ELKNqISp9jE4QYtQ3GFFf7N37hKVkO20_NI",
    CHANNEL_ID: "@dvyschan",
    CHANNEL_LINK: "https://t.me/dvyschan",
    ONE_WIN_DOMAIN: "https://1wrlst.com",
    AFFILIATE_CODE: "4tqh",
    PREDICTION_URL: "https://votre-site.com/prediction",
    AUTO_DELETE_MINUTES: 0,
    IMAGES: {
        start: "https://t.me/Ddvys/3",
        menu: "https://t.me/Ddvys/10",
        language: "https://i.ibb.co/qL3xFbP2/wl.jpg",
        register: "https://t.me/Ddvys/11",
        instructions: "https://t.me/Ddvys/9",
        deposit: "https://t.me/Ddvys/12",
        signal: "https://t.me/Ddvys/11"
    }
};

// ============================================
// TRADUCTIONS - 10 LANGUES
// ============================================
const TRANSLATIONS = {
    fr: {
        flag: "🇫🇷",
        name: "Français",
        start_msg: "👋 Bienvenue sur le Bot <b>DVYS</b> !\n\nRejoignez notre canal officiel pour commencer.",
        join_channel: "📢 Rejoindre",
        check_membership: "✅ Vérifier",
        not_member: "❌ Veuillez rejoindre le canal d'abord.",
        main_menu: "📊 <b>Menu Principal</b>\n\nChoisissez une option :",
        btn_register: "📱 Inscription",
        btn_instructions: "📚 Instruction",
        btn_get_signal: "⚜️ OBTENIR LE SIGNAL ⚜️",
        btn_predictions: "🔮 Prédictions",
        btn_language: "🌐 Choisir la langue",
        register_msg: "📝 <b>Inscription</b>\n\n⚠️ <b>Erreur : Non finalisée !</b>\n\n1. Cliquez sur s'inscrire.\n2. Utilisez le code promo : <b>DVYS</b>.\n3. Attendez la notification.",
        register_btn: "📝 S'inscrire",
        instructions_msg: "📖 <b>Comment ça marche ?</b>\n\nNos membres gagnent <b>15% à 25%</b> par jour !\n\n● 1. <b>Inscrivez-vous</b> sur 1WIN.\n● 2. Utilisez le code promo : <b>DVYS</b>.\n● 3. <b>Rechargez</b> votre compte.\n● 4. <b>Suivez</b> les signaux du bot.\n\n⚠️ Sans code promo <b>DVYS</b>, pas d'accès aux signaux.",
        not_registered: "⚠️ <b>Non inscrit</b>\n\nInscrivez-vous avec le code promo : <b>DVYS</b> via le lien ci-dessous.",
        deposit_required: "💰 <b>Dépôt requis</b>\n\nDéposez au moins <b>10 $</b> pour accéder aux signaux.",
        access_granted: "✨ <b>Accès accordé !</b>\n\nInscription et dépôt confirmés. Prêt pour les signaux.",
        predictions_msg: "🔮 <b>Prédictions en direct</b>\n\nAccédez à nos prédictions en temps réel pour maximiser vos gains !",
        predictions_btn: "🔮 Voir les prédictions",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Bienvenue à nouveau !"
    },
    en: {
        flag: "🇬🇧",
        name: "English",
        start_msg: "👋 Welcome to <b>DVYS</b> Bot!\n\nJoin our official channel to get started.",
        join_channel: "📢 Join",
        check_membership: "✅ Verify",
        not_member: "❌ Please join the channel first.",
        main_menu: "📊 <b>Main Menu</b>\n\nChoose an option:",
        btn_register: "📱 Registration",
        btn_instructions: "📚 Instruction",
        btn_get_signal: "⚜️ GET THE SIGNAL ⚜️",
        btn_predictions: "🔮 Predictions",
        btn_language: "🌐 Choose language",
        register_msg: "📝 <b>Registration</b>\n\n⚠️ <b>Error: Not completed!</b>\n\n1. Click to register.\n2. Use promo code: <b>DVYS</b>.\n3. Wait for notification.",
        register_btn: "📝 Register Now",
        instructions_msg: "📖 <b>How does it work?</b>\n\nOur members earn <b>15% to 25%</b> per day!\n\n● 1. <b>Register</b> on 1WIN.\n● 2. Use promo code: <b>DVYS</b>.\n● 3. <b>Deposit</b> to your account.\n● 4. <b>Follow</b> bot signals.\n\n⚠️ Without promo code <b>DVYS</b>, no signal access.",
        not_registered: "⚠️ <b>Not Registered</b>\n\nRegister with promo code: <b>DVYS</b> via the link below.",
        deposit_required: "💰 <b>Deposit Required</b>\n\nDeposit at least <b>$10</b> to access signals.",
        access_granted: "✨ <b>Access Granted!</b>\n\nRegistration and deposit confirmed. Ready for signals.",
        predictions_msg: "🔮 <b>Live Predictions</b>\n\nAccess our real-time predictions to maximize your earnings!",
        predictions_btn: "🔮 View Predictions",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Welcome back!"
    },
    es: {
        flag: "🇪🇸",
        name: "Español",
        start_msg: "👋 ¡Bienvenido al Bot <b>DVYS</b>!\n\nÚnete a nuestro canal oficial para comenzar.",
        join_channel: "📢 Unirse",
        check_membership: "✅ Verificar",
        not_member: "❌ Por favor, únete al canal primero.",
        main_menu: "📊 <b>Menú Principal</b>\n\nElige una opción:",
        btn_register: "📱 Registro",
        btn_instructions: "📚 Instrucción",
        btn_get_signal: "⚜️ OBTENER LA SEÑAL ⚜️",
        btn_predictions: "🔮 Predicciones",
        btn_language: "🌐 Elegir idioma",
        register_msg: "📝 <b>Registro</b>\n\n⚠️ <b>Error: ¡No completado!</b>\n\n1. Haz clic para registrarte.\n2. Usa el código promocional: <b>DVYS</b>.\n3. Espera la notificación.",
        register_btn: "📝 Registrarse",
        instructions_msg: "📖 <b>¿Cómo funciona?</b>\n\n¡Nuestros miembros ganan <b>15% a 25%</b> por día!\n\n● 1. <b>Regístrate</b> en 1WIN.\n● 2. Usa el código promocional: <b>DVYS</b>.\n● 3. <b>Recarga</b> tu cuenta.\n● 4. <b>Sigue</b> las señales del bot.\n\n⚠️ Sin código promocional <b>DVYS</b>, no hay acceso a señales.",
        not_registered: "⚠️ <b>No Registrado</b>\n\nRegístrate con el código promocional: <b>DVYS</b> mediante el enlace de abajo.",
        deposit_required: "💰 <b>Depósito Requerido</b>\n\nDeposita al menos <b>10 $</b> para acceder a las señales.",
        access_granted: "✨ <b>¡Acceso Concedido!</b>\n\nRegistro y depósito confirmados. Listo para las señales.",
        predictions_msg: "🔮 <b>Predicciones en Vivo</b>\n\n¡Accede a nuestras predicciones en tiempo real para maximizar tus ganancias!",
        predictions_btn: "🔮 Ver Predicciones",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 ¡Bienvenido de nuevo!"
    },
    pt: {
        flag: "🇧🇷",
        name: "Brazilian",
        start_msg: "👋 Bem-vindo ao Bot <b>DVYS</b>!\n\nJunte-se ao nosso canal oficial para começar.",
        join_channel: "📢 Juntar-se",
        check_membership: "✅ Verificar",
        not_member: "❌ Por favor, junte-se ao canal primeiro.",
        main_menu: "📊 <b>Menu Principal</b>\n\nEscolha uma opção:",
        btn_register: "📱 Registro",
        btn_instructions: "📚 Instrução",
        btn_get_signal: "⚜️ OBTER O SINAL ⚜️",
        btn_predictions: "🔮 Previsões",
        btn_language: "🌐 Escolher idioma",
        register_msg: "📝 <b>Registro</b>\n\n⚠️ <b>Erro: Não concluído!</b>\n\n1. Clique para se registrar.\n2. Use o código promocional: <b>DVYS</b>.\n3. Aguarde a notificação.",
        register_btn: "📝 Registrar",
        instructions_msg: "📖 <b>Como funciona?</b>\n\nNossos membros ganham <b>15% a 25%</b> por dia!\n\n● 1. <b>Registre-se</b> na 1WIN.\n● 2. Use o código promocional: <b>DVYS</b>.\n● 3. <b>Deposite</b> na sua conta.\n● 4. <b>Siga</b> os sinais do bot.\n\n⚠️ Sem código promocional <b>DVYS</b>, sem acesso aos sinais.",
        not_registered: "⚠️ <b>Não Registrado</b>\n\nRegistre-se com o código promocional: <b>DVYS</b> através do link abaixo.",
        deposit_required: "💰 <b>Depósito Necessário</b>\n\nDeposite pelo menos <b>$10</b> para acessar os sinais.",
        access_granted: "✨ <b>Acesso Concedido!</b>\n\nRegistro e depósito confirmados. Pronto para os sinais.",
        predictions_msg: "🔮 <b>Previsões ao Vivo</b>\n\nAcesse nossas previsões em tempo real para maximizar seus ganhos!",
        predictions_btn: "🔮 Ver Previsões",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Bem-vindo de volta!"
    },
    ru: {
        flag: "🇷🇺",
        name: "Русский",
        start_msg: "👋 Добро пожаловать в бот <b>DVYS</b>!\n\nПрисоединяйтесь к нашему официальному каналу, чтобы начать.",
        join_channel: "📢 Присоединиться",
        check_membership: "✅ Проверить",
        not_member: "❌ Пожалуйста, сначала присоединитесь к каналу.",
        main_menu: "📊 <b>Главное Меню</b>\n\nВыберите опцию:",
        btn_register: "📱 Регистрация",
        btn_instructions: "📚 Инструкция",
        btn_get_signal: "⚜️ ПОЛУЧИТЬ СИГНАЛ ⚜️",
        btn_predictions: "🔮 Прогнозы",
        btn_language: "🌐 Выбрать язык",
        register_msg: "📝 <b>Регистрация</b>\n\n⚠️ <b>Ошибка: Не завершено!</b>\n\n1. Нажмите для регистрации.\n2. Используйте промокод: <b>DVYS</b>.\n3. Дождитесь уведомления.",
        register_btn: "📝 Зарегистрироваться",
        instructions_msg: "📖 <b>Как это работает?</b>\n\nНаши участники зарабатывают <b>от 15% до 25%</b> в день!\n\n● 1. <b>Зарегистрируйтесь</b> на 1WIN.\n● 2. Используйте промокод: <b>DVYS</b>.\n● 3. <b>Пополните</b> свой счет.\n● 4. <b>Следуйте</b> сигналам бота.\n\n⚠️ Без промокода <b>DVYS</b> нет доступа к сигналам.",
        not_registered: "⚠️ <b>Не Зарегистрирован</b>\n\nЗарегистрируйтесь с промокодом: <b>DVYS</b> по ссылке ниже.",
        deposit_required: "💰 <b>Требуется Депозит</b>\n\nВнесите минимум <b>10 $</b> для доступа к сигналам.",
        access_granted: "✨ <b>Доступ Предоставлен!</b>\n\nРегистрация и депозит подтверждены. Готовы к сигналам.",
        predictions_msg: "🔮 <b>Прогнозы в Реальном Времени</b>\n\nПолучите доступ к нашим прогнозам в реальном времени для максимизации вашего дохода!",
        predictions_btn: "🔮 Смотреть Прогнозы",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 С возвращением!"
    },
    hi: {
        flag: "🇮🇳",
        name: "हिंदी",
        start_msg: "👋 <b>DVYS</b> बॉट में आपका स्वागत है!\n\nशुरू करने के लिए हमारे आधिकारिक चैनल से जुड़ें।",
        join_channel: "📢 जुड़ें",
        check_membership: "✅ सत्यापित करें",
        not_member: "❌ कृपया पहले चैनल से जुड़ें।",
        main_menu: "📊 <b>मुख्य मेनू</b>\n\nएक विकल्प चुनें:",
        btn_register: "📱 पंजीकरण",
        btn_instructions: "📚 निर्देश",
        btn_get_signal: "⚜️ सिग्नल प्राप्त करें ⚜️",
        btn_predictions: "🔮 भविष्यवाणियाँ",
        btn_language: "🌐 भाषा चुनें",
        register_msg: "📝 <b>पंजीकरण</b>\n\n⚠️ <b>त्रुटि: पूरा नहीं हुआ!</b>\n\n1. पंजीकरण के लिए क्लिक करें।\n2. प्रोमो कोड का उपयोग करें: <b>DVYS</b>।\n3. अधिसूचना की प्रतीक्षा करें।",
        register_btn: "📝 अभी पंजीकरण करें",
        instructions_msg: "📖 <b>यह कैसे काम करता है?</b>\n\nहमारे सदस्य प्रति दिन <b>15% से 25%</b> कमाते हैं!\n\n● 1. 1WIN पर <b>पंजीकरण</b> करें।\n● 2. प्रोमो कोड का उपयोग करें: <b>DVYS</b>।\n● 3. अपने खाते में <b>जमा</b> करें।\n● 4. बॉट सिग्नल का <b>पालन</b> करें।\n\n⚠️ बिना प्रोमो कोड <b>DVYS</b> के कोई सिग्नल एक्सेस नहीं।",
        not_registered: "⚠️ <b>पंजीकृत नहीं</b>\n\nनीचे दिए गए लिंक के माध्यम से प्रोमो कोड <b>DVYS</b> के साथ पंजीकरण करें।",
        deposit_required: "💰 <b>जमा आवश्यक</b>\n\nसिग्नल तक पहुंच के लिए कम से कम <b>₹800</b> जमा करें।",
        access_granted: "✨ <b>पहुंच प्रदान की गई!</b>\n\nपंजीकरण और जमा की पुष्टि हो गई। सिग्नल के लिए तैयार।",
        predictions_msg: "🔮 <b>लाइव भविष्यवाणियाँ</b>\n\nअपनी कमाई को अधिकतम करने के लिए हमारी रीयल-टाइम भविष्यवाणियों तक पहुंच प्राप्त करें!",
        predictions_btn: "🔮 भविष्यवाणियाँ देखें",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 वापसी पर स्वागत है!"
    },
    uz: {
        flag: "🇺🇿",
        name: "O'zbek",
        start_msg: "👋 <b>DVYS</b> botiga xush kelibsiz!\n\nBoshlash uchun rasmiy kanalimizga qo'shiling.",
        join_channel: "📢 Qo'shilish",
        check_membership: "✅ Tekshirish",
        not_member: "❌ Iltimos, avval kanalga qo'shiling.",
        main_menu: "📊 <b>Asosiy Menyu</b>\n\nVariant tanlang:",
        btn_register: "📱 Ro'yxatdan o'tish",
        btn_instructions: "📚 Ko'rsatma",
        btn_get_signal: "⚜️ SIGNAL OLISH ⚜️",
        btn_predictions: "🔮 Bashoratlar",
        btn_language: "🌐 Til tanlash",
        register_msg: "📝 <b>Ro'yxatdan o'tish</b>\n\n⚠️ <b>Xato: Tugallanmadi!</b>\n\n1. Ro'yxatdan o'tish uchun bosing.\n2. Promo kodni ishlating: <b>DVYS</b>.\n3. Xabarnomani kuting.",
        register_btn: "📝 Ro'yxatdan o'tish",
        instructions_msg: "📖 <b>Qanday ishlaydi?</b>\n\nBizning a'zolarimiz kuniga <b>15% dan 25% gacha</b> ishlaydi!\n\n● 1. 1WIN da <b>ro'yxatdan o'ting</b>.\n● 2. Promo kodni ishlating: <b>DVYS</b>.\n● 3. Hisobingizga <b>to'ldiring</b>.\n● 4. Bot signallarini <b>kuzating</b>.\n\n⚠️ Promo kod <b>DVYS</b> siz signalga kirish yo'q.",
        not_registered: "⚠️ <b>Ro'yxatdan o'tmagan</b>\n\nQuyidagi havola orqali promo kod <b>DVYS</b> bilan ro'yxatdan o'ting.",
        deposit_required: "💰 <b>Depozit talab qilinadi</b>\n\nSignallarga kirish uchun kamida <b>10 $</b> depozit qiling.",
        access_granted: "✨ <b>Kirish berildi!</b>\n\nRo'yxatdan o'tish va depozit tasdiqlandi. Signallar uchun tayyor.",
        predictions_msg: "🔮 <b>Jonli Bashoratlar</b>\n\nDaromadingizni maksimal darajada oshirish uchun jonli bashoratlarimizga kiring!",
        predictions_btn: "🔮 Bashoratlarni ko'rish",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Qaytib kelganingiz bilan!"
    },
    az: {
        flag: "🇦🇿",
        name: "Azərbaycan",
        start_msg: "👋 <b>DVYS</b> botuna xoş gəlmisiniz!\n\nBaşlamaq üçün rəsmi kanalımıza qoşulun.",
        join_channel: "📢 Qoşul",
        check_membership: "✅ Yoxla",
        not_member: "❌ Zəhmət olmasa, əvvəlcə kanala qoşulun.",
        main_menu: "📊 <b>Əsas Menyu</b>\n\nBir variant seçin:",
        btn_register: "📱 Qeydiyyat",
        btn_instructions: "📚 Təlimat",
        btn_get_signal: "⚜️ SİQNAL AL ⚜️",
        btn_predictions: "🔮 Proqnozlar",
        btn_language: "🌐 Dil seç",
        register_msg: "📝 <b>Qeydiyyat</b>\n\n⚠️ <b>Xəta: Tamamlanmadı!</b>\n\n1. Qeydiyyat üçün klikləyin.\n2. Promo kod istifadə edin: <b>DVYS</b>.\n3. Bildirişi gözləyin.",
        register_btn: "📝 İndi qeydiyyatdan keç",
        instructions_msg: "📖 <b>Necə işləyir?</b>\n\nÜzvlərimiz gündə <b>15% ilə 25%</b> qazanır!\n\n● 1. 1WIN-də <b>qeydiyyatdan keçin</b>.\n● 2. Promo kod istifadə edin: <b>DVYS</b>.\n● 3. Hesabınıza <b>depozit qoyun</b>.\n● 4. Bot siqnallarını <b>izləyin</b>.\n\n⚠️ Promo kod <b>DVYS</b> olmadan siqnal girişi yoxdur.",
        not_registered: "⚠️ <b>Qeydiyyatdan Keçməyib</b>\n\nAşağıdakı link vasitəsilə promo kod <b>DVYS</b> ilə qeydiyyatdan keçin.",
        deposit_required: "💰 <b>Depozit Tələb Olunur</b>\n\nSiqnallara giriş üçün ən azı <b>10 $</b> depozit qoyun.",
        access_granted: "✨ <b>Giriş Verildi!</b>\n\nQeydiyyat və depozit təsdiq edildi. Siqnallara hazır.",
        predictions_msg: "🔮 <b>Canlı Proqnozlar</b>\n\nQazancınızı maksimuma çatdırmaq üçün real vaxt proqnozlarımıza daxil olun!",
        predictions_btn: "🔮 Proqnozlara bax",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Yenidən xoş gəlmisiniz!"
    },
    tr: {
        flag: "🇹🇷",
        name: "Türkçe",
        start_msg: "👋 <b>DVYS</b> Botuna hoş geldiniz!\n\nBaşlamak için resmi kanalımıza katılın.",
        join_channel: "📢 Katıl",
        check_membership: "✅ Doğrula",
        not_member: "❌ Lütfen önce kanala katılın.",
        main_menu: "📊 <b>Ana Menü</b>\n\nBir seçenek seçin:",
        btn_register: "📱 Kayıt",
        btn_instructions: "📚 Talimat",
        btn_get_signal: "⚜️ SİNYALİ AL ⚜️",
        btn_predictions: "🔮 Tahminler",
        btn_language: "🌐 Dil seç",
        register_msg: "📝 <b>Kayıt</b>\n\n⚠️ <b>Hata: Tamamlanmadı!</b>\n\n1. Kayıt olmak için tıklayın.\n2. Promosyon kodunu kullanın: <b>DVYS</b>.\n3. Bildirimi bekleyin.",
        register_btn: "📝 Şimdi Kaydol",
        instructions_msg: "📖 <b>Nasıl çalışır?</b>\n\nÜyelerimiz günde <b>%15 ile %25</b> kazanıyor!\n\n● 1. 1WIN'e <b>kaydolun</b>.\n● 2. Promosyon kodunu kullanın: <b>DVYS</b>.\n● 3. Hesabınıza <b>para yatırın</b>.\n● 4. Bot sinyallerini <b>takip edin</b>.\n\n⚠️ Promosyon kodu <b>DVYS</b> olmadan sinyal erişimi yoktur.",
        not_registered: "⚠️ <b>Kayıtlı Değil</b>\n\nAşağıdaki bağlantıdan promosyon kodu <b>DVYS</b> ile kaydolun.",
        deposit_required: "💰 <b>Depozito Gerekli</b>\n\nSinyallere erişmek için en az <b>10 $</b> yatırın.",
        access_granted: "✨ <b>Erişim Verildi!</b>\n\nKayıt ve depozito onaylandı. Sinyaller için hazır.",
        predictions_msg: "🔮 <b>Canlı Tahminler</b>\n\nKazancınızı maksimize etmek için gerçek zamanlı tahminlerimize erişin!",
        predictions_btn: "🔮 Tahminleri Gör",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 Tekrar hoş geldiniz!"
    },
    ar: {
        flag: "🇸🇦",
        name: "العربية",
        start_msg: "👋 مرحباً بك في بوت <b>DVYS</b>!\n\nانضم إلى قناتنا الرسمية للبدء.",
        join_channel: "📢 انضمام",
        check_membership: "✅ تحقق",
        not_member: "❌ يرجى الانضمام إلى القناة أولاً.",
        main_menu: "📊 <b>القائمة الرئيسية</b>\n\nاختر خياراً:",
        btn_register: "📱 تسجيل",
        btn_instructions: "📚 تعليمات",
        btn_get_signal: "⚜️ احصل على الإشارة ⚜️",
        btn_predictions: "🔮 تنبؤات",
        btn_language: "🌐 اختر اللغة",
        register_msg: "📝 <b>التسجيل</b>\n\n⚠️ <b>خطأ: لم يكتمل!</b>\n\n1. انقر للتسجيل.\n2. استخدم رمز الترويج: <b>DVYS</b>.\n3. انتظر الإشعار.",
        register_btn: "📝 سجل الآن",
        instructions_msg: "📖 <b>كيف يعمل؟</b>\n\nأعضاؤنا يكسبون <b>15% إلى 25%</b> يومياً!\n\n● 1. <b>سجل</b> على 1WIN.\n● 2. استخدم رمز الترويج: <b>DVYS</b>.\n● 3. <b>أودع</b> في حسابك.\n● 4. <b>اتبع</b> إشارات البوت.\n\n⚠️ بدون رمز الترويج <b>DVYS</b>، لا يوجد وصول للإشارات.",
        not_registered: "⚠️ <b>غير مسجل</b>\n\nسجل برمز الترويج: <b>DVYS</b> عبر الرابط أدناه.",
        deposit_required: "💰 <b>الإيداع مطلوب</b>\n\nأودع على الأقل <b>10$</b> للوصول للإشارات.",
        access_granted: "✨ <b>تم منح الوصول!</b>\n\nتم تأكيد التسجيل والإيداع. جاهز للإشارات.",
        predictions_msg: "🔮 <b>التوقعات المباشرة</b>\n\nاحصل على توقعاتنا الفورية لتعظيم أرباحك!",
        predictions_btn: "🔮 عرض التوقعات",
        select_language: "🌐 Please select your language:",
        back: "← Back",
        welcome_back: "🎉 مرحباً بعودتك!"
    }
};

// ============================================
// API TELEGRAM
// ============================================
async function telegramAPI(method, data) {
    const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/${method}`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

// ============================================
// SUPABASE
// ============================================
async function supabaseQuery(table, filters = {}) {
    let url = `${CONFIG.SUPABASE_URL}/rest/v1/${table}`;
    const params = Object.entries(filters).map(([k, v]) => `${k}=eq.${v}`).join("&");
    if (params) url += `?${params}`;

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${CONFIG.SUPABASE_KEY}`,
            "apikey": CONFIG.SUPABASE_KEY
        }
    });
    return response.json();
}

async function supabaseInsert(table, data) {
    const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${CONFIG.SUPABASE_KEY}`,
            "apikey": CONFIG.SUPABASE_KEY,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

async function supabaseUpdate(table, data, filters = {}) {
    let url = `${CONFIG.SUPABASE_URL}/rest/v1/${table}`;
    const params = Object.entries(filters).map(([k, v]) => `${k}=eq.${v}`).join("&");
    if (params) url += `?${params}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${CONFIG.SUPABASE_KEY}`,
            "apikey": CONFIG.SUPABASE_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

// ============================================
// GESTION UTILISATEUR
// ============================================
async function getOrCreateUser(userId, userInfo = {}) {
    const users = await supabaseQuery("users", { user_id: userId });

    if (!users || users.length === 0) {
        const newUser = {
            user_id: userId,
            language: "fr",
            channel_joined: false,
            isregistered: "no",
            isdeposit: "no",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            username: userInfo.username || null,
            first_name: userInfo.first_name || null,
            last_name: userInfo.last_name || null
        };
        await supabaseInsert("users", newUser);
        await supabaseInsert("user_sessions", {
            user_id: userId,
            current_menu: "start",
            session_data: {}
        });
        return newUser;
    }
    
    await supabaseUpdate("users", { 
        last_activity: new Date().toISOString(),
        username: userInfo.username || users[0].username,
        first_name: userInfo.first_name || users[0].first_name,
        last_name: userInfo.last_name || users[0].last_name
    }, { user_id: userId });
    
    return users[0];
}

async function updateUserLanguage(userId, language) {
    return await supabaseUpdate("users", { language: language }, { user_id: userId });
}

// ============================================
// VÉRIFICATION CANAL
// ============================================
async function checkChannelMembership(userId) {
    try {
        const result = await telegramAPI("getChatMember", {
            chat_id: CONFIG.CHANNEL_ID,
            user_id: userId
        });
        if (result.ok) {
            const status = result.result.status;
            return status === "member" || status === "administrator" || status === "creator";
        }
        return false;
    } catch (error) {
        console.error("Error checking membership:", error);
        return false;
    }
}

// ============================================
// GESTION MESSAGES
// ============================================
async function saveMessageHistory(userId, chatId, messageId, messageType = "photo", content = "") {
    const autoDeleteAt = CONFIG.AUTO_DELETE_MINUTES > 0 
        ? new Date(Date.now() + CONFIG.AUTO_DELETE_MINUTES * 60000).toISOString()
        : null;
        
    await supabaseInsert("message_history", {
        user_id: userId,
        chat_id: chatId,
        message_id: messageId,
        message_type: messageType,
        content: content,
        sent_at: new Date().toISOString(),
        auto_delete_at: autoDeleteAt,
        is_deleted: false
    });
}

async function deletePreviousMessages(chatId, userId) {
    try {
        const messages = await supabaseQuery("message_history", { 
            user_id: userId,
            is_deleted: false
        });
        
        if (messages && messages.length > 0) {
            for (const msg of messages) {
                try {
                    await telegramAPI("deleteMessage", {
                        chat_id: chatId,
                        message_id: msg.message_id
                    });
                    await supabaseUpdate("message_history", 
                        { is_deleted: true }, 
                        { id: msg.id }
                    );
                } catch (e) {
                    console.error("Failed to delete message:", e);
                }
            }
        }
    } catch (error) {
        console.error("Error deleting messages:", error);
    }
}

async function sendPhotoWithButtons(chatId, photoUrl, caption, buttons, userId = null, deletePrevious = true) {
    if (deletePrevious && userId) {
        await deletePreviousMessages(chatId, userId);
    }

    const response = await telegramAPI("sendPhoto", {
        chat_id: chatId,
        photo: photoUrl,
        caption: caption,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: buttons }
    });

    if (userId && response.ok) {
        await saveMessageHistory(userId, chatId, response.result.message_id, "photo", caption);
    }

    return response.result?.message_id;
}

async function sendMessageWithButtons(chatId, text, buttons, userId = null, deletePrevious = true) {
    if (deletePrevious && userId) {
        await deletePreviousMessages(chatId, userId);
    }

    const response = await telegramAPI("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: buttons }
    });

    if (userId && response.ok) {
        await saveMessageHistory(userId, chatId, response.result.message_id, "text", text);
    }

    return response.result?.message_id;
}

// ============================================
// CLAVIERS - STRUCTURE EXACTE DES CAPTURES
// ============================================
function getLanguageKeyboard() {
    return [
        [
            { text: "🇷🇺 Русский", callback_data: "lang_ru" },
            { text: "🇬🇧 English", callback_data: "lang_en" }
        ],
        [
            { text: "🇮🇳 हिंदी", callback_data: "lang_hi" },
            { text: "🇧🇷 Brazilian", callback_data: "lang_pt" }
        ],
        [
            { text: "🇪🇸 Español", callback_data: "lang_es" },
            { text: "🇺🇿 O'zbek", callback_data: "lang_uz" }
        ],
        [
            { text: "🇦🇿 Azərbaycan", callback_data: "lang_az" },
            { text: "🇹🇷 Türkçe", callback_data: "lang_tr" }
        ],
        [
            { text: "🇫🇷 Français", callback_data: "lang_fr" },
            { text: "🇸🇦 العربية", callback_data: "lang_ar" }
        ],
        [
            { text: "← Back", callback_data: "back_menu" }
        ]
    ];
}

function getStartKeyboard(t) {
    return [
        [{ text: t.join_channel, url: CONFIG.CHANNEL_LINK }],
        [{ text: t.check_membership, callback_data: "check_membership" }]
    ];
}

function getMainMenuKeyboard(t) {
    return [
        [
            { text: t.btn_register, callback_data: "menu_register" },
            { text: t.btn_instructions, callback_data: "menu_instructions" }
        ],
        [
            { text: t.btn_language, callback_data: "menu_language" }
        ],
        [
            { text: t.btn_get_signal, callback_data: "menu_get_signal" }
        ]
    ];
}

function getBackKeyboard(t) {
    return [[{ text: t.back, callback_data: "back_menu" }]];
}

// ============================================
// GESTION MISES À JOUR
// ============================================
async function handleUpdate(update) {
    try {
        if (update.message) {
            const chatId = update.message.chat.id;
            const userId = update.message.from.id;
            const text = update.message.text || "";
            const userInfo = {
                username: update.message.from.username,
                first_name: update.message.from.first_name,
                last_name: update.message.from.last_name
            };
            
            const user = await getOrCreateUser(userId, userInfo);
            const lang = user.language || "fr";
            const t = TRANSLATIONS[lang];

            if (text === "/start") {
                await sendPhotoWithButtons(
                    chatId, 
                    CONFIG.IMAGES.start, 
                    t.start_msg, 
                    getStartKeyboard(t),
                    userId
                );
            }
        }

        if (update.callback_query) {
            const query = update.callback_query;
            const chatId = query.message.chat.id;
            const userId = query.from.id;
            const data = query.data;
            
            const userInfo = {
                username: query.from.username,
                first_name: query.from.first_name,
                last_name: query.from.last_name
            };
            
            const user = await getOrCreateUser(userId, userInfo);
            const lang = user.language || "fr";
            const t = TRANSLATIONS[lang];

            // Changement de langue
            if (data.startsWith("lang_")) {
                const newLang = data.replace("lang_", "");
                if (TRANSLATIONS[newLang]) {
                    await updateUserLanguage(userId, newLang);
                    const newT = TRANSLATIONS[newLang];
                    
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.menu,
                        newT.welcome_back + "\n\n" + newT.main_menu,
                        getMainMenuKeyboard(newT),
                        userId
                    );
                }
                await telegramAPI("answerCallbackQuery", { callback_query_id: query.id });
                return;
            }

            // Vérification adhésion
            if (data === "check_membership") {
                const isMember = await checkChannelMembership(userId);

                if (!isMember) {
                    await telegramAPI("answerCallbackQuery", {
                        callback_query_id: query.id,
                        text: t.not_member,
                        show_alert: true
                    });
                    return;
                }

                await supabaseUpdate("users", { channel_joined: true }, { user_id: userId });

                await sendPhotoWithButtons(
                    chatId,
                    CONFIG.IMAGES.menu,
                    t.main_menu,
                    getMainMenuKeyboard(t),
                    userId
                );

                await telegramAPI("answerCallbackQuery", { callback_query_id: query.id });
                return;
            }

            // Menu inscription
            if (data === "menu_register") {
                const regLink = `${CONFIG.ONE_WIN_DOMAIN}/?open=register&p=${CONFIG.AFFILIATE_CODE}&sub1=${userId}`;
                const buttons = [
                    [{ text: t.register_btn, url: regLink }],
                    [{ text: t.back, callback_data: "back_menu" }]
                ];
                
                await sendPhotoWithButtons(
                    chatId,
                    CONFIG.IMAGES.register,
                    t.register_msg,
                    buttons,
                    userId
                );
            }

            // Menu instructions
            else if (data === "menu_instructions") {
                await sendPhotoWithButtons(
                    chatId,
                    CONFIG.IMAGES.instructions,
                    t.instructions_msg,
                    getBackKeyboard(t),
                    userId
                );
            }

            // Menu signaux
            else if (data === "menu_get_signal") {
                if (user.isregistered !== "yes") {
                    const regLink = `${CONFIG.ONE_WIN_DOMAIN}/?open=register&p=${CONFIG.AFFILIATE_CODE}&sub1=${userId}`;
                    const buttons = [
                        [{ text: t.register_btn, url: regLink }],
                        [{ text: t.back, callback_data: "back_menu" }]
                    ];
                    
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.signal,
                        t.not_registered,
                        buttons,
                        userId
                    );
                } else if (user.isdeposit !== "yes") {
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.deposit,
                        t.deposit_required,
                        getBackKeyboard(t),
                        userId
                    );
                } else {
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.signal,
                        t.access_granted,
                        getBackKeyboard(t),
                        userId
                    );
                }
            }

            // Menu prédictions
            else if (data === "menu_predictions") {
                if (user.isregistered !== "yes" || user.isdeposit !== "yes") {
                    const regLink = `${CONFIG.ONE_WIN_DOMAIN}/?open=register&p=${CONFIG.AFFILIATE_CODE}&sub1=${userId}`;
                    const buttons = [
                        [{ text: t.register_btn, url: regLink }],
                        [{ text: t.back, callback_data: "back_menu" }]
                    ];
                    
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.signal,
                        t.not_registered,
                        buttons,
                        userId
                    );
                } else {
                    const buttons = [
                        [{ text: t.predictions_btn, url: CONFIG.PREDICTION_URL }],
                        [{ text: t.back, callback_data: "back_menu" }]
                    ];
                    
                    await sendPhotoWithButtons(
                        chatId,
                        CONFIG.IMAGES.signal,
                        t.predictions_msg,
                        buttons,
                        userId
                    );
                }
            }

            // Menu langue
            else if (data === "menu_language") {
                await sendMessageWithButtons(
                    chatId,
                    t.select_language,
                    getLanguageKeyboard(),
                    userId
                );
            }

            // Retour au menu
            else if (data === "back_menu") {
                await sendPhotoWithButtons(
                    chatId,
                    CONFIG.IMAGES.menu,
                    t.main_menu,
                    getMainMenuKeyboard(t),
                    userId
                );
            }

            await telegramAPI("answerCallbackQuery", { callback_query_id: query.id });
        }
    } catch (error) {
        console.error("Error handling update:", error);
    }
}

// ============================================
// POINT D'ENTRÉE
// ============================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        try {
            if (request.method === "POST" && path === "/webhook") {
                const update = await request.json();
                ctx.waitUntil(handleUpdate(update));
                return new Response("OK", { status: 200 });
            }

            if (request.method === "GET" && path === "/health") {
                return new Response(
                    JSON.stringify({ 
                        status: "ok", 
                        bot: "DVYS PRO",
                        version: "2.0",
                        languages: Object.keys(TRANSLATIONS)
                    }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            }

            return new Response(
                "🤖 Bot DVYS PRO v2.0 - Multi-language\n10 Languages: FR, EN, ES, PT, RU, HI, UZ, AZ, TR, AR",
                { status: 200, headers: { "Content-Type": "text/plain" } }
            );
        } catch (error) {
            console.error("Error:", error);
            return new Response(
                JSON.stringify({ error: error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    }
};
