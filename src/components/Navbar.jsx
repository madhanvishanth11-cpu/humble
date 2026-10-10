import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { HangingCharm } from './HangingCharm';
import { Menu, X, Download, MonitorPlay } from 'lucide-react';

export const Navbar = ({ onOpenToast, onOpenDesktopMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav-sticky ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}>
          {/* Brand Logo with Hanging Icon */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, 'body')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
              color: 'var(--color-text)'
            }}
            aria-label="Swingly Home"
          >
            {/* Animated mini logo charm */}
            <div style={{ width: '32px', height: '42px', overflow: 'hidden', marginTop: '-6px' }}>
              <HangingCharm charmId="sprout" ropeLength={16} size={26} swingSpeed={0.8} interactive={false} />
            </div>

            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              SWINGLY
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-text)',
                borderRadius: '6px',
                fontWeight: 800,
                border: '1px solid var(--color-text)',
                lineHeight: 1
              }}>
                v1.2
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: '1.8rem', alignItems: 'center' }} className="desktop-nav">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)'
                }}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Open Desktop Mode Button */}
            <button
              onClick={() => onOpenDesktopMode('mochi')}
              className="btn btn-secondary"
              style={{
                padding: '0.6rem 1.1rem',
                fontSize: '0.85rem',
                border: '1.5px solid var(--color-text)'
              }}
              title="Open companion in Windows transparent desktop mode"
            >
              <MonitorPlay size={16} color="#171717" />
              <span>Desktop Mode</span>
            </button>

            <a
              href="#download"
              onClick={(e) => handleNavClick(e, '#download')}
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
            >
              <Download size={16} />
              <span>Get Swingly</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                border: '1.5px solid var(--color-border-darker)',
                cursor: 'pointer',
                color: 'var(--color-text)'
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-background)',
            borderBottom: '2px solid var(--color-border-darker)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem',
            zIndex: 999
          }}
          className="mobile-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDesktopMode('mochi');
              }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.4rem' }}
            >
              <MonitorPlay size={16} />
              <span>Open Desktop Mode</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 868px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: #000;
          background-color: rgba(0,0,0,0.04);
        }
      `}</style>
    </header>
  );
};
