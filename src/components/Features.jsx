import React from 'react';
import { Activity, Palette, Feather, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    id: 1,
    icon: Activity,
    accentColor: '#C6F36A',
    title: 'Characters That Move',
    description: 'Give your screen a little life with playful, naturally swinging companions powered by realistic damped pendulum physics.',
    badge: 'Physics Powered'
  },
  {
    id: 2,
    icon: Palette,
    accentColor: '#FF9D68',
    title: 'Make It Yours',
    description: 'Choose your favorite characters, custom color palettes, rope lengths, and visual themes to suit your workspace vibe.',
    badge: 'Fully Custom'
  },
  {
    id: 3,
    icon: Feather,
    accentColor: '#C8B7FF',
    title: 'Lightweight by Design',
    description: 'Enjoy a thoughtfully designed experience that aims to keep animations silky smooth, hardware-accelerated, and battery-friendly.',
    badge: 'Zero Lag'
  },
  {
    id: 4,
    icon: Compass,
    accentColor: '#70A6FF',
    title: 'Your Own Little Collection',
    description: 'Discover new characters across space, nature, and cute categories. Build a desktop collection that truly feels like you.',
    badge: '8+ Characters'
  }
];

export const Features = () => {
  return (
    <section id="features" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">SMALL DETAILS. BIG PERSONALITY.</span>
          <h2 className="section-heading">Your screen deserves a little fun.</h2>
          <p className="section-subheading">
            Designed for designers, developers, students, and anyone who wants to turn a static display into a delightful personal space.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {FEATURES.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '2.2rem 1.8rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                className="feature-card"
              >
                {/* Accent Top Border Bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: feature.accentColor
                }} />

                {/* Icon & Badge Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: feature.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid var(--color-text)',
                    boxShadow: '0 4px 0 var(--color-text)'
                  }}>
                    <IconComponent size={26} color="#171717" />
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.3rem 0.6rem',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border-darker)'
                  }}>
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>

                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .feature-card:hover {
          border-color: var(--color-text) !important;
          box-shadow: var(--shadow-md) !important;
        }
      `}</style>
    </section>
  );
};
