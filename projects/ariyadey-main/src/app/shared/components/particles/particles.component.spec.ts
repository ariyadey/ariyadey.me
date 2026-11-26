import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideAppTesting } from "@main/shared/testing/test-providers";
import { ParticlesComponent } from "./particles.component";

describe("ParticlesComponent", () => {
  let component: ParticlesComponent;
  let fixture: ComponentFixture<ParticlesComponent>;

  beforeEach(async () => {
    const mockContext = {
      fillStyle: "",
      fillRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Uint8ClampedArray([0, 0, 0, 255]) })),
      createImageData: vi.fn((width: number, height: number) => ({
        data: new Uint8ClampedArray(Math.max(width * height * 4, 4)),
      })),
      putImageData: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(mockContext);
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

    await TestBed.configureTestingModule({
      imports: [ParticlesComponent],
      providers: [provideAppTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
