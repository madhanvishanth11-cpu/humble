import React, { useState } from 'react';
import { CHARACTERS, CATEGORIES, renderCharacterSVG } from '../data/charms';
import { Sparkles, Check, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CharmGallery = ({ selectedCharm, onSelectCharm, onOpenToast }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCharms = activeCategory === 'All'
    ? CHARACTERS
    : CHARACTERS.filter(c => c.category === activeCategory);

  const handleCardClick = (charm) => {
    onSelectCharm(charm.id);
    if (onOpenToast) {
      onOpenToast(`Selected ${charm.name}! Scroll to Customizer to tweak colors.`);
    }
  };

  const handleDeselect = () => {
    onSelectCharm('orbit');
    if (onOpenToast) onOpenToast("Reset selected companion to Orbit");
  };

  const handleScrollToCustomizer = () => {
    const el = document.querySelector('#customizer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collection" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="eyebrow">MEET YOUR NEW DESK BUDDIES</span>
          <h2 className="section-heading">Pick your favorite personality.</h2>
          <p className="section-subheading">
            Each companion brings a distinct vibe to your screen. Collect your favorites or mix and match.
          </p>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginTop: '1.5rem'
          }}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '0.5rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-text)',
                  backgroundColor: activeCategory === category ? 'var(--color-text)' : 'var(--color-surface)',
                  color: activeCategory === category ? '#FFFFFF' : 'var(--color-text)',
                  cursor: 'pointer',
                  boxShadow: activeCategory === category ? '0 4px 0 var(--color-accent)' : 'var(--shadow-sm)',
                  transition: 'all 0.15s ease'
                }}
              >
                {category}
              </button>
            ))}

            {selectedCharm && (
              <button
                onClick={handleDeselect}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px dashed var(--color-muted)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
                title="Reset selection"
              >
                <RefreshCw size={14} />
                <span>Reset Selection</span>
              </button>
            )}
          </div>
        </div>

        {/* Character Card Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.8rem'
          }}
        >
          <AnimatePresence>
            {filteredCharms.map((charm) => {
              const isSelected = selectedCharm === charm.id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={charm.id}
                  onClick={() => handleCardClick(charm)}
                  whileHover={{ y: -6 }}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${isSelected ? 'var(--color-text)' : 'var(--color-border)'}`,
                    boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.12)' : 'var(--shadow-sm)',
                    padding: '1.8rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      border: '1.5px solid var(--color-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  {/* Character Category Badge */}
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.6rem',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '1rem',
                    color: 'var(--color-muted)',
                    border: '1px solid var(--color-border)'
                  }}>
                    {charm.category} • {charm.badge}
                  </span>

                  {/* Character SVG Render */}
                  <div style={{
                    margin: '0.5rem 0 1.2rem 0',
                    height: '110px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}>
                    {renderCharacterSVG(charm.id, charm.defaultColor, {
                      size: 95,
                      secondaryColor: charm.secondaryColor,
                      accentColor: charm.accentColor
                    })}
                  </div>

                  {/* Name & Tagline */}
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                    {charm.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
                    {charm.tagline}
                  </p>

                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>
                    {charm.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Action Bar at bottom of gallery */}
        <div style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleScrollToCustomizer}
            className="btn btn-primary btn-lg"
          >
            <SlidersHorizontal size={18} />
            <span>Customize Selected Companion ({selectedCharm ? CHARACTERS.find(c => c.id === selectedCharm)?.name : 'Orbit'})</span>
          </button>
        </div>
      </div>
    </section>
  );
};
