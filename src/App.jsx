import React, { useState, useEffect, useRef, Suspense, memo } from 'react';
import { ShieldCheck, Code, Bot, Menu, X, Globe, Phone, Mail, Sparkles, LoaderCircle, Briefcase, ChevronDown, MessageSquare, SendHorizontal, Building, FileText, ShoppingCart, FilePlus, PenTool, BotMessageSquare, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// --- Central de Traducciones ---
const translations = {
  es: {
    navServices: 'Servicios',
    navPortfolio: 'Portafolio',
    navBlog: 'Blog',
    navCalculator: 'Calculadora',
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
    blogTitle: 'Nuestro Blog',
    blogSubtitle: 'Artículos, tutoriales y consejos del mundo de la tecnología y el desarrollo web.',
    blogArticle1Title: '5 Razones por las que tu Negocio Necesita un Sitio Web Rápido',
    blogArticle1Excerpt: 'Descubre cómo la velocidad de carga impacta directamente en tus ventas y la percepción de tu marca...',
    blogArticle2Title: 'Introducción al SEO para Pequeñas Empresas',
    blogArticle2Excerpt: 'Aprende los conceptos básicos para que tus clientes te encuentren en Google sin ser un experto...',
    blogArticle3Title: '¿IA en tu Web? Más Allá de los Chatbots',
    blogArticle3Excerpt: 'Exploramos cómo la inteligencia artificial puede automatizar tareas, personalizar experiencias y más...',
    blogReadMore: 'Leer Más',
    calculatorTitle: 'Calcula tu Proyecto',
    calculatorSubtitle: 'Obtén una estimación instantánea seleccionando las características que necesitas.',
    calculatorStep1: '1. Elige el Tipo de Sitio',
    calculatorTypeLanding: 'Landing Page',
    calculatorTypeCorporate: 'Sitio Corporativo',
    calculatorTypeEcommerce: 'Tienda Online (E-commerce)',
    calculatorStep2: '2. Número de Páginas Adicionales',
    calculatorStep3: '3. Funcionalidades Extra',
    calculatorFeatureBlog: 'Blog',
    calculatorFeatureBooking: 'Sistema de Reservas',
    calculatorFeatureAnimations: 'Animaciones Avanzadas',
    calculatorFeatureAI: 'Integración con IA',
    calculatorResultTitle: 'Rango de Inversión Estimado',
    calculatorResultDisclaimer: '*Este es un estimado. El precio final puede variar.',
    calculatorButton: 'Solicitar Cotización Formal',
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
    formAcceptPrivacy: 'He leído y acepto la',
    formPrivacyLink: 'Política de Privacidad',
    formButton: 'Enviar Mensaje',
    formSending: 'Enviando...',
    footerContactTitle: 'Contacto Directo',
    footerContactGlobal: 'Presencia Global',
    footerFollowTitle: 'Síguenos',
    footerFiverrLink: 'Contrátame en Fiverr',
    footerRights: 'Todos los derechos reservados.',
    footerPrivacy: 'Política de Privacidad',
    faqTitle: 'Asistente Virtual',
    faqWelcome: '¡Hola! Soy el asistente de Datx Solutions. ¿En qué puedo ayudarte hoy?',
    faqPlaceholder: 'Escribe tu pregunta aquí...',
    faqTyping: 'El asistente está escribiendo...',
    privacyTitle: 'Política de Privacidad',
    privacyEffectiveDate: 'Fecha de vigencia: 5 de agosto de 2025',
    privacyIntro: 'En Datx Solutions, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos cuando visitas nuestro sitio web y te informará sobre tus derechos de privacidad.',
    privacyDataTitle: '1. Datos que recopilamos',
    privacyDataDesc: 'Recopilamos los datos que nos proporcionas directamente a través de nuestro formulario de contacto, que incluyen: tu nombre, tu dirección de correo electrónico y el mensaje que nos envías.',
    privacyUseTitle: '2. Cómo usamos tus datos',
    privacyUseDesc: 'Utilizamos la información que nos proporcionas únicamente para responder a tus consultas y para comunicarnos contigo acerca de los servicios que has solicitado. No compartiremos tus datos personales con terceros sin tu consentimiento.',
    privacySecurityTitle: '3. Seguridad de los datos',
    privacySecurityDesc: 'Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan accidentalmente, se usen o se acceda a ellos de forma no autorizada.',
    privacyCookiesTitle: '4. Uso de Cookies',
    privacyCookiesDesc: 'Nuestro sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y mejorar tu experiencia de navegación. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo. Al continuar utilizando nuestro sitio, aceptas el uso de estas cookies.',
    privacyRightsTitle: '5. Tus Derechos',
    privacyRightsDesc: 'Tienes derecho a solicitar acceso, rectificación o eliminación de tus datos personales que hemos recopilado. Para ejercer estos derechos, por favor contáctanos a través de nuestro correo electrónico.',
    privacyContactTitle: '6. Contacto',
    privacyContactDesc: 'Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos en contacto@datxsolutions.com.',
    privacyClose: 'Cerrar',
    cookieBannerText: 'Usamos cookies para asegurar que te damos la mejor experiencia en nuestra web. Consulta nuestra',
    cookieBannerButton: 'Aceptar',
  },
  en: {
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navBlog: 'Blog',
    navCalculator: 'Calculator',
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
    blogTitle: 'Our Blog',
    blogSubtitle: 'Articles, tutorials, and tips from the world of technology and web development.',
    blogArticle1Title: '5 Reasons Why Your Business Needs a Fast Website',
    blogArticle1Excerpt: 'Discover how loading speed directly impacts your sales and brand perception...',
    blogArticle2Title: 'Introduction to SEO for Small Businesses',
    blogArticle2Excerpt: 'Learn the basics to help your customers find you on Google without being an expert...',
    blogArticle3Title: 'AI on Your Website? Beyond Chatbots',
    blogArticle3Excerpt: 'We explore how artificial intelligence can automate tasks, personalize experiences, and more...',
    blogReadMore: 'Read More',
    calculatorTitle: 'Calculate Your Project',
    calculatorSubtitle: 'Get an instant estimate by selecting the features you need.',
    calculatorStep1: '1. Choose Site Type',
    calculatorTypeLanding: 'Landing Page',
    calculatorTypeCorporate: 'Corporate Site',
    calculatorTypeEcommerce: 'E-commerce Store',
    calculatorStep2: '2. Number of Additional Pages',
    calculatorStep3: '3. Extra Features',
    calculatorFeatureBlog: 'Blog',
    calculatorFeatureBooking: 'Booking System',
    calculatorFeatureAnimations: 'Advanced Animations',
    calculatorFeatureAI: 'AI Integration',
    calculatorResultTitle: 'Estimated Investment Range',
    calculatorResultDisclaimer: '*This is an estimate. Final price may vary.',
    calculatorButton: 'Request Formal Quote',
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
    formAcceptPrivacy: 'I have read and accept the',
    formPrivacyLink: 'Privacy Policy',
    formButton: 'Send Message',
    formSending: 'Sending...',
    footerContactTitle: 'Direct Contact',
    footerContactGlobal: 'Global Presence',
    footerFollowTitle: 'Follow Us',
    footerFiverrLink: 'Hire me on Fiverr',
    footerRights: 'All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    faqTitle: 'Virtual Assistant',
    faqWelcome: 'Hello! I am the Datx Solutions assistant. How can I help you today?',
    faqPlaceholder: 'Type your question here...',
    faqTyping: 'The assistant is typing...',
    privacyTitle: 'Privacy Policy',
    privacyEffectiveDate: 'Effective date: August 5, 2025',
    privacyIntro: 'At Datx Solutions, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your data when you visit our website and tell you about your privacy rights.',
    privacyDataTitle: '1. Data We Collect',
    privacyDataDesc: 'We collect the data you provide to us directly through our contact form, which includes: your name, your email address, and the message you send us.',
    privacyUseTitle: '2. How We Use Your Data',
    privacyUseDesc: 'We use the information you provide solely to respond to your inquiries and to communicate with you about the services you have requested. We will not share your personal data with third parties without your consent.',
    privacySecurityTitle: '3. Data Security',
    privacySecurityDesc: 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.',
    privacyCookiesTitle: '4. Use of Cookies',
    privacyCookiesDesc: 'Our website uses essential cookies to ensure its proper functioning and improve your browsing experience. Cookies are small text files stored on your device. By continuing to use our site, you agree to the use of these cookies.',
    privacyRightsTitle: '5. Your Rights',
    privacyRightsDesc: 'You have the right to request access to, correction of, or deletion of your personal data that we have collected. To exercise these rights, please contact us via our email address.',
    privacyContactTitle: '6. Contact Us',
    privacyContactDesc: 'If you have any questions about this privacy policy, you can contact us at contacto@datxsolutions.com.',
    privacyClose: 'Close',
  },
  // Otras traducciones (de, fr, pt) se omiten por brevedad
};

// --- COMPONENTES MODULARES ---

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

const AnimateOnScroll = memo(({ children, className = '', delay = 0 }) => {
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
});

const ServiceCard = memo(({ icon, title, children }) => (
  <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-blue-500/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
    <div className="mb-6 text-blue-400">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
  </div>
));

const PortfolioItem = memo(({ imageUrl, title, description, url }) => (
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
));

const LanguageSwitcher = memo(({ onLanguageChange, currentLang }) => {
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
});

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
            if (!apiKey) throw new Error("API Key no configurada.");
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Error de la API: ${response.statusText}`);
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
                <button onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"><MessageSquare size={28} /></button>
            </div>
            <div className={`fixed bottom-5 right-5 z-50 w-[calc(100%-40px)] max-w-sm h-[70vh] max-h-[500px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white">{content.faqTitle}</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}>{msg.text}</div>
                            </div>
                        ))}
                        {isLoading && (<div className="flex justify-start"><div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-gray-400 italic">{content.faqTyping}</div></div>)}
                    </div>
                </div>
                <div className="p-4 bg-gray-900 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()} placeholder={content.faqPlaceholder} className="w-full bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button onClick={handleSendQuestion} disabled={isLoading} className="bg-blue-500 text-white rounded-full p-2 disabled:bg-blue-800"><SendHorizontal size={20} /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

const ArticleCard = memo(({ imageUrl, title, excerpt, readMoreText }) => (
    <div className="bg-gray-800 rounded-2xl overflow-hidden group flex flex-col">
        <div className="overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/020617/38bdf8?text=Blog'; }} />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h4 className="text-xl font-bold text-white mb-3 flex-grow">{title}</h4>
            <p className="text-gray-400 mb-4 text-sm">{excerpt}</p>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold mt-auto flex items-center gap-2">
                {readMoreText} <ArrowRight size={16} />
            </a>
        </div>
    </div>
));

const PrivacyModal = memo(({ content, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{content.privacyTitle}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto text-gray-300 space-y-4">
                <p className="text-sm text-gray-500">{content.privacyEffectiveDate}</p>
                <p>{content.privacyIntro}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacyDataTitle}</h3>
                <p>{content.privacyDataDesc}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacyUseTitle}</h3>
                <p>{content.privacyUseDesc}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacySecurityTitle}</h3>
                <p>{content.privacySecurityDesc}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacyCookiesTitle}</h3>
                <p>{content.privacyCookiesDesc}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacyRightsTitle}</h3>
                <p>{content.privacyRightsDesc}</p>
                <h3 className="text-xl font-semibold text-white pt-2">{content.privacyContactTitle}</h3>
                <p>{content.privacyContactDesc}</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-b-2xl text-right">
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors">{content.privacyClose}</button>
            </div>
        </div>
    </div>
));

const CookieConsentBanner = memo(({ content, onAccept, onPrivacyClick }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-4 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 text-center sm:text-left">
                {content.cookieBannerText}{' '}
                <button onClick={onPrivacyClick} className="underline hover:text-blue-400 transition-colors">
                    {content.footerPrivacy}
                </button>.
            </p>
            <button onClick={onAccept} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors flex-shrink-0">
                {content.cookieBannerButton}
            </button>
        </div>
    </div>
));

const Header = memo(({ logoUrl, navLinks, onLanguageChange, language }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#" className="flex items-center"><img src={logoUrl} alt="Datx Solutions Logo" className="h-14" /></a>
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex space-x-8">
                        {navLinks.map((link) => (<a key={link.href} href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-300">{link.label}</a>))}
                    </nav>
                    <LanguageSwitcher onLanguageChange={onLanguageChange} currentLang={language} />
                </div>
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher onLanguageChange={onLanguageChange} currentLang={language} />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        {navLinks.map((link) => (<a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg">{link.label}</a>))}
                    </nav>
                </div>
            )}
        </header>
    );
});

const Hero = memo(({ content }) => (
    <section id="home" className="relative py-32 md:py-48 bg-gray-900 text-center overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
            <HeroAnimation />
        </Suspense>
        <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">{content.heroTitle} <span className="animated-gradient-text">{content.heroTitleHighlight}</span></h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">{content.heroSubtitle}</p>
            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">{content.heroButton}</a>
        </div>
    </section>
));

const Services = memo(({ content }) => (
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
));

const Portfolio = memo(({ content }) => (
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
));

const Blog = memo(({ content }) => (
    <section id="blog" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{content.blogTitle}</h2>
                <p className="text-gray-400 mt-2">{content.blogSubtitle}</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimateOnScroll delay={0}>
                    <ArticleCard 
                        imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=Velocidad"
                        title={content.blogArticle1Title}
                        excerpt={content.blogArticle1Excerpt}
                        readMoreText={content.blogReadMore}
                    />
                </AnimateOnScroll>
                <AnimateOnScroll delay={150}>
                    <ArticleCard 
                        imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=SEO"
                        title={content.blogArticle2Title}
                        excerpt={content.blogArticle2Excerpt}
                        readMoreText={content.blogReadMore}
                    />
                </AnimateOnScroll>
                <AnimateOnScroll delay={300}>
                    <ArticleCard 
                        imageUrl="https://placehold.co/600x400/1e293b/ffffff?text=IA"
                        title={content.blogArticle3Title}
                        excerpt={content.blogArticle3Excerpt}
                        readMoreText={content.blogReadMore}
                    />
                </AnimateOnScroll>
            </div>
        </div>
    </section>
));

const ProjectCalculator = memo(({ content, onQuoteRequest }) => {
    const [siteType, setSiteType] = useState('corporate');
    const [pages, setPages] = useState(4);
    const [features, setFeatures] = useState({ blog: false, booking: false, animations: false, ai: false });
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const PRICING_LOGIC = { base: { landing: 250, corporate: 500, ecommerce: 800 }, perPage: 50, features: { blog: 150, booking: 200, animations: 150, ai: 250 }, rangeMultiplier: 1.4 };
    useEffect(() => {
        let basePrice = PRICING_LOGIC.base[siteType];
        let pagesPrice = siteType === 'landing' ? 0 : (pages * PRICING_LOGIC.perPage);
        let featuresPrice = 0;
        for (const feature in features) {
            if (features[feature]) {
                featuresPrice += PRICING_LOGIC.features[feature];
            }
        }
        const minPrice = basePrice + pagesPrice + featuresPrice;
        const maxPrice = Math.ceil((minPrice * PRICING_LOGIC.rangeMultiplier) / 50) * 50;
        setPriceRange({ min: minPrice, max: maxPrice });
    }, [siteType, pages, features, PRICING_LOGIC]);
    const handleTypeChange = (type) => {
        setSiteType(type);
        if (type === 'landing') setPages(0);
        if (type === 'corporate') setPages(4);
        if (type === 'ecommerce') setPages(5);
    };
    const handleFeatureChange = (feature) => { setFeatures(prev => ({ ...prev, [feature]: !prev[feature] })); };
    const handleQuoteButtonClick = () => {
        const selectionSummary = `Resumen de la cotización estimada:\n- Tipo de sitio: ${siteType}\n- Páginas adicionales: ${pages}\n- Funcionalidades:\n  - Blog: ${features.blog ? 'Sí' : 'No'}\n  - Sistema de Reservas: ${features.booking ? 'Sí' : 'No'}\n  - Animaciones Avanzadas: ${features.animations ? 'Sí' : 'No'}\n  - Integración con IA: ${features.ai ? 'Sí' : 'No'}\n- Rango de precio estimado: $${priceRange.min} - $${priceRange.max} USD.\n\nMe gustaría recibir una cotización formal basada en esta selección.`;
        onQuoteRequest(selectionSummary.trim());
    };
    const siteTypes = [{ id: 'landing', label: content.calculatorTypeLanding, icon: <FileText /> }, { id: 'corporate', label: content.calculatorTypeCorporate, icon: <Building /> }, { id: 'ecommerce', label: content.calculatorTypeEcommerce, icon: <ShoppingCart /> }];
    const extraFeatures = [{ id: 'blog', label: content.calculatorFeatureBlog, icon: <PenTool /> }, { id: 'booking', label: content.calculatorFeatureBooking, icon: <FilePlus /> }, { id: 'animations', label: content.calculatorFeatureAnimations, icon: <Sparkles /> }, { id: 'ai', label: content.calculatorFeatureAI, icon: <BotMessageSquare /> }];
    return (
        <section id="calculator" className="py-20 bg-black">
            <div className="container mx-auto px-6">
                <AnimateOnScroll className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{content.calculatorTitle}</h2>
                    <p className="text-gray-400 mt-2">{content.calculatorSubtitle}</p>
                </AnimateOnScroll>
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10 bg-gray-900 p-8 rounded-2xl">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">{content.calculatorStep1}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{siteTypes.map(type => (<button key={type.id} onClick={() => handleTypeChange(type.id)} className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${siteType === type.id ? 'bg-blue-500 border-blue-400' : 'bg-gray-800 border-gray-700 hover:border-blue-500'}`}>{type.icon}<span>{type.label}</span></button>))}</div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">{content.calculatorStep2}</h3>
                            <div className="flex items-center gap-4"><input type="range" min="0" max="15" value={pages} onChange={(e) => setPages(Number(e.target.value))} disabled={siteType === 'landing'} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50" /><span className="bg-gray-800 text-white text-lg font-semibold px-4 py-1 rounded-md w-16 text-center">{siteType === 'landing' ? 1 : pages + 1}</span></div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">{content.calculatorStep3}</h3>
                            <div className="grid grid-cols-2 gap-4">{extraFeatures.map(feature => (<label key={feature.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg cursor-pointer border-2 border-gray-700 hover:border-blue-500 transition-colors"><input type="checkbox" checked={features[feature.id]} onChange={() => handleFeatureChange(feature.id)} className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-blue-500" />{feature.icon}<span>{feature.label}</span></label>))}</div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">{content.calculatorResultTitle}</h3>
                        <p className="text-4xl md:text-5xl font-bold text-blue-400 my-4">${priceRange.min} - ${priceRange.max} <span className="text-2xl text-gray-400">USD</span></p>
                        <p className="text-gray-500 text-sm mb-6">{content.calculatorResultDisclaimer}</p>
                        <button onClick={handleQuoteButtonClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 w-full">{content.calculatorButton}</button>
                    </div>
                </div>
            </div>
        </section>
    );
});

const About = memo(({ content }) => (
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
));

const Contact = memo(({ content, handleGeneratePlan, isLoading, error, generatedPlan, projectIdea, setProjectIdea, formState, handleFormChange, handleFormSubmit, formStatus, privacyAccepted, setPrivacyAccepted, onPrivacyClick }) => (
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
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="privacy" name="privacy" checked={privacyAccepted} onChange={() => setPrivacyAccepted(!privacyAccepted)} className="h-4 w-4 rounded bg-gray-900 border-gray-600 text-blue-500 focus:ring-blue-500" required />
                            <label htmlFor="privacy" className="text-sm text-gray-400">
                                {content.formAcceptPrivacy}{' '}
                                <button type="button" onClick={onPrivacyClick} className="underline hover:text-blue-400 transition-colors">
                                    {content.formPrivacyLink}
                                </button>
                            </label>
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={!privacyAccepted} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                {formStatus === 'Enviando...' ? content.formSending : content.formButton}
                            </button>
                        </div>
                        {formStatus && formStatus !== 'Enviando...' && (<p className="text-center text-white mt-4">{formStatus}</p>)}
                    </form>
                </AnimateOnScroll>
            </div>
        </div>
    </section>
));

const Footer = memo(({ logoUrl, content, onPrivacyClick }) => (
    <footer className="bg-black">
        <div className="container mx-auto px-6 py-10">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left items-center">
                <div className="flex justify-center md:justify-start"><img src={logoUrl} alt="Datx Solutions Logo" className="h-20" /></div>
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
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 flex flex-col sm:flex-row justify-center items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Datx Solutions. {content.footerRights}</p>
                <button onClick={onPrivacyClick} className="hover:text-blue-400 transition-colors">{content.footerPrivacy}</button>
            </div>
        </div>
    </footer>
));


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
export default function App() {
  const [projectIdea, setProjectIdea] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [language, setLanguage] = useState('es');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
          setShowCookieBanner(true);
      }
  }, []);

  const handleAcceptCookies = () => {
      localStorage.setItem('cookie_consent', 'true');
      setShowCookieBanner(false);
  };

  const content = translations[language] || translations.es;
  const logoUrl = "/assets/Logo_datx_negativo.png";
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const navLinks = [
    { href: '#services', label: content.navServices },
    { href: '#portfolio', label: content.navPortfolio },
    { href: '#blog', label: content.navBlog },
    { href: '#calculator', label: content.navCalculator },
    { href: '#about', label: content.navAbout },
    { href: '#contact', label: content.navContact },
  ];

  const handleQuoteRequest = (summary) => {
      setFormState(prev => ({ ...prev, message: summary }));
      const contactSection = document.getElementById('contact');
      if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleGeneratePlan = async () => {
    if (!projectIdea.trim()) {
      setError("Por favor, describe tu idea de proyecto.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);
    const apiKey = geminiApiKey;
    if (!apiKey) {
        setError("La configuración de la API Key no está disponible.");
        setIsLoading(false);
        return;
    }
    const prompt = `Como consultor experto en desarrollo web, analiza la siguiente idea de negocio y genera un plan de proyecto conciso y profesional en formato JSON. La idea es: "${projectIdea}". Responde únicamente con el objeto JSON. La descripción y las características deben estar en español. El JSON debe tener la siguiente estructura: { "projectTitle": "Un título atractivo para el proyecto", "projectDescription": "Una descripción de 2-3 frases sobre el proyecto, destacando su valor.", "keyFeatures": ["Característica clave 1", "Característica clave 2", "Característica clave 3", "Característica clave 4"], "suggestedStack": { "frontend": "Tecnología Frontend", "backend": "Tecnología Backend", "database": "Base de datos" } }`;
    try {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error de la API: ${response.status} ${response.statusText}. Detalles: ${errorBody}`);
        }
        const result = await response.json();
        if (result.candidates?.[0]?.content?.parts?.[0]) {
            const text = result.candidates[0].content.parts[0].text;
            const parsedJson = JSON.parse(text);
            setGeneratedPlan(parsedJson);
        } else {
            throw new Error("La respuesta de la API no tiene el formato esperado.");
        }
    } catch (err) {
        console.error("Detalles del error de la IA:", err);
        setError("Error al contactar la IA. Revisa la consola para más detalles.");
    } finally {
        setIsLoading(false);
    }
  };
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
        setPrivacyAccepted(false); // Resetea el checkbox
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

      <Header logoUrl={logoUrl} navLinks={navLinks} onLanguageChange={setLanguage} language={language} />

      <main>
        <Hero content={content} />
        <Services content={content} />
        <Portfolio content={content} />
        <Blog content={content} />
        <ProjectCalculator content={content} onQuoteRequest={handleQuoteRequest} />
        <About content={content} />
        <Contact 
            content={content} 
            handleGeneratePlan={handleGeneratePlan}
            isLoading={isLoading}
            error={error}
            generatedPlan={generatedPlan}
            projectIdea={projectIdea}
            setProjectIdea={setProjectIdea}
            formState={formState}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            formStatus={formStatus}
            privacyAccepted={privacyAccepted}
            setPrivacyAccepted={setPrivacyAccepted}
            onPrivacyClick={() => setIsPrivacyModalOpen(true)}
        />
      </main>

      <Footer logoUrl={logoUrl} content={content} onPrivacyClick={() => setIsPrivacyModalOpen(true)} />
      
      <Suspense fallback={null}>
        <FaqChat content={content} apiKey={geminiApiKey} />
      </Suspense>

      {isPrivacyModalOpen && <PrivacyModal content={content} onClose={() => setIsPrivacyModalOpen(false)} />}
      
      {showCookieBanner && <CookieConsentBanner content={content} onAccept={handleAcceptCookies} onPrivacyClick={() => setIsPrivacyModalOpen(true)} />}
    </div>
  );
}






