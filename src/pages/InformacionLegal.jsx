import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const InformacionLegal = () => {

  const { t } = useTranslation();

  return (

    <>
      <Helmet>
        <title>{t('Información Legal | Aviso Legal, Política de Privacidad y Cookies')}</title>
        <meta name="description" content={t('Lee toda la información legal de RePanel: aviso legal, política de privacidad, cookies y términos y condiciones de uso.')} />
        <meta name="keywords" content="información legal, aviso legal, política de privacidad, política de cookies, términos y condiciones, legal, repanel" />
        <link rel="canonical" href="http://localhost:5173/informaci%C3%B3nLegal" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* AVISO DE PORTFOLIO */}
        <div className="mb-8 p-5 rounded-lg border-l-4 border-[#BC6C25] bg-[#FEFAE0] text-gray-800">
          <p className="font-semibold mb-1">{t('Proyecto de portfolio')}</p>
          <p className="text-sm text-gray-700">
            {t('Esta web es un proyecto de demostración. RePanel es una empresa ficticia y todos los datos de contacto, direcciones y textos legales son de ejemplo.')}
          </p>
        </div>

        {/* AVISO LEGAL */}
        <section id='aviso-legal' className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aviso Legal</h2>
          <p className="text-gray-700 mb-4">
            Al acceder y utilizar este sitio web, el usuario acepta cumplir con los términos y condiciones establecidos en este aviso legal.
          </p>
          <p className="text-gray-700 mb-4">
            El acceso al sitio web es gratuito, pero el acceso a ciertos contenidos puede requerir el registro del usuario.
          </p>
          <p className="text-gray-700 mb-4">
            Nos reservamos el derecho de modificar en cualquier momento los contenidos de este sitio web.
          </p>
        </section>

        {/* POLÍTICA DE COOKIES */}
        <section id='politica-cookies' className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Política de Cookies</h2>

          <h4 className='font-semibold pb-2'>2.1 ¿Qué son las cookies?</h4>
          <p className="text-gray-700 mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, smartphone, tablet, etc.) cuando visitas un sitio web. Las cookies permiten a la página web recordar tus acciones y preferencias durante un periodo de tiempo, como tu idioma preferido, tus datos de inicio de sesión o la configuración de la visualización de la página.</p>

          <h4 className='font-semibold pb-2'>2.2 ¿Por qué utilizamos cookies?</h4>
          <p className="text-gray-700 mb-4">
            En RePanel, utilizamos cookies para mejorar tu experiencia de navegación en nuestro sitio web. Las cookies nos permiten ofrecerte una navegación personalizada, recordando tus preferencias y ayudándonos a analizar el uso del sitio para mejorar su rendimiento.</p>

          <h4 className='font-semibold pb-2'>2.3 Tipos de cookies que utilizamos</h4>
          <div className="overflow-x-auto">
          <table className="table-auto border border-gray-300 min-w-[640px]">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">Cookies técnicas</th>
                <th className="border px-4 py-2 text-center">Cookies de personalización</th>
                <th className="border px-4 py-2 text-center">Cookies analíticas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border px-4 py-2">Estas cookies son necesarias para el funcionamiento del sitio web y no pueden desactivarse en nuestros sistemas. Se suelen activar en respuesta a acciones realizadas por el usuario, como configurar tus preferencias de privacidad, iniciar sesión o rellenar formularios.
                  <ul className='list-disc pl-10 pt-2'>
                    <li>Ejemplo: Cookie de sesión para recordar tu autenticación.</li>
                  </ul>
                </td>
                <td className="border px-4 py-2">Estas cookies nos permiten recordar tus preferencias (como el idioma o la ubicación) para ofrecerte una experiencia más personalizada en el sitio.
                  <ul className='list-disc pl-10 pt-2'>
                    <li>Ejemplo: Cookie para guardar la selección de idioma en la web.</li>
                  </ul>
                </td>
                <td className='border px-4 py-2'>Utilizamos cookies de análisis para recopilar información sobre cómo los usuarios interactúan con nuestro sitio web. Estas cookies nos permiten medir el rendimiento de la web y realizar mejoras basadas en los datos de uso.
                  <ul className='list-disc pl-10 pt-2'>
                    <li>Ejemplo: Cookies de Google Analytics que recogen datos sobre las visitas y el comportamiento de los usuarios.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <h4 className='font-semibold pb-2 pt-3'>2.4 Cookies de Terceros</h4>
          <p className="text-gray-700 mb-4">
            Algunas de las cookies que utilizamos son proporcionadas por servicios de terceros, como Google Analytics, redes sociales y otros proveedores de publicidad. Estos servicios pueden recopilar información sobre tu actividad en línea y tu comportamiento de navegación para ofrecerte anuncios más relevantes.</p>

          <h4 className='font-semibold pb-2'>2.5 Control de Cookies</h4>
          <p className="text-gray-700 mb-4">
            Puedes ajustar la configuración de las cookies en tu navegador web en cualquier momento. La mayoría de los navegadores permiten gestionar las preferencias de cookies, de modo que puedas bloquearlas o eliminar las que ya se hayan instalado. Sin embargo, ten en cuenta que algunas funcionalidades de nuestro sitio web pueden dejar de funcionar correctamente si desactivas las cookies.</p>
          <p>A continuación, te indicamos cómo puedes gestionar las cookies en los principales navegadores:</p>
          <ul className='list-disc pl-10'>
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target='_blank'>Google Chrome: <span className='underline text-blue-700'>https://support.google.com/chrome/answer/95647?hl=es</span></a> </li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-preferences" target='_blank'>Mozilla Firefox: <span className='underline text-blue-700'>https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-preferences</span></a>
            </li>
            <li><a href=" https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d" target='_blank'>Microsoft Edge: <span className='underline text-blue-700'>https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d</span></a></li>
          </ul>

          <h4 className='font-semibold pb-2 pt-3'>2.6 ¿Qué sucede si desactivo las cookies?
          </h4>
          <p className="text-gray-700 mb-4">
            Si decides desactivar las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente. Por ejemplo, no podrás acceder a áreas restringidas o utilizar algunas funciones personalizadas.</p>

          <h4 className='font-semibold pb-2'>2.7 Cambios en nuestra Política de Cookies
          </h4>
          <p className="text-gray-700 mb-4">
            RePanel se reserva el derecho de modificar esta política en cualquier momento. En caso de realizar cambios importantes, informaremos a los usuarios a través de un aviso destacado en nuestro sitio web. Te recomendamos que revises periódicamente esta política para mantenerte informado sobre cómo utilizamos las cookies.</p>

          <h4 className='font-semibold pb-2'>2.8 Contacta con nosotros
          </h4>
          <p className="text-gray-700 mb-4">
            Si tienes alguna pregunta sobre nuestra Política de Cookies o sobre cómo gestionamos los datos personales, puedes ponerte en contacto con nosotros a través de:</p>
          <ul className='list-disc pl-10'>
            <li>Correo electrónico: info@repanel.example</li>
            <li>Teléfono: +34 123 456 789</li>
          </ul>

        </section>

        {/* POLITICA DE PRIVACIDAD */}
        <section id='politica-privacidad' className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Política de Privacidad</h2>
          <p className="text-gray-700 mb-4">
            La empresa no se hace responsable de los daños o perjuicios derivados del uso indebido de los contenidos del sitio web.
          </p>
          <p className="text-gray-700 mb-4">
            Asimismo, la empresa no garantiza la disponibilidad y continuidad del funcionamiento del sitio web.
          </p>
        </section>

        {/* TERMINOS Y CONDICIONES */}
        <section id='terminos-condiciones' className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Términos y Condiciones</h2>
          <p className="text-gray-700 mb-4">
            Los Términos y Condiciones son las normas que rigen el uso de nuestro sitio web y la adquisición de nuestros productos.
          </p>

          <h4 className='font-semibold pb-2'>4.1 Aceptación de los Términos</h4>
          <p className="text-gray-700 mb-4">
            Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones.</p>

          <h4 className='font-semibold pb-2'>4.2 Uso del sitio web</h4>
          <p className="text-gray-700 mb-4">
            Solo puedes utilizar este sitio web para fines legales. No debes realizar ninguna actividad que pueda dañar, inutilizar, sobrecargar o deteriorar el sitio web.</p>

          <h4 className='font-semibold pb-2'>4.3 Productos y precios</h4>
          <p className="text-gray-700 mb-4">
            Toda la información relacionada con nuestros productos, como precios, disponibilidad y especificaciones, está sujeta a cambios sin previo aviso. Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>

          <h4 className='font-semibold pb-2'>4.4 Propiedad intelectual</h4>
          <p className="text-gray-700 mb-4">
            Todo el contenido de este sitio web, incluidos los textos, imágenes, logotipos y gráficos, está protegido por derechos de autor y no puede ser utilizado sin autorización.</p>

          <h4 className='font-semibold pb-2'>4.5 Exención de responsabilidad</h4>
          <p className="text-gray-700 mb-4">
            No somos responsables de los daños o perjuicios derivados del uso del sitio web o de los productos adquiridos a través de él, excepto en los casos en los que la legislación aplicable disponga lo contrario.</p>

          <h4 className='font-semibold pb-2'>4.6 Ley aplicable y jurisdicción</h4>
          <p className="text-gray-700 mb-4">
            Estos términos se rigen por la legislación española. Cualquier disputa relacionada con estos términos será resuelta en los tribunales de Sevilla.</p>


        </section>
      </div>
    </>
  );
};

export default InformacionLegal;
