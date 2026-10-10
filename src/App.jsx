import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Features } from './components/Features';
import { CharmGallery } from './components/CharmGallery';
import { HowItWorks } from './components/HowItWorks';
import { Customizer } from './components/Customizer';
import { DownloadSection } from './components/DownloadSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DesktopWindow } from './components/DesktopWindow';
import { Monitor, X, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const [selectedCharm, setSelectedCharm] = useState('orbit');
  const [toastMessage, setToastMessage] = useState(null);
  const [desktopNoticeModal, setDesktopNoticeModal] = useState(false);

  useEffect(() => {
    // Check if running inside Electron companion window
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'desktop') {
      setIsDesktopMode(true);
    }
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
  };

  const handleOpenDesktopMode = (charmId = 'mochi') => {
    if (window.electronAPI) {
      // Electron Mode: Trigger IPC to open/show transparent desktop overlay
      window.electronAPI.openDesktopWindow(charmId);
      triggerToast(`Launching ${charmId} in Windows desktop overlay!`);
    } else {
      // Browser Mode: Show honest informative modal explanation
      setDesktopNoticeModal(true);
    }
  };

  const handleScrollToDownload = () => {
    setDesktopNoticeModal(false);
    const el = document.querySelector('#download');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Renderer mode for Electron transparent desktop window
  if (isDesktopMode) {
    return <DesktopWindow />;
  }

  // Full Landing Page Website View
  return (
    <div className="swingly-app">
      <Navbar onOpenToast={triggerToast} onOpenDesktopMode={handleOpenDesktopMode} />
      
      <main>
        <Hero
          onSelectCharm={setSelectedCharm}
          onOpenToast={triggerToast}
          onOpenDesktopMode={handleOpenDesktopMode}
        />
        <InteractiveDemo
          onOpenToast={triggerToast}
          onOpenDesktopMode={handleOpenDesktopMode}
        />
        <Features />
        <CharmGallery
          selectedCharm={selectedCharm}
          onSelectCharm={setSelectedCharm}
          onOpenToast={triggerToast}
        />
        <HowItWorks />
        <Customizer
          selectedCharm={selectedCharm}
          onSelectCharm={setSelectedCharm}
          onOpenToast={triggerToast}
          onOpenDesktopMode={handleOpenDesktopMode}
        />
        <DownloadSection selectedCharm={selectedCharm} onOpenToast={triggerToast} />
        <FAQ />
      </main>

      <Footer onOpenToast={triggerToast} />
      
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Honest Browser Fallback Modal for Desktop Mode */}
      <AnimatePresence>
        {desktopNoticeModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '2px solid var(--color-border-darker)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem 2rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setDesktopNoticeModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-muted)'
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                border: '1.5px solid var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem'
              }}>
                <Monitor size={28} color="#171717" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.6rem' }}>
                Desktop Mode Requires the SWINGLY App
              </h3>

              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                A standard web browser tab cannot create a persistent, transparent, always-on-top overlay directly over your Windows desktop and other applications.
              </p>

              {/* Developer Command Helper */}
              <div style={{
                backgroundColor: '#171717',
                color: '#FFF',
                padding: '1rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                marginBottom: '1.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}>
                <Terminal size={18} color="#C6F36A" />
                <div>
                  <div style={{ color: '#8E8E9A', fontSize: '0.75rem', fontWeight: 700 }}>TO RUN IN ELECTRON DESKTOP MODE:</div>
                  <div style={{ color: '#C6F36A', fontWeight: 700, marginTop: '2px' }}>npm run dev:electron</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleScrollToDownload}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Download Windows App
                </button>
                <button
                  onClick={() => setDesktopNoticeModal(false)}
                  className="btn btn-secondary"
                >
                  Continue in Browser
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
