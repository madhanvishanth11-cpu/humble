import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { Monitor, Command, Download, Sparkles, AlertCircle, CheckCircle, ArrowUpRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export const DownloadSection = ({ selectedCharm, onOpenToast }) => {
  const [downloadModalPlatform, setDownloadModalPlatform] = useState(null);

  const handleDownloadClick = (platform) => {
    if (platform.installerUrl) {
      // Trigger genuine download URL
      window.location.href = platform.installerUrl;
      if (onOpenToast) onOpenToast(`Downloading Swingly for ${platform.name}...`);
    } else {
      // Show honest release modal
      setDownloadModalPlatform(platform);
      
      // Fun confetti explosion feedback
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // Fallback if canvas-confetti is unavailable
      }
    }
  };

  const handleBackToCollection = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="download"
      style={{
        backgroundColor: 'var(--color-dark-bg)',
        color: '#FFFFFF',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-accent)',
        filter: 'blur(160px)',
        opacity: 0.12,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
          <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>GET SWINGLY TODAY</span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '1rem',
            lineHeight: 1.1
          }}>
            Ready to give your desktop a little life?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#A0A0AB',
            lineHeight: 1.6
          }}>
            Choose your platform and bring your favorite companions along.
          </p>
        </div>

        {/* Platform Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {SITE_CONFIG.platforms.map((platform) => {
            const IconComponent = platform.id === 'windows' ? Monitor : Command;
            return (
              <motion.div
                key={platform.id}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: 'var(--color-dark-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-dark-border)',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  position: 'relative'
                }}
              >
                {/* Card Top */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.8rem'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(198, 243, 106, 0.15)',
                      border: '1px solid var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size={28} color="#C6F36A" />
                    </div>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-text)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {platform.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '0.4rem' }}>
                    {platform.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#8E8E9A', marginBottom: '1.2rem', fontWeight: 600 }}>
                    {platform.os}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#B0B0BD', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {platform.notes}
                  </p>
                </div>

                {/* Card Bottom CTA */}
                <div>
                  <button
                    onClick={() => handleDownloadClick(platform)}
                    className="btn btn-dark"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1rem',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <Download size={18} />
                    <span>Download for {platform.name}</span>
                  </button>

                  <div style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#8A8A93',
                    marginTop: '0.8rem'
                  }}>
                    {platform.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary navigation back to collection */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={handleBackToCollection}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#A0A0AB',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease'
            }}
            className="back-btn"
          >
            <ArrowLeft size={16} />
            <span>Explore Character Collection Again</span>
          </button>
        </div>
      </div>

      {/* Honest Release Status Modal */}
      {downloadModalPlatform && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              backgroundColor: '#1C1C20',
              border: '2px solid var(--color-dark-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 2rem',
              maxWidth: '480px',
              width: '100%',
              color: '#FFF',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(198, 243, 106, 0.15)',
              border: '1.5px solid var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem auto'
            }}>
              <Sparkles size={30} color="#C6F36A" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '0.6rem' }}>
              Swingly for {downloadModalPlatform.name}
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#B0B0BD', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              You are using the full-featured browser web demonstration. Native desktop installer binaries for <strong>{downloadModalPlatform.name}</strong> are currently in active beta testing.
            </p>

            <div style={{
              backgroundColor: '#26262E',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: '#C6F36A',
              fontWeight: 700,
              marginBottom: '1.8rem',
              textAlign: 'left',
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'flex-start'
            }}>
              <CheckCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Enjoy the live interactive companion canvas right now in your browser with full customizer capabilities!
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDownloadModalPlatform(null)}
                className="btn btn-dark"
                style={{ width: '100%' }}
              >
                Continue in Browser
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .back-btn:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
    </section>
  );
};
