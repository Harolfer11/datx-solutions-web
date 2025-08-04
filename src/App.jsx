import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Code, Bot, Menu, X, Globe, Phone, Mail, Sparkles, LoaderCircle, Briefcase, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

// --- Componente de Animación 3D para el Hero ---
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

// --- Componente para animaciones al hacer scroll ---
const AnimateOnScroll = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


// --- Componentes de la UI ---
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
const LanguageSwitcher = ({ onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState({ code: 'ES', flag: '🇪🇸' });
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'EN', name: 'Inglés', flag: '🇬🇧' },
        { code: 'DE', name: 'Alemán', flag: '🇩🇪' },
        { code: 'FR', name: 'Francés', flag: '🇫🇷' },
        { code: 'PT', name: 'Portugués', flag: '🇵🇹' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false);
        onLanguageChange(lang.name);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Globe size={20} />
                <span>{selectedLanguage.code}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                    <ul>
                        {languages.map(lang => (
                             <li key={lang.code} onClick={() => handleSelect(lang)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer text-white">
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
  const [translationNotification, setTranslationNotification] = useState('');

  const navLinks = [
    { href: '#services', label: 'Servicios' },
    { href: '#portfolio', label: 'Portafolio' },
    { href: '#about', label: 'Nosotros' },
    { href: '#contact', label: 'Contacto' },
  ];
  
  const logoUrl = "/assets/Logo_datx_negativo.png";

  const handleLanguageChange = (languageName) => {
      setTranslationNotification(`Traduciendo a ${languageName}...`);
      setTimeout(() => {
          setTranslationNotification('');
      }, 3000);
  };

  const handleGeneratePlan = async () => {
    // ... (código de Gemini sin cambios)
  };

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

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
              <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          </div>
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
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
        <section id="home" className="relative py-32 md:py-48 bg-gray-900 text-center overflow-hidden">
          <HeroAnimation />
          <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Transformamos Datos en <span className="animated-gradient-text">Decisiones Inteligentes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Creamos soluciones web a medida, ofrecemos soporte técnico experto y asistencia virtual para potenciar tu negocio a nivel global.
            </p>
            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Solicita una Cotización
            </a>
          </div>
        </section>

        <section id="services" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nuestros Servicios</h2>
              <p className="text-gray-400 mt-2">Soluciones integrales para tu presencia digital.</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-3 gap-10">
              <AnimateOnScroll delay={0}><ServiceCard icon={<Code size={48} />} title="Diseño y Desarrollo Web">Construimos sitios y aplicaciones modernas, rápidas y seguras. Desde páginas corporativas hasta e-commerce, nos enfocamos en la experiencia de usuario y SEO.</ServiceCard></AnimateOnScroll>
              <AnimateOnScroll delay={150}><ServiceCard icon={<ShieldCheck size={48} />} title="Soporte Técnico Especializado">Ofrecemos mantenimiento, solución de problemas y optimización de sistemas. Tu infraestructura tecnológica estará siempre en las mejores manos.</ServiceCard></AnimateOnScroll>
              <AnimateOnScroll delay={300}><ServiceCard icon={<Bot size={48} />} title="Asistencia Virtual Remota">Delegá tareas administrativas, gestión de agenda y atención al cliente. Optimizamos tu tiempo para que te concentres en el crecimiento de tu negocio.</ServiceCard></AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Proyectos Destacados</h2>
              <p className="text-gray-400 mt-2">Un vistazo a nuestro trabajo de calidad.</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               <AnimateOnScroll delay={0}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=E-commerce+Tech" title="E-commerce de Tecnología" description="Plataforma de venta online con pasarela de pagos y gestión de inventario." url="#" /></AnimateOnScroll>
               <AnimateOnScroll delay={150}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=Web+Corporativa" title="Web Corporativa para Consultora" description="Sitio web profesional para una firma de consultoría financiera internacional." url="#" /></AnimateOnScroll>
               <AnimateOnScroll delay={300}><PortfolioItem imageUrl="https://placehold.co/600x400/1e293b/38bdf8?text=Landing+Page+App" title="Landing Page para App Móvil" description="Página de captura de leads para el lanzamiento de una nueva aplicación." url="#" /></AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <AnimateOnScroll className="md:w-1/2"><img src="https://placehold.co/800x600/020617/ffffff?text=Equipo" alt="Nuestro equipo" className="rounded-2xl shadow-lg" /></AnimateOnScroll>
              <AnimateOnScroll className="md:w-1/2" delay={150}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tu Socio Estratégico en el Mundo Digital</h2>
                <p className="text-gray-400 mb-4 leading-relaxed">En Datx Solutions, somos un equipo de apasionados por la tecnología. Con más de 2 años de experiencia, nuestra misión es ofrecer soluciones digitales que superen las expectativas.</p>
                <p className="text-gray-400 leading-relaxed">Trabajamos con clientes de todo el mundo, entendiendo cada mercado para ofrecer un servicio global con un toque local. La transparencia y la excelencia son nuestros pilares.</p>
              </AnimateOnScroll>
            </div>
          </div>
        </section>


        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <AnimateOnScroll className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Hablemos de tu Proyecto</h2>
              <p className="text-gray-400 mt-2">Usa nuestro asistente de IA para empezar o envíanos un mensaje directamente.</p>
            </AnimateOnScroll>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                <AnimateOnScroll className="bg-gray-800/50 p-8 rounded-2xl border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Sparkles className="text-blue-400" />Asistente de Proyectos con IA</h3>
                    <p className="text-gray-400 mb-6">Describe tu negocio o idea y obtén un plan inicial.</p>
                    <div className="space-y-4">
                        <textarea id="project-idea" rows="3" placeholder="Ej: Una tienda online de ropa vintage..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={projectIdea} onChange={(e) => setProjectIdea(e.target.value)} />
                        <button onClick={handleGeneratePlan} disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {isLoading ? <><LoaderCircle className="animate-spin" />Generando...</> : <>✨ Generar Plan de Proyecto</>}
                        </button>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    </div>
                    {generatedPlan && (
                        <div className="mt-8 pt-6 border-t border-gray-700 animate-fade-in"><h4 className="text-xl font-bold text-white mb-4">{generatedPlan.projectTitle}</h4><p className="text-gray-400 mb-4">{generatedPlan.projectDescription}</p><h5 className="font-semibold text-white mb-2">Características Clave:</h5><ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">{generatedPlan.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}</ul><h5 className="font-semibold text-white mb-2">Stack Tecnológico Sugerido:</h5><div className="text-sm text-gray-500"><p><strong>Frontend:</strong> {generatedPlan.suggestedStack.frontend}</p><p><strong>Backend:</strong> {generatedPlan.suggestedStack.backend}</p><p><strong>Base de Datos:</strong> {generatedPlan.suggestedStack.database}</p></div></div>
                    )}
                </AnimateOnScroll>
                <AnimateOnScroll delay={150}>
                    <h3 className="text-2xl font-bold text-white mb-4">O envíanos un mensaje</h3>
                    <form 
                        name="contact" 
                        method="POST" 
                        data-netlify="true" 
                        data-netlify-honeypot="bot-field"
                        onSubmit={handleFormSubmit}
                        className="space-y-6"
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <p className="hidden">
                            <label>No llenes esto si eres humano: <input name="bot-field" onChange={handleFormChange} /></label>
                        </p>
                        <div>
                            <input type="text" name="name" placeholder="Tu Nombre" value={formState.name} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <input type="email" name="email" placeholder="Tu Correo Electrónico" value={formState.email} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <textarea name="message" rows="5" placeholder="Cuéntanos sobre tu idea..." value={formState.message} onChange={handleFormChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105">
                                {formStatus === 'Enviando...' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </div>
                        {formStatus && formStatus !== 'Enviando...' && (
                            <p className="text-center text-white mt-4">{formStatus}</p>
                        )}
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
              <h3 className="text-xl font-bold text-white mb-4">Contacto Directo</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400"><Mail size={18} /> <a href="mailto:contacto@datxsolutions.com">contacto@datxsolutions.com</a></li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400">
                    <Phone size={18} /> 
                    <a href="https://wa.me/573103032487" target="_blank" rel="noopener noreferrer">+57 310 303 2487 (WhatsApp)</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400"><Globe size={18} /><span>Presencia Global</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Síguenos</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <Briefcase size={18} />
                    <a href="https://es.fiverr.com/s/xXL3DpB" target="_blank" rel="noopener noreferrer">Contrátame en Fiverr</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Datx Solutions. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Notificación de Traducción */}
      {translationNotification && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-up">
              {translationNotification}
          </div>
      )}
    </div>
  );
}






