import { useTranslation } from "react-i18next";

const IDIOMAS = [
    { codigo: 'es', nombre: 'Español', bandera: '/icons-españa.png' },
    { codigo: 'en', nombre: 'English', bandera: '/icons-gran-bretaña.png' },
];

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    // "es-ES" o "en-GB" cuentan como "es" y "en"
    const actual = (i18n.resolvedLanguage || i18n.language || 'es').slice(0, 2);

    return (
        <div className="flex items-center gap-2">
            {IDIOMAS.map((idioma) => {
                const activo = actual === idioma.codigo;
                return (
                    <button
                        key={idioma.codigo}
                        type="button"
                        onClick={() => i18n.changeLanguage(idioma.codigo)}
                        aria-pressed={activo}
                        aria-label={idioma.nombre}
                        title={idioma.nombre}
                        className={`rounded-full transition ${activo ? 'ring-2 ring-white' : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                    >
                        <img src={idioma.bandera} alt="" className="w-6 h-6 rounded-full object-cover" />
                    </button>
                );
            })}
        </div>
    );
}

export default LanguageSwitcher;
