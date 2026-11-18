import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NARANJA = '#BC6C25';

const inputClass = 'w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400';
const labelClass = 'block text-sm font-medium text-gray-700';

const Contacto = () => {

  const { t } = useTranslation();

  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con un servicio de envío (EmailJS, Formspree, backend propio...)
    setEnviado(true);
  };

  // Datos de contacto (se pueden pulsar)
  const datos = [
    { icono: FaPhoneAlt, titulo: t('Llámanos'), texto: '+34 123 456 789', href: 'tel:+34123456789' },
    { icono: FaEnvelope, titulo: t('Escríbenos'), texto: 'info@repanel.example', href: 'mailto:info@repanel.example' },
    { icono: FaMapMarkerAlt, titulo: t('Visítanos'), texto: t('Pol. Ind. El Ejemplo, Sevilla, Andalucía, España'), href: 'https://www.google.com/maps?q=Sevilla', externo: true },
  ];

  return (
    <>
      <Helmet>
        <title>{t('Contacto | Repanel')}</title>
        <meta name="description" content={t('Ponte en contacto con Repanel. Resolvemos tus dudas sobre paneles sandwich de segunda mano, presupuestos y disponibilidad.')} />
        <meta name="keywords" content="contacto, paneles sandwich, segunda mano, fábrica de paneles, presupuesto paneles, atención al cliente, repanel" />
        <link rel="canonical" href="http://localhost:5173/contacto" />
      </Helmet>

      {/* CABECERA CON IMAGEN */}
      <section className="relative bg-[url('/panel_fachada.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#344e41]/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('Contáctanos')}</h1>
          <p className="text-lg md:text-xl text-gray-100">
            {t('¿Tienes alguna pregunta o necesitas más información sobre nuestros paneles sándwich de segunda mano? ¡Estamos aquí para ayudarte!')}
          </p>
        </div>
      </section>

      <div className="bg-[#f8f7ef] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* TARJETAS DE CONTACTO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10 mb-12">
            {datos.map((dato) => (
              <a
                key={dato.titulo}
                href={dato.href}
                {...(dato.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[#BC6C25]/10">
                  <dato.icono size={20} style={{ color: NARANJA }} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800">{dato.titulo}</p>
                  <p className="text-gray-600 text-sm break-words">{dato.texto}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* MAPA + ENLACE A PRESUPUESTO */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title={t('Mapa de ubicación de Repanel')}
                  src="https://www.google.com/maps?q=Sevilla&z=12&output=embed"
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="bg-[#588157] text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <FaFileAlt size={22} className="mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">{t('¿Necesitas un presupuesto?')}</p>
                    <p className="text-sm text-[#FEFAE0]">{t('Cuéntanos qué paneles necesitas y te lo preparamos.')}</p>
                  </div>
                </div>
                <Link to="/presupuesto" className="shrink-0 text-center bg-white text-[#344e41] font-semibold py-2 px-5 rounded-lg hover:bg-[#FEFAE0] transition">
                  {t('Pide presupuesto')}
                </Link>
              </div>
            </div>

            {/* FORMULARIO DE CONTACTO */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {enviado ? (
                <div className="text-center py-16 space-y-4">
                  <FaCheckCircle size={56} className="mx-auto text-[#588157]" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('¡Mensaje enviado!')}</h2>
                  <p className="text-gray-700">{t('Gracias por escribirnos. Te responderemos lo antes posible.')}</p>
                  <button type="button" onClick={() => setEnviado(false)} className="text-[#588157] font-semibold hover:underline">
                    {t('Enviar otro mensaje')}
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-gray-800">{t('Envíanos un mensaje')}</h2>

                  <div>
                    <label htmlFor="contacto-nombre" className={labelClass}>{t('Nombre*')}</label>
                    <input id="contacto-nombre" name="nombre" type="text" className={inputClass} placeholder={t('Nombre y apellido(s)')} required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contacto-email" className={labelClass}>{t('Correo electrónico*')}</label>
                      <input id="contacto-email" name="email" type="email" className={inputClass} placeholder={t('Correo electrónico')} required />
                    </div>
                    <div>
                      <label htmlFor="contacto-telefono" className={labelClass}>{t('Teléfono*')}</label>
                      <input id="contacto-telefono" name="telefono" type="tel" className={inputClass} placeholder={t('Número de teléfono')} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contacto-mensaje" className={labelClass}>{t('Mensaje*')}</label>
                    <textarea id="contacto-mensaje" name="mensaje" rows="5" className={inputClass} placeholder={t('Escribe aquí tu mensaje...')} required></textarea>
                  </div>

                  <label className="flex items-start text-sm text-gray-700 gap-2">
                    <input type="checkbox" name="acepto" className="form-checkbox mt-1" required />
                    <span>
                      {t('*He leído y acepto la')}{' '}
                      <Link to="/informaciónLegal#politica-privacidad" target="_blank" className="text-blue-600 underline hover:text-blue-800">{t('política de privacidad')}</Link>{' '}
                      {t('y el')}{' '}
                      <Link to="/informaciónLegal#aviso-legal" target="_blank" className="text-blue-600 underline hover:text-blue-800">{t('aviso legal.')}</Link>
                    </span>
                  </label>

                  <button
                    type="submit" style={{ backgroundColor: NARANJA }}
                    className="w-full sm:w-auto text-white font-semibold py-3 px-8 rounded-lg transition duration-300 hover:opacity-90">
                    {t('Enviar mensaje')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
