import React, { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { buscar } from '../utils/buscar';
import { TarjetaCategoria, TarjetaProducto, FranjaPresupuesto } from '../components/ProductosElementos';
import { TarjetaArticulo } from '../components/BlogElementos';

// Sugerencias cuando no hay búsqueda o no hay resultados
const SUGERENCIAS = ['Cubierta', 'Teja', 'Frío', 'Lana de roca', 'Fachada', 'Lucernario'];

const Buscar = () => {

  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const [texto, setTexto] = useState(q);
  useEffect(() => setTexto(q), [q]);

  const resultados = useMemo(() => buscar(q), [q]);

  const enviar = (e) => {
    e.preventDefault();
    setSearchParams(texto.trim() ? { q: texto.trim() } : {});
  };

  const Seccion = ({ titulo, total, children }) => (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{titulo} <span className="text-gray-400 font-normal">({total})</span></h2>
      {children}
    </section>
  );

  return (
    <>
      <Helmet>
        <title>{q ? `${t('Resultados para')} «${q}» | Repanel` : `${t('Buscar')} | Repanel`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* CABECERA CON BUSCADOR */}
      <section className="bg-[#344e41] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {q ? <>{t('Resultados para')} «{q}»</> : t('¿Qué estás buscando?')}
          </h1>
          <form role="search" onSubmit={enviar} className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder={t('Buscar productos')}
              aria-label={t('Buscar productos')}
              className="w-full pl-11 pr-28 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#BC6C25] hover:opacity-90 text-white font-semibold text-sm px-5 py-2 rounded-full">
              {t('Buscar')}
            </button>
          </form>
          {q && <p className="mt-4 text-gray-300">{resultados.total} {resultados.total === 1 ? t('resultado') : t('resultados')}</p>}
        </div>
      </section>

      <div className="bg-[#f8f7ef] py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {resultados.total === 0 ? (
            <div className="text-center py-10">
              {q && <p className="text-lg text-gray-700 mb-2">{t('No hemos encontrado nada con esa búsqueda.')}</p>}
              <p className="text-gray-600 mb-6">{t('Prueba con alguna de estas:')}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {SUGERENCIAS.map((s) => (
                  <button key={s} type="button" onClick={() => setSearchParams({ q: s })} className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-semibold text-gray-700 hover:border-[#588157] hover:text-[#588157] transition">
                    {t(s)}
                  </button>
                ))}
              </div>
              <Link to="/catalogo_productos" className="inline-block bg-[#588157] text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">
                {t('Ver catálogo completo')}
              </Link>
            </div>
          ) : (
            <>
              {resultados.categorias.length > 0 && (
                <Seccion titulo={t('Categorías')} total={resultados.categorias.length}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resultados.categorias.map((r) => <TarjetaCategoria key={r.to} categoria={r.dato} />)}
                  </div>
                </Seccion>
              )}
              {resultados.productos.length > 0 && (
                <Seccion titulo={t('Modelos')} total={resultados.productos.length}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resultados.productos.map((r) => <TarjetaProducto key={r.to} producto={r.dato} />)}
                  </div>
                </Seccion>
              )}
              {resultados.articulos.length > 0 && (
                <Seccion titulo={t('Artículos del blog')} total={resultados.articulos.length}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resultados.articulos.map((r) => <TarjetaArticulo key={r.to} articulo={r.dato} />)}
                  </div>
                </Seccion>
              )}
            </>
          )}
        </div>
      </div>

      <FranjaPresupuesto />
    </>
  );
};

export default Buscar;
