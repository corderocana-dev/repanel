import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FAQ = () => {

    const { t } = useTranslation();

    const [openIndex, setOpenIndex] = useState(null);
    const [openIndex_2, setOpenIndex_2] = useState(null);

    const faqs = [
        {
            question: "¿Qué es un panel sándwich de segunda mano?",
            answer: "Es un panel previamente instalado y desmontado cuidadosamente, que conserva su integridad estructural. Se revisa, selecciona y limpia antes de su reventa. Es ideal para quienes buscan soluciones de calidad a menor coste, y con impacto ambiental reducido.",
        },
        {
            question: "¿Los paneles sándwich de segunda mano tienen garantía?",
            answer: "Sí, ofrecemos una garantía limitada basada en el estado de cada producto. Aseguramos que estén en condiciones funcionales y que no presenten deterioros que afecten su instalación o uso.",
        },
        {
            question: "¿Puedo ver los paneles antes de comprarlos?",
            answer: "¡Por supuesto! Nos dice en que tipo de panel(s) está intereso/a y a continuación pedirnos fotos detalladas y vídeos por WhatsApp o correo electrónico.",
        },
    ];

    const faqs_2 = [
        {
            question: "¿Son seguros los paneles sándwich usados?",
            answer: "Sí. Todos nuestros paneles son inspeccionados manualmente para garantizar que cumplen con los estándares de resistencia térmica, estructural y estética mínima. No comercializamos productos que presenten defectos críticos.",
        },
        {
            question: "¿Qué usos pueden tener los paneles sándwich reciclados?",
            answer: (
                <ul className='list-disc list-inside pl-2'>
                    <span>Son ideales para:</span>
                    <li>Naves industriales</li>
                    <li>Cobertizos y cerramientos</li>
                    <li>Tejados de granjas</li>
                    <li>Módulos prefabricados</li>
                    <li>Cámaras frigoríficas</li>
                    <li>Porches, pérgolas y más</li>
                </ul>
            ),
        },
        {
            question: "¿Realizáis envíos?",
            answer: "Sí. Hacemos envíos a toda España. Trabajamos con transportistas especializados para asegurar una entrega rápida y segura. También puedes recogerlos directamente en nuestro almacén.",
        },
        {
            question: "¿Qué medidas y grosores tenéis disponibles?",
            answer: "Disponemos de múltiples opciones (dependiendo el stock). Contacta con nosotros.",
        },
    ];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const toggle_2 = (index2) => {
        setOpenIndex_2(openIndex_2 === index2 ? null : index2);
    };

    return (
        <>
            <Helmet>
                <title>{t('Preguntas Frecuentes | Repanel')}</title>
                <meta name="description" content={t('Resuelve tus dudas sobre nuestros paneles sándwich de segunda mano, garantías, proceso de compra y más.')}/>
                <meta name="keywords" content="preguntas frecuentes, FAQ, paneles sandwich segunda mano, garantías, cómo comprar, ver paneles, repanel"/>
                <link rel="canonical" href="http://localhost:5173/faq" />
            </Helmet>
            
            <section className="min-h-screen bg-[#f0eee3] text-white py-12 px-6 md:px-20">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-4">Preguntas Frecuentes</h1>
                    <p className="text-center text-lg mb-8 opacity-90">Encuentra respuestas claras sobre nuestros productos y servicios.</p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white text-black rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100"
                                >
                                    <span className="text-lg font-medium">{faq.question}</span>
                                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openIndex === index && (
                                    <div className="p-4 pt-0 text-gray-700 border-t border-gray-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <h2 className='pt-4 pb-4 text-xl flex justify-center'>Más preguntas frecuentes: </h2>
                    <div className="space-y-4">
                        {faqs_2.map((faq, index) => (
                            <div key={index} className="bg-white text-black rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => toggle_2(index)}
                                    className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100"
                                >
                                    <span className="text-lg font-medium">{faq.question}</span>
                                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openIndex_2 === index && (
                                    <div className="p-4 pt-0 text-gray-700 border-t border-gray-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>

    );
};

export default FAQ;
