export const SITE_CONFIG = {
  name: "SWINGLY",
  tagline: "Your desktop, with personality.",
  subtagline: "Meet your new desktop companions. Collect playful hanging characters, personalize your screen, and add a little motion to every day.",
  heroEyebrow: "YOUR DESKTOP, WITH PERSONALITY",
  heroHeadline: "A LITTLE CHARACTER.\nA LOT MORE YOU.",
  version: "v1.2.0 Demo",
  
  navLinks: [
    { name: "Features", href: "#features" },
    { name: "Collection", href: "#collection" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Customizer", href: "#customizer" },
    { name: "FAQ", href: "#faq" },
  ],

  ctaPrimary: {
    label: "Get Swingly",
    href: "#download"
  },
  
  ctaSecondary: {
    label: "Meet the Collection",
    href: "#collection"
  },

  platforms: [
    {
      id: "windows",
      name: "Windows",
      os: "Windows 10 / 11 (64-bit)",
      status: "Available in Browser Demo / Desktop Build Coming Soon",
      installerUrl: null, // Will connect when real installer binary exists
      badge: "Most Popular",
      icon: "Monitor",
      fileType: ".exe / Microsoft Store",
      notes: "Requires Windows 10 build 19041 or higher. Ultra lightweight ~14MB memory footprint."
    },
    {
      id: "macos",
      name: "macOS",
      os: "macOS Sonoma & Sequoia (Apple Silicon & Intel)",
      status: "Available in Browser Demo / macOS Build Coming Soon",
      installerUrl: null,
      badge: "Universal",
      icon: "Command",
      fileType: ".dmg / Apple Silicon & Intel",
      notes: "Native Swift/Metal hardware accelerated render engine. Zero battery strain."
    }
  ],

  faq: [
    {
      id: "faq-1",
      question: "What is Swingly?",
      answer: "Swingly is a fun desktop companion app that brings small, animated hanging characters to the top of your monitor screen. They react to your pointer, swing with realistic physics, and make your workspace feel cozy and alive."
    },
    {
      id: "faq-2",
      question: "How do the hanging characters work?",
      answer: "Each companion hangs suspended by a flexible virtual rope attached to the top bezel of your desktop window. They feature damped pendulum physics, gentle idle motion, and pointer physics reactions when you hover over or drag them."
    },
    {
      id: "faq-3",
      question: "Can I customize my characters?",
      answer: "Yes! You can choose from 8 original characters, tweak their primary and secondary colors, adjust swing speed and intensity, and swap out your desktop wallpaper themes in real-time."
    },
    {
      id: "faq-4",
      question: "Does this website install anything on my computer?",
      answer: "No! This website is an interactive browser-based demonstration. Nothing is installed on your operating system when browsing or using the customizer. Download options provide preview release notes and notification signup."
    },
    {
      id: "faq-5",
      question: "Which operating systems are supported?",
      answer: "The web preview works in all modern browsers on Windows, macOS, Linux, and ChromeOS. Dedicated native desktop companion apps are currently being developed for Windows 10/11 and macOS."
    },
    {
      id: "faq-6",
      question: "Is Swingly free?",
      answer: "Yes! The core collection of companions and customizer tools are 100% free. Additional community packs and creator themes will be available in future releases."
    },
    {
      id: "faq-7",
      question: "Can I create my own character?",
      answer: "We are building an open SVG character template editor for community creators! You will be able to export custom vector companion files and import them directly into Swingly."
    }
  ],

  footer: {
    tagline: "Made for your everyday screen. Add a little personality to your desktop.",
    copyright: `© ${new Date().getFullYear()} Swingly. All rights reserved.`,
    legalLinks: [
      { name: "Privacy Policy", id: "privacy" },
      { name: "Terms of Service", id: "terms" },
      { name: "Contact Support", id: "contact" }
    ]
  }
};
