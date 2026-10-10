import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ = () => {
  const [openId, setOpenId] = useState('faq-1');

  const toggleFAQ = (id) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="eyebrow">GOT QUESTIONS?</span>
          <h2 className="section-heading">Questions, answered.</h2>
          <p className="section-subheading">
            Everything you need to know about Swingly desktop companions and browser demonstration.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SITE_CONFIG.faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-header-${item.id}`}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span>{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ChevronDown size={20} color="var(--color-muted)" />
                  </motion.div>
                </button>

                {/* Accordion Answer Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-header-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 1.6rem 1.4rem 1.6rem',
                        fontSize: '0.975rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.6,
                        borderTop: '1px solid var(--color-border)'
                      }}>
                        <p style={{ marginTop: '1rem' }}>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
