import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Code, Bot, Menu, X, Globe, Phone, Mail, Sparkles, LoaderCircle, Briefcase, ChevronDown } from 'lucide-react';
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
    footerRights: 'Todos los derechos reservados.'
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
    footerRights: 'All rights reserved.'
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
    footerRights: 'Alle Rechte vorbehalten.'
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
    footerRights: 'Tous droits réservés.'
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
    footerRights: 'Todos os direitos reservados.'
  }
};

// --- Componente de Animación 3D (sin cambios) ---
const HeroAnimation = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
        const planet = new THREE.Mesh(geometry, material);
        scene.add(planet);
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            if (new THREE.Vector3(x, y, z).length() > 300) {
                 starVertices.push(x, y, z);
            }
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0x4b5563, size: 0.7 });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        let frameId = null;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            planet.rotation.y += 0.001;
            planet.rotation.x += 0.0005;
            stars.rotation.y += 0.0001;
            renderer.render(scene, camera);
        };
        animate();
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);
    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

// --- Componente para animaciones al hacer scroll (sin cambios) ---
const AnimateOnScroll = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);
    return (
        <div ref={ref} className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

// --- Componentes de la UI (sin cambios) ---
const ServiceCard = ({ icon, title, children }) => (
  <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
    <div className="mb-6 text-blue-400">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
  </div>
);
const PortfolioItem = ({ imageUrl, title, description, url }) => (
  <div className="bg-gray-800 rounded-2xl overflow-hidden group">
    <div className="overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/020617/38bdf8?text=Proyecto'; }} />
    </div>
    <div className="p-6">
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-gray-400 mb-4 text-sm">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
        Ver Proyecto &rarr;
      </a>
    </div>
  </div>
);

// --- Componente para el selector de idioma ---
const LanguageSwitcher = ({ onLanguageChange, currentLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
    ];
    
    const selectedLanguage = languages.find(l => l.code === currentLang);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (langCode) => {
        onLanguageChange(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Globe size={20} />
                <span>{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                    <ul>
                        {languages.map(lang => (
                             <li key={lang.code} onClick={() => handleSelect(lang.code)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer text-white">
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
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
  
  // --- Estado para el idioma ---
  const [language, setLanguage] = useState('es');
  const content = translations[language];

  const logoUrl = "/assets/Logo_datx_negativo.png";
  
  const navLinks = [
    { href: '#services', label: content.navServices },
    { href: '#portfolio', label: content.navPortfolio },
    { href: '#about', label: content.navAbout },
    { href: '#contact', label: content.navContact },
  ];

  const handleGeneratePlan = async () => { /* ... (código sin cambios) ... */ };
  const handleFormChange = (e) => { setFormState({ ...formState, [e.target.name]: e.target.value }); };
  const encode = (data) => { return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&"); };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Enviando...');
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    })
      .then(() => {
        setFormStatus("¡Mensaje enviado con éxito!");
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000);
      })
      .catch(error => {
        setFormStatus("Hubo un error al enviar el mensaje.");
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-tight">
      <style>{`
        .animated-gradient-text {
          background: linear-gradient(90deg, #38bdf8, #a78bfa, #38bdf8);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 5s ease-in-out infinite;
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
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
        <section id="home" className="relative py-32 md:py-48 bg-gray-900 text-center overflow-hidden">
          <HeroAnimation />
          <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              {content.heroTitle} <span className="animated-gradient-text">{content.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              {content.heroButton}
            </a>
          </div>
        </section>

        <section id="services" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{content.servicesTitle}</h2>
              <p className="text-gray-400 mt-2">{content.servicesSubtitle}</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-10">
              <AnimateOnScroll delay={0}><ServiceCard icon={<Code size={48} />} title={content.service1Title}>{content.service1Desc}</ServiceCard></AnimateOnScroll>
              <AnimateOnScroll delay={150}><ServiceCard icon={<ShieldCheck size={48} />} title={content.service2Title}>{content.service2Desc}</ServiceCard></AnimateOnScroll>
              <AnimateOnScroll delay={300}><ServiceCard icon={<Bot size={48} />} title={content.service3Title}>{content.service3Desc}</ServiceCard></AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{content.portfolioTitle}</h2>
              <p className="text-gray-400 mt-2">{content.portfolioSubtitle}</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               <AnimateOnScroll delay={0}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=E-commerce+Tech" title={content.portfolioItem1Title} description={content.portfolioItem1Desc} url="#" /></AnimateOnScroll>
               <AnimateOnScroll delay={150}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=Web+Corporativa" title={content.portfolioItem2Title} description={content.portfolioItem2Desc} url="#" /></AnimateOnScroll>
               <AnimateOnScroll delay={300}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=Landing+Page+App" title={content.portfolioItem3Title} description={content.portfolioItem3Desc} url="#" /></AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <AnimateOnScroll className="md:w-1/2"><img src="https://placehold.co/800x600/020617/ffffff?text=Equipo" alt="Nuestro equipo" className="rounded-2xl shadow-lg" /></AnimateOnScroll>
              <AnimateOnScroll className="md:w-1/2" delay={150}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{content.aboutTitle}</h2>
                <p className="text-gray-400 mb-4 leading-relaxed">{content.aboutDesc1}</p>
                <p className="text-gray-400 leading-relaxed">{content.aboutDesc2}</p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">{content.contactTitle}</h2>
              <p className="text-gray-400 mt-2">{content.contactSubtitle}</p>
            </AnimateOnScroll>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                <AnimateOnScroll className="bg-gray-800/50 p-8 rounded-2xl border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Sparkles className="text-blue-400" />{content.aiAssistantTitle}</h3>
                    <p className="text-gray-400 mb-6">{content.aiAssistantDesc}</p>
                    <div className="space-y-4">
                        <textarea id="project-idea" rows="3" placeholder={content.aiAssistantPlaceholder} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={projectIdea} onChange={(e) => setProjectIdea(e.target.value)} />
                        <button onClick={handleGeneratePlan} disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {isLoading ? <><LoaderCircle className="animate-spin" />{content.aiAssistantGenerating}</> : <>✨ {content.aiAssistantButton}</>}
                        </button>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    </div>
                    {generatedPlan && (
                        <div className="mt-8 pt-6 border-t border-gray-700 animate-fade-in"><h4 className="text-xl font-bold text-white mb-4">{generatedPlan.projectTitle}</h4><p className="text-gray-400 mb-4">{generatedPlan.projectDescription}</p><h5 className="font-semibold text-white mb-2">Características Clave:</h5><ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">{generatedPlan.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}</ul><h5 className="font-semibold text-white mb-2">Stack Tecnológico Sugerido:</h5><div className="text-sm text-gray-500"><p><strong>Frontend:</strong> {generatedPlan.suggestedStack.frontend}</p><p><strong>Backend:</strong> {generatedPlan.suggestedStack.backend}</p><p><strong>Base de Datos:</strong> {generatedPlan.suggestedStack.database}</p></div></div>
                    )}
                </AnimateOnScroll>
                <AnimateOnScroll delay={150}>
                    <h3 className="text-2xl font-bold text-white mb-4">{content.formTitle}</h3>
                    <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleFormSubmit} className="space-y-6">
                        <input type="hidden" name="form-name" value="contact" />
                        <p className="hidden"><label>No llenes esto si eres humano: <input name="bot-field" onChange={handleFormChange} /></label></p>
                        <div><input type="text" name="name" placeholder={content.formNamePlaceholder} value={formState.name} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
                        <div><input type="email" name="email" placeholder={content.formEmailPlaceholder} value={formState.email} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required /></div>
                        <div><textarea name="message" rows="5" placeholder={content.formMessagePlaceholder} value={formState.message} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea></div>
                        <div className="text-center"><button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105">{formStatus === 'Enviando...' ? content.formSending : content.formButton}</button></div>
                        {formStatus && formStatus !== 'Enviando...' && (<p className="text-center text-white mt-4">{formStatus}</p>)}
                    </form>
                </AnimateOnScroll>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black">
        <div className="container mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left items-center">
            <div className="flex justify-center md:justify-start">
              <img src={logoUrl} alt="Datx Solutions Logo" className="h-20" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{content.footerContactTitle}</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400"><Mail size={18} /> <a href="mailto:contacto@datxsolutions.com">contacto@datxsolutions.com</a></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400"><Phone size={18} /> <a href="https://wa.me/573103032487" target="_blank" rel="noopener noreferrer">+57 310 303 2487 (WhatsApp)</a></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400"><Globe size={18} /><span>{content.footerContactGlobal}</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{content.footerFollowTitle}</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400 transition-colors"><Briefcase size={18} /><a href="https://es.fiverr.com/s/xXL3DpB" target="_blank" rel="noopener noreferrer">{content.footerFiverrLink}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Datx Solutions. {content.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}





