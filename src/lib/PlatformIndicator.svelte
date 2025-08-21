<script lang="ts">
  import { onMount } from 'svelte';
  import { detectPlatform, type PlatformInfo } from './platform-detector';

  let platform: PlatformInfo;
  let mounted = false;

  onMount(() => {
    platform = detectPlatform();
    mounted = true;
  });

  function getPlatformIcon(platformType: string) {
    switch (platformType) {
      case 'mobile': return '📱';
      case 'desktop': return '🖥️';
      case 'web': return '🌐';
      default: return '❓';
    }
  }

  function getPlatformDescription(platformType: string) {
    switch (platformType) {
      case 'mobile':
        return 'Native mobile experience - zoom, text selection, and context menus disabled for app-like feel';
      case 'desktop':
        return 'Desktop application with full native capabilities and window controls';
      case 'web':
        return 'Standard web experience with all browser features enabled';
      default:
        return 'Unknown platform';
    }
  }
</script>

{#if mounted && platform}
  <div class="platform-indicator">
    <div class="platform-badge" class:mobile={platform.platform === 'mobile'} class:desktop={platform.platform === 'desktop'} class:web={platform.platform === 'web'}>
      <span class="platform-icon">{getPlatformIcon(platform.platform)}</span>
      <div class="platform-info">
        <strong class="platform-name">
          {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)} Mode
        </strong>
        <p class="platform-description">
          {getPlatformDescription(platform.platform)}
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  .platform-indicator {
    margin: 1rem 0;
  }

  .platform-badge {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .platform-badge.mobile {
    border-color: rgba(255, 62, 0, 0.3);
    background: rgba(255, 62, 0, 0.1);
  }

  .platform-badge.desktop {
    border-color: rgba(100, 108, 255, 0.3);
    background: rgba(100, 108, 255, 0.1);
  }

  .platform-badge.web {
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(34, 197, 94, 0.1);
  }

  .platform-icon {
    font-size: 2rem;
    line-height: 1;
  }

  .platform-info {
    flex: 1;
  }

  .platform-name {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: inherit;
  }

  .platform-description {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.4;
  }

  @media (prefers-color-scheme: light) {
    .platform-badge {
      background: rgba(0, 0, 0, 0.02);
      border-color: rgba(0, 0, 0, 0.1);
    }

    .platform-badge.mobile {
      border-color: rgba(255, 62, 0, 0.2);
      background: rgba(255, 62, 0, 0.05);
    }

    .platform-badge.desktop {
      border-color: rgba(100, 108, 255, 0.2);
      background: rgba(100, 108, 255, 0.05);
    }

    .platform-badge.web {
      border-color: rgba(34, 197, 94, 0.2);
      background: rgba(34, 197, 94, 0.05);
    }
  }
</style>