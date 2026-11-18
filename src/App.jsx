import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Contacto from './pages/Contacto';
import Presupuesto from './pages/Presupuesto';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Blog from './pages/Blog';
import ArticuloBlog from './pages/ArticuloBlog';
import Buscar from './pages/Buscar';

import Catalogo from './pages/CatalogoProductos';
import FAQ from './pages/FAQ';
import InformacionLegal from './pages/InformacionLegal';

function App() {

  return (

    <Router>
      <ScrollToTop />
      <Header />

      <main className="mt-0 mb-0">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/quienessomos" element={<QuienesSomos />} />
          <Route path='/productos' element={<Navigate to='/catalogo_productos' replace />} />
          <Route path='/productos/:categoria' element={<Productos/>} />
          <Route path='/productos/:categoria/:producto' element={<ProductoDetalle/>} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/presupuesto" element={<Presupuesto />} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/blog/:slug' element={<ArticuloBlog/>} />
          <Route path='/buscar' element={<Buscar/>} />

          <Route path='/catalogo_productos' element={<Catalogo/>} />
          <Route path='/faq' element={<FAQ/>} />
          <Route path="/informaciónLegal" element={<InformacionLegal />} />

        </Routes>
      </main>

      <Footer />
    </Router>

  )

}

export default App;
