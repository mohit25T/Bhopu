import React from 'react';
import { motion } from 'framer-motion';
import styles from './Gallery.module.css';
import collectionImg from '../assets/images/collection.png';

const Gallery = () => {
  return (
    <section id="portfolio" className={styles.gallery}>
      <div className={styles.header}>
        <h2 className="gold-text">Crafted Brilliance</h2>
        <p>A glimpse into our manufacturing excellence across various metal groups and stone types.</p>
      </div>
      
      <div className={styles.display}>
        <motion.div 
          className={styles.mainImage}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={collectionImg} alt="Jewelry Collection" />
          <div className={styles.caption}>
            <h3>The Signature Series</h3>
            <p>18K Rose Gold & Conflict-Free Diamonds</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
