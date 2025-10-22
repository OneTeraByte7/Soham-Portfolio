import './style.css';
import { App } from './components/App';

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App('app');
  app.init();
});
