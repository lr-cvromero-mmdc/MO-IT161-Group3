/**
 * Design Tokens
 * WCAG AA Compliant Design System
 */

// Brand Colors (WCAG AA Compliant)
export const brandColors = {
  primary: '#133e87',
  cream: '#f3f3e0',
  accent: '#5a9bff', // WCAG AA compliant (4.5:1 contrast ratio)
  dark: '#030c2e',
} as const;

// Color Palette
export const colors = {
  // Brand colors
  ...brandColors,

  // Primary color variations
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff',
    200: '#c7d7ff',
    300: '#a5bfff',
    400: '#7d9eff',
    500: '#133e87', // Base primary
    600: '#0f3270',
    700: '#0b2659',
    800: '#071a42',
    900: '#030c2e',
  },

  // Neutral colors
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030c2e', // Dark brand color
  },

  // Cream variations
  cream: {
    50: '#fefefc',
    100: '#fdfcf7',
    200: '#f9f8f0',
    300: '#f3f3e0', // Base cream
    400: '#e8e7d0',
    500: '#dcdbbf',
    600: '#d0cfae',
    700: '#c4c39d',
    800: '#b8b78c',
    900: '#acab7b',
  },

  // Accent variations (WCAG AA Compliant)
  accent: {
    50: '#f8fcff',
    100: '#f0f8ff',
    200: '#e0f0ff',
    300: '#c7e2ff',
    400: '#a5d0ff',
    500: '#5a9bff', // WCAG AA compliant (4.5:1 contrast ratio)
    600: '#4a8bff',
    700: '#3d82ff',
    800: '#2569ff',
    900: '#1e5bff',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

// Typography (Mobile-First, WCAG AA Compliant)
export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    serif: [
      'Georgia',
      'Cambria',
      'Times New Roman',
      'Times',
      'serif',
    ],
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },

  fontSize: {
    xs: ['0.875rem', { lineHeight: '1.4' }], // 14px (was 12px)
    sm: ['1rem', { lineHeight: '1.5' }], // 16px (was 14px)
    base: ['1.125rem', { lineHeight: '1.6' }], // 18px (was 16px)
    lg: ['1.25rem', { lineHeight: '1.5' }], // 20px
    xl: ['1.5rem', { lineHeight: '1.4' }], // 24px
    '2xl': ['1.875rem', { lineHeight: '1.3' }], // 30px
    '3xl': ['2.25rem', { lineHeight: '1.2' }], // 36px
    '4xl': ['3rem', { lineHeight: '1.1' }], // 48px
    '5xl': ['4rem', { lineHeight: '1.1' }], // 64px
    '6xl': ['5rem', { lineHeight: '1.1' }], // 80px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
} as const;

// Spacing Scale (8px Step System)
export const spacing = {
  0: '0px',
  px: '1px',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem', // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem', // 8px
  '2.5': '0.625rem', // 10px
  '3': '0.75rem', // 12px
  '3.5': '0.875rem', // 14px
  '4': '1rem', // 16px
  '5': '1.25rem', // 20px
  '6': '1.5rem', // 24px
  '7': '1.75rem', // 28px
  '8': '2rem', // 32px
  '9': '2.25rem', // 36px
  '10': '2.5rem', // 40px
  '11': '2.75rem', // 44px
  '12': '3rem', // 48px
  '14': '3.5rem', // 56px
  '16': '4rem', // 64px
  '20': '5rem', // 80px
  '24': '6rem', // 96px
  '28': '7rem', // 112px
  '32': '8rem', // 128px
  '36': '9rem', // 144px
  '40': '10rem', // 160px
  '44': '11rem', // 176px
  '48': '12rem', // 192px
  '52': '13rem', // 208px
  '56': '14rem', // 224px
  '60': '15rem', // 240px
  '64': '16rem', // 256px
  '72': '18rem', // 288px
  '80': '20rem', // 320px
  '96': '24rem', // 384px
} as const;

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
  
  // Brand-specific shadows
  primary: '0 4px 14px 0 rgb(19 62 135 / 0.15)',
  accent: '0 4px 14px 0 rgb(239 247 255 / 0.3)',
  cream: '0 4px 14px 0 rgb(243 243 224 / 0.2)',
} as const;

// Z-Index Scale
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation & Transitions
export const animation = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  timingFunction: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Export all tokens as a single object
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  animation,
} as const;

export default tokens;
