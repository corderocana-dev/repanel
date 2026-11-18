import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaPlus, FaTrash, FaCheckCircle, FaTruck, FaRecycle, FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Tipos de panel (mismas categorías que el menú de productos)
const TIPOS_PANEL = [
  { value: 'panel_teja', label: 'PANEL TEJA' },
  { value: 'fachada', label: 'FACHADA' },
  { value: 'agropanel', label: 'AGROPANEL' },
  { value: 'cubierta', label: 'CUBIERTA' },
  { value: 'lucernario', label: 'LUCERNARIO' },
  { value: 'frío_industrial', label: 'FRÍO INDUSTRIAL' },
  { value: 'lana_de_roca', label: 'LANA DE ROCA' },
  { value: 'chapa_perfilada', label: 'CHAPA PERFILADA' },
];

const ESPESORES = ['30 mm', '40 mm', '50 mm', '60 mm', '80 mm', '100 mm'];

const productoVacio = () => ({ tipo: '', modelo: '', metros: '', espesor: '', color: '' });

const inputClass = 'w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400';
const labelClass = 'block text-sm font-medium text-gray-700';

const Presupuesto = () => {

  const { t } = useTranslation();

  // Si se llega desde la ficha de un producto (?tipo=...&modelo=...), se rellena el primero
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState(() => {
    const tipo = searchParams.get('tipo') || '';
    const modelo = searchParams.get('modelo') || '';
    const tipoValido = TIPOS_PANEL.some((t) => t.value === tipo) ? tipo : '';
    return [{ ...productoVacio(), tipo: tipoValido, modelo }];
  });
  const [enviado, setEnviado] = useState(false);

  const actualizarProducto = (index, campo, valor) => {
    setProductos(productos.map((p, i) => (i === index ? { ...p, [campo]: valor } : p)));
  };

  const anadirProducto = () => setProductos([...productos, productoVacio()]);

  const eliminarProducto = (index) => setProductos(productos.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con un servicio de envío (EmailJS, Formspree, backend propio...)
    setEnviado(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{t('Pide Presupuesto | RePanel')}</title>
        <meta name="description" content={t('Solicita un presupuesto sin compromiso de paneles sándwich de segunda mano. Te respondemos en menos de 24 horas.')} />
        <meta name="keywords" content="presupuesto paneles sandwich, precio panel sandwich segunda mano, cotización paneles, repanel" />
        <link rel="canonical" href="http://localhost:5173/presupuesto" />
      </Helmet>

      <div className="bg-[#f8f7ef] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Texto e información */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left">{t('Pide tu presupuesto')}</h2>
            <p className="text-gray-800 mb-8">
              {t('Cuéntanos qué paneles necesitas y te enviaremos un presupuesto personalizado y sin compromiso.')}
            </p>

            <div className="space-y-5 text-gray-700 mb-10">
              <div className="flex items-start gap-3">
                <FaClock style={{ color: '#BC6C25' }} className="mt-1 shrink-0" />
                <span>{t('Respuesta en menos de 24 horas laborables.')}</span>
              </div>
              <div className="flex items-start gap-3">
                <FaTruck style={{ color: '#BC6C25' }} className="mt-1 shrink-0" />
                <span>{t('Entrega inmediata o recogida en nuestras instalaciones.')}</span>
              </div>
              <div className="flex items-start gap-3">
                <FaRecycle style={{ color: '#BC6C25' }} className="mt-1 shrink-0" />
                <span>{t('Paneles revisados, económicos y sostenibles.')}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 text-gray-700">
              <p className="font-semibold text-gray-800">{t('¿Prefieres hablar con nosotros?')}</p>
              <div className="flex items-center gap-3">
                <FaPhoneAlt style={{ color: '#BC6C25' }} />
                <a href="tel:+34123456789" className="hover:underline">+34 123 456 789</a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: '#BC6C25' }} />
                <a href="mailto:info@repanel.example" className="hover:underline">info@repanel.example</a>
              </div>
            </div>
          </div>

          {/* Formulario de presupuesto */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">

            {enviado ? (
              <div className="text-center py-16 space-y-4">
                <FaCheckCircle size={56} className="mx-auto text-[#588157]" />
                <h3 className="text-2xl font-bold text-gray-800">{t('¡Solicitud enviada!')}</h3>
                <p className="text-gray-700">{t('Gracias por confiar en nosotros. Revisaremos tu solicitud y te enviaremos el presupuesto lo antes posible.')}</p>
                <Link to="/" className="inline-block mt-4 bg-[#588157] text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">
                  {t('Volver al inicio')}
                </Link>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>

                {/* 1. Datos de contacto */}
                <fieldset className="space-y-4">
                  <legend className="text-xl font-bold text-gray-800 mb-2">1. {t('Tus datos')}</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t('Nombre*')}</label>
                      <input type="text" className={inputClass} placeholder={t('Nombre y apellido(s)')} required />
                    </div>
                    <div>
                      <label className={labelClass}>{t('Empresa')}</label>
                      <input type="text" className={inputClass} placeholder={t('Nombre de la empresa (opcional)')} />
                    </div>
                    <div>
                      <label className={labelClass}>{t('Correo electrónico*')}</label>
                      <input type="email" className={inputClass} placeholder={t('Correo electrónico')} required />
                    </div>
                    <div>
                      <label className={labelClass}>{t('Teléfono*')}</label>
                      <input type="tel" className={inputClass} placeholder={t('Número de teléfono')} required />
                    </div>
                  </div>
                </fieldset>

                {/* 2. Productos */}
                <fieldset className="space-y-4">
                  <legend className="text-xl font-bold text-gray-800 mb-2">2. {t('¿Qué necesitas?')}</legend>

                  {productos.map((producto, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 bg-[#FEFAE0]/40 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{t('Producto')} {index + 1}</span>
                        {productos.length > 1 && (
                          <button type="button" onClick={() => eliminarProducto(index)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800">
                            <FaTrash /> {t('Quitar')}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>{t('Tipo de panel*')}</label>
                          <select className={inputClass} value={producto.tipo} onChange={(e) => actualizarProducto(index, 'tipo', e.target.value)} required>
                            <option value="">{t('Selecciona un tipo')}</option>
                            {TIPOS_PANEL.map((tipo) => (
                              <option key={tipo.value} value={tipo.value}>{t(tipo.label)}</option>
                            ))}
                            <option value="no_lo_se">{t('No lo sé / necesito asesoramiento')}</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>{t('Cantidad aproximada (m²)*')}</label>
                          <input type="number" min="1" className={inputClass} placeholder="Ej. 150" value={producto.metros} onChange={(e) => actualizarProducto(index, 'metros', e.target.value)} required />
                        </div>
                        <div>
                          <label className={labelClass}>{t('Espesor')}</label>
                          <select className={inputClass} value={producto.espesor} onChange={(e) => actualizarProducto(index, 'espesor', e.target.value)}>
                            <option value="">{t('Indiferente')}</option>
                            {ESPESORES.map((esp) => (
                              <option key={esp} value={esp}>{esp}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>{t('Color')}</label>
                          <input type="text" className={inputClass} placeholder={t('Ej. blanco, rojo teja... (opcional)')} value={producto.color} onChange={(e) => actualizarProducto(index, 'color', e.target.value)} />
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelClass}>{t('Modelo')}</label>
                          <input type="text" className={inputClass} placeholder={t('Ej. Panel 3 Grecas (opcional)')} value={producto.modelo} onChange={(e) => actualizarProducto(index, 'modelo', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button type="button" onClick={anadirProducto} className="flex items-center gap-2 text-[#588157] font-semibold hover:text-green-800">
                    <FaPlus /> {t('Añadir otro producto')}
                  </button>
                </fieldset>

                {/* 3. Entrega */}
                <fieldset className="space-y-4">
                  <legend className="text-xl font-bold text-gray-800 mb-2">3. {t('Entrega')}</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t('Forma de entrega*')}</label>
                      <select className={inputClass} required defaultValue="">
                        <option value="" disabled>{t('Selecciona una opción')}</option>
                        <option value="envio">{t('Envío a obra / dirección')}</option>
                        <option value="recogida">{t('Recogida en nuestras instalaciones')}</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t('Localidad y provincia*')}</label>
                      <input type="text" className={inputClass} placeholder={t('Ej. Alcalá de Guadaíra, Sevilla')} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>{t('¿Para cuándo lo necesitas?')}</label>
                      <select className={inputClass} defaultValue="">
                        <option value="">{t('Sin prisa')}</option>
                        <option value="urgente">{t('Lo antes posible')}</option>
                        <option value="1_mes">{t('En el próximo mes')}</option>
                        <option value="mas_1_mes">{t('En más de un mes')}</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* 4. Comentarios */}
                <div>
                  <label className={labelClass}>{t('Comentarios adicionales')}</label>
                  <textarea rows="4" className={inputClass} placeholder={t('Medidas, uso previsto (nave, cubierta, cámara frigorífica...) o cualquier detalle que nos ayude.')}></textarea>
                </div>

                <label className="flex text-sm text-gray-700 gap-2">
                  <input type="checkbox" className="form-checkbox" required />
                  <span>
                    {t('*He leído y acepto la')}{' '}
                    <Link to="/informaciónLegal#politica-privacidad" target="_blank" className="text-blue-600 underline hover:text-blue-800">{t('política de privacidad')}</Link>{' '}
                    {t('y el')}{' '}
                    <Link to="/informaciónLegal#aviso-legal" target="_blank" className="text-blue-600 underline hover:text-blue-800">{t('aviso legal.')}</Link>
                  </span>
                </label>

                <button
                  type="submit" style={{ backgroundColor: '#BC6C25' }}
                  className="w-full md:w-auto text-white font-semibold py-3 px-8 rounded-lg transition duration-300 hover:opacity-90">
                  {t('Solicitar presupuesto')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Presupuesto;
