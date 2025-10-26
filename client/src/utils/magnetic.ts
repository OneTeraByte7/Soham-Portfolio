/**
 * Magnetic Cursor Effect
 * Elements subtly move towards the cursor on hover
 */

interface MagneticOptions {
  strength: number; // Magnetic pull strength (0-1)
  radius: number; // Effect radius in pixels
  smoothness: number; // Easing speed
}

export class MagneticEffect {
  private element: HTMLElement;
  private options: MagneticOptions;
  private rect: DOMRect | null = null;
  private isHovering: boolean = false;
  private animationFrame: number | null = null;
  private targetX: number = 0;
  private targetY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;

  constructor(element: HTMLElement, options: Partial<MagneticOptions> = {}) {
    this.element = element;
    this.options = {
      strength: options.strength || 0.3,
      radius: options.radius || 100,
      smoothness: options.smoothness || 0.15,
    };

    this.init();
  }

  private init(): void {
    this.element.style.transition = 'transform 0.1s ease-out';
    this.bindEvents();
  }

  private bindEvents(): void {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private onMouseEnter(): void {
    this.rect = this.element.getBoundingClientRect();
    this.isHovering = true;
    this.element.style.willChange = 'transform';
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.rect) return;

    const centerX = this.rect.left + this.rect.width / 2;
    const centerY = this.rect.top + this.rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < this.options.radius) {
      const intensity = 1 - distance / this.options.radius;
      this.targetX = deltaX * this.options.strength * intensity;
      this.targetY = deltaY * this.options.strength * intensity;
    } else {
      this.targetX = 0;
      this.targetY = 0;
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  private animate(): void {
    this.currentX += (this.targetX - this.currentX) * this.options.smoothness;
    this.currentY += (this.targetY - this.currentY) * this.options.smoothness;

    this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

    if (
      this.isHovering &&
      (Math.abs(this.targetX - this.currentX) > 0.1 || Math.abs(this.targetY - this.currentY) > 0.1)
    ) {
      this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.animationFrame = null;
    }
  }

  private onMouseLeave(): void {
    this.isHovering = false;
    this.targetX = 0;
    this.targetY = 0;
    this.element.style.willChange = 'auto';

    // Smooth return to original position
    const returnAnimation = () => {
      this.currentX += (0 - this.currentX) * 0.2;
      this.currentY += (0 - this.currentY) * 0.2;

      this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

      if (Math.abs(this.currentX) > 0.1 || Math.abs(this.currentY) > 0.1) {
        requestAnimationFrame(returnAnimation);
      } else {
        this.currentX = 0;
        this.currentY = 0;
        this.element.style.transform = 'translate(0, 0)';
      }
    };

    returnAnimation();
  }

  public destroy(): void {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}

/**
 * Initialize magnetic effect on elements
 */
export function initMagnetic(selector: string, options?: Partial<MagneticOptions>): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  elements.forEach(element => {
    new MagneticEffect(element, options);
  });
}
