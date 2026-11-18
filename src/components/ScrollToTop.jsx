// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si la URL lleva #seccion, bajar hasta esa sección
    if (hash) {
      const timer = setTimeout(() => {
        const elemento = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }

    // Scroll al inicio cuando cambia de ruta
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
