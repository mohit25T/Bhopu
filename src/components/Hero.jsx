import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';
import heroImg from '../assets/images/hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  return (
    <section className={styles.hero}>
      <motion.div className={styles.background} style={{ y, scale }}>
        <img src={heroImg} alt="Luxury Jewelry Macro" />
        <div className={styles.overlay}></div>
      </motion.div>
      
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={titleVariants}>
          Mastering the Art of <br />
          <span className="gold-text">Exquisite Manufacturing</span>
        </motion.h1>
        
        <motion.p variants={titleVariants}>
          Leading jewelry manufacturers providing end-to-end B2B solutions, 
          from conceptual design to high-precision mass production.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          variants={titleVariants}
        >
          <Link to="/products" className={styles.primaryBtn}>Explore Collections</Link>
          <a href="#process" className={styles.secondaryBtn}>Our Process</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
