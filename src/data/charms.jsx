import React from 'react';

export const CHARACTERS = [
  {
    id: "orbit",
    name: "Orbit",
    category: "Space",
    tagline: "The Tiny Purple Planet",
    description: "A playful cosmic orb with a glowing Saturn ring and floating stardust sparkle.",
    defaultColor: "#C8B7FF",
    secondaryColor: "#9370DB",
    accentColor: "#FFE66D",
    badge: "Fan Favorite",
    icon: "Planet"
  },
  {
    id: "mochi",
    name: "Mochi",
    category: "Cute",
    tagline: "Soft Cream Creature",
    description: "Extremely squishy, cream-colored friend with rosy cheeks and floating bunny ears.",
    defaultColor: "#FFF3E0",
    secondaryColor: "#FFCC80",
    accentColor: "#FF8A80",
    badge: "Popular",
    icon: "Heart"
  },
  {
    id: "sprout",
    name: "Sprout",
    category: "Nature",
    tagline: "Little Ceramic Seedling",
    description: "A smiling green plant growing out of a tiny ceramic pot with twin leaves.",
    defaultColor: "#C6F36A",
    secondaryColor: "#7CB342",
    accentColor: "#8D6E63",
    badge: "Eco",
    icon: "Leaf"
  },
  {
    id: "ember",
    name: "Ember",
    category: "Nature",
    tagline: "Cheerful Flame Buddy",
    description: "A warm, energetic orange flame with a cozy belly and playful spark crown.",
    defaultColor: "#FF9D68",
    secondaryColor: "#FF6D00",
    accentColor: "#FFD54F",
    badge: "Warm",
    icon: "Flame"
  },
  {
    id: "pebble",
    name: "Pebble",
    category: "Cute",
    tagline: "Lo-Fi Stone Companion",
    description: "A smooth blue river stone wearing tiny headphones and chilling out.",
    defaultColor: "#70A6FF",
    secondaryColor: "#3F51B5",
    accentColor: "#FF4081",
    badge: "Chill",
    icon: "Headphones"
  },
  {
    id: "cloudy",
    name: "Cloudy",
    category: "Nature",
    tagline: "Soft Cumulus Friend",
    description: "A fluffy white cloud with a tiny rain droplet charm and sunny disposition.",
    defaultColor: "#E0F7FA",
    secondaryColor: "#80DEEA",
    accentColor: "#FFD54F",
    badge: "Cozy",
    icon: "Cloud"
  },
  {
    id: "astro",
    name: "Astro",
    category: "Space",
    tagline: "Mini Explorer Helmet",
    description: "A tiny space cadet with a reflective golden visor and antenna light.",
    defaultColor: "#E0E0E0",
    secondaryColor: "#757575",
    accentColor: "#FFD700",
    badge: "New",
    icon: "Sparkles"
  },
  {
    id: "berry",
    name: "Berry",
    category: "Cute",
    tagline: "Playful Strawberry",
    description: "A sweet red berry creature with green leaf cap and gold seed sparkles.",
    defaultColor: "#FFAAA6",
    secondaryColor: "#E53935",
    accentColor: "#7CB342",
    badge: "Sweet",
    icon: "Smile"
  }
];

export const CATEGORIES = ["All", "Space", "Nature", "Cute"];

/**
 * Render dynamic SVG artwork for each character with color customization
 */
export const renderCharacterSVG = (charmId, mainColor, options = {}) => {
  const size = options.size || 80;
  const strokeColor = "#171717";
  const strokeWidth = 3;

  switch (charmId) {
    case "orbit":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Saturn Ring (Back) */}
          <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke={options.accentColor || "#FFE66D"} strokeWidth={strokeWidth + 1} transform="rotate(-18 50 50)" opacity="0.8" />
          {/* Planet Body */}
          <circle cx="50" cy="50" r="28" fill={mainColor || "#C8B7FF"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Crater highlights */}
          <circle cx="38" cy="42" r="4" fill="rgba(255,255,255,0.4)" />
          <circle cx="60" cy="58" r="5" fill="rgba(0,0,0,0.08)" />
          {/* Saturn Ring (Front) */}
          <path d="M12 60 C 22 72, 78 72, 88 60" stroke={options.accentColor || "#FFE66D"} strokeWidth={strokeWidth + 1} strokeLinecap="round" fill="none" />
          {/* Eyes & Smile */}
          <circle cx="44" cy="48" r="3" fill={strokeColor} />
          <circle cx="56" cy="48" r="3" fill={strokeColor} />
          <path d="M46 54 Q 50 58 54 54" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Rosy Cheeks */}
          <circle cx="40" cy="52" r="2.5" fill="#FF8A80" opacity="0.6" />
          <circle cx="60" cy="52" r="2.5" fill="#FF8A80" opacity="0.6" />
        </svg>
      );

    case "mochi":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Bunny Ears */}
          <path d="M36 28 C 30 10, 42 10, 42 28" fill={mainColor || "#FFF3E0"} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M64 28 C 70 10, 58 10, 58 28" fill={mainColor || "#FFF3E0"} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M37 24 C 34 14, 40 14, 41 24" fill={options.accentColor || "#FF8A80"} opacity="0.5" />
          <path d="M63 24 C 66 14, 60 14, 59 24" fill={options.accentColor || "#FF8A80"} opacity="0.5" />
          {/* Squishy Body */}
          <rect x="22" y="26" width="56" height="54" rx="26" fill={mainColor || "#FFF3E0"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Eyes & Cute Mouth */}
          <ellipse cx="40" cy="48" rx="3.5" ry="4" fill={strokeColor} />
          <ellipse cx="60" cy="48" rx="3.5" ry="4" fill={strokeColor} />
          <circle cx="39" cy="46" r="1" fill="#FFF" />
          <circle cx="59" cy="46" r="1" fill="#FFF" />
          <path d="M47 52 Q 50 50 53 52 Q 50 56 47 52" fill={strokeColor} />
          {/* Big Blush */}
          <circle cx="33" cy="54" r="5" fill="#FF8A80" opacity="0.5" />
          <circle cx="67" cy="54" r="5" fill="#FF8A80" opacity="0.5" />
        </svg>
      );

    case "sprout":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Twin Leaves */}
          <path d="M50 35 C 30 15, 20 30, 48 35" fill={mainColor || "#C6F36A"} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M50 35 C 70 15, 80 30, 52 35" fill={mainColor || "#C6F36A"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Stem */}
          <path d="M50 35 L 50 48" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Clay Pot */}
          <path d="M30 48 L 70 48 L 65 82 L 35 82 Z" fill={options.secondaryColor || "#8D6E63"} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <rect x="26" y="44" width="48" height="8" rx="3" fill={options.secondaryColor || "#A1887F"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Pot Face */}
          <circle cx="43" cy="62" r="3" fill="#FFF" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="57" cy="62" r="3" fill="#FFF" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="43" cy="62" r="1.5" fill={strokeColor} />
          <circle cx="57" cy="62" r="1.5" fill={strokeColor} />
          <path d="M47 68 Q 50 71 53 68" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "ember":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Flame Body */}
          <path d="M50 15 C 65 30, 80 45, 80 62 C 80 78, 67 88, 50 88 C 33 88, 20 78, 20 62 C 20 45, 35 30, 50 15 Z" fill={mainColor || "#FF9D68"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Inner Flame Glow */}
          <path d="M50 35 C 60 45, 68 55, 68 66 C 68 76, 60 82, 50 82 C 40 82, 32 76, 32 66 C 32 55, 40 45, 50 35 Z" fill={options.accentColor || "#FFD54F"} />
          {/* Eyes & Big Happy Mouth */}
          <ellipse cx="42" cy="58" rx="3" ry="4" fill={strokeColor} />
          <ellipse cx="58" cy="58" rx="3" ry="4" fill={strokeColor} />
          <path d="M43 66 Q 50 74 57 66 Z" fill={strokeColor} />
          {/* Sparkle Above */}
          <path d="M50 5 L 52 10 L 57 12 L 52 14 L 50 19 L 48 14 L 43 12 L 48 10 Z" fill={options.accentColor || "#FFD54F"} stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case "pebble":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Stone Body */}
          <path d="M25 40 C 25 25, 40 20, 55 22 C 75 25, 82 40, 80 60 C 78 78, 60 85, 45 84 C 28 82, 25 65, 25 40 Z" fill={mainColor || "#70A6FF"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Headphones Band */}
          <path d="M22 42 C 20 18, 80 18, 78 42" fill="none" stroke={strokeColor} strokeWidth={strokeWidth + 1} />
          {/* Earcups */}
          <rect x="16" y="38" width="10" height="20" rx="4" fill={options.accentColor || "#FF4081"} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="74" y="38" width="10" height="20" rx="4" fill={options.accentColor || "#FF4081"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Closed Relaxed Eyes ^_^ */}
          <path d="M38 52 L 44 48 L 50 52" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M54 52 L 60 48 L 66 52" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Little Content Smile */}
          <path d="M48 60 Q 52 63 56 60" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "cloudy":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Fluffy Cloud Body */}
          <path d="M25 68 C 15 68, 12 55, 22 47 C 20 35, 35 28, 48 32 C 55 22, 72 25, 76 36 C 88 38, 90 52, 82 64 C 88 74, 75 80, 68 76 C 58 82, 35 82, 25 68 Z" fill={mainColor || "#E0F7FA"} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          {/* Shiny eyes */}
          <circle cx="42" cy="50" r="3.5" fill={strokeColor} />
          <circle cx="62" cy="50" r="3.5" fill={strokeColor} />
          <circle cx="40.5" cy="48.5" r="1.2" fill="#FFF" />
          <circle cx="60.5" cy="48.5" r="1.2" fill="#FFF" />
          <path d="M49 56 Q 52 60 55 56" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Hanging Droplet */}
          <path d="M52 78 C 52 78, 47 85, 47 88 C 47 91, 49.5 93, 52 93 C 54.5 93, 57 91, 57 88 C 57 85, 52 78, 52 78 Z" fill={options.secondaryColor || "#80DEEA"} stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case "astro":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Helmet Body */}
          <rect x="22" y="28" width="56" height="52" rx="26" fill={mainColor || "#E0E0E0"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Antenna */}
          <path d="M50 28 L 50 12" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="50" cy="10" r="5" fill={options.accentColor || "#FFD700"} stroke={strokeColor} strokeWidth="2" />
          {/* Reflective Visor */}
          <rect x="30" y="38" width="40" height="26" rx="13" fill="#263238" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Visor Glint Reflection */}
          <path d="M36 42 Q 50 40 64 42 L 60 48 Q 48 46 38 48 Z" fill={options.accentColor || "#FFD700"} opacity="0.8" />
          {/* Cute inner face visible in visor */}
          <circle cx="44" cy="52" r="2" fill="#FFF" />
          <circle cx="56" cy="52" r="2" fill="#FFF" />
        </svg>
      );

    case "berry":
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Strawberry Body */}
          <path d="M50 88 C 75 75, 82 55, 78 35 C 75 25, 25 25, 22 35 C 18 55, 25 75, 50 88 Z" fill={mainColor || "#FFAAA6"} stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* Leaf Cap */}
          <path d="M50 28 C 45 15, 30 18, 30 28 C 38 28, 42 32, 50 34 C 58 32, 62 28, 70 28 C 70 18, 55 15, 50 28 Z" fill={options.accentColor || "#7CB342"} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M50 20 L 50 12" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Gold Seeds */}
          <circle cx="34" cy="45" r="1.5" fill="#FFE082" />
          <circle cx="66" cy="45" r="1.5" fill="#FFE082" />
          <circle cx="42" cy="72" r="1.5" fill="#FFE082" />
          <circle cx="58" cy="72" r="1.5" fill="#FFE082" />
          {/* Happy Winking Eyes */}
          <path d="M38 54 Q 42 50 46 54" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="58" cy="53" rx="2.5" ry="3" fill={strokeColor} />
          <path d="M46 60 Q 50 64 54 60" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
};
