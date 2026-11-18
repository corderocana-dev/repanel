// Buscador de la web: busca en modelos, categorías y artículos del blog
import { categorias, productos, obtenerCategoria, imagenProducto, enlaceProducto } from './productos';
import articulos from '../locals/blog.json';

// Quita tildes y pasa a minúsculas para comparar ("Frío" = "frio")
export const normalizar = (texto = '') =>
  texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

// Todas las palabras de la búsqueda tienen que aparecer en el texto
const coincide = (texto, palabras) => {
  const t = normalizar(texto);
  return palabras.every((p) => t.includes(p));
};

// Devuelve los resultados agrupados. Cada resultado: { tipo, titulo, subtitulo, imagen, to, dato }
export const buscar = (consulta) => {
  const palabras = normalizar(consulta).split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return { categorias: [], productos: [], articulos: [], total: 0 };

  const resCategorias = categorias
    .filter((c) => coincide(`${c.nombre} ${c.resumen} ${c.usos.join(' ')}`, palabras))
    .map((c) => ({ tipo: 'categoria', titulo: c.nombre, subtitulo: c.resumen, imagen: c.imagen, to: `/productos/${c.slug}`, dato: c }));

  const resProductos = productos
    .filter((p) => {
      const categoria = obtenerCategoria(p.categoria);
      return coincide(`${p.nombre} ${categoria?.nombre} ${p.descripcion} ${p.aplicaciones.join(' ')} ${p.colores.join(' ')}`, palabras);
    })
    // Primero los que tienen la búsqueda en el nombre
    .sort((a, b) => coincide(b.nombre, palabras) - coincide(a.nombre, palabras))
    .map((p) => ({ tipo: 'producto', titulo: p.nombre, subtitulo: obtenerCategoria(p.categoria)?.nombre, imagen: imagenProducto(p), to: enlaceProducto(p), dato: p }));

  const resArticulos = articulos
    .filter((a) => coincide(`${a.titulo} ${a.resumen} ${a.categoria}`, palabras))
    .map((a) => ({ tipo: 'articulo', titulo: a.titulo, subtitulo: a.categoria, imagen: a.imagen, to: `/blog/${a.slug}`, dato: a }));

  return {
    categorias: resCategorias,
    productos: resProductos,
    articulos: resArticulos,
    total: resCategorias.length + resProductos.length + resArticulos.length,
  };
};
