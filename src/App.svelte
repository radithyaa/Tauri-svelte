<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';
  import TauriDemo from './lib/TauriDemo.svelte';
  import WindowControls from './lib/WindowControls.svelte';
  import MobileTouchHandler from './lib/MobileTouchHandler.svelte';
  import PlatformIndicator from './lib/PlatformIndicator.svelte';
  import { onMount } from 'svelte';
  import { detectPlatform, applyPlatformStyles } from './lib/platform-detector';
  
  // Check if we're running in Tauri
  const isTauri = window.__TAURI__ !== undefined;
  let platform = detectPlatform();

  onMount(() => {
    // Apply platform-specific styles and behaviors
    platform = detectPlatform();
    applyPlatformStyles(platform);

    // Listen for resize events to re-detect platform if needed
    const handleResize = () => {
      const newPlatform = detectPlatform();
      if (newPlatform.platform !== platform.platform) {
        platform = newPlatform;
        applyPlatformStyles(platform);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<MobileTouchHandler>
<main class="main-container" class:mobile={platform.platform === 'mobile'}>
  {#if isTauri}
    <WindowControls />
  {/if}
  
  <div class="header">
    <div class="logos">
      <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} class="logo" alt="Vite Logo" />
      </a>
      <a href="https://svelte.dev" target="_blank" rel="noreferrer">
        <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
      </a>
      {#if isTauri}
        <div class="logo tauri">🦀</div>
      {/if}
    </div>
    <h1>
      {#if isTauri}
        Tauri + Svelte + Vite
      {:else}
        Vite + Svelte (Web Mode)
      {/if}
    </h1>
  </div>

  <div class="content">
    <div class="card">
      <Counter />
    </div>

    <PlatformIndicator />

    <TauriDemo />

    <div class="info-section">
      <p class="description">
        {#if platform.platform === 'mobile'}
          Aplikasi ini berjalan dalam mode mobile dengan pengalaman native app.
        {:else if platform.platform === 'desktop'}
          Aplikasi desktop Tauri dengan kemampuan native penuh.
        {:else}
          Aplikasi web standar dengan semua fitur browser diaktifkan.
        {/if}
      </p>

      <p class="links">
        Check out 
        <a href="https://tauri.app" target="_blank" rel="noreferrer">Tauri</a>
        for building cross-platform desktop apps with web technologies!
      </p>
    </div>
  </div>
</main>
</MobileTouchHandler>

<style>
  .main-container {
    padding-top: 2rem;
    min-height: 100vh;
    position: relative;
  }

  .main-container.mobile {
    padding-top: 1rem;
    overflow-x: hidden;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .logo.tauri {
    height: 6em;
    padding: 1.5em;
    font-size: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 300ms;
  }

  .logo.tauri:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 2em #ffa500aa);
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 0;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .card {
    padding: 2em;
    text-align: center;
    margin-bottom: 2rem;
  }

  .info-section {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
  }

  .description {
    color: #888;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .links {
    color: #888;
    margin: 0;
  }

  .links a {
    font-weight: 500;
    color: #646cff;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .links a:hover {
    color: #535bf2;
    text-decoration: underline;
  }

  @media (prefers-color-scheme: light) {
    .info-section {
      background: rgba(0, 0, 0, 0.02);
      border-color: rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    .main-container {
      padding-top: 0.5rem;
    }

    .logos {
      flex-direction: column;
      gap: 0.5rem;
    }

    .logo {
      height: 4em;
      padding: 1em;
    }

    .logo.tauri {
      height: 4em;
      padding: 1em;
      font-size: 2.5em;
    }

    h1 {
      font-size: 2.5em;
    }

    .content {
      padding: 0 1rem;
    }

    .card {
      padding: 1.5em;
    }

    .info-section {
      padding: 1.5rem;
    }
  }

  /* Platform-specific styles */
  :global(.platform-mobile .main-container) {
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
  }

  :global(.platform-mobile button) {
    min-height: 44px; /* iOS recommended touch target size */
    min-width: 44px;
  }

  :global(.platform-mobile input) {
    min-height: 44px;
    font-size: 16px; /* Prevent zoom on iOS */
  }
</style>