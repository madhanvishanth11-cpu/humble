import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#171717',
            color: '#FFFFFF',
            padding: '0.8rem 1.4rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            zIndex: 3000,
            fontSize: '0.9rem',
            fontWeight: 700,
            border: '1.5px solid var(--color-accent)'
          }}
        >
          <Sparkles size={16} color="#C6F36A" />
          <span>{message}</span>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#A0A0AB',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '0.4rem'
            }}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
