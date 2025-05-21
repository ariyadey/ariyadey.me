import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmailComponent } from "ariyadey-main/src/app/shared/components/contact/email/email.component";

describe("EmailComponent", () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
