import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  viewChild,
} from "@angular/core";
import { ThemeService } from "@main/shared/theming/theme.service";

type Particle = {
  originalX: number;
  originalY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
};

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
  styles: `
    :host {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
    }

    canvas {
      width: inherit;
      height: inherit;
      touch-action: none; /* Prevent browser touch actions for better mouse tracking */
    }
  `,
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  readonly rows = input(100);
  readonly cols = input(300);
  readonly thickness = input(100);
  readonly drag = input(0.99);
  readonly ease = input(0.1);
  readonly randomness = input(0.05);
  readonly autoInfluenceOnMouse = input(0.05);
  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>("particleCanvas");
  readonly currentTheme = inject(ThemeService).currentTheme;
  readonly hostElement = inject(ElementRef);
  readonly canvasRenderingContext2D = computed(
    () => this.canvasRef().nativeElement.getContext("2d")!,
  );
  readonly NUM_PARTICLES = computed(() => this.rows() * this.cols());
  readonly THICKNESS_SQ = computed(() => Math.pow(this.thickness(), 2));
  readonly canvasWidth = computed(() => this.canvasRef().nativeElement.clientWidth);
  readonly canvasHeight = computed(() => this.canvasRef().nativeElement.clientHeight);
  particles = [] as Array<Particle>;
  private animationFrameId!: number;
  private isPointerControlling = false;
  private toggle = true; // Toggle for animation phases
  private pointerX = 0;
  private pointerY = 0;
  private particleColor = { r: 0, g: 0, b: 0 };

  constructor() {
    effect(() => {
      const inheritedColor = getComputedStyle(this.hostElement.nativeElement)
        .getPropertyValue("color")
        .trim();
      this.particleColor = this.parseCssColorToRgb(inheritedColor);
      this.updateCanvasDimensions();
      this.initializeParticles();
      console.debug(this.currentTheme());
    });
  }

  ngAfterViewInit(): void {
    this.step();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  @HostListener("window:resize")
  onResize(): void {
    this.updateCanvasDimensions();
    this.initializeParticles(); // Re-initialize particles to redistribute them on new size
  }

  // Handle mouse movement relative to the canvas
  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    const bounds = this.canvasRef().nativeElement.getBoundingClientRect();
    // Store the raw mouse position
    // Calculate mouse position relative to the canvas element's viewport position
    // Then, critically, scale these coordinates from the canvas's visual size
    this.pointerX = (event.clientX - bounds.left) * (this.canvasWidth() / bounds.width);
    this.pointerY = (event.clientY - bounds.top) * (this.canvasHeight() / bounds.height);
    this.isPointerControlling = true;
  }

  @HostListener("mouseleave", ["$event"])
  onMouseLeave(_: MouseEvent): void {
    this.isPointerControlling = false;
  }

  private updateCanvasDimensions(): void {
    // Set the canvas drawing buffer size (important for sharp rendering)
    this.canvasRef().nativeElement.width = this.canvasWidth();
    this.canvasRef().nativeElement.height = this.canvasHeight();
  }

  private initializeParticles(): void {
    // Calculate the step based on the FULL width/height
    // This will make particles span from edge to edge
    const xStep = this.cols() > 0 ? this.canvasWidth() / this.cols() : 0;
    const yStep = this.rows() > 0 ? this.canvasHeight() / this.rows() : 0;
    this.particles = Array.from({ length: this.NUM_PARTICLES() }, (_, i) => {
      const particleX = (i % this.cols()) * xStep;
      const particleY = Math.floor(i / this.cols()) * yStep;
      return {
        velocityX: 0,
        velocityY: 0,
        currentX: particleX,
        currentY: particleY,
        originalX: particleX,
        originalY: particleY,
      };
    });
  }

  private step(): void {
    this.toggle = !this.toggle;
    this.toggle ? this.updateParticlePhysics() : this.drawParticles();
    this.animationFrameId = requestAnimationFrame(() => this.step());
  }

  private updateParticlePhysics() {
    let currentTargetX: number;
    let currentTargetY: number;
    const t = +new Date() * 0.001;
    const autoMoveX =
      this.canvasWidth() * 0.5 + Math.cos(t * 2.1) * Math.cos(t * 0.9) * this.canvasWidth() * 0.45;
    const autoMoveY =
      this.canvasHeight() * 0.5 +
      Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * this.canvasHeight() * 0.45;

    if (this.isPointerControlling) {
      // If mouse is active, the primary target is the mouse position,
      // but with a subtle offset from the automatic movement.
      const autoOffsetX = autoMoveX - this.canvasWidth() * 0.5; // Offset from canvas center
      const autoOffsetY = autoMoveY - this.canvasHeight() * 0.5; // Offset from canvas center

      currentTargetX = this.pointerX + autoOffsetX * this.autoInfluenceOnMouse();
      currentTargetY = this.pointerY + autoOffsetY * this.autoInfluenceOnMouse();
    } else {
      // If mouse is not active, the automatic movement is the primary target
      currentTargetX = autoMoveX;
      currentTargetY = autoMoveY;
    }

    for (let i = 0; i < this.NUM_PARTICLES(); i++) {
      const p = this.particles[i];

      // Use the calculated currentTargetX and currentTargetY for repulsion
      const dx = currentTargetX - p.currentX;
      const dy = currentTargetY - p.currentY;

      // const dx = this.mx - p.x;
      // const dy = this.my - p.y;
      const d = dx * dx + dy * dy;
      const f = -this.THICKNESS_SQ() / d;

      if (d < this.THICKNESS_SQ()) {
        const t = Math.atan2(dy, dx);
        p.velocityX += f * Math.cos(t);
        p.velocityY += f * Math.sin(t);
      }

      // Add small random forces to velocity
      const randomForceX = (Math.random() * 2 - 1) * this.randomness(); // Value between -randomness and +randomness
      const randomForceY = (Math.random() * 2 - 1) * this.randomness(); // Value between -randomness and +randomness

      p.velocityX += randomForceX; // Apply random force to velocity
      p.velocityY += randomForceY; // Apply random force to velocity

      p.currentX += (p.velocityX *= this.drag()) + (p.originalX - p.currentX) * this.ease();
      p.currentY += (p.velocityY *= this.drag()) + (p.originalY - p.currentY) * this.ease();
    }
  }

  // Draw particles to canvas using ImageData (highly performant for single pixels)
  private drawParticles() {
    const imageData = this.canvasRenderingContext2D().createImageData(
      this.canvasWidth(),
      this.canvasHeight(),
    );
    const data = imageData.data;

    for (let i = 0; i < this.NUM_PARTICLES(); i++) {
      const p = this.particles[i];
      const px = Math.round(p.currentX);
      const py = Math.round(p.currentY);
      const n = (px + py * this.canvasWidth()) * 4; // Calculate index in data array

      // Add bound check for safety
      if (
        px >= 0 &&
        px < this.canvasWidth() &&
        py >= 0 &&
        py < this.canvasHeight() &&
        n >= 0 &&
        n < data.length - 3
      ) {
        data[n] = this.particleColor.r;
        data[n + 1] = this.particleColor.g;
        data[n + 2] = this.particleColor.b;
        data[n + 3] = 255;
      }
    }
    this.canvasRenderingContext2D().putImageData(imageData, 0, 0);
  }

  // Helper method to parse any CSS color string into RGB values.
  // This is necessary because ImageData.data requires numerical RGB values.
  private parseCssColorToRgb(colorString: string): typeof this.particleColor {
    // Create a temporary 1x1 canvas context to get the computed RGB values
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCtx.fillStyle = colorString;
    tempCtx.fillRect(0, 0, 1, 1); // Draw a 1x1 pixel with the specified color
    const data = tempCtx.getImageData(0, 0, 1, 1).data; // Read its pixel data

    return { r: data[0], g: data[1], b: data[2] };
  }
}
