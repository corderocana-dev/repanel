import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa';
import { buscar } from '../utils/buscar';

// Cuántos resultados de cada tipo se ven en el desplegable
const MAX = { categorias: 2, productos: 5, articulos: 2 };

const ETIQUETAS = { categoria: 'Categoría', producto: 'Modelo', articulo: 'Artículo' };

const Buscador = ({ className = '', autoFocus = false, onNavegar }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const contenedorRef = useRef(null);

  const [consulta, setConsulta] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(-1);

  const resultados = useMemo(() => buscar(consulta), [consulta]);

  // Lista plana para el desplegable (y para moverse con las flechas)
  const lista = useMemo(() => [
    ...resultados.categorias.slice(0, MAX.categorias),
    ...resultados.productos.slice(0, MAX.productos),
    ...resultados.articulos.slice(0, MAX.articulos),
  ], [resultados]);

  // Cerrar al pulsar fuera
  useEffect(() => {
    if (!abierto) return undefined;
    const alPulsar = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) setAbierto(false);
    };
    document.addEventListener('mousedown', alPulsar);
    return () => document.removeEventListener('mousedown', alPulsar);
  }, [abierto]);

  const ir = (to) => {
    setAbierto(false);
    setConsulta('');
    setSeleccionado(-1);
    onNavegar?.();
    navigate(to);
  };

  const verTodos = () => {
    if (!consulta.trim()) return;
    ir(`/buscar?q=${encodeURIComponent(consulta.trim())}`);
  };

  const alEnviar = (e) => {
    e.preventDefault();
    if (seleccionado >= 0 && lista[seleccionado]) ir(lista[seleccionado].to);
    else verTodos();
  };

  const alTeclear = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAbierto(true);
      setSeleccionado((s) => Math.min(s + 1, lista.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSeleccionado((s) => Math.max(s - 1, -1));
    } else if (e.key === 'Escape') {
      setAbierto(false);
    }
  };

  const mostrarDesplegable = abierto && consulta.trim().length > 0;

  return (
    <div ref={contenedorRef} className={`relative ${className}`}>
      <form role="search" onSubmit={alEnviar} className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
        <input
          type="search"
          value={consulta}
          autoFocus={autoFocus}
          onChange={(e) => { setConsulta(e.target.value); setAbierto(true); setSeleccionado(-1); }}
          onFocus={() => setAbierto(true)}
          onKeyDown={alTeclear}
          placeholder={t('Buscar productos')}
          aria-label={t('Buscar productos')}
          aria-expanded={mostrarDesplegable}
          autoComplete="off"
          className={`w-full h-10 pl-9 ${consulta ? 'pr-9' : 'pr-2'} rounded-full bg-gray-100 border border-transparent text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:bg-white focus:border-[#588157] focus:ring-2 focus:ring-[#588157]/20 transition [&::-webkit-search-cancel-button]:hidden`}
        />
        {consulta && (
          <button type="button" onClick={() => { setConsulta(''); setSeleccionado(-1); }} aria-label={t('Borrar búsqueda')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
            <FaTimes size={13} />
          </button>
        )}
      </form>

      {/* RESULTADOS AL ESCRIBIR */}
      {mostrarDesplegable && (
        <div className="absolute right-0 left-0 lg:left-auto lg:w-[26rem] mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          {lista.length > 0 ? (
            <>
              <ul className="max-h-[60vh] overflow-y-auto py-2">
                {lista.map((r, index) => (
                  <li key={r.to}>
                    <button
                      type="button"
                      onMouseEnter={() => setSeleccionado(index)}
                      onClick={() => ir(r.to)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition ${seleccionado === index ? 'bg-[#588157]/10' : ''}`}
                    >
                      <img src={r.imagen} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0 bg-gray-100" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-gray-800 truncate">{r.tipo === 'categoria' ? t(r.titulo) : r.titulo}</span>
                        <span className="block text-xs text-gray-500 truncate">{t(ETIQUETAS[r.tipo])} · {t(r.subtitulo)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={verTodos} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#BC6C25] bg-gray-50 hover:bg-gray-100 border-t border-gray-100">
                {t('Ver todos los resultados')} ({resultados.total}) <FaArrowRight size={11} />
              </button>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-600">
              <p className="mb-2">{t('No hay resultados para')} «{consulta}».</p>
              <button type="button" onClick={() => ir('/presupuesto')} className="font-semibold text-[#BC6C25] hover:underline">
                {t('Pregúntanos y te lo buscamos')} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Buscador;
