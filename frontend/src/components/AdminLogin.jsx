import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default password for Bhopu Jewels Admin
    if (password === 'Bhopu@Admin') {
      onLogin();
    } else {
      setError('Invalid master passcode. Access denied.');
      setPassword('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className={styles.loginPage}>
      <motion.div 
        className={`glass-card ${styles.loginCard}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.iconWrapper}>
          <Lock size={32} />
        </div>

        <div className={styles.header}>
          <h2 className="gold-text">Secure Access</h2>
          <p>Please enter the administrative passcode to manage the inventory.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Master Passcode</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button 
                type="button" 
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            <ShieldCheck size={20} />
            Unlock Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
