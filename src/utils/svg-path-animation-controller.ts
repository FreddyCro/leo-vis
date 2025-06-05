/**
 * Options for AnimationController
 */
interface AnimationControllerOptions {
  svgEl: SVGSVGElement;
  elements: HTMLElement[];
  circleEl?: SVGCircleElement | null;
  duration?: number; // Animation duration in ms, default 2000ms
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * AnimationController
 * Controls SVG path drawing and element animation along paths.
 */
class AnimationController {
  /** Animation state */
  animateState: 'PLAY' | 'PAUSE' = 'PAUSE';
  /** SVG element */
  svgEl: SVGSVGElement;
  /** Elements to animate */
  elements: HTMLElement[];
  /** SVG path elements, one for each animated element */
  pathEls: SVGPathElement[] = [];
  /** Optional circle element for new point */
  circleEl: SVGCircleElement | null;
  /** Animation duration */
  duration: number;

  /**
   * @param options AnimationControllerOptions
   */
  constructor(options: AnimationControllerOptions) {
    this.svgEl = options.svgEl;
    this.elements = options.elements;
    this.circleEl = options.circleEl ?? null;
    this.duration = options.duration ?? 10000;
    // Generate paths based on elements count
    this.syncPathEls();
  }

  /**
   * Synchronize the number of SVG path elements with the number of animated elements.
   * Adds or removes <path> as needed.
   * @private
   */
  private syncPathEls() {
    // Add paths if not enough
    while (this.pathEls.length < this.elements.length) {
      const path = document.createElementNS(SVG_NS, 'path');
      this.svgEl.appendChild(path);
      this.pathEls.push(path);
    }
    // Remove extra paths
    while (this.pathEls.length > this.elements.length) {
      const path = this.pathEls.pop();
      if (path) this.svgEl.removeChild(path);
    }
  }

  /**
   * Draw random SVG paths for each animated element.
   * The number of paths matches the number of elements.
   * @returns this
   */
  drawLines() {
    const svg = this.svgEl;
    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Ensure correct number of paths
    this.syncPathEls();

    /**
     * Generate a random SVG path string starting at (startX, startY)
     */
    function randomPath(startX: number, startY: number) {
      let d = `M${startX} ${startY}`;
      for (let i = 0; i < 4; i++) {
        d += ` Q${Math.random() * width} ${Math.random() * height},${Math.random() * width} ${Math.random() * height}`;
      }
      return d;
    }

    this.pathEls.forEach((path, idx) => {
      const startX = idx === 0 ? 0 : width;
      path.setAttribute('d', randomPath(startX, 0));
    });
    return this;
  }

  /**
   * Add a new SVG circle as a "new point" at the specified position.
   * Stores the reference in this.circleEl.
   * @param cx The x position of the circle (default: center of SVG)
   * @param cy The y position of the circle (default: 100px below SVG)
   * @returns this
   */
  addCircle(cx?: number, cy?: number) {
    const svg = this.svgEl;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let circle = svg.querySelector('circle[data-new-point]');
    if (!circle) {
      circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('data-new-point', 'true');
      circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'red');
      svg.appendChild(circle);
    }
    // Use provided cx/cy or default to center and below SVG
    const finalCx = cx !== undefined ? cx : width / 2;
    const finalCy = cy !== undefined ? cy : height / 2;
    circle.setAttribute('cx', finalCx.toString());
    circle.setAttribute('cy', finalCy.toString());
    this.circleEl = circle as SVGCircleElement;
    return this;
  }

  /**
   * Move all animated elements to the new circle point.
   * Pauses the animation.
   * @returns this
   */
  moveToNewPoint({ duration }: { duration?: number } = {}) {
    if (!this.circleEl) return this;
    this.animateState = 'PAUSE';
    const cx = this.circleEl.getAttribute('cx') || '0';
    const cy = this.circleEl.getAttribute('cy') || '0';
    this.elements.forEach((el) => {
      if (duration) {
        el.style.transition = `transform ${duration}ms ease-in-out`;
      }

      el.style.transform = `translate(${cx}px, ${cy}px)`;
    });
    return this;
  }

  /**
   * Start animating all elements along their respective SVG paths.
   * @param duration Animation duration in ms
   * @returns this
   */
  run(duration: number) {
    if (this.pathEls.length !== this.elements.length) return this;
    this.animateState = 'PLAY';

    const lengths = this.pathEls.map((path) => path.getTotalLength());
    let start: number | null = null;
    let ticking = false;

    /**
     * Animation frame callback
     */
    const animate = (timestamp: number) => {
      if (ticking || this.animateState === 'PAUSE') return;
      if (start === null) start = timestamp;
      ticking = true;

      const currentTime = timestamp - start;
      const progress = Math.min(currentTime / duration, 1);

      this.pathEls.forEach((path, idx) => {
        const point = path.getPointAtLength(progress * lengths[idx]);
        const el = this.elements[idx];
        el.style.transform = `translate(${point.x}px, ${point.y}px)`;
      });

      if (progress >= 1) {
        start = null;
        setTimeout(() => {
          ticking = false;
          requestAnimationFrame(animate);
        }, 500);
        return;
      }

      ticking = false;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    /**
     * Resize handler to adjust SVG viewBox and paths
     */
    const resizeHandler = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
      this.pathEls.forEach((path, idx) => {
        const startX = idx === 0 ? 0 : width;
        path.setAttribute(
          'd',
          `M${startX} 0 L${Math.random() * width} ${Math.random() * height}`,
        );
      });
    };

    window.addEventListener('resize', resizeHandler);

    return this;
  }

  distroy() {
    this.animateState = 'PAUSE';
    this.pathEls.forEach((path) => {
      this.svgEl.removeChild(path);
    });
    this.pathEls = [];
    if (this.circleEl) {
      this.svgEl.removeChild(this.circleEl);
      this.circleEl = null;
    }
    this.elements.forEach((el) => {
      el.style.transform = '';
      el.style.transition = '';
    });

    window.removeEventListener('resize', this.resizeHandler);
  }
}

export { AnimationController };
