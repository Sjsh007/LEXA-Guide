import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

export const languageMap: { [key: string]: string } = {
  "English": "en",
  "Spanish": "es",
  "French": "fr",
  "Hindi": "hi",
};

export const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    // App & Header
    appTitle: "LexaGuide",
    signIn: "Sign In",
    anomalyDetection: "Anomaly Detection",
    adminAnalytics: "Admin Analytics",
    submitFeedback: "Submit Feedback",
    helpSupport: "Help & Support",
    changeLanguage: "Change language",
    openUserProfile: "Open user profile",
    lexaGreeting: "Hi, I'm Lexa!",
    lexaDescription: "Paste or dictate your legal document below, and I'll help you simplify it.",
    privacySecurity: "Privacy & Security",
    analyzeMode: "Analyze",

    // Input Form
    inputFormLabel: "Your Document",
    stopDictation: "Stop dictation",
    dictateDocument: "Dictate document",
    listening: "Listening...",
    inputPlaceholder: "Paste document text or dictate here.",
    clarifyDocument: "Clarify Document",
    dropOrClick: "Drag & drop or click to upload",
    supportedFileTypes: "PDF, DOCX, TXT up to 5MB",
    fileTooLarge: "File is too large (max 5MB).",
    unsupportedFileType: "Unsupported file type. Please use PDF, DOCX, or TXT.",
    parsingFile: "Parsing {fileName}...",
    errorParsing: "Error parsing file: {errorMessage}",
    ocrInit: "Detected a scanned document. Initializing OCR...",
    ocrLoadingModel: "Loading language model...",
    ocrProgress: "Recognizing text... ({progress}%)",
    ocrRecognizingPage: "Recognizing text on page {currentPage} of {totalPages}...",


    // AuthModal
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    signInToHistory: "Sign in to access your history.",
    getStarted: "Get started with LexaGuide.",
    emailAddress: "Email Address",
    password: "Password",
    errorEnterEmailPass: "Please enter both email and password.",
    signUp: "Sign Up",
    needAccount: "Need an account? Sign Up",
    alreadyHaveAccount: "Already have an account? Sign In",

    // FeedbackModal
    shareFeedback: "Share Your Feedback",
    feedbackDescription: "Help us improve LexaGuide. Let us know what you think!",
    yourFeedback: "Your Feedback",
    feedbackPlaceholder: "Enter your comments or suggestions...",
    submit: "Submit",
    thankYou: "Thank You!",
    feedbackSubmitted: "Your feedback has been submitted.",

    // ConsultModal
    consultTitle: "Consult a Legal Professional",
    consultDescription: "Fill out the form below to request a consultation. We'll connect you with a vetted legal advisor.",
    consultDisclaimer: "Disclaimer: LexaGuide is not a law firm. This service connects you with independent third-party legal professionals.",
    fullName: "Full Name",
    briefDescription: "Brief Description of Your Issue",
    requestConsultation: "Request Consultation",
    requestSent: "Request Sent",
    requestSentDescription: "A legal professional will be in touch within 24-48 hours.",

    // ReminderModal
    setReminder: "Set a Reminder",
    reminderDescription: "Get a browser notification for this item.",
    title: "Title",
    date: "Date",
    time: "Time",
    context: "Context",
    saveReminder: "Save Reminder",

    // ChatWindow & Analysis Sections
    viewDocument: "View Document",
    newChat: "New Chat",
    searchConversation: "Search conversation",
    exportOrDownload: "Export or Download",
    downloadAsTxt: "Download as TXT",
    saveAsPdf: "Save as PDF",
    emailTranscript: "Email Transcript",
    search: "Search...",
    caseSensitive: "Aa",
    of: "of",
    results: "results",
    previous: "Previous",
    next: "Next",
    closeSearch: "Close search",
    goodResponse: "Good response",
    badResponse: "Bad response",
    setReminderForThis: "Set a reminder for this",
    consultAProfessional: "Consult a Legal Professional",
    askFollowUp: "Ask a follow-up question...",
    analysisTldr: "TL;DR",
    analysisKeyClauses: "Key Clauses",
    analysisRedFlags: "Potential Red Flags",
    analysisDisclaimer: "Important Disclaimer",
    recentSearches: "Recent Searches",
    clearHistory: "Clear search history",
    clear: "Clear",
    removeSearchItem: "Remove from history",
    
    // Feature Bar
    featureSummary: "Summary",
    featureRiskAnalysis: "Risk Analysis",
    featureQA: "Q&A",
    actions: "Actions",

    // DocumentModal
    docModalTitle: "Original Document",
    docModalSearchPlaceholder: "Find in document...",
    docModalNoResults: "No results",
    docModalResultOf: "of",
    explainClause: "Explain this clause",

    // CuteChatbotWidget
    chatWithChip: "Chat with Chip 🤖",
    chipGreeting: "Hi there! I'm Chip 🤖. I can help with general questions about using LexaGuide. For example, try asking 'What is LexaGuide?' or 'How do I use the app?'",
    typeAMessage: "Type a message...",
    
    // UserProfileModal
    userProfile: "User Profile",
    changePassword: "Change Password",
    signOut: "Sign Out",

    // PrivacyModal
    privacyTitle: "Privacy & Security",
    privacySubtitle: "Your trust and data privacy are important to us.",
    privacyHandlingTitle: "Data Handling",
    privacyHandlingText: "When you submit a document, its content is sent securely to Google's Generative AI services (Gemini API) for analysis. We do not store your documents on our servers. The document content is only used to provide you with the summary and to facilitate your chat session with Lexa.",
    privacySecureTitle: "Secure Transmission",
    privacySecureText: "All communication between your browser and our services, including the transmission of your document to the AI, is encrypted using industry-standard HTTPS protocol. This ensures that your data is protected from eavesdropping during transit.",
    privacyDeletionTitle: "Data Deletion & User Control",
    privacyDeletionText: "You are in full control of your data within the application session. The document you provide is held in your browser's memory only for the duration of your active session.",
    privacyDeletionListItem1: "Starting a New Chat: When you click the \"New Chat\" button, the previous document and conversation are permanently cleared from the application's state.",
    privacyDeletionListItem2: "Closing the Tab: Closing your browser tab or window will also discard the session, and your document data will be gone.",
    privacyDeletionConclusion: "This process is equivalent to deleting the file after processing, as no persistent copy is kept by LexaGuide.",
    privacyCookiesTitle: "Cookies & Analytics",
    privacyCookiesText: "LexaGuide does not use tracking cookies. We may use anonymous usage analytics to understand how the service is used and to improve its functionality. This data does not include the content of your documents.",
    privacyDisclaimer: "This is a simplified privacy policy for demonstration purposes. A real-world application would require a more comprehensive legal document.",

    // AdminDashboardModal
    adminTitle: "Admin Analytics Dashboard",
    totalDocsAnalyzed: "Total Documents Analyzed",
    avgAnalysisTime: "Average Analysis Time",
    docTypeBreakdown: "Document Type Breakdown",
    anomalySummary: "Anomaly Detection Summary",
    totalAnomalies: "Total Anomalies",
    highRisk: "High Risk",
    mediumRisk: "Medium Risk",
    lowRisk: "Low Risk",
    topAnomalySources: "Top Anomaly Sources",
    instance: "instance",
    instances: "instances",
    commonUserQuestions: "Most Common User Questions",
    frequentRisks: "Frequently Flagged Risks",
    demoDataNote: "Note: Data shown is for demonstration purposes only.",

    // AnomalyDetectionModal
    anomalyReportDesc: "This report highlights clauses that deviate significantly from standard templates across your document portfolio, aiding in due diligence and compliance checks.",
    anomalyExplanation: "Explanation:",
    anomalySource: "Source:",
    anomalyRiskSuffix: "Risk",
    anomalyDemoNote: "Note: Anomaly data is for demonstration purposes only.",

  },
  es: {
    // App & Header
    appTitle: "LexaGuía",
    signIn: "Iniciar Sesión",
    anomalyDetection: "Detección de Anomalías",
    adminAnalytics: "Análisis de Admin",
    submitFeedback: "Enviar Comentarios",
    helpSupport: "Ayuda y Soporte",
    changeLanguage: "Cambiar idioma",
    openUserProfile: "Abrir perfil de usuario",
    lexaGreeting: "¡Hola, soy Lexa!",
    lexaDescription: "Pega o dicta tu documento legal a continuación, y te ayudaré a simplificarlo.",
    privacySecurity: "Privacidad y Seguridad",
    analyzeMode: "Analizar",

    // Input Form
    inputFormLabel: "Tu Documento",
    stopDictation: "Detener dictado",
    dictateDocument: "Dictar documento",
    listening: "Escuchando...",
    inputPlaceholder: "Pega el texto del documento o dicta aquí.",
    clarifyDocument: "Clarificar Documento",
    dropOrClick: "Arrastra y suelta o haz clic para subir",
    supportedFileTypes: "PDF, DOCX, TXT hasta 5MB",
    fileTooLarge: "El archivo es demasiado grande (máx. 5MB).",
    unsupportedFileType: "Tipo de archivo no admitido. Utiliza PDF, DOCX o TXT.",
    parsingFile: "Analizando {fileName}...",
    errorParsing: "Error al analizar el archivo: {errorMessage}",
    ocrInit: "Se detectó un documento escaneado. Iniciando OCR...",
    ocrLoadingModel: "Cargando modelo de lenguaje...",
    ocrProgress: "Reconociendo texto... ({progress}%)",
    ocrRecognizingPage: "Reconociendo texto en la página {currentPage} de {totalPages}...",
    
    // AuthModal
    welcomeBack: "Bienvenido de Nuevo",
    createAccount: "Crear Cuenta",
    signInToHistory: "Inicia sesión para acceder a tu historial.",
    getStarted: "Comienza con LexaGuía.",
    emailAddress: "Correo Electrónico",
    password: "Contraseña",
    errorEnterEmailPass: "Por favor, introduce el correo y la contraseña.",
    signUp: "Registrarse",
    needAccount: "¿Necesitas una cuenta? Regístrate",
    alreadyHaveAccount: "¿Ya tienes una cuenta? Inicia Sesión",

    // FeedbackModal
    shareFeedback: "Comparte tus Comentarios",
    feedbackDescription: "Ayúdanos a mejorar LexaGuía. ¡Dinos qué piensas!",
    yourFeedback: "Tus Comentarios",
    feedbackPlaceholder: "Escribe tus comentarios o sugerencias...",
    submit: "Enviar",
    thankYou: "¡Gracias!",
    feedbackSubmitted: "Tus comentarios han sido enviados.",

    // ConsultModal
    consultTitle: "Consulta a un Profesional Legal",
    consultDescription: "Rellena el formulario para solicitar una consulta. Te conectaremos con un asesor legal verificado.",
    consultDisclaimer: "Aviso: LexaGuía no es un bufete de abogados. Este servicio te conecta con profesionales legales independientes.",
    fullName: "Nombre Completo",
    briefDescription: "Breve Descripción de tu Asunto",
    requestConsultation: "Solicitar Consulta",
    requestSent: "Solicitud Enviada",
    requestSentDescription: "Un profesional legal se pondrá en contacto en 24-48 horas.",

    // ReminderModal
    setReminder: "Establecer un Recordatorio",
    reminderDescription: "Recibe una notificación del navegador para este elemento.",
    title: "Título",
    date: "Fecha",
    time: "Hora",
    context: "Contexto",
    saveReminder: "Guardar Recordatorio",
    
    // ChatWindow & Analysis Sections
    viewDocument: "Ver Documento",
    newChat: "Nuevo Chat",
    searchConversation: "Buscar en conversación",
    exportOrDownload: "Exportar o Descargar",
    downloadAsTxt: "Descargar como TXT",
    saveAsPdf: "Guardar como PDF",
    emailTranscript: "Enviar Transcripción por Email",
    search: "Buscar...",
    caseSensitive: "Aa",
    of: "de",
    results: "resultados",
    previous: "Anterior",
    next: "Siguiente",
    closeSearch: "Cerrar búsqueda",
    goodResponse: "Buena respuesta",
    badResponse: "Mala respuesta",
    setReminderForThis: "Crear un recordatorio para esto",
    consultAProfessional: "Consultar a un Profesional Legal",
    askFollowUp: "Haz una pregunta de seguimiento...",
    analysisTldr: "En Resumen",
    analysisKeyClauses: "Cláusulas Clave",
    analysisRedFlags: "Posibles Señales de Alerta",
    analysisDisclaimer: "Aviso Importante",
    recentSearches: "Búsquedas Recientes",
    clearHistory: "Borrar historial de búsqueda",
    clear: "Borrar",
    removeSearchItem: "Eliminar del historial",

    // Feature Bar
    featureSummary: "Resumen",
    featureRiskAnalysis: "Análisis de Riesgos",
    featureQA: "Preguntas y Respuestas",
    actions: "Acciones",

    // DocumentModal
    docModalTitle: "Documento Original",
    docModalSearchPlaceholder: "Buscar en el documento...",
    docModalNoResults: "Sin resultados",
    docModalResultOf: "de",
    explainClause: "Explicar esta cláusula",
    
    // CuteChatbotWidget
    chatWithChip: "Chatea con Chip 🤖",
    chipGreeting: "¡Hola! Soy Chip 🤖. Puedo ayudarte con preguntas generales sobre LexaGuía. Por ejemplo, pregunta '¿Qué es LexaGuía?' o '¿Cómo uso la aplicación?'",
    typeAMessage: "Escribe un mensaje...",
    
    // UserProfileModal
    userProfile: "Perfil de Usuario",
    changePassword: "Cambiar Contraseña",
    signOut: "Cerrar Sesión",

    // PrivacyModal
    privacyTitle: "Privacidad y Seguridad",
    privacySubtitle: "Su confianza y la privacidad de sus datos son importantes para nosotros.",
    privacyHandlingTitle: "Manejo de Datos",
    privacyHandlingText: "Cuando envía un documento, su contenido se envía de forma segura a los servicios de IA Generativa de Google (API Gemini) para su análisis. No almacenamos sus documentos en nuestros servidores. El contenido del documento solo se utiliza para proporcionarle el resumen y facilitar su sesión de chat con Lexa.",
    privacySecureTitle: "Transmisión Segura",
    privacySecureText: "Toda la comunicación entre su navegador y nuestros servicios, incluida la transmisión de su documento a la IA, está encriptada utilizando el protocolo HTTPS estándar de la industria. Esto garantiza que sus datos estén protegidos de escuchas durante el tránsito.",
    privacyDeletionTitle: "Eliminación de Datos y Control del Usuario",
    privacyDeletionText: "Usted tiene el control total de sus datos dentro de la sesión de la aplicación. El documento que proporciona se guarda en la memoria de su navegador solo durante la duración de su sesión activa.",
    privacyDeletionListItem1: "Iniciar un Nuevo Chat: Cuando hace clic en el botón \"Nuevo Chat\", el documento y la conversación anteriores se borran permanentemente del estado de la aplicación.",
    privacyDeletionListItem2: "Cerrar la Pestaña: Cerrar la pestaña o ventana de su navegador también descartará la sesión, y los datos de su documento desaparecerán.",
    privacyDeletionConclusion: "Este proceso es equivalente a eliminar el archivo después del procesamiento, ya que LexaGuía no guarda ninguna copia persistente.",
    privacyCookiesTitle: "Cookies y Análisis",
    privacyCookiesText: "LexaGuía no utiliza cookies de seguimiento. Podemos utilizar análisis de uso anónimos para comprender cómo se utiliza el servicio y mejorar su funcionalidad. Estos datos no incluyen el contenido de sus documentos.",
    privacyDisclaimer: "Esta es una política de privacidad simplificada con fines de demostración. Una aplicación del mundo real requeriría un documento legal más completo.",

    // AdminDashboardModal
    adminTitle: "Panel de Análisis de Admin",
    totalDocsAnalyzed: "Total de Documentos Analizados",
    avgAnalysisTime: "Tiempo Promedio de Análisis",
    docTypeBreakdown: "Desglose por Tipo de Documento",
    anomalySummary: "Resumen de Detección de Anomalías",
    totalAnomalies: "Anomalías Totales",
    highRisk: "Riesgo Alto",
    mediumRisk: "Riesgo Medio",
    lowRisk: "Riesgo Bajo",
    topAnomalySources: "Principales Fuentes de Anomalías",
    instance: "instancia",
    instances: "instancias",
    commonUserQuestions: "Preguntas Más Comunes de Usuarios",
    frequentRisks: "Riesgos Señalados con Frecuencia",
    demoDataNote: "Nota: Los datos que se muestran son solo para fines de demostración.",
    
    // AnomalyDetectionModal
    anomalyReportDesc: "Este informe destaca las cláusulas que se desvían significativamente de las plantillas estándar en su cartera de documentos, ayudando en la debida diligencia y las verificaciones de cumplimiento.",
    anomalyExplanation: "Explicación:",
    anomalySource: "Fuente:",
    anomalyRiskSuffix: "Riesgo",
    anomalyDemoNote: "Nota: Los datos de anomalías son solo para fines de demostración.",

  },
  fr: {
    // App & Header
    appTitle: "LexaGuide",
    signIn: "Se Connecter",
    anomalyDetection: "Détection d'Anomalies",
    adminAnalytics: "Analyses Admin",
    submitFeedback: "Envoyer un Avis",
    helpSupport: "Aide et Support",
    changeLanguage: "Changer de langue",
    openUserProfile: "Ouvrir le profil utilisateur",
    lexaGreeting: "Bonjour, je suis Lexa !",
    lexaDescription: "Collez ou dictez votre document juridique ci-dessous, et je vous aiderai à le simplifier.",
    privacySecurity: "Confidentialité et Sécurité",
    analyzeMode: "Analyser",

    // Input Form
    inputFormLabel: "Votre Document",
    stopDictation: "Arrêter la dictée",
    dictateDocument: "Dicter un document",
    listening: "Écoute...",
    inputPlaceholder: "Collez le texte du document ou dictez ici.",
    clarifyDocument: "Clarifier le Document",
    dropOrClick: "Glissez-déposez ou cliquez pour télécharger",
    supportedFileTypes: "PDF, DOCX, TXT jusqu'à 5 Mo",
    fileTooLarge: "Le fichier est trop volumineux (max 5 Mo).",
    unsupportedFileType: "Type de fichier non pris en charge. Veuillez utiliser PDF, DOCX ou TXT.",
    parsingFile: "Analyse de {fileName}...",
    errorParsing: "Erreur lors de l'analyse du fichier : {errorMessage}",
    ocrInit: "Document numérisé détecté. Initialisation de l'OCR...",
    ocrLoadingModel: "Chargement du modèle de langue...",
    ocrProgress: "Reconnaissance du texte... ({progress}%)",
    ocrRecognizingPage: "Reconnaissance du texte sur la page {currentPage} de {totalPages}...",
    
    // AuthModal
    welcomeBack: "Content de vous revoir",
    createAccount: "Créer un Compte",
    signInToHistory: "Connectez-vous pour accéder à votre historique.",
    getStarted: "Démarrez avec LexaGuide.",
    emailAddress: "Adresse E-mail",
    password: "Mot de passe",
    errorEnterEmailPass: "Veuillez saisir l'e-mail et le mot de passe.",
    signUp: "S'inscrire",
    needAccount: "Besoin d'un compte ? S'inscrire",
    alreadyHaveAccount: "Vous avez déjà un compte ? Se connecter",

    // ConsultModal
    consultTitle: "Consulter un Professionnel Juridique",
    consultDescription: "Remplissez le formulaire pour demander une consultation. Nous vous mettrons en relation avec un conseiller juridique agréé.",
    consultDisclaimer: "Avis de non-responsabilité : LexaGuide n'est pas un cabinet d'avocats. Ce service vous met en relation avec des professionnels juridiques tiers indépendants.",
    fullName: "Nom Complet",
    briefDescription: "Brève Description de Votre Problème",
    requestConsultation: "Demander une Consultation",
    requestSent: "Demande Envoyée",
    requestSentDescription: "Un professionnel juridique vous contactera dans les 24-48 heures.",

    // ReminderModal
    setReminder: "Définir un Rappel",
    reminderDescription: "Recevez une notification du navigateur pour cet élément.",
    title: "Titre",
    date: "Date",
    time: "Heure",
    context: "Contexte",
    saveReminder: "Enregistrer le Rappel",

    // ChatWindow & Analysis Sections
    viewDocument: "Voir le Document",
    newChat: "Nouveau Chat",
    searchConversation: "Rechercher dans la conversation",
    exportOrDownload: "Exporter ou Télécharger",
    downloadAsTxt: "Télécharger en TXT",
    saveAsPdf: "Enregistrer en PDF",
    emailTranscript: "Envoyer la Transcription par E-mail",
    search: "Rechercher...",
    caseSensitive: "Aa",
    of: "de",
    results: "résultats",
    previous: "Précédent",
    next: "Suivant",
    closeSearch: "Fermer la recherche",
    goodResponse: "Bonne réponse",
    badResponse: "Mauvaise réponse",
    setReminderForThis: "Définir un rappel pour ceci",
    consultAProfessional: "Consulter un Professionnel Juridique",
    askFollowUp: "Posez une question de suivi...",
    analysisTldr: "En Bref",
    analysisKeyClauses: "Clauses Clés",
    analysisRedFlags: "Drapeaux Rouges Potentiels",
    analysisDisclaimer: "Avis Important",
    recentSearches: "Recherches Récentes",
    clearHistory: "Effacer l'historique de recherche",
    clear: "Effacer",
    removeSearchItem: "Supprimer de l'historique",

    // Feature Bar
    featureSummary: "Résumé",
    featureRiskAnalysis: "Analyse de Risque",
    featureQA: "Q&R",
    actions: "Actions",

    // DocumentModal
    docModalTitle: "Document Original",
    docModalSearchPlaceholder: "Rechercher dans le document...",
    docModalNoResults: "Aucun résultat",
    docModalResultOf: "de",
    explainClause: "Expliquer cette clause",

    // CuteChatbotWidget
    chatWithChip: "Chatter avec Chip 🤖",
    chipGreeting: "Bonjour ! Je suis Chip 🤖. Je peux aider avec des questions générales sur LexaGuide. Essayez de demander 'Qu'est-ce que LexaGuide ?' ou 'Comment utiliser l'application ?'",
    typeAMessage: "Écrivez un message...",
    
    // UserProfileModal
    userProfile: "Profil Utilisateur",
    changePassword: "Changer le mot de passe",
    signOut: "Se déconnecter",

    // PrivacyModal
    privacyTitle: "Confidentialité et Sécurité",
    privacySubtitle: "Votre confiance et la confidentialité de vos données sont importantes pour nous.",
    privacyHandlingTitle: "Traitement des Données",
    privacyHandlingText: "Lorsque vous soumettez un document, son contenu est envoyé en toute sécurité aux services d'IA générative de Google (API Gemini) pour analyse. Nous ne stockons pas vos documents sur nos serveurs. Le contenu du document n'est utilisé que pour vous fournir le résumé et faciliter votre session de chat avec Lexa.",
    privacySecureTitle: "Transmission Sécurisée",
    privacySecureText: "Toutes les communications entre votre navigateur et nos services, y compris la transmission de votre document à l'IA, sont cryptées à l'aide du protocole HTTPS standard de l'industrie. Cela garantit que vos données sont protégées contre l'écoute pendant le transit.",
    privacyDeletionTitle: "Suppression des Données et Contrôle de l'Utilisateur",
    privacyDeletionText: "Vous avez le contrôle total de vos données au sein de la session de l'application. Le document que vous fournissez est conservé dans la mémoire de votre navigateur uniquement pour la durée de votre session active.",
    privacyDeletionListItem1: "Démarrer une Nouvelle Discussion : Lorsque vous cliquez sur le bouton \"Nouveau Chat\", le document et la conversation précédents sont définitivement effacés de l'état de l'application.",
    privacyDeletionListItem2: "Fermer l'Onglet : La fermeture de l'onglet ou de la fenêtre de votre navigateur entraînera également la suppression de la session, et les données de votre document disparaîtront.",
    privacyDeletionConclusion: "Ce processus équivaut à supprimer le fichier après traitement, car aucune copie persistante n'est conservée par LexaGuide.",
    privacyCookiesTitle: "Cookies et Analyses",
    privacyCookiesText: "LexaGuide n'utilise pas de cookies de suivi. Nous pouvons utiliser des analyses d'utilisation anonymes pour comprendre comment le service est utilisé et pour améliorer sa fonctionnalité. Ces données n'incluent pas le contenu de vos documents.",
    privacyDisclaimer: "Ceci est une politique de confidentialité simplifiée à des fins de démonstration. Une application réelle nécessiterait un document juridique plus complet.",

    // AdminDashboardModal
    adminTitle: "Tableau de Bord d'Analyse Admin",
    totalDocsAnalyzed: "Total des Documents Analysés",
    avgAnalysisTime: "Temps d'Analyse Moyen",
    docTypeBreakdown: "Répartition par Type de Document",
    anomalySummary: "Résumé de la Détection d'Anomalies",
    totalAnomalies: "Anomalies Totales",
    highRisk: "Risque Élevé",
    mediumRisk: "Risque Moyen",
    lowRisk: "Risque Faible",
    topAnomalySources: "Principales Sources d'Anomalies",
    instance: "instance",
    instances: "instances",
    commonUserQuestions: "Questions les Plus Courantes des Utilisateurs",
    frequentRisks: "Risques Fréquemment Signalés",
    demoDataNote: "Note : Les données affichées sont uniquement à des fins de démonstration.",
    
    // AnomalyDetectionModal
    anomalyReportDesc: "Ce rapport met en évidence les clauses qui s'écartent de manière significative des modèles standard de votre portefeuille de documents, facilitant ainsi la diligence raisonnable et les contrôles de conformité.",
    anomalyExplanation: "Explication :",
    anomalySource: "Source :",
    anomalyRiskSuffix: "Risque",
    anomalyDemoNote: "Note : Les données d'anomalie sont uniquement à des fins de démonstration.",

  },
  hi: {
    // App & Header
    appTitle: "लेक्सागाइड",
    signIn: "साइन इन करें",
    anomalyDetection: "विसंगति का पता लगाना",
    adminAnalytics: "एडमिन एनालिटिक्स",
    submitFeedback: "प्रतिक्रिया भेजें",
    helpSupport: "सहायता और समर्थन",
    changeLanguage: "भाषा बदलें",
    openUserProfile: "उपयोगकर्ता प्रोफ़ाइल खोलें",
    lexaGreeting: "नमस्ते, मैं लेक्सा हूँ!",
    lexaDescription: "नीचे अपना कानूनी दस्तावेज़ चिपकाएँ या बोलें, और मैं इसे सरल बनाने में आपकी मदद करूँगी।",
    privacySecurity: "गोपनीयता और सुरक्षा",
    analyzeMode: "विश्लेषण",

    // Input Form
    inputFormLabel: "आपका दस्तावेज़",
    stopDictation: "श्रुतलेख रोकें",
    dictateDocument: "दस्तावेज़ बोलें",
    listening: "सुन रही हूँ...",
    inputPlaceholder: "दस्तावेज़ का टेक्स्ट चिपकाएँ या यहाँ बोलें।",
    clarifyDocument: "दस्तावेज़ स्पष्ट करें",
    dropOrClick: "फ़ाइल खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें",
    supportedFileTypes: "PDF, DOCX, TXT 5MB तक",
    fileTooLarge: "फ़ाइल बहुत बड़ी है (अधिकतम 5MB)।",
    unsupportedFileType: "असमर्थित फ़ाइल प्रकार। कृपया PDF, DOCX, या TXT का उपयोग करें।",
    parsingFile: "{fileName} का विश्लेषण किया जा रहा है...",
    errorParsing: "फ़ाइल का विश्लेषण करने में त्रुटि: {errorMessage}",
    ocrInit: "एक स्कैन किया हुआ दस्तावेज़ मिला। OCR शुरू किया जा रहा है...",
    ocrLoadingModel: "भाषा मॉडल लोड हो रहा है...",
    ocrProgress: "टेक्स्ट पहचाना जा रहा है... ({progress}%)",
    ocrRecognizingPage: "{totalPages} में से {currentPage} पृष्ठ पर टेक्स्ट पहचाना जा रहा है...",

    // AuthModal
    welcomeBack: "वापसी पर स्वागत है",
    createAccount: "खाता बनाएं",
    signInToHistory: "अपने इतिहास तक पहुँचने के लिए साइन इन करें।",
    getStarted: "लेक्सागाइड के साथ आरंभ करें।",
    emailAddress: "ईमेल पता",
    password: "पासवर्ड",
    errorEnterEmailPass: "कृपया ईमेल और पासवर्ड दोनों दर्ज करें।",
    signUp: "साइन अप करें",
    needAccount: "एक खाता चाहिए? साइन अप करें",
    alreadyHaveAccount: "पहले से ही एक खाता है? साइन इन करें",

    // ConsultModal
    consultTitle: "एक कानूनी पेशेवर से परामर्श करें",
    consultDescription: "परामर्श का अनुरोध करने के लिए नीचे दिया गया फ़ॉर्म भरें। हम आपको एक जाँचे-परखे कानूनी सलाहकार से जोड़ेंगे।",
    consultDisclaimer: "अस्वीकरण: लेक्सागाइड एक कानूनी फर्म नहीं है। यह सेवा आपको स्वतंत्र तृतीय-पक्ष कानूनी पेशेवरों से जोड़ती है।",
    fullName: "पूरा नाम",
    briefDescription: "आपके मुद्दे का संक्षिप्त विवरण",
    requestConsultation: "परामर्श का अनुरोध करें",
    requestSent: "अनुरोध भेजा गया",
    requestSentDescription: "एक कानूनी पेशेवर 24-48 घंटों के भीतर संपर्क करेगा।",

    // ReminderModal
    setReminder: "एक अनुस्मारक सेट करें",
    reminderDescription: "इस आइटम के लिए एक ब्राउज़र सूचना प्राप्त करें।",
    title: "शीर्षक",
    date: "तारीख",
    time: "समय",
    context: "संदर्भ",
    saveReminder: "अनुस्मारक सहेजें",

    // ChatWindow & Analysis Sections
    viewDocument: "दस्तावेज़ देखें",
    newChat: "नई चैट",
    searchConversation: "बातचीत में खोजें",
    exportOrDownload: "निर्यात या डाउनलोड करें",
    downloadAsTxt: "TXT के रूप में डाउनलोड करें",
    saveAsPdf: "PDF के रूप में सहेजें",
    emailTranscript: "प्रतिलिपि ईमेल करें",
    search: "खोजें...",
    caseSensitive: "Aa",
    of: "का",
    results: "परिणाम",
    previous: "पिछला",
    next: "अगला",
    closeSearch: "खोज बंद करें",
    goodResponse: "अच्छी प्रतिक्रिया",
    badResponse: "खराब प्रतिक्रिया",
    setReminderForThis: "इसके लिए एक अनुस्मारक सेट करें",
    consultAProfessional: "एक कानूनी पेशेवर से परामर्श करें",
    askFollowUp: "एक अनुवर्ती प्रश्न पूछें...",
    analysisTldr: "संक्षेप में",
    analysisKeyClauses: "मुख्य खंड",
    analysisRedFlags: "संभावित खतरे",
    analysisDisclaimer: "महत्वपूर्ण अस्वीकरण",
    recentSearches: "हाल की खोजें",
    clearHistory: "खोज इतिहास साफ़ करें",
    clear: "साफ़ करें",
    removeSearchItem: "इतिहास से हटा दें",

    // Feature Bar
    featureSummary: "सारांश",
    featureRiskAnalysis: "जोखिम विश्लेषण",
    featureQA: "प्रश्न-उत्तर",
    actions: "कार्रवाइयाँ",

    // DocumentModal
    docModalTitle: "मूल दस्तावेज़",
    docModalSearchPlaceholder: "दस्तावेज़ में खोजें...",
    docModalNoResults: "कोई परिणाम नहीं",
    docModalResultOf: "का",
    explainClause: "इस खंड की व्याख्या करें",

    // CuteChatbotWidget
    chatWithChip: "चिप के साथ चैट करें 🤖",
    chipGreeting: "नमस्ते! मैं चिप हूँ 🤖। मैं लेक्सागाइड का उपयोग करने के बारे में सामान्य प्रश्नों में मदद कर सकता हूँ। उदाहरण के लिए, 'लेक्सागाइड क्या है?' या 'मैं ऐप का उपयोग कैसे करूं?' पूछने का प्रयास करें।",
    typeAMessage: "एक संदेश लिखें...",
    
    // UserProfileModal
    userProfile: "उपयोगकर्ता प्रोफ़ाइल",
    changePassword: "पासवर्ड बदलें",
    signOut: "साइन आउट",
    
    // PrivacyModal
    privacyTitle: "गोपनीयता और सुरक्षा",
    privacySubtitle: "आपका विश्वास और डेटा गोपनीयता हमारे लिए महत्वपूर्ण है।",
    privacyHandlingTitle: "डेटा हैंडलिंग",
    privacyHandlingText: "जब आप कोई दस्तावेज़ सबमिट करते हैं, तो उसकी सामग्री विश्लेषण के लिए Google की जेनरेटिव AI सेवाओं (जेमिनी API) को सुरक्षित रूप से भेजी जाती है। हम आपके दस्तावेज़ों को अपने सर्वर पर संग्रहीत नहीं करते हैं। दस्तावेज़ सामग्री का उपयोग केवल आपको सारांश प्रदान करने और लेक्सा के साथ आपके चैट सत्र को सुविधाजनक बनाने के लिए किया जाता है।",
    privacySecureTitle: "सुरक्षित प्रसारण",
    privacySecureText: "आपके ब्राउज़र और हमारी सेवाओं के बीच सभी संचार, जिसमें AI को आपके दस्तावेज़ का प्रसारण शामिल है, उद्योग-मानक HTTPS प्रोटोकॉल का उपयोग करके एन्क्रिप्ट किया गया है। यह सुनिश्चित करता है कि आपका डेटा पारगमन के दौरान छिपकर बातें सुनने से सुरक्षित है।",
    privacyDeletionTitle: "डेटा हटाना और उपयोगकर्ता नियंत्रण",
    privacyDeletionText: "आप एप्लिकेशन सत्र के भीतर अपने डेटा पर पूर्ण नियंत्रण रखते हैं। आपके द्वारा प्रदान किया गया दस्तावेज़ आपके ब्राउज़र की मेमोरी में केवल आपके सक्रिय सत्र की अवधि के लिए रखा जाता है।",
    privacyDeletionListItem1: "एक नई चैट शुरू करना: जब आप \"नई चैट\" बटन पर क्लिक करते हैं, तो पिछला दस्तावेज़ और बातचीत एप्लिकेशन की स्थिति से स्थायी रूप से साफ़ हो जाती है।",
    privacyDeletionListItem2: "टैब बंद करना: अपने ब्राउज़र टैब या विंडो को बंद करने से भी सत्र समाप्त हो जाएगा, और आपका दस्तावेज़ डेटा चला जाएगा।",
    privacyDeletionConclusion: "यह प्रक्रिया प्रसंस्करण के बाद फ़ाइल को हटाने के बराबर है, क्योंकि लेक्सागाइड द्वारा कोई स्थायी प्रति नहीं रखी जाती है।",
    privacyCookiesTitle: "कुकीज़ और एनालिटिक्स",
    privacyCookiesText: "लेक्सागाइड ट्रैकिंग कुकीज़ का उपयोग नहीं करता है। हम यह समझने के लिए अनाम उपयोग एनालिटिक्स का उपयोग कर सकते हैं कि सेवा का उपयोग कैसे किया जाता है और इसकी कार्यक्षमता में सुधार कैसे किया जाता है। इस डेटा में आपके दस्तावेज़ों की सामग्री शामिल नहीं है।",
    privacyDisclaimer: "यह प्रदर्शन उद्देश्यों के लिए एक सरलीकृत गोपनीयता नीति है। एक वास्तविक दुनिया के एप्लिकेशन को अधिक व्यापक कानूनी दस्तावेज़ की आवश्यकता होगी।",

    // AdminDashboardModal
    adminTitle: "एडमिन एनालिटिक्स डैशबोर्ड",
    totalDocsAnalyzed: "कुल विश्लेषित दस्तावेज़",
    avgAnalysisTime: "औसत विश्लेषण समय",
    docTypeBreakdown: "दस्तावेज़ प्रकार का विश्लेषण",
    anomalySummary: "विसंगति जांच का सारांश",
    totalAnomalies: "कुल विसंगतियाँ",
    highRisk: "उच्च जोखिम",
    mediumRisk: "मध्यम जोखिम",
    lowRisk: "कम जोखिम",
    topAnomalySources: "शीर्ष विसंगति स्रोत",
    instance: "उदाहरण",
    instances: "उदाहरण",
    commonUserQuestions: "सबसे आम उपयोगकर्ता प्रश्न",
    frequentRisks: "अक्सर चिह्नित जोखिम",
    demoDataNote: "नोट: दिखाए गए डेटा केवल प्रदर्शन उद्देश्यों के लिए हैं।",

    // AnomalyDetectionModal
    anomalyReportDesc: "यह रिपोर्ट उन खंडों पर प्रकाश डालती है जो आपके दस्तावेज़ पोर्टफोलियो में मानक टेम्पलेट्स से महत्वपूर्ण रूप से विचलित होते हैं, जो उचित परिश्रम और अनुपालन जांच में सहायता करते हैं।",
    anomalyExplanation: "स्पष्टीकरण:",
    anomalySource: "स्रोत:",
    anomalyRiskSuffix: "जोखिम",
    anomalyDemoNote: "नोट: विसंगति डेटा केवल प्रदर्शन उद्देश्यों के लिए है।",
  },
};

interface LocalizationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
      const langKey = supportedLanguages.find(l => l.code === language) ? language : 'en';
      let template = translations[langKey]?.[key] || translations['en'][key] || key;
      
      if (replacements) {
        for (const rKey in replacements) {
          template = template.replace(`{${rKey}}`, String(replacements[rKey]));
        }
      }
      return template;
    }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  // FIX: Replaced JSX with `React.createElement` to prevent syntax errors in a .ts file.
  return React.createElement(LocalizationContext.Provider, { value }, children);
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};