<script lang="ts">
  import { tauriAPI } from './tauri-api';

  let isMaximized = false;

  async function handleClose() {
    await tauriAPI.closeApp();
  }

  async function handleMinimize() {
    await tauriAPI.minimizeApp();
  }

  async function handleMaximize() {
    isMaximized = !isMaximized;
    await tauriAPI.maximizeApp();
  }
</script>

<div class="window-controls" data-tauri-drag-region>
  <div class="window-controls-container">
    <button class="control-btn minimize" on:click={handleMinimize} title="Minimize">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <rect x="0" y="5" width="10" height="1" fill="currentColor"/>
      </svg>
    </button>
    
    <button class="control-btn maximize" on:click={handleMaximize} title={isMaximized ? 'Restore' : 'Maximize'}>
      <svg width="12" height="12" viewBox="0 0 12 12">
        {#if isMaximized}
          <rect x="0" y="2" width="8" height="8" stroke="currentColor" stroke-width="1" fill="none"/>
          <rect x="2" y="0" width="8" height="8" stroke="currentColor" stroke-width="1" fill="none"/>
        {:else}
          <rect x="0" y="0" width="10" height="10" stroke="currentColor" stroke-width="1" fill="none"/>
        {/if}
      </svg>
    </button>
    
    <button class="control-btn close" on:click={handleClose} title="Close">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M0 0 L10 10 M10 0 L0 10" stroke="currentColor" stroke-width="1"/>
      </svg>
    </button>
  </div>
</div>

<style>
  .window-controls {
    position: fixed;
    top: 0;
    right: 0;
    height: 30px;
    display: flex;
    align-items: center;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  .window-controls-container {
    display: flex;
    height: 100%;
  }

  .control-btn {
    width: 46px;
    height: 30px;
    border: none;
    background: transparent;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #333;
  }

  .control-btn.close:hover {
    background: #ff4757;
    color: white;
  }

  @media (prefers-color-scheme: dark) {
    .control-btn {
      color: #999;
    }
    
    .control-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }
</style>