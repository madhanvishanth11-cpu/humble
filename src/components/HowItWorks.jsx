import React from 'react';
import { MousePointerClick, Sliders, Laptop, ArrowRight } from 'lucide-react';
import { renderCharacterSVG } from '../data/charms';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: 'STEP 01',
    title: 'Choose Your Character',
    description: 'Explore the collection and select the companion that matches your personal workspace style.',
    icon: MousePointerClick,
    accent: '#C6F36A',
    renderVisual: () => (
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '0.6rem', backgroundColor: '#FFF', borderRadius: '50%', border: '2px solid #171717', boxShadow: '0 4px 0 #171717' }}>
          {renderCharacterSVG('sprout', '#C6F36A', { size: 55 })}
        </div>
        <div style={{ padding: '0.6rem', backgroundColor: '#FFF', borderRadius: '50%', border: '2px solid #171717', boxShadow: '0 4px 0 #171717', transform: 'scale(1.15)' }}>
          {renderCharacterSVG('orbit', '#C8B7FF', { size: 65 })}
        </div>
        <div style={{ padding: '0.6rem', backgroundColor: '#FFF', borderRadius: '50%', border: '2px solid #171717', boxShadow: '0 4px 0 #171717' }}>
          {renderCharacterSVG('ember', '#FF9D68', { size: 55 })}
        </div>
      </div>
    )
  },
  {
    step: 'STEP 02',
    title: 'Make It Yours',
    description: 'Customize the available colors, swinging speed, rope intensity, and background workspace options.',
    icon: Sliders,
    accent: '#FF9D68',
    renderVisual: () => (
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: 'var(--radius-md)',
        border: '2px solid #171717',
        padding: '0.8rem 1rem',
        boxShadow: '0 4px 0 #171717',
        width: '100%',
        maxWidth: '220px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '0.6rem', justifyContent: 'center' }}>
          {['#C6F36A', '#FF9D68', '#C8B7FF', '#70A6FF', '#FFAAA6'].map((color, i) => (
            <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color, border: '1.5px solid #171717' }} />
          ))}
        </div>
        <div style={{ height: '6px', backgroundColor: '#E7E0D4', borderRadius: '3px', position: 'relative' }}>
          <div style={{ width: '65%', height: '100%', backgroundColor: '#FF9D68', borderRadius: '3px' }} />
        </div>
      </div>
    )
  },
  {
    step: 'STEP 03',
    title: 'Bring It to Your Desktop',
    description: 'Download the supported desktop app binary or test the full interactive experience directly in your browser.',
    icon: Laptop,
    accent: '#C8B7FF',
    renderVisual: () => (
      <div style={{
        backgroundColor: '#171717',
        color: '#FFF',
        borderRadius: 'var(--radius-md)',
        border: '2px solid #171717',
        padding: '0.8rem 1.2rem',
        boxShadow: '0 4px 0 #C6F36A',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontWeight: 700,
        fontSize: '0.85rem'
      }}>
        <Laptop size={18} color="#C6F36A" />
        <span>Desktop Companions Ready</span>
      </div>
    )
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">SIMPLE 3-STEP SETUP</span>
          <h2 className="section-heading">Three steps. More personality.</h2>
          <p className="section-subheading">
            Getting started with Swingly is fast, simple, and effortless.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}>
          {STEPS.map((stepItem, idx) => {
            const IconComponent = stepItem.icon;
            return (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--color-border)',
                  padding: '2.2rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Step Badge */}
                <div style={{
                  backgroundColor: stepItem.accent,
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  padding: '0.35rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-text)',
                  marginBottom: '1.2rem',
                  boxShadow: '0 3px 0 var(--color-text)'
                }}>
                  {stepItem.step}
                </div>

                {/* Step Visual Art */}
                <div style={{
                  height: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginBottom: '1.2rem'
                }}>
                  {stepItem.renderVisual()}
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                  {stepItem.title}
                </h3>

                <p style={{ color: 'var(--color-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {stepItem.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
