import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaRecycle, FaShieldAlt, FaFileAlt, FaComments, FaPhoneAlt, FaArrowRight, FaTruck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { obtenerCategoria } from '../utils/productos';
import { TarjetaCategoria } from '../components/ProductosElementos';
import { TarjetaArticulo } from '../components/BlogElementos';
import articulos from '../locals/blog.json';

const NARANJA = '#BC6C25';

// Categorías que se muestran en "Productos destacados"
const DESTACADOS = ['panel_teja', 'cubierta', 'fachada', 'agropanel'];

const Home = () => {

  const { t } = useTranslation();

  const cifras = [
    { valor: '+15', texto: t('años de experiencia en el sector') },
    { valor: '8', texto: t('tipos de panel disponibles') },
    { valor: '2ª', texto: t('vida para cada material') },
    { valor: '100%', texto: t('paneles revisados antes de la venta') },
  ];

  const beneficios = [
    { icono: FaCheckCircle, titulo: t('Ahorro'), texto: t('Compra paneles de alta calidad a precios reducidos.') },
    { icono: FaRecycle, titulo: t('Sostenibilidad'), texto: t('Contribuye al reciclaje y al cuidado del medio ambiente.') },
    { icono: FaShieldAlt, titulo: t('Calidad garantizada'), texto: t('Paneles inspeccionados y garantizados para asegurar su resistencia.') },
  ];

  const pasos = [
    { titulo: t('Selecciona el tipo de panel que necesitas.'), texto: t('Elige entre nuestra variedad de paneles sándwich.') },
    { titulo: t('Solicita tu presupuesto personalizado.'), texto: t('Contacta con nosotros para recibir una cotización personalizada.') },
    { titulo: t('Recíbelo y formaliza tu pedido con total confianza.'), texto: t('Realiza tu compra y recibe los productos de forma rápida y segura.') },
  ];

  const ultimosArticulos = [...articulos].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{t('Paneles Sándwich Segunda Mano | Ahorra con Calidad | RePanel')}</title>
        <meta name="description" content={t('Compra paneles sándwich de segunda mano en excelente estado. Alta calidad, precios reducidos y atención personalizada.')} />
        <meta name="keywords" content="paneles sandwich segunda mano, comprar panel sandwich, panel sandwich barato, paneles usados, repanel" />
        <link rel="canonical" href="http://localhost:5173/" />
      </Helmet>

      {/* PORTADA */}
      <section className="relative bg-[url('/image_Home.jpg')] bg-cover bg-center min-h-[34rem] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#344e41]/80 to-[#344e41]/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-24 px-6">
          <p className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <FaTruck /> {t('ENTREGA INMEDIATA')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">{t('Paneles Sándwich de Segunda Mano')}</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">{t('Ahorra dinero y cuida el medio ambiente con paneles de alta calidad')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogo_productos" style={{ backgroundColor: NARANJA }} className="text-white font-semibold px-8 py-3 rounded-lg text-lg hover:opacity-90 transition">
              {t('Explorar productos')}
            </Link>
            <Link to="/presupuesto" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-white hover:text-[#344e41] transition">
              {t('Pide presupuesto')}
            </Link>
          </div>
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

      {/* BENEFICIOS */}
      <section className="bg-[#f8f7ef] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">{t('¿Por qué elegir nuestros paneles sándwich?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beneficios.map((b) => (
              <div key={b.titulo} className="bg-white rounded-2xl shadow-md p-8 text-center">
                <div className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center bg-[#BC6C25]/10">
                  <b.icono size={30} style={{ color: NARANJA }} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{b.titulo}</h3>
                <p className="text-gray-600">{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{t('Productos Destacados')}</h2>
              <p className="text-gray-600 mt-1">{t('Los paneles más pedidos por nuestros clientes.')}</p>
            </div>
            <Link to="/catalogo_productos" className="font-semibold hover:underline" style={{ color: NARANJA }}>{t('Ver catálogo completo')} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTACADOS.map((slug) => (
              <TarjetaCategoria key={slug} categoria={obtenerCategoria(slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-[#FEFAE0] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">{t('Pide tu Presupuesto')}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pasos.map((paso, index) => (
              <li key={paso.titulo} className="relative text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#588157] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{paso.titulo}</h3>
                <p className="text-gray-600">{paso.texto}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <Link to="/presupuesto" style={{ backgroundColor: NARANJA }} className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition">
              <FaFileAlt /> {t('Solicitar Presupuesto')}
            </Link>
          </div>
        </div>
      </section>

      {/* ÚLTIMOS ARTÍCULOS DEL BLOG */}
      <section className="bg-[#f8f7ef] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{t('Guías y consejos')}</h2>
              <p className="text-gray-600 mt-1">{t('Aprende a elegir e instalar tus paneles.')}</p>
            </div>
            <Link to="/blog" className="font-semibold hover:underline" style={{ color: NARANJA }}>{t('Ver todos los artículos')} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ultimosArticulos.map((a) => <TarjetaArticulo key={a.slug} articulo={a} />)}
          </div>
        </div>
      </section>

      {/* ¿NECESITAS AYUDA? */}
      <section className="bg-[#344e41] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('¿Necesitas ayuda o un presupuesto?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/presupuesto" className="group bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 flex gap-5 transition">
              <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: NARANJA }}>
                <FaFileAlt size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{t('Pide tu Presupuesto')}</h3>
                <p className="text-gray-200 mb-4">{t('Cuéntanos qué paneles necesitas y te enviaremos un presupuesto personalizado y sin compromiso.')}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-[#FEFAE0]">
                  {t('Solicitar Presupuesto')} <FaArrowRight className="group-hover:translate-x-1 transition" />
                </span>
              </div>
            </Link>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-5">
              <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-[#588157]">
                <FaComments size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{t('¿Tienes dudas o preguntas?')}</h3>
                <p className="text-gray-200 mb-4">{t('Nuestro equipo está aquí para ayudarte con cualquier consulta. Ya sea sobre nuestros productos, disponibilidad o transporte, estamos a tu disposición.')}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <Link to="/contacto" className="group inline-flex items-center gap-2 font-semibold text-[#FEFAE0]">
                    {t('Contactar con Nosotros')} <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </Link>
                  <a href="tel:+34123456789" className="inline-flex items-center gap-2 font-semibold text-[#FEFAE0] hover:underline">
                    <FaPhoneAlt /> 123 456 789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
