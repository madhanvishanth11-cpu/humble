import React, { useState, useEffect, useRef } from 'react';
import { renderCharacterSVG, CHARACTERS } from '../data/charms';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * HangingCharm Component
 * Ultra-smooth physics-based swinging character suspended by a flexible dynamic SVG rope.
 * Implements damped pendulum physics, pointer dragging with capture & momentum release,
 * and precise frame-by-frame SVG rope attachment.
 */
export const HangingCharm = ({
  charmId = 'orbit',
  customColor = null,
  secondaryColor = null,
  accentColor = null,
  ropeLength = 140,
  size = 80,
  swingSpeed = 1,       // 0.5 to 2
  swingIntensity = 1,   // 0.2 to 2
  interactive = true,
  onClick = null,
  showLabel = false,
  className = ''
}) => {
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // SVG DOM Element Refs for 60fps direct DOM manipulation (Zero React state re-render lag)
  const svgRef = useRef(null);
  const ropePathRef = useRef(null);
  const ropeShadowPathRef = useRef(null);
  const charmGroupRef = useRef(null);
  const attachmentRingRef = useRef(null);
  const labelRef = useRef(null);

  // Physics State Refs
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const angleRef = useRef(0);         // Pendulum angle theta in radians
  const angularVelRef = useRef(0);    // Angular velocity dtheta/dt
  const isDraggingRef = useRef(false);
  const grabOffsetRef = useRef({ x: 0, y: 0 });
  const lastPointerPosRef = useRef({ x: 0, y: 0, time: 0 });
  const pointerVelRef = useRef({ vx: 0, vy: 0 });
  const bounceScaleRef = useRef(1);
  const bounceVelRef = useRef(0);

  // Character metadata & colors
  const charmInfo = CHARACTERS.find(c => c.id === charmId) || CHARACTERS[0];
  const activeColor = customColor || charmInfo.defaultColor;
  const activeSecondary = secondaryColor || charmInfo.secondaryColor;
  const activeAccent = accentColor || charmInfo.accentColor;

  // Viewbox Dimensions
  const paddingX = 120;
  const height = ropeLength + size + 60;
  const width = Math.max(size * 2 + 80, ropeLength * 1.5 + paddingX);
  const anchorX = width / 2;
  const anchorY = 10; // Top fixed anchor point inside SVG

  // Main Physics & Render Animation Loop
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const updateLoop = (now) => {
      const dt = Math.min((now - (lastTimeRef.current || now)) / 1000, 0.05); // Clamp dt to max 50ms
      lastTimeRef.current = now;

      const g = 980; // Pixels / s^2 gravity
      const L = Math.max(40, ropeLength);

      if (prefersReduced) {
        angleRef.current = 0;
        angularVelRef.current = 0;
      } else if (!isDraggingRef.current) {
        // --- 1. DAMPED PENDULUM PHYSICS ---
        // Natural idle ambient oscillation
        const ambientIdle = Math.sin(now * 0.0018 * swingSpeed) * (0.04 * swingIntensity);

        // Pendulum equation: d2(theta)/dt2 = -(g / L) * sin(theta) - damping * d(theta)/dt
        const angularAccel = -(g / L) * Math.sin(angleRef.current) - (1.8 / Math.sqrt(L / 100)) * angularVelRef.current;
        
        angularVelRef.current += angularAccel * dt * swingSpeed;
        angleRef.current += angularVelRef.current * dt * swingSpeed;

        // Apply air resistance damping
        angularVelRef.current *= Math.pow(0.988, dt * 60);

        // Add ambient motion when settled
        if (Math.abs(angleRef.current) < 0.005 && Math.abs(angularVelRef.current) < 0.01) {
          angleRef.current = ambientIdle;
        }

        // Clamp angle to safe limits (-75 to +75 degrees)
        const maxAngle = (75 * Math.PI) / 180;
        if (Math.abs(angleRef.current) > maxAngle) {
          angleRef.current = Math.sign(angleRef.current) * maxAngle;
          angularVelRef.current *= -0.3; // Elastic bounce off limits
        }
      }

      // --- 2. BOUNCE SPRING DYNAMICS ---
      if (bounceScaleRef.current !== 1 || bounceVelRef.current !== 0) {
        const k = 140; // Spring stiffness
        const damping = 12; // Spring damping
        const force = -k * (bounceScaleRef.current - 1) - damping * bounceVelRef.current;
        bounceVelRef.current += force * dt;
        bounceScaleRef.current += bounceVelRef.current * dt;

        if (Math.abs(bounceScaleRef.current - 1) < 0.001 && Math.abs(bounceVelRef.current) < 0.001) {
          bounceScaleRef.current = 1;
          bounceVelRef.current = 0;
        }
      }

      // --- 3. GEOMETRY & FLEXIBLE ROPE CALCULATIONS ---
      const theta = angleRef.current;
      const charmTopX = anchorX + Math.sin(theta) * L;
      const charmTopY = anchorY + Math.cos(theta) * L;

      // Calculate flexible rope curvature & trailing lag
      // Control point P1 for Bezier Curve: hangs down under gravity, trails velocity
      const midX = (anchorX + charmTopX) / 2;
      const midY = (anchorY + charmTopY) / 2;

      // Trailing bend offset vector based on angular velocity & angle
      const trailLagX = -angularVelRef.current * 8 * (L / 140) + Math.sin(theta) * 12;
      const trailLagY = Math.abs(Math.sin(theta)) * 6;

      const controlX = midX + trailLagX;
      const controlY = midY + trailLagY;

      // Build SVG Quadratic Bezier Path
      const ropePathD = `M ${anchorX} ${anchorY} Q ${controlX} ${controlY} ${charmTopX} ${charmTopY}`;
      const shadowPathD = `M ${anchorX + 2} ${anchorY + 2} Q ${controlX + 2} ${controlY + 2} ${charmTopX + 2} ${charmTopY + 2}`;

      // --- 4. DIRECT DOM UPDATES (Zero React State Re-render Delay) ---
      if (ropePathRef.current) ropePathRef.current.setAttribute('d', ropePathD);
      if (ropeShadowPathRef.current) ropeShadowPathRef.current.setAttribute('d', shadowPathD);

      // Character Group Transform:
      // Translate to exact attachment point (charmTopX, charmTopY)
      // Rotate character body slightly to align with rope direction + sway
      const bodyRotation = (theta * 180 / Math.PI) * 0.45 + (angularVelRef.current * 10);
      const scale = bounceScaleRef.current;

      if (charmGroupRef.current) {
        charmGroupRef.current.setAttribute(
          'transform',
          `translate(${charmTopX}, ${charmTopY}) scale(${scale}) rotate(${bodyRotation})`
        );
      }

      if (attachmentRingRef.current) {
        attachmentRingRef.current.setAttribute('cx', charmTopX);
        attachmentRingRef.current.setAttribute('cy', charmTopY);
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${charmTopX}px, ${charmTopY + size + 14}px)`;
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [ropeLength, swingSpeed, swingIntensity, prefersReduced, size]);

  // --- 5. POINTER INTERACTION & DRAGGING (Pointer Events with Capture) ---

  const handlePointerDown = (e) => {
    if (!interactive || prefersReduced) return;
    
    // Capture pointer to track dragging seamlessly outside bounds
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);

    const rect = svgRef.current.getBoundingClientRect();
    const pointerSvgX = ((e.clientX - rect.left) / rect.width) * width;
    const pointerSvgY = ((e.clientY - rect.top) / rect.height) * height;

    // Current character top position
    const currentCharmX = anchorX + Math.sin(angleRef.current) * ropeLength;
    const currentCharmY = anchorY + Math.cos(angleRef.current) * ropeLength;

    grabOffsetRef.current = {
      x: pointerSvgX - currentCharmX,
      y: pointerSvgY - currentCharmY
    };

    lastPointerPosRef.current = {
      x: pointerSvgX,
      y: pointerSvgY,
      time: performance.now()
    };
    pointerVelRef.current = { vx: 0, vy: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !svgRef.current) {
      if (interactive && !isDraggingRef.current && !prefersReduced) {
        // Subtle hover nudge
        const rect = svgRef.current.getBoundingClientRect();
        const pointerSvgX = ((e.clientX - rect.left) / rect.width) * width;
        const hoverOffset = (pointerSvgX - anchorX) / (width / 2);
        angularVelRef.current += hoverOffset * 0.05 * swingIntensity;
      }
      return;
    }

    const rect = svgRef.current.getBoundingClientRect();
    const pointerSvgX = ((e.clientX - rect.left) / rect.width) * width;
    const pointerSvgY = ((e.clientY - rect.top) / rect.height) * height;

    const now = performance.now();
    const dt = Math.max((now - lastPointerPosRef.current.time) / 1000, 0.008);

    // Calculate pointer velocity (pixels / sec)
    const vx = (pointerSvgX - lastPointerPosRef.current.x) / dt;
    const vy = (pointerSvgY - lastPointerPosRef.current.y) / dt;
    pointerVelRef.current = { vx, vy };

    lastPointerPosRef.current = { x: pointerSvgX, y: pointerSvgY, time: now };

    // Target position of character top
    const targetX = pointerSvgX - grabOffsetRef.current.x;
    const targetY = pointerSvgY - grabOffsetRef.current.y;

    // Convert (targetX, targetY) relative to anchorX, anchorY into angle theta
    const dx = targetX - anchorX;
    const dy = Math.max(20, targetY - anchorY); // Keep dy positive below anchor
    let newAngle = Math.atan2(dx, dy);

    // Clamp drag angle to safe limit (-80 to +80 degrees)
    const maxDragAngle = (80 * Math.PI) / 180;
    newAngle = Math.max(-maxDragAngle, Math.min(maxDragAngle, newAngle));

    angleRef.current = newAngle;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if capture release fails
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    // Convert drag velocity (vx, vy) into angular momentum upon release
    const { vx } = pointerVelRef.current;
    const L = Math.max(40, ropeLength);
    const releasedAngularVel = (vx / L) * 0.85;

    // Transfer momentum to pendulum
    angularVelRef.current = Math.max(-12, Math.min(12, releasedAngularVel));

    // Trigger subtle click reaction callback
    if (onClick) {
      onClick(charmInfo, e);
    }
  };

  const handleClick = (e) => {
    // Trigger bounce impulse
    bounceVelRef.current = 2.4;
    angularVelRef.current += (Math.random() > 0.5 ? 2.5 : -2.5) * swingIntensity;
  };

  return (
    <div
      className={`hanging-charm-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : interactive ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
        WebkitUserSelect: 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label={`${charmInfo.name} - ${charmInfo.tagline}`}
      role="img"
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible', touchAction: 'none' }}
      >
        <defs>
          {/* Subtle Drop Shadow for Character */}
          <filter id={`charm-shadow-${charmId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#171717" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* 1. TOP FIXED ANCHOR BEZEL CONNECTOR */}
        <g transform={`translate(${anchorX}, ${anchorY})`}>
          <circle cx="0" cy="0" r="5" fill="#171717" />
          <circle cx="0" cy="0" r="2.5" fill={activeAccent} />
          {/* Top Ring Loop */}
          <circle cx="0" cy="2" r="3.5" fill="none" stroke="#171717" strokeWidth="1.8" />
        </g>

        {/* 2. ROPE SHADOW (Subtle Depth) */}
        <path
          ref={ropeShadowPathRef}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 3. DYNAMIC FLEXIBLE SUSPENSION ROPE */}
        <path
          ref={ropePathRef}
          fill="none"
          stroke="#77736D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 4. ATTACHMENT KNOT & CONNECTOR RING (Directly at rope endpoint) */}
        <circle
          ref={attachmentRingRef}
          r="4"
          fill="#171717"
          stroke={activeAccent}
          strokeWidth="1.5"
        />

        {/* 5. CHARACTER GRAPHIC GROUP */}
        {/* Placed precisely at the rope endpoint (0,0) with character artwork starting top stem */}
        <g
          ref={charmGroupRef}
          style={{
            transformOrigin: '0px 0px',
            willChange: 'transform'
          }}
          filter={`url(#charm-shadow-${charmId})`}
        >
          {/* Character Container: Centered horizontally (-size/2) and aligned directly at top attachment */}
          <g transform={`translate(${-size / 2}, 0)`}>
            {/* Attachment Loop on Top of Character */}
            <path
              d={`M ${size / 2 - 4} 2 C ${size / 2 - 4} -5, ${size / 2 + 4} -5, ${size / 2 + 4} 2`}
              fill="none"
              stroke="#171717"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Render Original SVG Artwork */}
            {renderCharacterSVG(charmId, activeColor, {
              size,
              secondaryColor: activeSecondary,
              accentColor: activeAccent
            })}
          </g>
        </g>
      </svg>

      {/* Optional Character Label */}
      {showLabel && (
        <div
          ref={labelRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate(${anchorX}px, ${anchorY + ropeLength + size + 14}px)`,
            marginLeft: '-40px',
            padding: '3px 12px',
            backgroundColor: '#171717',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 800,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            zIndex: 10,
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease',
            opacity: isHovered || isDragging ? 1 : 0.85
          }}
        >
          {charmInfo.name}
        </div>
      )}
    </div>
  );
};
