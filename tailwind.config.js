/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'cinematic-entrance': 'cinematicEntrance 2s ease-out forwards',
        'hero-title-entrance': 'heroTitleEntrance 2s ease-out forwards',
        'particle-float': 'particleFloat 6s ease-in-out infinite',
        'pulse-line': 'pulse-line 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.2)' 
          },
        },
        cinematicEntrance: {
          '0%': { opacity: 0, transform: 'translateY(100px) scale(0.9)', filter: 'blur(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        heroTitleEntrance: {
          '0%': { opacity: 0, transform: 'translateY(50px) rotateX(-90deg)', filter: 'blur(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0) rotateX(0deg)', filter: 'blur(0)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: 0.4 },
          '25%': { transform: 'translateY(-15px) translateX(5px) scale(1.1)', opacity: 0.8 },
          '50%': { transform: 'translateY(-25px) translateX(-3px) scale(0.9)', opacity: 0.6 },
          '75%': { transform: 'translateY(-10px) translateX(8px) scale(1.2)', opacity: 0.9 },
        },
        'pulse-line': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 185, 0, 0.7)' },
          '70%': { boxShadow: '0 0 0 20px rgba(0, 185, 0, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 185, 0, 0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#1a1a1a',
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4af37',
          600: '#b8860b',
          700: '#92691d',
          800: '#78531d',
          900: '#633f1c',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        'header-top-desktop': 'calc(80px + env(safe-area-inset-top))',
        'header-top-mobile': 'calc(72px + env(safe-area-inset-top))',
      },
    },
  },
  plugins: [],
};