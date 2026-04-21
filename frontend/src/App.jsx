import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ProductsPage from './pages/ProductsPage';
import AdminDashboard from './pages/AdminDashboard';
import PageTransition from './components/PageTransition';
import styles from './App.module.css';

const HomePage = () => (
  <main>
    <Hero />
    <Services />
    <Process />
    <Gallery />
    <Contact />
  </main>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/products" 
          element={
            <PageTransition>
              <ProductsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <AnimatedRoutes />
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; 2026 BHOPU JEWELS. All Rights Reserved. Excellence in Manufacturing.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
