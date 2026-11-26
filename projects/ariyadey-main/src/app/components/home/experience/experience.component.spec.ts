import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ExperienceComponent } from "@main/components/home/experience/experience.component";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("ExperienceComponent", () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
      providers: [provideAppTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
