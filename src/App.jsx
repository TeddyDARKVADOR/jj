import './index.css'
import Test from './components/test';
import Evolution from './components/Evolution';
import Header from './components/Header';
import Accueil from './components/Accueil';
import Favorite from './components/Favorite';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [langue, setLangue] = useState('fr');
  const changerLangue = () => {
    setLangue((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <Header titre="Pokédex React" langue={langue} changerLangue={changerLangue} />
      <nav className="NAVBARstyle">
      </nav>
      <button className="Scroll-to-top"
        onClick={scrollToTop}
        aria-label="Remonter en haut"
      >
        <span className="spanfleche"style={{ display: "block", transform: "rotate(270deg)" }}>➤</span>
      </button>
      <main className="main-content">
        <Routes>
          <Route 
            path="/"
            element={<Accueil langue={langue} />}
          />
          <Route 
            path="/favoris"
            element={<Favorite langue={langue} />}
          />
          <Route 
            path="/pokemon/:id" 
            element={<Test langue={langue} />} 
          />
          <Route 
            path="/pokemon/:id/evolution" 
            element={<Evolution langue={langue} />} 
          />
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App