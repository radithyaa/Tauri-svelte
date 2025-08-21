<script lang="ts">
  import { onMount } from 'svelte';
  import { tauriAPI } from './tauri-api';

  let name = 'Tauri User';
  let greetMsg = '';
  let appVersion = '';
  let isLoading = false;

  onMount(async () => {
    // Get app version when component mounts
    appVersion = await tauriAPI.getAppVersion();
  });

  async function greet() {
    isLoading = true;
    try {
      greetMsg = await tauriAPI.greet(name);
    } catch (error) {
      greetMsg = 'Error occurred while greeting!';
      console.error('Greet error:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="tauri-demo">
  <div class="demo-section">
    <h2>🦀 Tauri Integration</h2>
    <p class="version">Tauri v2 - App Version: <strong>{appVersion}</strong></p>
  </div>

  <div class="demo-section">
    <h3>Rust Backend Communication</h3>
    <div class="input-group">
      <input
        id="greet-input"
        placeholder="Enter a name..."
        bind:value={name}
        disabled={isLoading}
      />
      <button type="button" on:click={greet} disabled={isLoading || !name.trim()}>
        {isLoading ? 'Greeting...' : 'Greet'}
      </button>
    </div>
    
    {#if greetMsg}
      <div class="greeting-result">
        <p>{greetMsg}</p>
      </div>
    {/if}
  </div>

  <div class="demo-section">
    <h3>Features Available</h3>
    <div class="features-grid">
      <div class="feature-card">
        <h4>🏠 Cross-Platform</h4>
        <p>Desktop, mobile (iOS/Android), and web support</p>
      </div>
      <div class="feature-card">
        <h4>📁 File System</h4>
        <p>Secure file operations with scoped access</p>
      </div>
      <div class="feature-card">
        <h4>🔔 Notifications</h4>
        <p>Cross-platform native notifications</p>
      </div>
      <div class="feature-card">
        <h4>🔌 Plugin System</h4>
        <p>Modular architecture with official plugins</p>
      </div>
    </div>
  </div>
</div>

<style>
  .tauri-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .demo-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .demo-section h2 {
    margin: 0 0 1rem 0;
    color: #ff3e00;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .demo-section h3 {
    margin: 0 0 1rem 0;
    color: #646cff;
  }

  .version {
    margin: 0;
    padding: 0.5rem 1rem;
    background: rgba(100, 108, 255, 0.1);
    border-radius: 6px;
    border-left: 3px solid #646cff;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .input-group input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    font-size: 1rem;
  }

  .input-group input:focus {
    outline: none;
    border-color: #646cff;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }

  .input-group button {
    padding: 0.75rem 1.5rem;
    background: #646cff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .input-group button:hover:not(:disabled) {
    background: #535bf2;
    transform: translateY(-1px);
  }

  .input-group button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .greeting-result {
    padding: 1rem;
    background: rgba(255, 62, 0, 0.1);
    border-radius: 6px;
    border-left: 3px solid #ff3e00;
  }

  .greeting-result p {
    margin: 0;
    font-weight: 500;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .feature-card {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .feature-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #ff3e00;
  }

  .feature-card p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.4;
  }

  @media (prefers-color-scheme: light) {
    .demo-section {
      background: rgba(0, 0, 0, 0.02);
      border-color: rgba(0, 0, 0, 0.1);
    }

    .input-group input {
      background: rgba(0, 0, 0, 0.02);
      border-color: rgba(0, 0, 0, 0.2);
    }

    .feature-card {
      background: rgba(0, 0, 0, 0.01);
      border-color: rgba(0, 0, 0, 0.05);
    }
  }
</style>