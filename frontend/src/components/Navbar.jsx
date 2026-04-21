import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <Diamond className={styles.icon} />
          <span>BHOPU <span className={styles.accent}>JEWELS</span></span>
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.links}>
          <a href="/#services">Services</a>
          <Link to="/products">Portfolio</Link>
          <a href="/#process">Process</a>
          <a href="/#contact" className={styles.cta}>Inquiry</a>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>
              <a href="/#services" onClick={closeMenu}>Services</a>
              <Link to="/products" onClick={closeMenu}>Portfolio</Link>
              <a href="/#process" onClick={closeMenu}>Process</a>
              <a href="/#contact" className={styles.cta} onClick={closeMenu}>Inquiry</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
