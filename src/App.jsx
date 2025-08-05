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
    // ... (traducciones en inglés)
    navBlog: 'Blog',
    blogTitle: 'Our Blog',
    blogSubtitle: 'Articles, tutorials, and tips from the world of technology and web development.',
    blogArticle1Title: '5 Reasons Why Your Business Needs a Fast Website',
    blogArticle1Excerpt: 'Discover how loading speed directly impacts your sales and brand perception...',
    blogArticle2Title: 'Introduction to SEO for Small Businesses',
    blogArticle2Excerpt: 'Learn the basics to help your customers find you on Google without being an expert...',
    blogArticle3Title: 'AI on Your Website? Beyond Chatbots',
    blogArticle3Excerpt: 'We explore how artificial intelligence can automate tasks, personalize experiences, and more...',
    blogReadMore: 'Read More',
    // ... (resto de traducciones en inglés)
  },
  // Otras traducciones se omiten por brevedad
};

// --- COMPONENTES MODULARES ---

const HeroAnimation = () => { /* ... (código sin cambios) ... */ };
const AnimateOnScroll = memo(({ children, className = '', delay = 0 }) => { /* ... (código sin cambios) ... */ });
const ServiceCard = memo(({ icon, title, children }) => { /* ... (código sin cambios) ... */ });
const PortfolioItem = memo(({ imageUrl, title, description, url }) => { /* ... (código sin cambios) ... */ });
const LanguageSwitcher = memo(({ onLanguageChange, currentLang }) => { /* ... (código sin cambios) ... */ });
const FaqChat = ({ content, apiKey }) => { /* ... (código sin cambios) ... */ };

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

// --- COMPONENTES DE SECCIÓN ---

const Header = memo(({ logoUrl, navLinks, onLanguageChange, language }) => { /* ... (código sin cambios) ... */ });
const Hero = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Services = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Portfolio = memo(({ content }) => { /* ... (código sin cambios) ... */ });

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

const ProjectCalculator = memo(({ content, onQuoteRequest }) => { /* ... (código sin cambios) ... */ });
const About = memo(({ content }) => { /* ... (código sin cambios) ... */ });
const Contact = memo(({ content, handleGeneratePlan, isLoading, error, generatedPlan, projectIdea, setProjectIdea, formState, handleFormChange, handleFormSubmit, formStatus }) => { /* ... (código sin cambios) ... */ });
const Footer = memo(({ logoUrl, content }) => { /* ... (código sin cambios) ... */ });


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
export default function App() {
  const [projectIdea, setProjectIdea] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [language, setLanguage] = useState('es');
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
        />
      </main>

      <Footer logoUrl={logoUrl} content={content} />
      
      <Suspense fallback={null}>
        <FaqChat content={content} apiKey={geminiApiKey} />
      </Suspense>
    </div>
  );
}







