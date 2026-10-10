import React, { useState, useEffect } from 'react';
import { HangingCharm } from './HangingCharm';
import { CHARACTERS } from '../data/charms';

export const DesktopWindow = () => {
  const [activeCharmId, setActiveCharmId] = useState('mochi');
  const [customColor, setCustomColor] = useState(null);
  const [ropeLength, setRopeLength] = useState(150);
  const [speed, setSpeed] = useState(1.0);

  useEffect(() => {
    // Check for electronAPI exposed by preload.js
    if (window.electronAPI) {
      window.electronAPI.getConfig().then((config) => {
        if (config) {
          if (config.activeCharmId) setActiveCharmId(config.activeCharmId);
          if (config.customColor) setCustomColor(config.customColor);
          if (config.ropeLength) setRopeLength(config.ropeLength);
          if (config.speed) setSpeed(config.speed);
        }
      });

      const unsubCharm = window.electronAPI.onCharmChanged((charmId) => {
        setActiveCharmId(charmId);
      });

      const unsubConfig = window.electronAPI.onConfigUpdated((config) => {
        if (config.activeCharmId) setActiveCharmId(config.activeCharmId);
        if (config.customColor) setCustomColor(config.customColor);
        if (config.ropeLength) setRopeLength(config.ropeLength);
        if (config.speed) setSpeed(config.speed);
      });

      // Default: ignore mouse events on transparent background (Click-through)
      window.electronAPI.setIgnoreMouseEvents(true);

      return () => {
        if (unsubCharm) unsubCharm();
        if (unsubConfig) unsubConfig();
      };
    }
  }, []);

  const handleMouseEnterCharacter = () => {
    if (window.electronAPI) {
      window.electronAPI.setIgnoreMouseEvents(false);
    }
  };

  const handleMouseLeaveCharacter = () => {
    if (window.electronAPI) {
      window.electronAPI.setIgnoreMouseEvents(true);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        userSelect: 'none',
        pointerEvents: 'none' // Transparent wrapper passes clicks
      }}
    >
      {/* Top Bezel Line Indicator */}
      <div style={{
        width: '100%',
        height: '4px',
        backgroundColor: '#171717',
        pointerEvents: 'none'
      }} />

      {/* Interactive Hanging Character Container */}
      <div
        onMouseEnter={handleMouseEnterCharacter}
        onMouseLeave={handleMouseLeaveCharacter}
        onPointerOver={handleMouseEnterCharacter}
        onPointerOut={handleMouseLeaveCharacter}
        style={{
          pointerEvents: 'auto', // Character itself is interactive & grabbable
          marginTop: '-4px'
        }}
      >
        <HangingCharm
          charmId={activeCharmId}
          customColor={customColor}
          ropeLength={ropeLength}
          size={95}
          swingSpeed={speed}
          swingIntensity={1.2}
          showLabel={true}
          interactive={true}
        />
      </div>
    </div>
  );
};
