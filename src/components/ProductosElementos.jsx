import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaFileAlt, FaChevronRight } from 'react-icons/fa';
import {
  categorias, productosDeCategoria, imagenProducto, enlaceProducto, enlacePresupuesto, COLORES,
} from '../utils/productos';

const NARANJA = '#BC6C25';

// Círculo con el color del panel
export const MuestraColor = ({ color, conTexto = false }) => {
  const { t } = useTranslation();
  return (
    <span className="inline-flex items-center gap-2" title={t(color)}>
      <span
        className="w-5 h-5 rounded-full border border-gray-300 shadow-inner shrink-0"
        style={{ backgroundColor: COLORES[color] || '#ddd' }}
      ></span>
      {conTexto && <span className="text-sm text-gray-700">{t(color)}</span>}
    </span>
  );
};

// Etiqueta pequeña (espesores, usos...)
export const Etiqueta = ({ children, variante = 'gris' }) => {
  const estilos = {
    gris: 'bg-gray-100 text-gray-700',
    verde: 'bg-[#588157]/10 text-[#344e41]',
  };
  return <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${estilos[variante]}`}>{children}</span>;
};

// Tarjeta de categoría (catálogo)
export const TarjetaCategoria = ({ categoria }) => {
  const { t } = useTranslation();
  const total = productosDeCategoria(categoria.slug).length;
  return (
    <Link to={`/productos/${categoria.slug}`} className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img src={categoria.imagen} alt={t(categoria.nombre)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {total} {total === 1 ? t('modelo') : t('modelos')}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#588157] transition">{t(categoria.nombre)}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{t(categoria.resumen)}</p>
        <span className="flex items-center gap-2 font-semibold text-sm" style={{ color: NARANJA }}>
          {t('Ver modelos')} <FaArrowRight className="group-hover:translate-x-1 transition" />
        </span>
      </div>
    </Link>
  );
};

// Tarjeta de producto (página de categoría)
export const TarjetaProducto = ({ producto }) => {
  const { t } = useTranslation();
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
      <Link to={enlaceProducto(producto)} className="relative h-48 overflow-hidden bg-gray-100 block">
        <img src={imagenProducto(producto)} alt={producto.nombre} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-3 left-3 bg-[#588157] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
          {t('Segunda mano')}
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Link to={enlaceProducto(producto)}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#588157] transition">{producto.nombre}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 flex-1">{producto.descripcion}</p>

        <div className="space-y-3 mb-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{t('Espesores')}</p>
            <div className="flex flex-wrap gap-1.5">
              {producto.espesores.map((e) => <Etiqueta key={e}>{e}</Etiqueta>)}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">{t('Colores')}</p>
            <div className="flex flex-wrap gap-1.5">
              {producto.colores.map((c) => <MuestraColor key={c} color={c} />)}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={enlaceProducto(producto)} className="flex-1 text-center border-2 border-[#588157] text-[#588157] font-semibold py-2 rounded-lg hover:bg-[#588157] hover:text-white transition text-sm">
            {t('Ver detalles')}
          </Link>
          <Link to={enlacePresupuesto(producto)} style={{ backgroundColor: NARANJA }} className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition text-sm">
            <FaFileAlt /> {t('Presupuesto')}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Barra para saltar entre categorías
export const NavCategorias = ({ activa }) => {
  const { t } = useTranslation();
  const navRef = useRef(null);

  // En móvil, desplazar la barra para que se vea la categoría activa
  useEffect(() => {
    const nav = navRef.current;
    const enlace = nav?.querySelector('[aria-current="page"]');
    if (nav && enlace) nav.scrollLeft = enlace.offsetLeft - nav.clientWidth / 2 + enlace.clientWidth / 2;
  }, [activa]);

  return (
    <nav ref={navRef} aria-label={t('Categorías de productos')} className="relative overflow-x-auto -mx-4 px-4">
      <ul className="flex gap-2 w-max mx-auto">
        {categorias.map((c) => (
          <li key={c.slug}>
            <Link
              to={`/productos/${c.slug}`}
              aria-current={c.slug === activa ? 'page' : undefined}
              className={`block whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition ${c.slug === activa
                ? 'bg-[#588157] border-[#588157] text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-[#588157] hover:text-[#588157]'}`}
            >
              {t(c.nombre)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Franja final de llamada a la acción
export const FranjaPresupuesto = ({ titulo, texto }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#344e41] text-white py-14 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{titulo || t('¿No encuentras lo que buscas?')}</h2>
        <p className="text-lg text-gray-200 mb-8">{texto || t('Nuestro stock cambia constantemente. Cuéntanos qué necesitas y te buscamos el panel ideal.')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/presupuesto" style={{ backgroundColor: NARANJA }} className="text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition">
            {t('Pide presupuesto')}
          </Link>
          <a href="tel:+34123456789" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-[#344e41] transition">
            {t('Llámanos')}: 123 456 789
          </a>
        </div>
      </div>
    </section>
  );
};

// Miga de pan: Inicio > Productos > ...
export const MigaDePan = ({ pasos }) => {
  const { t } = useTranslation();
  return (
    <nav aria-label={t('Ruta de navegación')} className="text-sm text-[#FEFAE0] mb-6">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/" className="hover:underline">{t('Inicio')}</Link></li>
        {pasos.map((paso) => (
          <li key={paso.texto} className="flex items-center gap-1">
            <FaChevronRight size={10} />
            {paso.to ? <Link to={paso.to} className="hover:underline">{paso.texto}</Link> : <span className="text-white font-semibold">{paso.texto}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
