import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locals/es.json';  // Carga los textos en español
import en from './locals/en.json';  // Carga los textos en inglés

i18n
  .use(LanguageDetector)  // Detecta el idioma del navegador
  .use(initReactI18next)  // Integración con React
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',  // Si no se detecta el idioma, usar español por defecto
    interpolation: { escapeValue: false },
  });

// Mantener <html lang="..."> igual que el idioma activo (buscadores y lectores de pantalla)
const actualizarLang = (idioma) => { document.documentElement.lang = (idioma || 'es').slice(0, 2); };
actualizarLang(i18n.resolvedLanguage);
i18n.on('languageChanged', actualizarLang);

export default i18n;
