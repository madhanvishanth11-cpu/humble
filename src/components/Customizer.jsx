import React from 'react';
import { CHARACTERS } from '../data/charms';
import { HangingCharm } from './HangingCharm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Palette, Sliders, RotateCcw, Sparkles, Check, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

const COLOR_PRESETS = [
  { name: 'Original', primary: null },
  { name: 'Lime Mint', primary: '#C6F36A' },
  { name: 'Soft Orange', primary: '#FF9D68' },
  { name: 'Lavender Glow', primary: '#C8B7FF' },
  { name: 'Sky Blue', primary: '#70A6FF' },
  { name: 'Rose Pink', primary: '#FFAAA6' },
  { name: 'Midnight Spark', primary: '#FFD700' }
];

const BACKDROPS = [
  { id: 'cream', name: 'Warm Cream', bg: '#F7F3EA' },
  { id: 'white', name: 'Clean White', bg: '#FFFFFF' },
  { id: 'dark', name: 'Dark Slate', bg: '#1C1C20' },
  { id: 'lavender', name: 'Pastel Lavender', bg: '#F0EAFF' }
];

export const Customizer = ({ selectedCharm, onSelectCharm, onOpenToast, onOpenDesktopMode }) => {
  // LocalStorage Customizer Settings
  const [customSettings, setCustomSettings] = useLocalStorage('swingly_customizer_v1', {
    activeCharmId: selectedCharm || 'orbit',
    customColor: null,
    wallpaperBg: '#F7F3EA',
    speed: 1.0,
    intensity: 1.0,
    ropeLength: 160
  });

  const activeCharmId = selectedCharm || customSettings.activeCharmId;
  const charmInfo = CHARACTERS.find(c => c.id === activeCharmId) || CHARACTERS[0];

  const handleCharmChange = (id) => {
    onSelectCharm(id);
    setCustomSettings(prev => ({ ...prev, activeCharmId: id }));
  };

  const handleColorPreset = (preset) => {
    setCustomSettings(prev => ({ ...prev, customColor: preset.primary }));
    if (onOpenToast) onOpenToast(`Applied ${preset.name} color palette`);
  };

  const handleReset = () => {
    setCustomSettings({
      activeCharmId: 'orbit',
      customColor: null,
      wallpaperBg: '#F7F3EA',
      speed: 1.0,
      intensity: 1.0,
      ropeLength: 160
    });
    onSelectCharm('orbit');
    if (onOpenToast) onOpenToast("Customizer reset to defaults");
  };

  return (
    <section id="customizer" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="eyebrow">LIVE COMPANION STUDIO</span>
          <h2 className="section-heading">Your character. Your rules.</h2>
          <p className="section-subheading">
            Personalize your hanging companion with custom colors, animation dynamics, and suspension settings.
          </p>
        </div>

        {/* Customizer Studio Box */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}>
          {/* Controls Column */}
          <div style={{
            padding: '2.5rem 2rem',
            borderRight: '1.5px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem',
            backgroundColor: 'var(--color-surface-hover)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.15rem' }}>
                <Sliders size={20} />
                <span>Companion Studio</span>
              </div>

              <button
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
                title="Reset controls"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Character Selector Grid */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                1. SELECT COMPANION
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {CHARACTERS.map((c) => {
                  const isSelected = activeCharmId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCharmChange(c.id)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${isSelected ? 'var(--color-text)' : 'var(--color-border)'}`,
                        backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Color Palette Swatches */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                2. COLOR PALETTE TINT
              </label>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = customSettings.customColor === preset.primary;
                  const colorDisplay = preset.primary || charmInfo.defaultColor;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handleColorPreset(preset)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: colorDisplay,
                        border: `2px solid ${isSelected ? 'var(--color-text)' : 'var(--color-border-darker)'}`,
                        boxShadow: isSelected ? '0 0 0 2px var(--color-accent)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.15s ease'
                      }}
                      title={preset.name}
                    >
                      {isSelected && <Check size={16} color="#171717" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Animation Dynamics Sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>3. SWING SPEED</span>
                <span>{customSettings.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="2.0"
                step="0.1"
                value={customSettings.speed}
                onChange={(e) => setCustomSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                aria-label="Swing Speed"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>4. ROPE LENGTH</span>
                <span>{customSettings.ropeLength}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="220"
                step="5"
                value={customSettings.ropeLength}
                onChange={(e) => setCustomSettings(prev => ({ ...prev, ropeLength: parseInt(e.target.value, 10) }))}
                aria-label="Rope Length"
              />
            </div>

            {/* 5. Wallpaper Theme */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                5. PREVIEW BACKDROP
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {BACKDROPS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setCustomSettings(prev => ({ ...prev, wallpaperBg: b.bg }))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${customSettings.wallpaperBg === b.bg ? 'var(--color-text)' : 'var(--color-border)'}`,
                      backgroundColor: b.bg,
                      color: b.bg === '#1C1C20' ? '#FFF' : '#171717',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Hanging Preview Screen */}
          <div style={{
            position: 'relative',
            backgroundColor: customSettings.wallpaperBg,
            minHeight: '450px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1rem 2rem 1rem',
            transition: 'background-color 0.4s ease'
          }}>
            {/* Top Attachment Bezel Bar */}
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#171717',
              zIndex: 10
            }} />

            {/* Active Hanging Character Component */}
            <div style={{ marginTop: '-6px', zIndex: 12 }}>
              <HangingCharm
                charmId={activeCharmId}
                customColor={customSettings.customColor}
                ropeLength={customSettings.ropeLength}
                size={105}
                swingSpeed={customSettings.speed}
                swingIntensity={customSettings.intensity}
                showLabel={true}
              />
            </div>

            {/* Character Information Badge & Open Desktop Mode Action */}
            <div style={{
              backgroundColor: 'rgba(23, 23, 23, 0.92)',
              color: '#FFF',
              padding: '1.2rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              maxWidth: '360px',
              width: '100%',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.2rem'
                }}>
                  STUDIO PREVIEW: {charmInfo.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#E0E0E0' }}>
                  "{charmInfo.tagline}"
                </div>
              </div>

              {/* Open Desktop Mode Button */}
              <button
                onClick={() => onOpenDesktopMode(activeCharmId)}
                className="btn btn-dark"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <MonitorPlay size={16} />
                <span>Open {charmInfo.name} in Desktop Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
