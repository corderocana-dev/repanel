import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaFileAlt, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSearch, FaTruck, FaAngleDown, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import LanguageSwitcher from "./LanguageSwitcher";
import Buscador from "./Buscador";
import Logo from "./Logo";
import { useTranslation } from 'react-i18next';
import { categorias } from '../utils/productos';

// Redes sociales (cambia estas direcciones por los perfiles reales de la empresa)
const REDES = [
  { nombre: 'Facebook', href: 'https://www.facebook.com/', icono: FaFacebook },
  { nombre: 'Instagram', href: 'https://www.instagram.com/', icono: FaInstagram },
  { nombre: 'LinkedIn', href: 'https://www.linkedin.com/', icono: FaLinkedin },
];

const TELEFONO = { texto: '123 456 789', href: 'tel:+34123456789' };
const EMAIL = 'info@repanel.example';

// Enlaces del menú (PRODUCTOS va aparte porque tiene desplegable)
const ENLACES_ANTES = [
  { to: '/', texto: 'INICIO', exacto: true },
  { to: '/quienessomos', texto: 'QUIÉNES SOMOS' },
];
const ENLACES_DESPUES = [
  { to: '/blog', texto: 'BLOG' },
  { to: '/contacto', texto: 'CONTACTO' },
];

// Iconos de redes sociales
const IconosRedes = ({ tamano = 16, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {REDES.map((red) => (
      <a key={red.nombre} href={red.href} target="_blank" rel="noopener noreferrer" aria-label={red.nombre} title={red.nombre} className="hover:opacity-75 hover:scale-110 transition">
        <red.icono size={tamano} />
      </a>
    ))}
  </div>
);

// Estilo de los enlaces del menú: línea naranja debajo en la página activa
const claseEnlace = (activo) =>
  `relative py-2 font-bold tracking-wide transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-[#BC6C25] after:transition-all after:duration-300 ${activo
    ? 'text-[#BC6C25] after:w-full'
    : 'text-[#344e41] hover:text-[#BC6C25] after:w-0 hover:after:w-full'}`;

const Header = () => {

  //Para traducir el texto de la página web
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  // Al bajar, el menú principal se queda fijo arriba y se hace más compacto
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Dos umbrales distintos para que no parpadee justo en el límite
    const handleScroll = () => setIsScrolled((antes) => (antes ? window.scrollY > 20 : window.scrollY > 80));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);            // desplegable de productos (ordenador)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);    // menú hamburguesa
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false); // productos dentro del menú móvil
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Cerrar todo al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  // Cerrar el desplegable de productos al pulsar fuera o con Esc
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const alPulsar = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    const alTeclear = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('mousedown', alPulsar);
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.removeEventListener('mousedown', alPulsar);
      document.removeEventListener('keydown', alTeclear);
    };
  }, [isMenuOpen]);

  const enProductos = pathname.startsWith('/productos') || pathname.startsWith('/catalogo_productos');

  return (
    <>
      {/***************** BARRA SUPERIOR (se va al hacer scroll) ********************/}
      <div className="bg-[#588157] text-white text-sm">
        <div className="max-w-[88rem] mx-auto px-4 lg:px-8 h-10 flex items-center justify-between gap-4 whitespace-nowrap">

          {/* IZQUIERDA (solo ordenador): entrega y ubicación */}
          <div className="hidden lg:flex items-center gap-5">
            <span className="flex items-center gap-2 font-semibold">
              <FaTruck /> {t('Entrega inmediata')}
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <FaMapMarkerAlt /> {t('Sevilla')}, {t('Andalucía')}
            </span>
          </div>

          {/* MÓVIL: llamar + presupuesto */}
          <div className="flex lg:hidden items-center gap-4">
            <a href={TELEFONO.href} className="flex items-center gap-1.5 font-semibold">
              <FaPhoneAlt size={12} /> {t('Llamar')}
            </a>
            <Link to="/presupuesto" className="flex items-center gap-1.5 font-semibold">
              <FaFileAlt size={12} /> {t('Presupuesto')}
            </Link>
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-5">
              <a href={TELEFONO.href} className="flex items-center gap-2 hover:underline">
                <FaPhoneAlt size={12} /> {TELEFONO.texto}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:underline">
                <FaEnvelope size={12} /> {EMAIL}
              </a>
              <IconosRedes />
              <span className="w-px h-5 bg-white/40"></span>
            </div>
            <LanguageSwitcher />
          </div>

        </div>
      </div>

      {/***************** HEADER PRINCIPAL (fijo arriba) ********************/}
      <header ref={headerRef} className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>

        <div className={`max-w-[88rem] mx-auto px-4 lg:px-8 flex items-center justify-between gap-6 2xl:gap-10 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>

          {/***************** LOGO ********************/}
          <Logo compacto={isScrolled} />

          {/***************** NAVEGADOR DE SECCIONES (ordenador) ********************/}
          <nav aria-label={t('Menú')} className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-5 xl:gap-7 2xl:gap-8 text-sm xl:text-[15px] whitespace-nowrap">
              {ENLACES_ANTES.map((e) => (
                <li key={e.to}>
                  <NavLink to={e.to} end={e.exacto} className={({ isActive }) => claseEnlace(isActive)}>{t(e.texto)}</NavLink>
                </li>
              ))}

              {/* PRODUCTOS con desplegable */}
              <li>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-expanded={isMenuOpen}
                  className={`flex items-center gap-1 ${claseEnlace(enProductos || isMenuOpen)}`}
                >
                  {t('PRODUCTOS')} <FaAngleDown className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </li>

              {ENLACES_DESPUES.map((e) => (
                <li key={e.to}>
                  <NavLink to={e.to} className={({ isActive }) => claseEnlace(isActive)}>{t(e.texto)}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/***************** BUSCADOR + PRESUPUESTO (ordenador) ********************/}
          <div className="hidden lg:flex items-center gap-4">
            {/* En portátiles solo la lupa; desde 1440 px, la caja de búsqueda completa */}
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} type="button" className="min-[1440px]:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#344e41] hover:bg-gray-100 transition" aria-label={t('Buscar productos')} aria-expanded={mobileSearchOpen}>
              {mobileSearchOpen ? <FaTimes /> : <FaSearch />}
            </button>
            <Buscador className="hidden min-[1440px]:block w-56 2xl:w-64" />
            <Link to="/presupuesto" className="flex items-center gap-2 bg-[#BC6C25] hover:bg-[#a35b1d] text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition whitespace-nowrap">
              <FaFileAlt />
              <span className="xl:hidden">{t('Presupuesto')}</span>
              <span className="hidden xl:inline">{t('Pide presupuesto')}</span>
            </Link>
          </div>

          {/* ICONOS MÓVIL */}
          <div className="lg:hidden flex items-center gap-4 text-[#344e41]">
            <button onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setMobileMenuOpen(false); }} type="button" className="text-xl" aria-label={t('Buscar productos')} aria-expanded={mobileSearchOpen}>
              <FaSearch />
            </button>
            <button onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileSearchOpen(false); }} type="button" className="text-2xl" aria-label={t('Menú')} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/***************** DESPLEGABLE DE PRODUCTOS (ordenador) ********************/}
        {isMenuOpen && (
          <div className="hidden lg:block absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl">
            <div className="max-w-[88rem] mx-auto px-8 py-8">
              <ul className="grid grid-cols-4 gap-x-6 gap-y-5">
                {categorias.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/productos/${c.slug}`} className="group flex gap-3 p-2 -m-2 rounded-xl hover:bg-[#f8f7ef] transition">
                      <img src={c.imagen} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0 bg-gray-100" />
                      <span className="min-w-0">
                        <span className="block font-bold text-[#344e41] group-hover:text-[#BC6C25] transition-colors">{t(c.nombre)}</span>
                        <span className="block text-xs text-gray-500 leading-snug line-clamp-2">{t(c.resumen)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-sm">
                <Link to="/catalogo_productos" className="flex items-center gap-2 font-semibold text-[#BC6C25] hover:underline">
                  {t('Ver catálogo completo')} <FaArrowRight size={12} />
                </Link>
                <span className="text-gray-500">
                  {t('¿No sabes cuál elegir?')}{' '}
                  <Link to="/presupuesto" className="font-semibold text-[#588157] hover:underline">{t('Te asesoramos sin compromiso')}</Link>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* BUSCADOR MÓVIL */}
        {mobileSearchOpen && (
          <div className="min-[1440px]:hidden border-t border-gray-200 px-4 py-3">
            <div className="max-w-2xl mx-auto">
              <Buscador autoFocus onNavegar={() => setMobileSearchOpen(false)} />
            </div>
          </div>
        )}

        {/* MENÚ MÓVIL */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav aria-label={t('Menú')} className="px-4 py-2">
              <ul className="divide-y divide-gray-100 font-semibold text-[#344e41]">
                {ENLACES_ANTES.map((e) => (
                  <li key={e.to}>
                    <NavLink to={e.to} end={e.exacto} className={({ isActive }) => `block py-3 ${isActive ? 'text-[#BC6C25]' : ''}`}>{t(e.texto)}</NavLink>
                  </li>
                ))}

                <li>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    aria-expanded={mobileProductsOpen}
                    className={`w-full flex items-center justify-between py-3 ${enProductos ? 'text-[#BC6C25]' : ''}`}
                  >
                    {t('PRODUCTOS')} <FaAngleDown className={`transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileProductsOpen && (
                    <ul className="pb-3 pl-3 space-y-1 font-normal">
                      {categorias.map((c) => (
                        <li key={c.slug}>
                          <NavLink to={`/productos/${c.slug}`} className={({ isActive }) => `flex items-center gap-3 py-1.5 ${isActive ? 'text-[#BC6C25] font-semibold' : 'text-gray-700'}`}>
                            <img src={c.imagen} alt="" className="w-8 h-8 rounded object-cover bg-gray-100" />
                            {t(c.nombre)}
                          </NavLink>
                        </li>
                      ))}
                      <li>
                        <Link to="/catalogo_productos" className="block py-2 font-semibold text-[#BC6C25]">{t('Ver catálogo completo')} →</Link>
                      </li>
                    </ul>
                  )}
                </li>

                {ENLACES_DESPUES.map((e) => (
                  <li key={e.to}>
                    <NavLink to={e.to} className={({ isActive }) => `block py-3 ${isActive ? 'text-[#BC6C25]' : ''}`}>{t(e.texto)}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-4 pb-6 pt-2 space-y-4">
              <Link to="/presupuesto" className="flex items-center justify-center gap-2 bg-[#BC6C25] text-white font-semibold py-3 rounded-lg">
                <FaFileAlt /> {t('Pide presupuesto')}
              </Link>
              <div className="bg-[#f8f7ef] rounded-xl p-4 space-y-3 text-sm text-[#344e41]">
                <a href={TELEFONO.href} className="flex items-center gap-2"><FaPhoneAlt className="text-[#BC6C25]" /> {TELEFONO.texto}</a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2"><FaEnvelope className="text-[#BC6C25]" /> {EMAIL}</a>
                <p className="flex items-center gap-2"><FaTruck className="text-[#BC6C25]" /> {t('Entrega inmediata')}</p>
                <IconosRedes tamano={22} className="pt-1" />
              </div>
            </div>
          </div>
        )}

      </header>
    </>
  );
};

export default Header;
