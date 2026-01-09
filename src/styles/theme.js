export const lightTheme = {
  name: 'light',
  colors: {
    // Primary colors
    primary: '#FF6B6B',
    primaryHover: '#FF5252',
    primaryLight: '#FFE5E5',
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F3F5',
    
    // Surface colors
    surface: '#FFFFFF',
    surfaceHover: '#F8F9FA',
    
    // Text colors
    text: '#212529',
    textSecondary: '#6C757D',
    textTertiary: '#ADB5BD',
    
    // Border colors
    border: '#DEE2E6',
    borderLight: '#E9ECEF',
    
    // Status colors
    success: '#51CF66',
    warning: '#FFC107',
    error: '#FF6B6B',
    info: '#4DABF7',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.1)',
    
    // Card
    cardBackground: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.1)'
  },
  
  // Spacing system (8px base)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  // Typography
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSizeXs: '12px',
    fontSizeSm: '14px',
    fontSizeMd: '16px',
    fontSizeLg: '18px',
    fontSizeXl: '24px',
    fontSizeXxl: '32px',
    fontWeightLight: 300,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },
  
  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.2)'
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  }
};

export const darkTheme = {
  ...lightTheme,
  name: 'dark',
  colors: {
    // Primary colors
    primary: '#FF6B6B',
    primaryHover: '#FF8787',
    primaryLight: '#4C1D1D',
    
    // Background colors
    background: '#0F1419',
    backgroundSecondary: '#16181D',
    backgroundTertiary: '#1C1F26',
    
    // Surface colors
    surface: '#16181D',
    surfaceHover: '#1C1F26',
    
    // Text colors
    text: '#E9ECEF',
    textSecondary: '#ADB5BD',
    textTertiary: '#6C757D',
    
    // Border colors
    border: '#2C2F36',
    borderLight: '#25272D',
    
    // Status colors
    success: '#51CF66',
    warning: '#FFC107',
    error: '#FF6B6B',
    info: '#4DABF7',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    
    // Card
    cardBackground: '#16181D',
    cardShadow: 'rgba(0, 0, 0, 0.3)'
  }
};