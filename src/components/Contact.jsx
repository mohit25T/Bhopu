import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className="gold-text">Start Your Project</h2>
          <p>Partner with BHOPU Jewels for world-class jewelry manufacturing.</p>
          
          <div className={styles.details}>
            <div className={styles.item}>
              <MapPin className={styles.icon} />
              <span>123 Diamond District, Jaipur, India</span>
            </div>
            <div className={styles.item}>
              <Phone className={styles.icon} />
              <span>+91 98765 43210</span>
            </div>
            <div className={styles.item}>
              <Mail className={styles.icon} />
              <span>manufacturing@bhopujewels.com</span>
            </div>
          </div>
        </div>
        
        <form className={`glass-card ${styles.form}`}>
          <div className={styles.group}>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className={styles.group}>
            <label>Company Email</label>
            <input type="email" placeholder="john@company.com" />
          </div>
          <div className={styles.group}>
            <label>Manufacturing Requirements</label>
            <textarea placeholder="Tell us about your production needs..."></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Inquiry</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
