import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Code, Bot, Menu, X, Globe, Phone, Mail, Sparkles, LoaderCircle, Briefcase, ChevronDown, MessageSquare, SendHorizontal } from 'lucide-react';
import * as THREE from 'three';

// --- Central de Traducciones ---
const translations = {
  es: {
    navServices: 'Servicios',
    navPortfolio: 'Portafolio',
    navAbout: 'Nosotros',
    navContact: 'Contacto',
    heroTitle: 'Transformamos Datos en',
    heroTitleHighlight: 'Decisiones Inteligentes',
    heroSubtitle: 'Creamos soluciones web a medida, ofrecemos soporte técnico experto y asistencia virtual para potenciar tu negocio a nivel global.',
    heroButton: 'Solicita una Cotización',
    servicesTitle: 'Nuestros Servicios',
    servicesSubtitle: 'Soluciones integrales para tu presencia digital.',
    service1Title: 'Diseño y Desarrollo Web',
    service1Desc: 'Construimos sitios y aplicaciones modernas, rápidas y seguras. Desde páginas corporativas hasta e-commerce, nos enfocamos en la experiencia de usuario y SEO.',
    service2Title: 'Soporte Técnico Especializado',
    service2Desc: 'Ofrecemos mantenimiento, solución de problemas y optimización de sistemas. Tu infraestructura tecnológica estará siempre en las mejores manos.',
    service3Title: 'Asistencia Virtual Remota',
    service3Desc: 'Delegá tareas administrativas, gestión de agenda y atención al cliente. Optimizamos tu tiempo para que te concentres en el crecimiento de tu negocio.',
    portfolioTitle: 'Proyectos Destacados',
    portfolioSubtitle: 'Un vistazo a nuestro trabajo de calidad.',
    portfolioItem1Title: 'E-commerce de Tecnología',
    portfolioItem1Desc: 'Plataforma de venta online con pasarela de pagos y gestión de inventario.',
    portfolioItem2Title: 'Web Corporativa para Consultora',
    portfolioItem2Desc: 'Sitio web profesional para una firma de consultoría financiera internacional.',
    portfolioItem3Title: 'Landing Page para App Móvil',
    portfolioItem3Desc: 'Página de captura de leads para el lanzamiento de una nueva aplicación.',
    aboutTitle: 'Tu Socio Estratégico en el Mundo Digital',
    aboutDesc1: 'En Datx Solutions, somos un equipo de apasionados por la tecnología. Con más de 2 años de experiencia, nuestra misión es ofrecer soluciones digitales que superen las expectativas.',
    aboutDesc2: 'Trabajamos con clientes de todo el mundo, entendiendo cada mercado para ofrecer un servicio global con un toque local. La transparencia y la excelencia son nuestros pilares.',
    contactTitle: 'Hablemos de tu Proyecto',
    contactSubtitle: 'Usa nuestro asistente de IA para empezar o envíanos un mensaje directamente.',
    aiAssistantTitle: 'Asistente de Proyectos con IA',
    aiAssistantDesc: 'Describe tu negocio o idea y obtén un plan inicial.',
    aiAssistantPlaceholder: 'Ej: Una tienda online de ropa vintage...',
    aiAssistantButton: 'Generar Plan de Proyecto',
    aiAssistantGenerating: 'Generando...',
    formTitle: 'O envíanos un mensaje',
    formNamePlaceholder: 'Tu Nombre',
    formEmailPlaceholder: 'Tu Correo Electrónico',
    formMessagePlaceholder: 'Cuéntanos sobre tu idea...',
    formButton: 'Enviar Mensaje',
    formSending: 'Enviando...',
    footerContactTitle: 'Contacto Directo',
    footerContactGlobal: 'Presencia Global',
    footerFollowTitle: 'Síguenos',
    footerFiverrLink: 'Contrátame en Fiverr',
    footerRights: 'Todos los derechos reservados.',
    faqTitle: 'Asistente Virtual',
    faqWelcome: '¡Hola! Soy el asistente de Datx Solutions. ¿En qué puedo ayudarte hoy?',
    faqPlaceholder: 'Escribe tu pregunta aquí...',
    faqTyping: 'El asistente está escribiendo...'
  },
  en: {
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navAbout: 'About Us',
    navContact: 'Contact',
    heroTitle: 'We Transform Data into',
    heroTitleHighlight: 'Intelligent Decisions',
    heroSubtitle: 'We create custom web solutions, offer expert technical support, and remote virtual assistance to boost your business globally.',
    heroButton: 'Request a Quote',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive solutions for your digital presence.',
    service1Title: 'Web Design and Development',
    service1Desc: 'We build modern, fast, and secure websites and applications. From corporate pages to e-commerce, we focus on user experience and SEO.',
    service2Title: 'Specialized Technical Support',
    service2Desc: 'We offer preventive maintenance, troubleshooting, and system optimization. Your technological infrastructure will always be in the best hands.',
    service3Title: 'Remote Virtual Assistance',
    service3Desc: 'Delegate administrative tasks, schedule management, customer service, and more. We optimize your time so you can focus on growing your business.',
    portfolioTitle: 'Featured Projects',
    portfolioSubtitle: 'A glimpse of our quality work.',
    portfolioItem1Title: 'Tech E-commerce',
    portfolioItem1Desc: 'Online sales platform with payment gateway and inventory management.',
    portfolioItem2Title: 'Corporate Website for a Consulting Firm',
    portfolioItem2Desc: 'Professional website for an international financial consulting firm.',
    portfolioItem3Title: 'Landing Page for Mobile App',
    portfolioItem3Desc: 'Lead capture page for the launch of a new application.',
    aboutTitle: 'Your Strategic Partner in the Digital World',
    aboutDesc1: 'At Datx Solutions, we are a team passionate about technology. With over 2 years of experience, our mission is to deliver digital solutions that exceed expectations.',
    aboutDesc2: 'We work with clients from all over the world, understanding the particularities of each market to offer a global service with a local touch. Transparency and excellence are our pillars.',
    contactTitle: "Let's Talk About Your Project",
    contactSubtitle: 'Use our AI assistant to get started or send us a message directly.',
    aiAssistantTitle: 'AI Project Assistant',
    aiAssistantDesc: 'Describe your business or idea and get an initial plan.',
    aiAssistantPlaceholder: 'e.g., An online store for vintage clothing...',
    aiAssistantButton: 'Generate Project Plan',
    aiAssistantGenerating: 'Generating...',
    formTitle: 'Or send us a message',
    formNamePlaceholder: 'Your Name',
    formEmailPlaceholder: 'Your Email Address',
    formMessagePlaceholder: 'Tell us about your idea...',
    formButton: 'Send Message',
    formSending: 'Sending...',
    footerContactTitle: 'Direct Contact',
    footerContactGlobal: 'Global Presence',
    footerFollowTitle: 'Follow Us',
    footerFiverrLink: 'Hire me on Fiverr',
    footerRights: 'All rights reserved.',
    faqTitle: 'Virtual Assistant',
    faqWelcome: 'Hello! I am the Datx Solutions assistant. How can I help you today?',
    faqPlaceholder: 'Type your question here...',
    faqTyping: 'The assistant is typing...'
  },
  de: {
    navServices: 'Dienstleistungen',
    navPortfolio: 'Portfolio',
    navAbout: 'Über uns',
    navContact: 'Kontakt',
    heroTitle: 'Wir verwandeln Daten in',
    heroTitleHighlight: 'intelligente Entscheidungen',
    heroSubtitle: 'Wir erstellen maßgeschneiderte Weblösungen, bieten fachkundigen technischen Support und virtuelle Fernunterstützung, um Ihr Geschäft weltweit zu fördern.',
    heroButton: 'Angebot anfordern',
    servicesTitle: 'Unsere Dienstleistungen',
    servicesSubtitle: 'Umfassende Lösungen für Ihre digitale Präsenz.',
    service1Title: 'Webdesign und Entwicklung',
    service1Desc: 'Wir erstellen moderne, schnelle und sichere Websites und Anwendungen. Von Unternehmensseiten bis zum E-Commerce konzentrieren wir uns auf Benutzererfahrung und SEO.',
    service2Title: 'Spezialisierter technischer Support',
    service2Desc: 'Wir bieten vorbeugende Wartung, Fehlerbehebung und Systemoptimierung. Ihre technologische Infrastruktur ist immer in den besten Händen.',
    service3Title: 'Virtuelle Fernunterstützung',
    service3Desc: 'Delegieren Sie administrative Aufgaben, Terminverwaltung, Kundenservice und mehr. Wir optimieren Ihre Zeit, damit Sie sich auf das Wachstum Ihres Unternehmens konzentrieren können.',
    portfolioTitle: 'Ausgewählte Projekte',
    portfolioSubtitle: 'Ein Einblick in unsere Qualitätsarbeit.',
    portfolioItem1Title: 'Tech E-Commerce',
    portfolioItem1Desc: 'Online-Verkaufsplattform mit Zahlungsgateway und Bestandsverwaltung.',
    portfolioItem2Title: 'Unternehmenswebsite für eine Beratungsfirma',
    portfolioItem2Desc: 'Professionelle Website für eine internationale Finanzberatungsfirma.',
    portfolioItem3Title: 'Landingpage für mobile App',
    portfolioItem3Desc: 'Lead-Erfassungsseite für den Start einer neuen Anwendung.',
    aboutTitle: 'Ihr strategischer Partner in der digitalen Welt',
    aboutDesc1: 'Bei Datx Solutions sind wir ein Team, das sich für Technologie begeistert. Mit über 2 Jahren Erfahrung ist es unsere Mission, digitale Lösungen zu liefern, die die Erwartungen übertreffen.',
    aboutDesc2: 'Wir arbeiten mit Kunden aus der ganzen Welt zusammen und verstehen die Besonderheiten jedes Marktes, um einen globalen Service mit lokaler Note zu bieten. Transparenz und Exzellenz sind unsere Grundpfeiler.',
    contactTitle: 'Sprechen wir über Ihr Projekt',
    contactSubtitle: 'Nutzen Sie unseren KI-Assistenten für den Anfang oder senden Sie uns direkt eine Nachricht.',
    aiAssistantTitle: 'KI-Projektassistent',
    aiAssistantDesc: 'Beschreiben Sie Ihr Unternehmen oder Ihre Idee und erhalten Sie einen ersten Plan.',
    aiAssistantPlaceholder: 'z.B. Ein Online-Shop für Vintage-Kleidung...',
    aiAssistantButton: 'Projektplan erstellen',
    aiAssistantGenerating: 'Wird erstellt...',
    formTitle: 'Oder senden Sie uns eine Nachricht',
    formNamePlaceholder: 'Ihr Name',
    formEmailPlaceholder: 'Ihre E-Mail-Adresse',
    formMessagePlaceholder: 'Erzählen Sie uns von Ihrer Idee...',
    formButton: 'Nachricht senden',
    formSending: 'Wird gesendet...',
    footerContactTitle: 'Direkter Kontakt',
    footerContactGlobal: 'Globale Präsenz',
    footerFollowTitle: 'Folgen Sie uns',
    footerFiverrLink: 'Beauftragen Sie mich auf Fiverr',
    footerRights: 'Alle Rechte vorbehalten.',
    faqTitle: 'Virtueller Assistent',
    faqWelcome: 'Hallo! Ich bin der Assistent von Datx Solutions. Wie kann ich Ihnen heute helfen?',
    faqPlaceholder: 'Geben Sie hier Ihre Frage ein...',
    faqTyping: 'Der Assistent schreibt...'
  },
  fr: {
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navAbout: 'À propos',
    navContact: 'Contact',
    heroTitle: 'Nous transformons les données en',
    heroTitleHighlight: 'décisions intelligentes',
    heroSubtitle: 'Nous créons des solutions web sur mesure, offrons un support technique expert et une assistance virtuelle à distance pour dynamiser votre entreprise à l\'échelle mondiale.',
    heroButton: 'Demander un devis',
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Des solutions complètes pour votre présence numérique.',
    service1Title: 'Conception et développement Web',
    service1Desc: 'Nous construisons des sites et des applications modernes, rapides et sécurisés. Des pages d\'entreprise au commerce électronique, nous nous concentrons sur l\'expérience utilisateur et le SEO.',
    service2Title: 'Support technique spécialisé',
    service2Desc: 'Nous offrons une maintenance préventive, un dépannage et une optimisation des systèmes. Votre infrastructure technologique sera toujours entre de bonnes mains.',
    service3Title: 'Assistance virtuelle à distance',
    service3Desc: 'Déléguez les tâches administratives, la gestion d\'agenda, le service client, et plus encore. Nous optimisons votre temps pour que vous puissiez vous concentrer sur la croissance de votre entreprise.',
    portfolioTitle: 'Projets en vedette',
    portfolioSubtitle: 'Un aperçu de notre travail de qualité.',
    portfolioItem1Title: 'E-commerce technologique',
    portfolioItem1Desc: 'Plateforme de vente en ligne avec passerelle de paiement et gestion des stocks.',
    portfolioItem2Title: 'Site Web d\'entreprise pour un cabinet de conseil',
    portfolioItem2Desc: 'Site Web professionnel pour un cabinet de conseil financier international.',
    portfolioItem3Title: 'Page de destination pour application mobile',
    portfolioItem3Desc: 'Page de capture de prospects pour le lancement d\'une nouvelle application.',
    aboutTitle: 'Votre partenaire stratégique dans le monde numérique',
    aboutDesc1: 'Chez Datx Solutions, nous sommes une équipe passionnée par la technologie. Avec plus de 2 ans d\'expérience, notre mission est de fournir des solutions numériques qui dépassent les attentes.',
    aboutDesc2: 'Nous travaillons avec des clients du monde entier, comprenant les particularités de chaque marché pour offrir un service mondial avec une touche locale. La transparence et l\'excellence sont nos piliers.',
    contactTitle: 'Parlons de votre projet',
    contactSubtitle: 'Utilisez notre assistant IA pour commencer ou envoyez-nous un message directement.',
    aiAssistantTitle: 'Assistant de projet IA',
    aiAssistantDesc: 'Décrivez votre entreprise ou votre idée et obtenez un plan initial.',
    aiAssistantPlaceholder: 'Ex : Une boutique en ligne de vêtements vintage...',
    aiAssistantButton: 'Générer un plan de projet',
    aiAssistantGenerating: 'Génération...',
    formTitle: 'Ou envoyez-nous un message',
    formNamePlaceholder: 'Votre nom',
    formEmailPlaceholder: 'Votre adresse e-mail',
    formMessagePlaceholder: 'Parlez-nous de votre idée...',
    formButton: 'Envoyer le message',
    formSending: 'Envoi...',
    footerContactTitle: 'Contact direct',
    footerContactGlobal: 'Présence mondiale',
    footerFollowTitle: 'Suivez-nous',
    footerFiverrLink: 'Engagez-moi sur Fiverr',
    footerRights: 'Tous droits réservés.',
    faqTitle: 'Assistant Virtuel',
    faqWelcome: 'Bonjour ! Je suis l\'assistant de Datx Solutions. Comment puis-je vous aider aujourd\'hui ?',
    faqPlaceholder: 'Tapez votre question ici...',
    faqTyping: 'L\'assistant est en train d\'écrire...'
  },
  pt: {
    navServices: 'Serviços',
    navPortfolio: 'Portfólio',
    navAbout: 'Sobre nós',
    navContact: 'Contato',
    heroTitle: 'Transformamos dados em',
    heroTitleHighlight: 'decisões inteligentes',
    heroSubtitle: 'Criamos soluções web personalizadas, oferecemos suporte técnico especializado e assistência virtual remota para impulsionar seu negócio globalmente.',
    heroButton: 'Solicite um orçamento',
    servicesTitle: 'Nossos serviços',
    servicesSubtitle: 'Soluções abrangentes para sua presença digital.',
    service1Title: 'Design e Desenvolvimento Web',
    service1Desc: 'Construímos sites e aplicativos modernos, rápidos e seguros. De páginas corporativas a e-commerce, focamos na experiência do usuário e SEO.',
    service2Title: 'Suporte Técnico Especializado',
    service2Desc: 'Oferecemos manutenção preventiva, solução de problemas e otimização de sistemas. Sua infraestrutura tecnológica estará sempre nas melhores mãos.',
    service3Title: 'Assistência Virtual Remota',
    service3Desc: 'Delegue tarefas administrativas, gerenciamento de agenda, atendimento ao cliente e muito mais. Otimizamos seu tempo para que você possa se concentrar no crescimento do seu negócio.',
    portfolioTitle: 'Projetos em Destaque',
    portfolioSubtitle: 'Um vislumbre do nosso trabalho de qualidade.',
    portfolioItem1Title: 'E-commerce de tecnologia',
    portfolioItem1Desc: 'Plataforma de vendas online com gateway de pagamento e gerenciamento de estoque.',
    portfolioItem2Title: 'Site corporativo para consultoria',
    portfolioItem2Desc: 'Site profissional para uma empresa de consultoria financeira internacional.',
    portfolioItem3Title: 'Landing Page para aplicativo móvel',
    portfolioItem3Desc: 'Página de captura de leads para o lançamento de um novo aplicativo.',
    aboutTitle: 'Seu parceiro estratégico no mundo digital',
    aboutDesc1: 'Na Datx Solutions, somos uma equipe apaixonada por tecnologia. Com mais de 2 anos de experiência, nossa missão é oferecer soluções digitais que superem as expectativas.',
    aboutDesc2: 'Trabalhamos com clientes de todo o mundo, entendendo as particularidades de cada mercado para oferecer um serviço global com um toque local. Transparência e excelência são nossos pilares.',
    contactTitle: 'Vamos falar sobre o seu projeto',
    contactSubtitle: 'Use nosso assistente de IA para começar ou envie-nos uma mensagem diretamente.',
    aiAssistantTitle: 'Assistente de Projeto de IA',
    aiAssistantDesc: 'Descreva seu negócio ou ideia e obtenha um plano inicial.',
    aiAssistantPlaceholder: 'Ex: Uma loja online de roupas vintage...',
    aiAssistantButton: 'Gerar plano de projeto',
    aiAssistantGenerating: 'Gerando...',
    formTitle: 'Ou envie-nos uma mensagem',
    formNamePlaceholder: 'Seu nome',
    formEmailPlaceholder: 'Seu endereço de e-mail',
    formMessagePlaceholder: 'Conte-nos sobre sua ideia...',
    formButton: 'Enviar mensagem',
    formSending: 'Enviando...',
    footerContactTitle: 'Contato direto',
    footerContactGlobal: 'Presença global',
    footerFollowTitle: 'Siga-nos',
    footerFiverrLink: 'Contrate-me no Fiverr',
    footerRights: 'Todos os direitos reservados.',
    faqTitle: 'Assistente Virtual',
    faqWelcome: 'Olá! Sou o assistente da Datx Solutions. Como posso ajudar hoje?',
    faqPlaceholder: 'Digite sua pergunta aqui...',
    faqTyping: 'O assistente está digitando...'
  }
};

// --- Componente de Animación 3D (sin cambios) ---
const HeroAnimation = () => { /* ... */ };

// --- Componente para animaciones al hacer scroll (sin cambios) ---
const AnimateOnScroll = ({ children, className = '', delay = 0 }) => { /* ... */ };

// --- Componentes de la UI (sin cambios) ---
const ServiceCard = ({ icon, title, children }) => { /* ... */ };
const PortfolioItem = ({ imageUrl, title, description, url }) => { /* ... */ };

// --- Componente para el selector de idioma (sin cambios) ---
const LanguageSwitcher = ({ onLanguageChange, currentLang }) => { /* ... */ };

// --- Componente para el Chat de FAQ con IA ---
const FaqChat = ({ content, apiKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setChatHistory([{ sender: 'bot', text: content.faqWelcome }]);
        }
    }, [isOpen, content.faqWelcome]);
    
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendQuestion = async () => {
        if (!question.trim() || isLoading) return;

        const newChatHistory = [...chatHistory, { sender: 'user', text: question }];
        setChatHistory(newChatHistory);
        setQuestion('');
        setIsLoading(true);

        const context = `Eres el asistente virtual de Datx Solutions, una empresa de desarrollo web, soporte técnico y asistencia virtual. Responde de forma breve y amigable. Información clave:
        - Tiempo de entrega de proyectos: entre 1 y 15 días, según la complejidad.
        - Precios: Son competitivos y se ajustan a cada proyecto.
        - Cómo contratar: A través de nuestro perfil de Fiverr (https://es.fiverr.com/s/xXL3DpB) o el formulario de contacto.
        - Servicios: Diseño y desarrollo web, soporte técnico, asistencia virtual.
        - Experiencia: Más de 2 años.`;
        
        const prompt = `${context}\n\nPregunta del usuario: "${question}"\n\nRespuesta:`;

        try {
            if (!apiKey) {
                throw new Error("API Key no configurada.");
            }
            
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error de la API: ${response.statusText}`);
            }

            const result = await response.json();
            const botResponse = result.candidates[0].content.parts[0].text;
            setChatHistory([...newChatHistory, { sender: 'bot', text: botResponse }]);

        } catch (error) {
            console.error("Error en el chat de IA:", error);
            setChatHistory([...newChatHistory, { sender: 'bot', text: "Lo siento, no puedo responder en este momento. Por favor, intenta más tarde." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-5 right-5 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
                <button onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg">
                    <MessageSquare size={28} />
                </button>
            </div>

            <div className={`fixed bottom-5 right-5 z-50 w-[calc(100%-40px)] max-w-sm h-[70vh] max-h-[500px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white">{content.faqTitle}</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Chat Body */}
                <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-gray-400 italic">
                                    {content.faqTyping}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-gray-900 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        <input 
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
                            placeholder={content.faqPlaceholder}
                            className="w-full bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleSendQuestion} disabled={isLoading} className="bg-blue-500 text-white rounded-full p-2 disabled:bg-blue-800">
                            <SendHorizontal size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


// --- Componente principal de la Aplicación ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectIdea, setProjectIdea] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [language, setLanguage] = useState('es');
  const content = translations[language];
  const logoUrl = "/assets/Logo_datx_negativo.png";
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const navLinks = [
    { href: '#services', label: content.navServices },
    { href: '#portfolio', label: content.navPortfolio },
    { href: '#about', label: content.navAbout },
    { href: '#contact', label: content.navContact },
  ];

  const handleGeneratePlan = async () => { /* ... (código sin cambios) ... */ };
  const handleFormChange = (e) => { setFormState({ ...formState, [e.target.name]: e.target.value }); };
  const encode = (data) => { return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&"); };
  const handleFormSubmit = (e) => { /* ... (código sin cambios) ... */ };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-tight">
      <style>{`
        /* ... (estilos sin cambios) ... */
      `}</style>

      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logoUrl} alt="Datx Solutions Logo" className="h-14" />
          </a>
          <div className="hidden md:flex items-center gap-8">
              <nav className="flex space-x-8">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-300">{link.label}</a>
                ))}
              </nav>
              <LanguageSwitcher onLanguageChange={setLanguage} currentLang={language} />
          </div>
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher onLanguageChange={setLanguage} currentLang={language} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <nav className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg">{link.label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ... (secciones sin cambios) ... */}
      </main>

      <footer className="bg-black">
        {/* ... (código del footer sin cambios) ... */}
      </footer>
      
      <FaqChat content={content} apiKey={geminiApiKey} />
    </div>
  );
}






