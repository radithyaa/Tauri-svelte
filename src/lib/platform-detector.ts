export interface PlatformInfo {
  isMobile: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  isTauri: boolean;
  platform: 'mobile' | 'desktop' | 'web';
}

export function detectPlatform(): PlatformInfo {
  const isTauri = window.__TAURI__ !== undefined;
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Determine if we're on mobile
  const isMobile = isMobileDevice || (isTouchDevice && window.innerWidth <= 768);
  
  // Determine platform
  let platform: 'mobile' | 'desktop' | 'web';
  if (isTauri) {
    platform = isMobile ? 'mobile' : 'desktop';
  } else {
    platform = isMobile ? 'mobile' : 'web';
  }
  
  return {
    isMobile,
    isDesktop: !isMobile && isTauri,
    isWeb: !isTauri,
    isTauri,
    platform
  };
}

export function applyPlatformStyles(platform: PlatformInfo) {
  const root = document.documentElement;
  
  // Remove existing platform classes
  root.classList.remove('platform-mobile', 'platform-desktop', 'platform-web');
  
  // Add current platform class
  root.classList.add(`platform-${platform.platform}`);
  
  // Apply mobile-specific restrictions
  if (platform.platform === 'mobile') {
    // Disable text selection
    root.style.setProperty('-webkit-user-select', 'none');
    root.style.setProperty('-moz-user-select', 'none');
    root.style.setProperty('-ms-user-select', 'none');
    root.style.setProperty('user-select', 'none');
    
    // Disable zoom
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    
    // Disable context menu
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Disable drag
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Disable double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Add mobile-specific CSS
    const mobileStyles = document.createElement('style');
    mobileStyles.id = 'mobile-platform-styles';
    mobileStyles.textContent = `
      .platform-mobile {
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        overscroll-behavior: none;
      }
      
      .platform-mobile * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      .platform-mobile input,
      .platform-mobile textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      .platform-mobile body {
        overflow-x: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(mobileStyles);
    
  } else {
    // Reset styles for desktop/web
    root.style.removeProperty('-webkit-user-select');
    root.style.removeProperty('-moz-user-select');
    root.style.removeProperty('-ms-user-select');
    root.style.removeProperty('user-select');
    
    // Remove mobile styles if they exist
    const existingMobileStyles = document.getElementById('mobile-platform-styles');
    if (existingMobileStyles) {
      existingMobileStyles.remove();
    }
    
    // Reset viewport for web
    if (platform.platform === 'web') {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    }
  }
}