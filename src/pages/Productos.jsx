import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaLayerGroup, FaRulerVertical, FaThLarge } from 'react-icons/fa';
import { categorias, obtenerCategoria, productosDeCategoria } from '../utils/productos';
import { TarjetaProducto, TarjetaCategoria, NavCategorias, FranjaPresupuesto, MigaDePan } from '../components/ProductosElementos';

const NARANJA = '#BC6C25';

const Productos = () => {

  const { t } = useTranslation();
  const { categoria: slug } = useParams();

  const categoria = obtenerCategoria(slug);

  // Categoría que no existe
  if (!categoria) {
    return (
      <div className="bg-[#f8f7ef] py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('Categoría no encontrada')}</h1>
        <p className="text-gray-600 mb-8">{t('Echa un vistazo a nuestro catálogo completo.')}</p>
        <Link to="/catalogo_productos" className="inline-block bg-[#588157] text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">
          {t('Ver catálogo')}
        </Link>
      </div>
    );
  }

  const productos = productosDeCategoria(slug);
  // Las 4 categorías siguientes a la actual (dando la vuelta al final)
  const posicion = categorias.findIndex((c) => c.slug === slug);
  const otras = [1, 2, 3, 4].map((n) => categorias[(posicion + n) % categorias.length]);

  return (
    <>
      <Helmet>
        <title>{`${t(categoria.nombre)} | ${t('Paneles Sándwich Segunda Mano')} | Repanel`}</title>
        <meta name="description" content={t(categoria.resumen)} />
        <meta name="keywords" content={`panel ${categoria.nombre.toLowerCase()}, panel sándwich segunda mano, ${productos.map((p) => p.nombre.toLowerCase()).join(', ')}, repanel`} />
        <link rel="canonical" href={`http://localhost:5173/productos/${categoria.slug}`} />
      </Helmet>

      {/* CABECERA */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: `url('${categoria.imagen}')` }}>
        <div className="absolute inset-0 bg-[#344e41]/75"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-white py-16 px-6">
          <MigaDePan pasos={[{ texto: t('Productos'), to: '/catalogo_productos' }, { texto: t(categoria.nombre) }]} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t(categoria.nombre)}</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">{t(categoria.resumen)}</p>
        </div>
      </section>

      {/* SALTAR ENTRE CATEGORÍAS */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <NavCategorias activa={slug} />
      </div>

      {/* DESCRIPCIÓN + DATOS CLAVE */}
      <section className="bg-[#f8f7ef] pt-14 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Sobre este tipo de panel')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{categoria.descripcion}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex items-center gap-3">
              <FaLayerGroup style={{ color: NARANJA }} />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{t('Aislamiento')}</p>
                <p className="font-semibold text-gray-800">{t(categoria.aislamiento)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaRulerVertical style={{ color: NARANJA }} />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{t('Espesores')}</p>
                <p className="font-semibold text-gray-800">{t(categoria.espesores)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaThLarge style={{ color: NARANJA }} />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{t('Modelos')}</p>
                <p className="font-semibold text-gray-800">{productos.length} {productos.length === 1 ? t('modelo') : t('modelos')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section className="bg-[#f8f7ef] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('Modelos disponibles')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            {t('Al ser material de segunda mano, la disponibilidad de cada espesor y color puede variar. Consúltanos el stock actual.')}
          </p>
        </div>
      </section>

      {/* USOS Y VENTAJAS */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FEFAE0] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">{t('Usos habituales')}</h2>
            <ul className="space-y-3">
              {categoria.usos.map((uso) => (
                <li key={uso} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: NARANJA }}></span>
                  {t(uso)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#588157] text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-5">{t('Ventajas')}</h2>
            <ul className="space-y-3">
              {categoria.ventajas.map((ventaja) => (
                <li key={ventaja} className="flex items-center gap-3">
                  <FaCheck className="shrink-0 text-[#FEFAE0]" />
                  {t(ventaja)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTRAS CATEGORÍAS */}
      <section className="bg-[#f8f7ef] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('Otros tipos de panel')}</h2>
            <Link to="/catalogo_productos" className="font-semibold hover:underline" style={{ color: NARANJA }}>{t('Ver catálogo completo')} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otras.map((c) => <TarjetaCategoria key={c.slug} categoria={c} />)}
          </div>
        </div>
      </section>

      <FranjaPresupuesto />
    </>
  );
};

export default Productos;
