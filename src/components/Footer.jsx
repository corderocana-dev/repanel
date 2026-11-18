import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { categorias } from '../utils/productos';
import Logo from './Logo';

// Redes sociales (cambia estas direcciones por los perfiles reales de la empresa)
const REDES = [
  { nombre: 'Facebook', href: 'https://www.facebook.com/', icono: FaFacebook },
  { nombre: 'Instagram', href: 'https://www.instagram.com/', icono: FaInstagram },
  { nombre: 'LinkedIn', href: 'https://www.linkedin.com/', icono: FaLinkedin },
];

const ANIO_INICIO = 2015;

// Estilos comunes
const tituloClass = 'text-sm font-bold uppercase tracking-wider text-[#FEFAE0] mb-4';
const enlaceClass = 'text-gray-200 hover:text-[#E9A25F] transition-colors';

const Footer = () => {

  const { t } = useTranslation();
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-[#263a30] text-gray-200 border-t-4 border-[#588157]">

      {/****************** COLUMNAS ******************/}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">

        {/* MARCA */}
        <div className="col-span-2 lg:col-span-4">
          <Logo oscuro frase={false} className="mb-5 w-fit" />
          <p className="text-gray-300 max-w-sm mb-6">
            {t('Paneles sándwich de segunda mano: ahorro, calidad y sostenibilidad para tu obra.')}
          </p>
          <div className="flex items-center gap-3">
            {REDES.map((red) => (
              <a
                key={red.nombre}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={red.nombre}
                title={red.nombre}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#BC6C25] transition-colors"
              >
                <red.icono size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* PRODUCTOS */}
        <nav aria-label={t('Productos')} className="lg:col-span-3">
          <h2 className={tituloClass}>
            <Link to="/catalogo_productos" className="hover:text-[#E9A25F] transition-colors">{t('Productos')}</Link>
          </h2>
          <ul className="space-y-2 text-sm">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link to={`/productos/${c.slug}`} className={enlaceClass}>{t(c.nombre)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* EMPRESA */}
        <nav aria-label={t('EMPRESA')} className="lg:col-span-2">
          <h2 className={tituloClass}>{t('EMPRESA')}</h2>
          <ul className="space-y-2 text-sm">
            <li><HashLink to="/quienessomos#quienes-somos" className={enlaceClass}>{t('Quiénes Somos')}</HashLink></li>
            <li><HashLink to="/quienessomos#nuestro-equipo" className={enlaceClass}>{t('Nuestro Equipo')}</HashLink></li>
            <li><HashLink to="/quienessomos#m-v-v" className={enlaceClass}>{t('Misión y Valores')}</HashLink></li>
            <li><Link to="/blog" className={enlaceClass}>{t('Blog')}</Link></li>
            <li><Link to="/faq" className={enlaceClass}>{t('Preguntas frecuentes')}</Link></li>
            <li><Link to="/contacto" className={enlaceClass}>{t('Contacto')}</Link></li>
          </ul>
        </nav>

        {/* CONTACTO */}
        <address className="col-span-2 lg:col-span-3 not-italic">
          <h2 className={tituloClass}>{t('Contacto')}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+34123456789" className={`flex items-center gap-3 ${enlaceClass}`}>
                <FaPhoneAlt className="shrink-0 text-[#E9A25F]" /> +34 123 456 789
              </a>
            </li>
            <li>
              <a href="mailto:info@repanel.example" className={`flex items-center gap-3 ${enlaceClass}`}>
                <FaEnvelope className="shrink-0 text-[#E9A25F]" /> info@repanel.example
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps?q=Sevilla" target="_blank" rel="noopener noreferrer" className={`flex items-start gap-3 ${enlaceClass}`}>
                <FaMapMarkerAlt className="shrink-0 mt-0.5 text-[#E9A25F]" /> {t('Calle')} del Ejemplo, 12, {t('Sevilla')}, {t('Andalucía')}
              </a>
            </li>
          </ul>
          <Link to="/presupuesto" className="inline-flex items-center gap-2 mt-6 bg-[#BC6C25] hover:opacity-90 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition">
            <FaFileAlt /> {t('Pide presupuesto')}
          </Link>
        </address>

      </div>

      {/****************** BARRA DE COPYRIGHT ******************/}
      <div className="bg-[#1e2e26] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-300">
          <p className="text-center md:text-left">
            © {ANIO_INICIO}–{anioActual} RePanel. {t('Todos los derechos reservados')}.
            <span className="block md:inline md:ml-2 text-gray-400">· {t('Proyecto de portfolio: empresa y datos ficticios.')}</span>
          </p>
          <nav aria-label={t('INFORMACIÓN LEGAL')}>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <li><HashLink to="/informaciónLegal#aviso-legal" className="hover:text-white transition-colors">{t('Aviso Legal')}</HashLink></li>
              <li><HashLink to="/informaciónLegal#politica-privacidad" className="hover:text-white transition-colors">{t('Privacidad')}</HashLink></li>
              <li><HashLink to="/informaciónLegal#politica-cookies" className="hover:text-white transition-colors">{t('Cookies')}</HashLink></li>
              <li><HashLink to="/informaciónLegal#terminos-condiciones" className="hover:text-white transition-colors">{t('Términos')}</HashLink></li>
            </ul>
          </nav>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
