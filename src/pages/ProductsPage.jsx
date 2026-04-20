import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ImageModal from '../components/ImageModal';
import { useProducts } from '../context/ProductContext';
import styles from './ProductsPage.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const ProductsPage = () => {
  const { products = [], loading } = useProducts() || {}; // Safety fallback to empty array
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className={styles.page}><div className={styles.loading}>Curating Collections...</div></div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <motion.div 
          className={styles.headerContent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="gold-text">Our Collections</h1>
          <p>Explore our masterfully manufactured jewelry collections, crafted for excellence.</p>
        </motion.div>
      </header>

      <section className={styles.gridSection}>
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products && products.length > 0 ? (
            products.map((p) => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onImageClick={(product) => setSelectedProduct(product)} 
              />
            ))
          ) : (
            <p className={styles.noProducts}>No products found in the catalog.</p>
          )}
        </motion.div>
      </section>

      <ImageModal 
        isOpen={!!selectedProduct} 
        image={selectedProduct?.image} 
        title={selectedProduct?.name} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default ProductsPage;
