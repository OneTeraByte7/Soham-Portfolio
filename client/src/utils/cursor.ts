/**
 * Custom Animated Cursor
 * Creates a following cursor with trail effect
 */

export class CustomCursor {
  private cursor: HTMLElement;
  private cursorDot: HTMLElement;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private cursorX: number = 0;
  private cursorY: number = 0;
  private dotX: number = 0;
  private dotY: number = 0;
  private isVisible: boolean = false;

  constructor() {
    this.cursor = this.createCursorElement();
    this.cursorDot = this.createDotElement();
    this.init();
  }

  private createCursorElement(): HTMLElement {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(0, 160, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.15s ease;
      opacity: 0;
    `;
    document.body.appendChild(cursor);
    return cursor;
  }

  private createDotElement(): HTMLElement {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    dot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.1s ease, opacity 0.1s ease, background 0.2s ease;
      opacity: 0;
    `;
    document.body.appendChild(dot);
    return dot;
  }

  private init(): void {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.cursor.style.opacity = '1';
        this.cursorDot.style.opacity = '1';
      }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.cursor.style.opacity = '0';
      this.cursorDot.style.opacity = '0';
    });

    // Handle clickable elements
    const clickables = 'a, button, [role="button"], input, textarea, select';

    const handleMouseEnter = () => {
      this.cursor.style.transform = 'scale(1.5)';
      this.cursor.style.borderColor = 'rgba(112, 0, 255, 0.8)';
    };

    const handleMouseLeave = () => {
      this.cursor.style.transform = 'scale(1)';
      this.cursor.style.borderColor = 'rgba(0, 160, 255, 0.5)';
    };

    document.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(clickables)) {
        handleMouseEnter();
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(clickables)) {
        handleMouseLeave();
      }
    }, true);

    // Animate cursor
    this.animate();
    // Set initial dot color based on theme and observe theme changes
    this.updateDotForTheme();
    const obs = new MutationObserver(() => this.updateDotForTheme());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  private updateDotForTheme(): void {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      this.cursorDot.style.background = 'linear-gradient(135deg, #00a0ff, #7000ff)';
      this.cursor.style.borderColor = 'rgba(0,160,255,0.5)';
    } else {
      this.cursorDot.style.background = '#ffffff';
      this.cursor.style.borderColor = 'rgba(0,0,0,0.12)';
    }
  }

  private animate(): void {
    // Smooth cursor movement with easing
    this.cursorX += (this.mouseX - this.cursorX) * 0.15;
    this.cursorY += (this.mouseY - this.cursorY) * 0.15;

    // Faster dot movement
    this.dotX += (this.mouseX - this.dotX) * 0.25;
    this.dotY += (this.mouseY - this.dotY) * 0.25;

    this.cursor.style.left = `${this.cursorX - 20}px`;
    this.cursor.style.top = `${this.cursorY - 20}px`;

    this.cursorDot.style.left = `${this.dotX - 4}px`;
    this.cursorDot.style.top = `${this.dotY - 4}px`;

    requestAnimationFrame(() => this.animate());
  }

  public destroy(): void {
    this.cursor.remove();
    this.cursorDot.remove();
  }
}

/**
 * Initialize custom cursor
 */
export function initCustomCursor(): CustomCursor | null {
  // Only on desktop devices
  if (window.matchMedia('(pointer: fine)').matches) {
    return new CustomCursor();
  }
  return null;
}
