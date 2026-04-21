import React from 'react';
import { motion } from 'framer-motion';
import styles from './Process.module.css';
import ImageModal from './ImageModal';
import workshopImg from '../assets/images/workshop.png';

const steps = [
  { step: "01", title: "Conceptualization", desc: "Collaborative design mapping and technical feasibility assessment." },
  { step: "02", title: "Prototyping", desc: "High-fidelity 3D printing and master model creation." },
  { step: "03", title: "Production", desc: "Batch manufacturing with rigorous quality benchmarks." },
  { step: "04", title: "Quality Assurance", desc: "Final inspection, stone testing, and hallmarking." }
];

const Process = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section id="process" className={styles.process}>
      <div className={styles.container}>
        <div className={styles.visual}>
          <motion.div 
            className={styles.imageWrapper}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            <img src={workshopImg} alt="Jewelry Workshop" />
          </motion.div>
        </div>
        
        <div className={styles.content}>
          <motion.h2 
            className="gold-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Process
          </motion.h2>
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <motion.div 
                key={i} 
                className={styles.stepItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className={styles.stepNumber}>{s.step}</div>
                <div className={styles.stepText}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ImageModal 
        isOpen={isModalOpen} 
        image={workshopImg} 
        title="Our Workshop" 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Process;
