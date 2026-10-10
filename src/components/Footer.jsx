import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { HangingCharm } from './HangingCharm';
import { Sparkles, Heart, Shield, FileText, Mail, X } from 'lucide-react';

export const Footer = ({ onOpenToast }) => {
  const [activeModal, setActiveModal] = useState(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLegalClick = (e, id, name) => {
    e.preventDefault();
    setActiveModal({ id, name });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-surface)',
      borderTop: '2px solid var(--color-border)',
      padding: '4rem 0 2rem 0',
      color: 'var(--color-text)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '36px', overflow: 'hidden', marginTop: '-4px' }}>
                <HangingCharm charmId="sprout" ropeLength={14} size={22} swingSpeed={0.8} interactive={false} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800 }}>
                SWINGLY
              </span>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {SITE_CONFIG.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.2rem', color: 'var(--color-muted)' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600 }}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Help Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.2rem', color: 'var(--color-muted)' }}>
              Legal & Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SITE_CONFIG.footer.legalLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLegalClick(e, item.id, item.name)}
                    style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 600 }}
                    className="footer-link"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--color-muted)'
        }}>
          <div>{SITE_CONFIG.footer.copyright}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Designed with care for peaceful desktops</span>
            <Heart size={14} color="#FF9D68" fill="#FF9D68" />
          </div>
        </div>
      </div>

      {/* Legal / Contact Info Modal */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2500,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveModal(null)}
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

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.8rem' }}>
              {activeModal.name}
            </h3>

            {activeModal.id === 'privacy' && (
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                Swingly is committed to your privacy. This website and browser preview store your character preferences locally in your browser (LocalStorage). We do not track, collect, or share personal user data.
              </p>
            )}

            {activeModal.id === 'terms' && (
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                All original SVG character artwork, designs, and code assets are published under the open Swingly companion template project. Free for personal desktop customization.
              </p>
            )}

            {activeModal.id === 'contact' && (
              <div style={{ color: 'var(--color-muted)', lineHeight: 1.6, fontSize: '0.925rem' }}>
                Have questions or feedback about Swingly? Connect with our team or report companion bug fixes via our GitHub repository issues.
              </div>
            )}

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-primary btn-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-link:hover {
          color: #000 !important;
          text-decoration: underline !important;
        }
      `}</style>
    </footer>
  );
};
