import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, PenTool, Sparkles } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: <PenTool />,
    title: "3D CAD & Design",
    desc: "Transforming sketches into high-precision digital models with intricate detailing."
  },
  {
    icon: <Cpu />,
    title: "Precision Casting",
    desc: "Advanced vacuum pressure casting for flawless density and metallurgical integrity."
  },
  {
    icon: <Layers />,
    title: "Stone Setting",
    desc: "Master setters ensuring maximum fire and brilliance for every diamond and gem."
  },
  {
    icon: <Sparkles />,
    title: "Hand Finishing",
    desc: "Meticulous polishing and micro-detailing for a mirror-like platinum finish."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="gold-text">Our Expertise</h2>
        <p>Comprehensive manufacturing solutions for global luxury brands.</p>
      </motion.div>
      
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((s, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className={`glass-card ${styles.card}`}
            whileHover={{ y: -10, borderColor: 'var(--primary)' }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.iconWrapper}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
