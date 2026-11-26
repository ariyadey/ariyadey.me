import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideAppTesting } from "@main/shared/testing/test-providers";
import { SkillsComponent } from "./skills.component";

describe("SkillsComponent", () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [provideAppTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
