import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaHome, FaIndustry, FaSnowflake, FaFire, FaTractor, FaSun, FaArrowRight, FaCheckCircle, FaRecycle, FaShieldAlt } from 'react-icons/fa';
import { categorias, obtenerCategoria } from '../utils/productos';
import { TarjetaCategoria, FranjaPresupuesto } from '../components/ProductosElementos';

const NARANJA = '#BC6C25';

// Guía rápida: necesidad del cliente → categoría recomendada
const GUIA = [
  { icono: FaHome, necesidad: 'Tejado de una vivienda', categoria: 'panel_teja' },
  { icono: FaIndustry, necesidad: 'Cubierta de una nave', categoria: 'cubierta' },
  { icono: FaSnowflake, necesidad: 'Cámara frigorífica', categoria: 'frío_industrial' },
  { icono: FaFire, necesidad: 'Protección contra incendios', categoria: 'lana_de_roca' },
  { icono: FaTractor, necesidad: 'Granja o nave ganadera', categoria: 'agropanel' },
  { icono: FaSun, necesidad: 'Más luz natural', categoria: 'lucernario' },
];

const Catalogo = () => {

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Catálogo de Paneles Sandwich | Repanel')}</title>
        <meta name="description" content={t('Explora todos los tipos de paneles sandwich de segunda mano disponibles. Alta calidad, sostenibilidad y ahorro garantizado.')} />
        <meta name="keywords" content="paneles sandwich, segunda mano, paneles de teja, paneles fachada, agropaneles, catálogo, repanel" />
        <link rel="canonical" href="http://localhost:5173/catalogo_productos" />
      </Helmet>

      {/* CABECERA */}
      <section className="relative bg-[url('/image_Home.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#344e41]/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-20 px-6">
          <p className="uppercase tracking-widest text-sm font-semibold text-[#FEFAE0] mb-3">{t('Catálogo')}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('Paneles sándwich de segunda mano')}</h1>
          <p className="text-lg md:text-xl text-gray-100">
            {t('8 familias de paneles revisados y listos para tu obra, a una fracción del precio del panel nuevo.')}
          </p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="bg-[#f8f7ef] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">{t('Elige el tipo de panel')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">{t('Cada familia tiene varios modelos. Entra para ver espesores, colores y usos de cada uno.')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <TarjetaCategoria key={categoria.slug} categoria={categoria} />
            ))}
          </div>
        </div>
      </section>

      {/* GUÍA: ¿QUÉ PANEL NECESITO? */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">{t('¿No sabes qué panel necesitas?')}</h2>
          <p className="text-gray-600 text-center mb-10">{t('Dinos para qué lo quieres y te decimos por dónde empezar.')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIA.map((item) => {
              const categoria = obtenerCategoria(item.categoria);
              return (
                <Link key={item.necesidad} to={`/productos/${item.categoria}`} className="group flex items-center gap-4 border border-gray-200 rounded-xl p-5 hover:border-[#588157] hover:bg-[#588157]/5 transition">
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#BC6C25]/10">
                    <item.icono size={20} style={{ color: NARANJA }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800">{t(item.necesidad)}</p>
                    <p className="text-sm text-[#588157] font-semibold">→ {t(categoria.nombre)}</p>
                  </div>
                  <FaArrowRight className="text-gray-400 group-hover:text-[#588157] group-hover:translate-x-1 transition" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="bg-[#FEFAE0] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">{t('Comparativa rápida')}</h2>
          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full text-left min-w-[640px]">
              <thead className="bg-[#588157] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">{t('Tipo de panel')}</th>
                  <th className="px-5 py-4 font-semibold">{t('Aislamiento')}</th>
                  <th className="px-5 py-4 font-semibold">{t('Espesores')}</th>
                  <th className="px-5 py-4 font-semibold">{t('Ideal para')}</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((c, index) => (
                  <tr key={c.slug} className={index % 2 ? 'bg-gray-50' : ''}>
                    <td className="px-5 py-3">
                      <Link to={`/productos/${c.slug}`} className="font-semibold text-gray-800 hover:text-[#588157] hover:underline">{t(c.nombre)}</Link>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{t(c.aislamiento)}</td>
                    <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{t(c.espesores)}</td>
                    <td className="px-5 py-3 text-gray-700">{t(c.usos[0])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* POR QUÉ SEGUNDA MANO */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FaCheckCircle size={36} style={{ color: NARANJA }} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t('Ahorro')}</h3>
            <p className="text-gray-600">{t('Compra paneles de alta calidad a precios reducidos.')}</p>
          </div>
          <div>
            <FaRecycle size={36} style={{ color: NARANJA }} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t('Sostenibilidad')}</h3>
            <p className="text-gray-600">{t('Contribuye al reciclaje y al cuidado del medio ambiente.')}</p>
          </div>
          <div>
            <FaShieldAlt size={36} style={{ color: NARANJA }} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">{t('Calidad garantizada')}</h3>
            <p className="text-gray-600">{t('Paneles inspeccionados y garantizados para asegurar su resistencia.')}</p>
          </div>
        </div>
      </section>

      <FranjaPresupuesto />
    </>
  );
};

export default Catalogo;
