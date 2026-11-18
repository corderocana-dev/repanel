import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaPiggyBank, FaShieldAlt, FaSearch, FaClipboardCheck, FaTruck, FaQuoteLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const NARANJA = '#BC6C25';

const QuienesSomos = () => {

  const { t } = useTranslation();

  // Cifras destacadas
  const cifras = [
    { valor: '+15', texto: t('años de experiencia en el sector') },
    { valor: '8', texto: t('tipos de panel disponibles') },
    { valor: '2ª', texto: t('vida para cada material') },
    { valor: '100%', texto: t('paneles revisados antes de la venta') },
  ];

  // Valores
  const valores = [
    {
      icono: FaRecycle,
      titulo: t('Sostenibilidad'),
      texto: t('Reducimos el desperdicio de materiales a través de la reutilización responsable.'),
    },
    {
      icono: FaPiggyBank,
      titulo: t('Ahorro inteligente'),
      texto: t('Paneles de alta calidad a precios reducidos.'),
    },
    {
      icono: FaShieldAlt,
      titulo: t('Compromiso con la calidad'),
      texto: t('A pesar de sus pequeños defectos, nuestros productos siguen siendo perfectamente funcionales.'),
    },
  ];

  // Lo que hace el equipo
  const pasosEquipo = [
    { icono: FaSearch, titulo: t('Selección'), texto: t('Elegimos sobrantes y paneles con pequeños desperfectos que siguen siendo útiles.') },
    { icono: FaClipboardCheck, titulo: t('Revisión'), texto: t('Comprobamos el estado de cada panel para garantizar su funcionalidad.') },
    { icono: FaTruck, titulo: t('Distribución'), texto: t('Te lo llevamos a obra o lo recoges en nuestras instalaciones.') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('Quiénes Somos | RePanel')}</title>
        <meta
          name="description"
          content={t('Conoce más sobre RePanel, nuestra misión, visión y el equipo detrás de la venta de paneles sándwich de segunda mano.')}
        />
        <meta
          name="keywords"
          content="quiénes somos, paneles sándwich, segunda mano, empresa, misión, visión, repanel"
        />
        <link rel="canonical" href="http://localhost:5173/quienessomos" />
      </Helmet>

      {/* CABECERA CON IMAGEN */}
      <section className="relative bg-[url('/panel_cubierta.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#344e41]/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-24 px-6">
          <p className="uppercase tracking-widest text-sm font-semibold text-[#FEFAE0] mb-3">RePanel</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('¿Quiénes somos?')}</h1>
          <p className="text-lg md:text-xl text-gray-100">
            {t('Damos una segunda vida a los paneles sándwich para que construyas más por menos.')}
          </p>
        </div>
      </section>

      {/* CIFRAS */}
      <section className="bg-[#588157] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-4 text-center">
          {cifras.map((cifra) => (
            <div key={cifra.valor}>
              <p className="text-4xl md:text-5xl font-bold">{cifra.valor}</p>
              <p className="mt-1 text-sm md:text-base text-[#FEFAE0]">{cifra.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS + HISTORIA */}
      <section id="quienes-somos" className="scroll-mt-20 bg-[#f8f7ef] py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-wider text-sm font-semibold mb-2" style={{ color: NARANJA }}>{t('Sobre Nosotros')}</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('Nuestra Historia')}</h2>
            <p className="text-lg text-gray-700 mb-4">
              {t('Con más de 15 años en el sector de la venta y distribución de paneles sándwich a través de una de nuestras empresas, vimos una oportunidad para darle una segunda vida a los materiales que no podían ser vendidos como nuevos.')}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              {t('Así nació')} <span className="font-bold">RePanel</span>{t(', especializada en paneles sándwich de segunda mano que provienen de sobrantes, roturas o pequeños desperfectos.')}
            </p>
            <p className="text-lg text-gray-700">
              {t('Nuestro objetivo es ofrecer soluciones económicas y sostenibles para proyectos de construcción, sin comprometer la calidad del material.')}
            </p>
          </div>
          <div className="relative">
            <img src="/panel_lanaroca.jpg" alt={t('Paneles sándwich de RePanel')} className="rounded-2xl shadow-xl w-full h-80 lg:h-96 object-cover" />
            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-white rounded-xl shadow-lg px-6 py-4 max-w-xs">
              <FaQuoteLeft style={{ color: NARANJA }} className="mb-2" />
              <p className="text-gray-800 font-semibold">{t('Calidad, honestidad y un trato cercano.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ NOS DIFERENCIA */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('¿Qué nos diferencia?')}</h2>
          <p className="text-lg text-gray-700">
            {t('Ofrecemos productos con pequeños defectos, como arañazos o roturas, pero que siguen siendo completamente funcionales. Así nuestros clientes acceden a materiales de alta calidad a una fracción del precio del mercado.')}
          </p>
        </div>
      </section>

      {/* VALORES */}
      <section id="m-v-v" className="scroll-mt-20 bg-[#FEFAE0] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">{t('Nuestros Valores')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valores.map((valor) => (
              <div key={valor.titulo} className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-1 hover:shadow-xl transition duration-300">
                <div className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center bg-[#BC6C25]/10">
                  <valor.icono size={30} style={{ color: NARANJA }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{valor.titulo}</h3>
                <p className="text-gray-700">{valor.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="nuestro-equipo" className="scroll-mt-20 bg-[#f8f7ef] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('Equipo RePanel')}</h2>
            <p className="text-lg text-gray-700">
              {t('Contamos con un equipo multidisciplinar con años de experiencia en la selección, revisión y distribución de paneles sándwich de segunda mano. Nos apasiona dar una segunda vida a cada material.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pasosEquipo.map((paso, index) => (
              <div key={paso.titulo} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#588157] text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-1">
                    <paso.icono style={{ color: NARANJA }} /> {paso.titulo}
                  </h3>
                  <p className="text-gray-700">{paso.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LLAMADA A LA ACCIÓN */}
      <section className="bg-[#344e41] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">{t('¿Empezamos tu proyecto?')}</h2>
          <p className="text-lg text-gray-200 mb-8">{t('Descubre nuestros paneles o pídenos un presupuesto sin compromiso.')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogo_productos" style={{ backgroundColor: NARANJA }} className="text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition">
              {t('Explora nuestros productos')}
            </Link>
            <Link to="/presupuesto" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-[#344e41] transition">
              {t('Pide presupuesto')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuienesSomos;
