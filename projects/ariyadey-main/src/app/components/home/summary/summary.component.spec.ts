import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SummaryComponent } from "ariyadey-main/src/app/components/home/summary/summary.component";

describe("SummaryComponent", () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
