import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaLightbulb, FaFileAlt, FaUserCircle } from 'react-icons/fa';
import articulos from '../locals/blog.json';
import { EtiquetaCategoria, MetaArticulo, TarjetaArticulo } from '../components/BlogElementos';

const NARANJA = '#BC6C25';

// Pinta cada bloque del contenido según su tipo
const BloqueContenido = ({ bloque }) => {
  const { t } = useTranslation();

  switch (bloque.tipo) {
    case 'h2':
      return <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">{bloque.texto}</h2>;
    case 'lista':
      return (
        <ul className="space-y-2 mb-6">
          {bloque.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-gray-700">
              <span className="mt-2.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: NARANJA }}></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'consejo':
      return (
        <div className="my-8 bg-[#FEFAE0] border-l-4 rounded-r-xl p-6 flex gap-4" style={{ borderColor: NARANJA }}>
          <FaLightbulb size={22} className="shrink-0 mt-1" style={{ color: NARANJA }} />
          <div>
            <p className="font-bold text-gray-800 mb-1">{t('Consejo Repanel')}</p>
            <p className="text-gray-700">{bloque.texto}</p>
          </div>
        </div>
      );
    default:
      return <p className="text-lg text-gray-700 leading-relaxed mb-5">{bloque.texto}</p>;
  }
};

const ArticuloBlog = () => {

  const { t } = useTranslation();
  const { slug } = useParams();

  const articulo = articulos.find((a) => a.slug === slug);

  // Artículo no encontrado
  if (!articulo) {
    return (
      <div className="bg-[#f8f7ef] py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('Artículo no encontrado')}</h1>
        <p className="text-gray-600 mb-8">{t('Puede que se haya movido o que la dirección no sea correcta.')}</p>
        <Link to="/blog" className="inline-block bg-[#588157] text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">
          {t('Volver al blog')}
        </Link>
      </div>
    );
  }

  // Relacionados: primero de la misma categoría, luego los más recientes
  const relacionados = articulos
    .filter((a) => a.slug !== articulo.slug)
    .sort((a, b) => (b.categoria === articulo.categoria) - (a.categoria === articulo.categoria) || b.fecha.localeCompare(a.fecha))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{`${articulo.titulo} | Repanel`}</title>
        <meta name="description" content={articulo.resumen} />
        <link rel="canonical" href={`http://localhost:5173/blog/${articulo.slug}`} />
      </Helmet>

      {/* CABECERA CON IMAGEN */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: `url('${articulo.imagen}')` }}>
        <div className="absolute inset-0 bg-[#344e41]/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white py-20 px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#FEFAE0] hover:underline mb-6">
            <FaArrowLeft /> {t('Volver al blog')}
          </Link>
          <div>
            <EtiquetaCategoria categoria={articulo.categoria} className="mb-4" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{articulo.titulo}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-100">
            <span className="flex items-center gap-2 text-sm"><FaUserCircle size={18} /> {articulo.autor}</span>
            <MetaArticulo articulo={articulo} />
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7ef] py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CONTENIDO */}
          <article className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 md:p-10">
            <p className="text-xl text-gray-800 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-200">{articulo.resumen}</p>
            {articulo.contenido.map((bloque, index) => (
              <BloqueContenido key={index} bloque={bloque} />
            ))}
          </article>

          {/* BARRA LATERAL */}
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <div className="bg-[#588157] text-white rounded-2xl p-6">
              <FaFileAlt size={26} className="mb-3" />
              <p className="text-xl font-bold mb-2">{t('¿Necesitas paneles para tu obra?')}</p>
              <p className="text-[#FEFAE0] mb-5">{t('Pídenos presupuesto sin compromiso y te asesoramos.')}</p>
              <Link to="/presupuesto" className="block text-center bg-white text-[#344e41] font-semibold py-2 px-5 rounded-lg hover:bg-[#FEFAE0] transition">
                {t('Pide presupuesto')}
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="font-bold text-gray-800 mb-4">{t('Otros artículos')}</p>
              <ul className="space-y-4">
                {relacionados.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/blog/${a.slug}`} className="flex gap-3 group">
                      <img src={a.imagen} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-[#588157] transition">{a.titulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* SIGUE LEYENDO */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('Sigue leyendo')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relacionados.map((a) => (
              <TarjetaArticulo key={a.slug} articulo={a} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticuloBlog;
