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
    privacyContactTitle: '4. Contacto',
    privacyContactDesc: 'Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos en contacto@datxsolutions.com.',
    privacyClose: 'Cerrar',
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
    privacyContactTitle: '4. Contact Us',
    privacyContactDesc: 'If you have any questions about this privacy policy, you can contact us at contacto@datxsolutions.com.',
    privacyClose: 'Close',
  },
  // Otras traducciones (de, fr, pt) se omiten por brevedad
};

// --- COMPONENTES MODULARES ---

const HeroAnimation = () => { /* ... (código sin cambios) ... */ };
const AnimateOnScroll = memo(({ children, className = '', delay = 0 }) => { /* ... (código sin cambios) ... */ });
const ServiceCard = memo(({ icon, title, children }) => { /* ... (código sin cambios) ... */ });
const PortfolioItem = memo(({ imageUrl, title, description, url }) => { /* ... (código sin cambios) ... */ });
const LanguageSwitcher = memo(({ onLanguageChange, currentLang }) => { /* ... (código sin cambios) ... */ });
const FaqChat = ({ content, apiKey }) => { /* ... (código sin cambios) ... */ };
const ArticleCard = memo(({ imageUrl, title, excerpt, readMoreText }) => { /* ... (código sin cambios) ... */ });
const PrivacyModal = memo(({ content, onClose }) => { /* ... (código sin cambios) ... */ });
const Header = memo(({ logoUrl, navLinks, onLanguageChange, language }) => { /* ... (código sin cambios) ... */ });
const Hero = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Services = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Portfolio = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Blog = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const ProjectCalculator = memo(({ content, onQuoteRequest }) => { /* ... (código sin cambios) ... */ });
const About = memo(({ content }) => { /* ... (código sin cambios) ... */ });

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
    </div>
  );
}








