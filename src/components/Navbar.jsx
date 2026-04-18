import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Diamond className={styles.icon} />
          <span>BHOPU <span className={styles.accent}>JEWELS</span></span>
        </Link>
        
        <div className={styles.links}>
          <a href="/#services">Services</a>
          <Link to="/products">Portfolio</Link>
          <a href="/#process">Process</a>
          <a href="/#contact" className={styles.cta}>Inquiry</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
