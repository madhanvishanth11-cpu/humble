import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { HangingCharm } from './HangingCharm';
import { Download, Sparkles, ArrowRight, CheckCircle2, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = ({ onSelectCharm, onOpenToast, onOpenDesktopMode }) => {
  const [activeCharmMessage, setActiveCharmMessage] = useState("Click any character to interact!");

  const handleCharmClick = (charmInfo) => {
    setActiveCharmMessage(`You clicked ${charmInfo.name}! ${charmInfo.tagline}`);
    if (onOpenToast) {
      onOpenToast(`${charmInfo.name} says hello! 🎉`);
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '3rem 0 5rem 0' }}>
      {/* Playful background decorative shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-lavender)',
        filter: 'blur(80px)',
        opacity: 0.4,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent)',
        filter: 'blur(90px)',
        opacity: 0.35,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem auto' }}>
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow" style={{
              backgroundColor: 'var(--color-surface)',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border-darker)',
              boxShadow: 'var(--shadow-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={14} color="#77736D" />
              {SITE_CONFIG.heroEyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw + 1rem, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: '1rem',
              marginBottom: '1.2rem',
              letterSpacing: '-0.03em'
            }}
          >
            A LITTLE CHARACTER.<br />
            <span style={{
              backgroundImage: 'linear-gradient(135deg, #171717 60%, #FF9D68 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              A LOT MORE YOU.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: 'var(--color-muted)',
              lineHeight: 1.5,
              marginBottom: '2.2rem',
              fontWeight: 500
            }}
          >
            {SITE_CONFIG.subtagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => onOpenDesktopMode('mochi')}
              className="btn btn-primary btn-lg"
            >
              <MonitorPlay size={20} />
              <span>Open Desktop Mode</span>
            </button>

            <a
              href="#download"
              onClick={(e) => handleNavClick(e, '#download')}
              className="btn btn-secondary btn-lg"
            >
              <Download size={18} />
              <span>Get Swingly App</span>
            </a>

            <a
              href="#collection"
              onClick={(e) => handleNavClick(e, '#collection')}
              className="btn btn-secondary btn-lg"
            >
              <span>Collection</span>
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-muted)',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}>
            <CheckCircle2 size={14} color="#7CB342" />
            Made for your everyday screen. Compatible with Windows desktop overlays.
          </p>
        </div>

        {/* HERO VISUAL: Desktop Window Mockup with Hanging Characters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: 'relative',
            maxWidth: '1040px',
            margin: '0 auto',
            backgroundColor: '#1E1E24',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid #2F2F38',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.25)',
            overflow: 'visible'
          }}
        >
          {/* Simulated Desktop Window Titlebar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.8rem 1.2rem',
            backgroundColor: '#18181C',
            borderTopLeftRadius: 'calc(var(--radius-lg) - 2px)',
            borderTopRightRadius: 'calc(var(--radius-lg) - 2px)',
            borderBottom: '1px solid #2B2B32'
          }}>
            {/* Window control dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
            </div>

            {/* Window Title */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.825rem',
              color: '#8A8A93',
              fontWeight: 600,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span>Swingly Desktop Display — Workspace</span>
            </div>

            {/* Status indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: '#C6F36A',
              fontWeight: 700
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C6F36A', display: 'inline-block' }} className="pulse-glow" />
              Live Companions Active
            </div>
          </div>

          {/* Desktop Workspace Preview Canvas */}
          <div style={{
            position: 'relative',
            height: '460px',
            background: 'linear-gradient(180deg, #F0EAD9 0%, #FAF6ED 100%)',
            borderBottomLeftRadius: 'calc(var(--radius-lg) - 2px)',
            borderBottomRightRadius: 'calc(var(--radius-lg) - 2px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* HANGING CHARACTERS BEZEL MOUNT - TOP EDGE */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              backgroundColor: '#171717',
              zIndex: 10
            }} />

            {/* Suspended Hanging Characters Grid */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              padding: '0 5%',
              zIndex: 12
            }}>
              {/* Left Charm: Sprout */}
              <div style={{ marginTop: '-4px' }}>
                <HangingCharm
                  charmId="sprout"
                  ropeLength={140}
                  size={75}
                  swingSpeed={0.9}
                  swingIntensity={1.2}
                  onClick={handleCharmClick}
                  showLabel={true}
                />
              </div>

              {/* Main Center Hero Charm: Orbit */}
              <div style={{ marginTop: '-4px' }}>
                <HangingCharm
                  charmId="orbit"
                  ropeLength={185}
                  size={100}
                  swingSpeed={1.1}
                  swingIntensity={1.4}
                  onClick={handleCharmClick}
                  showLabel={true}
                />
              </div>

              {/* Right Charm 1: Ember */}
              <div style={{ marginTop: '-4px' }}>
                <HangingCharm
                  charmId="ember"
                  ropeLength={125}
                  size={70}
                  swingSpeed={1.3}
                  swingIntensity={1}
                  onClick={handleCharmClick}
                  showLabel={true}
                />
              </div>

              {/* Right Charm 2: Mochi */}
              <div style={{ marginTop: '-4px', display: 'none' }} className="hero-fourth-charm">
                <HangingCharm
                  charmId="mochi"
                  ropeLength={160}
                  size={80}
                  swingSpeed={0.8}
                  swingIntensity={1.1}
                  onClick={handleCharmClick}
                  showLabel={true}
                />
              </div>
            </div>

            {/* Simulated Desktop Widgets / Content below characters */}
            <div style={{
              padding: '5rem 2rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              height: '100%',
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              {/* Wallpaper decorative desktop card */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
                maxWidth: '860px',
                margin: '0 auto',
                gap: '1rem'
              }}>
                {/* Left Widget */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(231, 224, 212, 0.9)',
                  boxShadow: 'var(--shadow-md)',
                  pointerEvents: 'auto'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
                    Companion Status
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.2rem' }}>
                    {activeCharmMessage}
                  </div>
                </div>

                {/* Right Taskbar preview */}
                <div style={{
                  backgroundColor: 'rgba(23, 23, 23, 0.9)',
                  color: '#FFF',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  pointerEvents: 'auto'
                }}>
                  <span>10:42 AM</span>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span style={{ color: 'var(--color-accent)' }}>Swingly Companion Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-fourth-charm {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};
