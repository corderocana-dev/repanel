import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaFileAlt, FaPhoneAlt, FaClipboardCheck, FaSearchPlus, FaBoxes, FaArrowLeft } from 'react-icons/fa';
import { obtenerCategoria, obtenerProducto, productosDeCategoria, imagenProducto, enlacePresupuesto } from '../utils/productos';
import { TarjetaProducto, MuestraColor, Etiqueta, MigaDePan, FranjaPresupuesto } from '../components/ProductosElementos';

const NARANJA = '#BC6C25';

const ProductoDetalle = () => {

  const { t } = useTranslation();
  const { categoria: slugCategoria, producto: slugProducto } = useParams();

  const categoria = obtenerCategoria(slugCategoria);
  const producto = obtenerProducto(slugCategoria, slugProducto);

  // Producto que no existe
  if (!categoria || !producto) {
    return (
      <div className="bg-[#f8f7ef] py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('Producto no encontrado')}</h1>
        <p className="text-gray-600 mb-8">{t('Echa un vistazo a nuestro catálogo completo.')}</p>
        <Link to={categoria ? `/productos/${categoria.slug}` : '/catalogo_productos'} className="inline-block bg-[#588157] text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">
          {categoria ? `${t('Ver')} ${t(categoria.nombre)}` : t('Ver catálogo')}
        </Link>
      </div>
    );
  }

  const otrosModelos = productosDeCategoria(slugCategoria).filter((p) => p.slug !== producto.slug);

  // Qué significa comprar panel de segunda mano
  const segundaMano = [
    { icono: FaClipboardCheck, texto: t('Revisado antes de la venta para comprobar que cumple su función.') },
    { icono: FaSearchPlus, texto: t('Puede tener pequeños defectos estéticos, como arañazos, que no afectan al aislamiento.') },
    { icono: FaBoxes, texto: t('El stock de cada espesor y color varía. Te confirmamos la disponibilidad al pedir presupuesto.') },
  ];

  return (
    <>
      <Helmet>
        <title>{`${producto.nombre} | ${t(categoria.nombre)} | Repanel`}</title>
        <meta name="description" content={producto.descripcion} />
        <link rel="canonical" href={`http://localhost:5173/productos/${categoria.slug}/${producto.slug}`} />
      </Helmet>

      {/* CABECERA */}
      <section className="bg-[#344e41] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <MigaDePan pasos={[
            { texto: t('Productos'), to: '/catalogo_productos' },
            { texto: t(categoria.nombre), to: `/productos/${categoria.slug}` },
            { texto: producto.nombre },
          ]} />
          <Link to={`/productos/${categoria.slug}`} className="inline-flex items-center gap-2 text-sm text-[#FEFAE0] hover:underline">
            <FaArrowLeft /> {t('Volver a')} {t(categoria.nombre)}
          </Link>
        </div>
      </section>

      {/* FICHA */}
      <section className="bg-[#f8f7ef] py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* IMAGEN */}
          <div className="lg:sticky lg:top-24">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={imagenProducto(producto)} alt={producto.nombre} className="w-full h-80 md:h-[28rem] object-cover" />
              <span className="absolute top-4 left-4 bg-[#588157] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                {t('Segunda mano')}
              </span>
            </div>
          </div>

          {/* DATOS */}
          <div>
            <Link to={`/productos/${categoria.slug}`} className="inline-block text-sm font-semibold uppercase tracking-wide mb-2 hover:underline" style={{ color: NARANJA }}>
              {t(categoria.nombre)}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{producto.nombre}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{producto.descripcion}</p>

            <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-100 mb-8">
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{t('Espesores')}</p>
                <div className="flex flex-wrap gap-2">
                  {producto.espesores.map((e) => <Etiqueta key={e}>{e}</Etiqueta>)}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{t('Colores')}</p>
                <div className="flex flex-wrap gap-4">
                  {producto.colores.map((c) => <MuestraColor key={c} color={c} conTexto />)}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{t('Aislamiento')}</p>
                <p className="font-semibold text-gray-800">{t(categoria.aislamiento)}</p>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">{t('Ideal para')}</p>
                <div className="flex flex-wrap gap-2">
                  {producto.aplicaciones.map((a) => <Etiqueta key={a} variante="verde">{a}</Etiqueta>)}
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">{t('Características')}</h2>
            <ul className="space-y-2 mb-8">
              {producto.caracteristicas.map((c) => (
                <li key={c} className="flex items-center gap-3 text-gray-700">
                  <FaCheck className="shrink-0 text-[#588157]" /> {c}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to={enlacePresupuesto(producto)} style={{ backgroundColor: NARANJA }} className="flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition">
                <FaFileAlt /> {t('Pedir presupuesto de este panel')}
              </Link>
              <a href="tel:+34123456789" className="flex items-center justify-center gap-2 border-2 border-[#588157] text-[#588157] font-semibold py-3 px-6 rounded-lg hover:bg-[#588157] hover:text-white transition">
                <FaPhoneAlt /> 123 456 789
              </a>
            </div>

            {/* SEGUNDA MANO */}
            <div className="bg-[#FEFAE0] rounded-2xl p-6">
              <p className="font-bold text-gray-800 mb-4">{t('Lo que debes saber del panel de segunda mano')}</p>
              <ul className="space-y-3">
                {segundaMano.map((item) => (
                  <li key={item.texto} className="flex gap-3 text-sm text-gray-700">
                    <item.icono className="shrink-0 mt-0.5" style={{ color: NARANJA }} />
                    {item.texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OTROS MODELOS */}
      {otrosModelos.length > 0 && (
        <section className="bg-white py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('Otros modelos de')} {t(categoria.nombre)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otrosModelos.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
            </div>
          </div>
        </section>
      )}

      <FranjaPresupuesto />
    </>
  );
};

export default ProductoDetalle;
