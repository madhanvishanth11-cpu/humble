import React, { useState } from 'react';
import { HangingCharm } from './HangingCharm';
import { CHARACTERS } from '../data/charms';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Sliders, RotateCcw, Monitor, Eye, EyeOff, Sparkles, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

const WALLPAPERS = [
  { id: 'cream', name: 'Cream Studio', bg: 'linear-gradient(135deg, #F7F3EA 0%, #EFE8DA 100%)', text: '#171717' },
  { id: 'midnight', name: 'Midnight Blue', bg: 'linear-gradient(135deg, #181925 0%, #101017 100%)', text: '#FFFFFF' },
  { id: 'sunset', name: 'Soft Sunset', bg: 'linear-gradient(135deg, #FFE8D6 0%, #FFCDB2 100%)', text: '#171717' },
  { id: 'aurora', name: 'Aurora Borealis', bg: 'linear-gradient(135deg, #0d2b45 0%, #203c56 50%, #544e68 100%)', text: '#FFFFFF' }
];

export const InteractiveDemo = ({ onOpenToast, onOpenDesktopMode }) => {
  // Persistent State via LocalStorage
  const [demoState, setDemoState] = useLocalStorage('swingly_demo_settings_v1', {
    wallpaperId: 'cream',
    speed: 1.0,
    intensity: 1.0,
    visibleCharms: {
      orbit: true,
      mochi: true,
      sprout: true,
      ember: false
    },
    primaryCharm: 'orbit'
  });

  const activeWallpaper = WALLPAPERS.find(w => w.id === demoState.wallpaperId) || WALLPAPERS[0];

  const handleToggleCharm = (charmId) => {
    setDemoState(prev => ({
      ...prev,
      visibleCharms: {
        ...prev.visibleCharms,
        [charmId]: !prev.visibleCharms[charmId]
      }
    }));
    if (onOpenToast) onOpenToast(`Toggled ${charmId} companion`);
  };

  const handleSpeedChange = (e) => {
    setDemoState(prev => ({ ...prev, speed: parseFloat(e.target.value) }));
  };

  const handleIntensityChange = (e) => {
    setDemoState(prev => ({ ...prev, intensity: parseFloat(e.target.value) }));
  };

  const handleWallpaperSelect = (wallpaperId) => {
    setDemoState(prev => ({ ...prev, wallpaperId }));
    if (onOpenToast) onOpenToast(`Wallpaper updated to ${wallpaperId}`);
  };

  const handleReset = () => {
    setDemoState({
      wallpaperId: 'cream',
      speed: 1.0,
      intensity: 1.0,
      visibleCharms: {
        orbit: true,
        mochi: true,
        sprout: true,
        ember: false
      },
      primaryCharm: 'orbit'
    });
    if (onOpenToast) onOpenToast("Demonstration reset to defaults");
  };

  return (
    <section id="demo" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow">INTERACTIVE DEMONSTRATION</span>
          <h2 className="section-heading">Test Your Companions Live</h2>
          <p className="section-subheading">
            Tweak animation speeds, toggle companion characters, and switch workspace themes in real-time.
          </p>
        </div>

        {/* Demo Window Container */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}>
          {/* Header Bar */}
          <div style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#171717',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Monitor size={18} color="#C6F36A" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                Swingly Live Desktop Simulator
              </span>
              <span style={{
                fontSize: '0.7rem',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#E0E0E0'
              }}>
                Browser Demo
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={() => onOpenDesktopMode('mochi')}
                className="btn btn-dark btn-sm"
              >
                <MonitorPlay size={14} />
                <span>Open Desktop Mode</span>
              </button>

              <button
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  borderColor: 'rgba(255,255,255,0.2)'
                }}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Grid Layout: Controls + Live Canvas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 0
          }}>
            {/* Control Panel */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'var(--color-surface-hover)',
              borderRight: '1.5px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
                <Sliders size={18} />
                <span>Companion Controls</span>
              </div>

              {/* Character Visibility Toggles */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.8rem' }}>
                  TOGGLE CHARACTERS ON DESKTOP
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {['orbit', 'mochi', 'sprout', 'ember'].map((charmId) => {
                    const charInfo = CHARACTERS.find(c => c.id === charmId);
                    const isVisible = demoState.visibleCharms[charmId];
                    return (
                      <button
                        key={charmId}
                        onClick={() => handleToggleCharm(charmId)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.66rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${isVisible ? 'var(--color-text)' : 'var(--color-border)'}`,
                          backgroundColor: isVisible ? 'var(--color-surface)' : 'transparent',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{charInfo.name}</span>
                        {isVisible ? <Eye size={16} color="#7CB342" /> : <EyeOff size={16} color="#9E9E9E" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wallpaper Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.8rem' }}>
                  DESKTOP WALLPAPER THEME
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {WALLPAPERS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleWallpaperSelect(theme.id)}
                      style={{
                        padding: '0.6rem 0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${demoState.wallpaperId === theme.id ? 'var(--color-text)' : 'transparent'}`,
                        background: theme.bg,
                        color: theme.text,
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                      }}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Speed Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-muted)' }}>ANIMATION SPEED</span>
                  <span>{demoState.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.0"
                  step="0.1"
                  value={demoState.speed}
                  onChange={handleSpeedChange}
                  aria-label="Animation Speed"
                />
              </div>

              {/* Swing Intensity Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-muted)' }}>SWING INTENSITY</span>
                  <span>{Math.round(demoState.intensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={demoState.intensity}
                  onChange={handleIntensityChange}
                  aria-label="Swing Intensity"
                />
              </div>
            </div>

            {/* Simulated Desktop Preview Viewport */}
            <div style={{
              position: 'relative',
              minHeight: '440px',
              background: activeWallpaper.bg,
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background 0.5s ease',
              overflow: 'hidden'
            }}>
              {/* Top Suspension Bezel */}
              <div style={{
                height: '5px',
                backgroundColor: '#171717',
                width: '100%',
                position: 'relative',
                zIndex: 10
              }} />

              {/* Active Hanging Companions */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-evenly',
                padding: '0 5%',
                zIndex: 12
              }}>
                {demoState.visibleCharms.orbit && (
                  <HangingCharm
                    charmId="orbit"
                    ropeLength={150}
                    size={85}
                    swingSpeed={demoState.speed}
                    swingIntensity={demoState.intensity}
                    showLabel={true}
                  />
                )}
                {demoState.visibleCharms.mochi && (
                  <HangingCharm
                    charmId="mochi"
                    ropeLength={130}
                    size={75}
                    swingSpeed={demoState.speed * 0.9}
                    swingIntensity={demoState.intensity}
                    showLabel={true}
                  />
                )}
                {demoState.visibleCharms.sprout && (
                  <HangingCharm
                    charmId="sprout"
                    ropeLength={165}
                    size={75}
                    swingSpeed={demoState.speed * 1.1}
                    swingIntensity={demoState.intensity}
                    showLabel={true}
                  />
                )}
                {demoState.visibleCharms.ember && (
                  <HangingCharm
                    charmId="ember"
                    ropeLength={140}
                    size={80}
                    swingSpeed={demoState.speed * 1.2}
                    swingIntensity={demoState.intensity}
                    showLabel={true}
                  />
                )}
              </div>

              {/* Bottom Notice Disclaimer Badge */}
              <div style={{
                margin: 'auto 1.5rem 1.5rem 1.5rem',
                backgroundColor: 'rgba(23, 23, 23, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#FFF',
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <Sparkles size={16} color="#C6F36A" />
                <span>
                  <strong>Website Demonstration:</strong> Click <strong>Open Desktop Mode</strong> to detach your companion into a floating Windows desktop overlay!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
