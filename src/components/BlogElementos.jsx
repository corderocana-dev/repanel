import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaRegClock, FaRegCalendarAlt, FaArrowRight } from 'react-icons/fa';

const NARANJA = '#BC6C25';

// Formatea la fecha según el idioma activo (ej. "10 nov 2026")
const formatearFecha = (fecha, idioma) =>
  new Date(fecha).toLocaleDateString(idioma === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

// Etiqueta de categoría
export const EtiquetaCategoria = ({ categoria, className = '' }) => {
  const { t } = useTranslation();
  return (
    <span className={`inline-block bg-[#588157] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${className}`}>
      {t(categoria)}
    </span>
  );
};

// Fecha y tiempo de lectura
export const MetaArticulo = ({ articulo, className = '' }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm ${className}`}>
      <span className="flex items-center gap-1"><FaRegCalendarAlt /> {formatearFecha(articulo.fecha, i18n.language)}</span>
      <span className="flex items-center gap-1"><FaRegClock /> {articulo.minutos} {t('min de lectura')}</span>
    </div>
  );
};

// Tarjeta de artículo para listados
export const TarjetaArticulo = ({ articulo }) => {
  const { t } = useTranslation();
  return (
    <Link to={`/blog/${articulo.slug}`} className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={articulo.imagen} alt={articulo.titulo} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <EtiquetaCategoria categoria={articulo.categoria} className="absolute top-4 left-4" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <MetaArticulo articulo={articulo} className="text-gray-500 mb-3" />
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#588157] transition">{articulo.titulo}</h3>
        <p className="text-gray-600 mb-4 flex-1">{articulo.resumen}</p>
        <span className="flex items-center gap-2 font-semibold" style={{ color: NARANJA }}>
          {t('Leer artículo')} <FaArrowRight className="group-hover:translate-x-1 transition" />
        </span>
      </div>
    </Link>
  );
};
