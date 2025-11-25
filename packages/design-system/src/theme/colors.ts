export const colors = {
  // Brand colors
  primary: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e', // Main brand color
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },

  // Neutral colors
  gray: {
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
  },

  // Semantic colors
  success: {
    light: '#d1fae5',
    main: '#10b981',
    dark: '#065f46',
  },

  warning: {
    light: '#fef3c7',
    main: '#f59e0b',
    dark: '#92400e',
  },

  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#991b1b',
  },

  info: {
    light: '#dbeafe',
    main: '#3b82f6',
    dark: '#1e3a8a',
  },
} as const;