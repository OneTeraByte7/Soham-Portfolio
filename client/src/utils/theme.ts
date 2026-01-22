export class ThemeManager {
  private static instance: ThemeManager;

  private constructor() {
    this.initTheme();
    this.attachEventListeners();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  public toggle(): void {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  private attachEventListeners(): void {
    // Use event delegation so toggles work even if rendered after this manager is created
    // Use capture phase to ensure we see clicks even if other handlers stop propagation
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return; // ignore text nodes
      const toggle = t.closest('#theme-toggle') || t.closest('#theme-toggle-mobile');
      if (toggle) {
        // helpful debug log when user reports toggle not working
        // eslint-disable-next-line no-console
        console.debug('Theme toggle clicked (delegated)');
        e.preventDefault();
        this.toggle();
      }
    }, true);
  }
}
