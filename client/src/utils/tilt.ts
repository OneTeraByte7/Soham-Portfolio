/**
 * 3D Tilt Effect with Mouse Tracking
 * Creates depth and perspective on card hover
 */

interface TiltOptions {
  max: number; // Maximum tilt angle
  perspective: number;
  scale: number;
  speed: number;
  glare: boolean;
  maxGlare: number;
}

export class Tilt3D {
  private element: HTMLElement;
  private options: TiltOptions;
  private width: number = 0;
  private height: number = 0;
  private left: number = 0;
  private top: number = 0;

  constructor(element: HTMLElement, options: Partial<TiltOptions> = {}) {
    this.element = element;
    this.options = {
      max: options.max || 15,
      perspective: options.perspective || 1000,
      scale: options.scale || 1.05,
      speed: options.speed || 400,
      glare: options.glare !== false,
      maxGlare: options.maxGlare || 0.5,
    };

    this.init();
  }

  private init(): void {
    this.element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    this.element.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

    if (this.options.glare) {
      this.createGlare();
    }

    this.bindEvents();
  }

  private createGlare(): void {
    const glare = document.createElement('div');
    glare.className = 'tilt-glare';
    glare.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      border-radius: inherit;
    `;

    const glareElement = document.createElement('div');
    glareElement.className = 'tilt-glare-inner';
    glareElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${this.options.maxGlare}) 100%);
      transform: translate(-50%, -50%) rotate(180deg);
      opacity: 0;
      transition: opacity ${this.options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99);
    `;

    glare.appendChild(glareElement);
    this.element.appendChild(glare);
  }

  private bindEvents(): void {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private updateElementPosition(): void {
    const rect = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  }

  private onMouseEnter(): void {
    this.updateElementPosition();
    this.element.style.willChange = 'transform';
  }

  private onMouseMove(event: MouseEvent): void {
    const x = (event.clientX - this.left) / this.width;
    const y = (event.clientY - this.top) / this.height;

    const tiltX = ((y - 0.5) * this.options.max * 2).toFixed(2);
    const tiltY = ((0.5 - x) * this.options.max * 2).toFixed(2);

    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale(${this.options.scale})
    `;

    if (this.options.glare) {
      const glareInner = this.element.querySelector('.tilt-glare-inner') as HTMLElement;
      if (glareInner) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) - 90;
        glareInner.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        glareInner.style.opacity = '1';
      }
    }
  }

  private onMouseLeave(): void {
    this.element.style.willChange = 'auto';
    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    if (this.options.glare) {
      const glareInner = this.element.querySelector('.tilt-glare-inner') as HTMLElement;
      if (glareInner) {
        glareInner.style.opacity = '0';
      }
    }
  }

  public destroy(): void {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);

    const glare = this.element.querySelector('.tilt-glare');
    if (glare) {
      glare.remove();
    }
  }
}

/**
 * Initialize tilt effect on elements
 */
export function initTilt(selector: string, options?: Partial<TiltOptions>): void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  elements.forEach(element => {
    new Tilt3D(element, options);
  });
}
