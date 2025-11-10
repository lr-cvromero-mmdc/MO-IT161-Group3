import type { Config } from 'tailwindcss';
import { tokens } from './src/lib/tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors from design tokens
      colors: {
        // Brand colors (WCAG AA Compliant)
        'brand-primary': {
          DEFAULT: tokens.colors.primary[500],
          ...tokens.colors.primary,
        },
        'brand-cream': {
          DEFAULT: tokens.colors.cream[300],
          ...tokens.colors.cream,
        },
        'brand-accent': {
          DEFAULT: tokens.colors.accent[500],
          ...tokens.colors.accent,
        },
        'brand-dark': {
          DEFAULT: tokens.colors.dark,
        },
        
        // Neutral colors
        neutral: tokens.colors.neutral,
        
        // Semantic colors
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
        
        // Legacy color mappings for compatibility
        gray: tokens.colors.neutral,
        slate: tokens.colors.neutral,
        zinc: tokens.colors.neutral,
        stone: tokens.colors.neutral,
        
        // CSS custom properties for shadcn/ui compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      
      // Typography - Espinosa Brand Fonts
      fontFamily: {
        // Brand typography hierarchy
        'hero': ['oxanium', 'system-ui', 'sans-serif'], // Hero headings, logo text, main titles
        'heading': ['oxanium', 'system-ui', 'sans-serif'], // Section titles and subheadings
        'body': ['open-sans', 'system-ui', 'sans-serif'], // Paragraphs, buttons, UI text
        
        // Fallback to existing tokens for compatibility
        ...tokens.typography.fontFamily,
      },
      fontSize: {
        // Brand typography scale - tight spacing
        'hero': ['5.5rem', { lineHeight: '0.9', letterSpacing: '-0.5px' }], // 88px
        'hero-sm': ['4rem', { lineHeight: '0.9', letterSpacing: '-0.5px' }], // 64px mobile
        'section': ['2rem', { lineHeight: '1.0', letterSpacing: '-0.25px' }], // 32px
        'section-sm': ['1.5rem', { lineHeight: '1.0', letterSpacing: '-0.25px' }], // 24px mobile
        
        // Existing tokens
        ...tokens.typography.fontSize,
      },
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: {
        'hero': '-0.5px',
        'section': '-0.25px',
        'tight': '-0.5px',
        'tighter': '-0.75px',
        'normal': '0px',
        ...tokens.typography.letterSpacing,
      },
      
      // Spacing
      spacing: tokens.spacing,
      
      // Border radius
      borderRadius: tokens.borderRadius,
      
      // Box shadows
      boxShadow: {
        ...tokens.shadows,
        // Additional Tailwind-compatible shadows
        'sm': tokens.shadows.sm,
        'DEFAULT': tokens.shadows.base,
        'md': tokens.shadows.md,
        'lg': tokens.shadows.lg,
        'xl': tokens.shadows.xl,
        '2xl': tokens.shadows['2xl'],
        'inner': tokens.shadows.inner,
        'none': tokens.shadows.none,
      },
      
      // Z-index
      zIndex: tokens.zIndex,
      
      // Breakpoints (Mobile-First)
      screens: {
        sm: '768px',
        md: '1024px',
        lg: '1440px',
        xl: '1920px',
      },
      
      // Container
      maxWidth: {
        'container': '1200px',
        'container-xl': '1280px',
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
      },
      
      // Grid
      gap: {
        'grid': '1rem',      // 16px
        'grid-md': '1.5rem', // 24px
        'grid-lg': '2rem',   // 32px
      },
      
      // Animation
      transitionDuration: tokens.animation.duration,
      transitionTimingFunction: tokens.animation.timingFunction,
      
      // Additional custom utilities
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #133e87 0%, #eff7ff 100%)',
      },
      
      // Custom spacing for specific use cases
      spacing: {
        ...tokens.spacing,
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      
      // Custom max-widths
      maxWidth: {
        '8xl': '88rem', // 1408px
        '9xl': '96rem', // 1536px
      },
      
      // Custom heights
      height: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
      },
      
      // Custom widths
      width: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
      },
      
      // Custom min-heights
      minHeight: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
      },
      
      // Custom aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        // Text shadows
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
        },
        '.text-shadow': {
          textShadow: '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 6px rgb(0 0 0 / 0.07), 0 2px 4px rgb(0 0 0 / 0.06)',
        },
        '.text-shadow-lg': {
          textShadow: '0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        
        // Brand-specific text shadows
        '.text-shadow-primary': {
          textShadow: '0 2px 4px rgb(19 62 135 / 0.3)',
        },
        '.text-shadow-accent': {
          textShadow: '0 2px 4px rgb(239 247 255 / 0.4)',
        },
        
        // Custom scrollbar
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme('colors.neutral.300')} ${theme('colors.neutral.100')}`,
        },
        '.scrollbar-none': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Glass morphism effect
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        
            // Brand gradients
            '.bg-gradient-brand': {
              background: 'linear-gradient(135deg, #133e87 0%, #7bb3ff 100%)',
            },
            '.bg-gradient-primary': {
              background: 'linear-gradient(135deg, #133e87 0%, #0f3270 100%)',
            },
            '.bg-gradient-accent': {
              background: 'linear-gradient(135deg, #7bb3ff 0%, #d6edff 100%)',
            },
            '.bg-gradient-cream': {
              background: 'linear-gradient(135deg, #f3f3e0 0%, #e8e7d0 100%)',
            },
            
            // Focus rings (WCAG AA Compliant)
            '.focus-ring': {
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px #133e87, 0 0 0 4px rgba(19, 62, 135, 0.2)',
              },
            },
            '.focus-ring-inset': {
              '&:focus': {
                outline: 'none',
                boxShadow: 'inset 0 0 0 2px #133e87',
              },
            },
      };
      
      addUtilities(newUtilities);
    },
  ],
};

export default config;
