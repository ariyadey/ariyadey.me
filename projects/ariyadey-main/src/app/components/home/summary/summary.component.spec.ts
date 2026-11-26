import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SummaryComponent } from "@main/components/home/summary/summary.component";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("SummaryComponent", () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
      providers: [provideAppTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
