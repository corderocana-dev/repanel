import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import articulos from '../locals/blog.json';
import { EtiquetaCategoria, MetaArticulo, TarjetaArticulo } from '../components/BlogElementos';

const NARANJA = '#BC6C25';

const Blog = () => {

  const { t } = useTranslation();

  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Ordenados del más reciente al más antiguo
  const ordenados = useMemo(() => [...articulos].sort((a, b) => b.fecha.localeCompare(a.fecha)), []);
  const categorias = useMemo(() => ['Todos', ...new Set(ordenados.map((a) => a.categoria))], [ordenados]);

  const destacado = ordenados.find((a) => a.destacado) || ordenados[0];
  const hayFiltro = categoriaActiva !== 'Todos' || busqueda.trim() !== '';

  const filtrados = ordenados.filter((a) => {
    const texto = busqueda.trim().toLowerCase();
    const coincideCategoria = categoriaActiva === 'Todos' || a.categoria === categoriaActiva;
    const coincideTexto = !texto || a.titulo.toLowerCase().includes(texto) || a.resumen.toLowerCase().includes(texto);
    // Sin filtros, el destacado ya se muestra arriba
    return coincideCategoria && coincideTexto && (hayFiltro || a.slug !== destacado.slug);
  });

  return (
    <>
      <Helmet>
        <title>{t('Blog | RePanel')}</title>
        <meta name="description" content={t('Guías, consejos y novedades sobre paneles sándwich: cómo elegirlos, instalarlos y ahorrar con panel de segunda mano.')} />
        <meta name="keywords" content="blog paneles sandwich, guía panel sandwich, instalar panel cubierta, panel segunda mano, repanel" />
        <link rel="canonical" href="http://localhost:5173/blog" />
      </Helmet>

      {/* CABECERA */}
      <section className="relative bg-[url('/panel_chapaperfilada.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#344e41]/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-20 px-6">
          <p className="uppercase tracking-widest text-sm font-semibold text-[#FEFAE0] mb-3">{t('Blog')}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('Guías y consejos sobre paneles sándwich')}</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            {t('Todo lo que necesitas saber para elegir, instalar y sacar el máximo partido a tus paneles.')}
          </p>
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder={t('Buscar artículos...')}
              className="w-full pl-11 pr-4 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7ef] py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* FILTRO POR CATEGORÍA */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaActiva(categoria)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${categoriaActiva === categoria
                  ? 'bg-[#588157] border-[#588157] text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-[#588157] hover:text-[#588157]'}`}
              >
                {t(categoria)}
              </button>
            ))}
          </div>

          {/* ARTÍCULO DESTACADO (solo sin filtros) */}
          {!hayFiltro && destacado && (
            <Link to={`/blog/${destacado.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden mb-12 hover:shadow-xl transition">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={destacado.imagen} alt={destacado.titulo} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-4 left-4 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full" style={{ backgroundColor: NARANJA }}>
                  {t('Destacado')}
                </span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <EtiquetaCategoria categoria={destacado.categoria} className="self-start mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-[#588157] transition">{destacado.titulo}</h2>
                <p className="text-gray-600 text-lg mb-6">{destacado.resumen}</p>
                <MetaArticulo articulo={destacado} className="text-gray-500 mb-6" />
                <span className="flex items-center gap-2 font-semibold" style={{ color: NARANJA }}>
                  {t('Leer artículo')} <FaArrowRight className="group-hover:translate-x-1 transition" />
                </span>
              </div>
            </Link>
          )}

          {/* LISTADO */}
          {filtrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrados.map((articulo) => (
                <TarjetaArticulo key={articulo.slug} articulo={articulo} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">{t('No hemos encontrado artículos con esos criterios.')}</p>
              <button
                type="button"
                onClick={() => { setCategoriaActiva('Todos'); setBusqueda(''); }}
                className="font-semibold text-[#588157] hover:underline"
              >
                {t('Ver todos los artículos')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* LLAMADA A LA ACCIÓN */}
      <section className="bg-[#344e41] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">{t('¿Tienes un proyecto entre manos?')}</h2>
          <p className="text-lg text-gray-200 mb-8">{t('Te asesoramos sin compromiso para que elijas el panel que mejor se adapta a tu obra.')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/presupuesto" style={{ backgroundColor: NARANJA }} className="text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition">
              {t('Pide presupuesto')}
            </Link>
            <Link to="/contacto" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-[#344e41] transition">
              {t('Contactar con Nosotros')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
