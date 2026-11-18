// Funciones de ayuda para trabajar con categorías y productos
import categorias from '../locals/categorias.json';
import productos from '../locals/productos.json';

export { categorias, productos };

export const obtenerCategoria = (slug) => categorias.find((c) => c.slug === slug);

export const productosDeCategoria = (slug) => productos.filter((p) => p.categoria === slug);

export const obtenerProducto = (categoria, slug) =>
  productos.find((p) => p.categoria === categoria && p.slug === slug);

// Imagen del producto: la suya propia si la tiene, si no la de su categoría
export const imagenProducto = (producto) =>
  producto.imagen || obtenerCategoria(producto.categoria)?.imagen;

export const enlaceProducto = (producto) => `/productos/${producto.categoria}/${producto.slug}`;

// Enlace a la página de presupuesto con el panel ya seleccionado
export const enlacePresupuesto = (producto) =>
  `/presupuesto?tipo=${encodeURIComponent(producto.categoria)}&modelo=${encodeURIComponent(producto.nombre)}`;

// Colores para las muestras (añade aquí los nuevos colores)
export const COLORES = {
  'Rojo teja': '#A4452C',
  'Albero': '#D9A95B',
  'Gris pizarra': '#4A5059',
  'Blanco': '#F4F4F1',
  'Gris plata': '#B7BABD',
  'Gris antracita': '#3B3F44',
  'Verde': '#3F6B46',
  'Aluminio natural': '#C9CDD1',
  'Traslúcido': '#DCEBF5',
  'Opal': '#ECEFF1',
  'Bronce': '#8C6A43',
  'Galvanizado': '#A9B0B5',
};
