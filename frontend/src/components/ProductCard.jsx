import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';

const variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const ProductCard = ({ product, onImageClick }) => {
  return (
    <motion.div 
      className={`glass-card ${styles.card} ${product.isSoldOut ? styles.soldOutCard : ''}`}
      variants={variants}
      whileHover={product.isSoldOut ? {} : { y: -10 }}
    >
      <div className={styles.imageContainer} onClick={() => onImageClick && onImageClick(product)}>
        <img src={product.image} alt={product.name} />
        {product.isSoldOut && <div className={styles.soldOutBadge}>Sold Out</div>}
        <div className={styles.category}>{product.category}</div>
      </div>
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{product.price}</span>
          <a 
            href={product.isSoldOut ? null : "/#contact"} 
            className={`${styles.inquiryBtn} ${product.isSoldOut ? styles.disabledBtn : ''}`}
            onClick={(e) => product.isSoldOut && e.preventDefault()}
          >
            {product.isSoldOut ? 'Out of Stock' : 'Enquire Now'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
