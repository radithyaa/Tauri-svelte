<script lang="ts">
  import { onMount } from 'svelte';
  import { detectPlatform } from './platform-detector';

  let platform = detectPlatform();
  let touchStartY = 0;
  let touchStartX = 0;

  onMount(() => {
    if (platform.platform === 'mobile') {
      // Enhanced touch handling for mobile
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const deltaY = touchY - touchStartY;
        const deltaX = touchX - touchStartX;

        // Prevent pull-to-refresh
        if (deltaY > 0 && window.scrollY === 0) {
          e.preventDefault();
        }

        // Prevent horizontal scrolling if not intended
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          e.preventDefault();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        // Add any touch end logic here
      };

      // Add touch event listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Cleanup
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  });
</script>

<!-- This component handles mobile touch interactions -->
<div class="mobile-touch-handler" class:active={platform.platform === 'mobile'}>
  <slot />
</div>

<style>
  .mobile-touch-handler {
    width: 100%;
    height: 100%;
  }

  .mobile-touch-handler.active {
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
  }

  :global(.platform-mobile) {
    /* Mobile-specific global styles */
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  :global(.platform-mobile *) {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  :global(.platform-mobile button) {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 8px;
    touch-action: manipulation;
  }

  :global(.platform-mobile input) {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 8px;
  }

  /* Enhanced button interactions for mobile */
  :global(.platform-mobile button:active) {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  /* Smooth scrolling for mobile */
  :global(.platform-mobile) {
    scroll-behavior: smooth;
  }
</style>