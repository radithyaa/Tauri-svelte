import './app.css'
import App from './App.svelte'
import { detectPlatform, applyPlatformStyles } from './lib/platform-detector'

// Apply platform detection as early as possible
const platform = detectPlatform();
applyPlatformStyles(platform);

const app = new App({
  target: document.getElementById('app')!,
})

export default app
