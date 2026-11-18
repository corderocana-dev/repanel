import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Logo de la empresa: dibujo + nombre en texto (siempre legible)
// - oscuro: para fondos oscuros (footer), con el dibujo dentro de un círculo blanco
// - compacto: versión más pequeña y sin la frase (header al hacer scroll)
// - frase: muestra "Paneles sándwich de segunda mano" debajo del nombre
//   (se oculta en portátiles pequeños, 1024-1279 px, para dejar sitio al menú)
const Logo = ({ oscuro = false, compacto = false, frase = true, className = '' }) => {
  const { t } = useTranslation();

  return (
    <Link to="/" aria-label={`RePanel - ${t('Inicio')}`} className={`group flex items-center gap-3 shrink-0 ${className}`}>
      <span className={`shrink-0 flex items-center justify-center transition-all duration-300 ${oscuro ? 'bg-white rounded-full p-1.5 shadow-md' : ''} ${compacto ? 'w-11 h-11' : 'w-14 h-14'}`}>
        <img src="/logos/repanel-icono.svg" alt="" className="max-w-full max-h-full object-contain" />
      </span>
      <span className="leading-tight">
        <span className={`block font-extrabold tracking-tight transition-all duration-300 ${compacto ? 'text-lg' : 'text-xl'} ${oscuro ? 'text-white' : 'text-[#344e41]'}`}>
          RePanel
        </span>
        {frase && !compacto && (
          <span className={`hidden sm:block lg:hidden xl:block text-xs font-medium ${oscuro ? 'text-gray-300' : 'text-gray-500'}`}>
            {t('Paneles sándwich de segunda mano')}
          </span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
