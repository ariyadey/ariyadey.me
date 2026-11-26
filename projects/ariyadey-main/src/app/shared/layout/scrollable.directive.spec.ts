import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ScrollableDirective } from "@main/shared/layout/scrollable.directive";
import { provideAppTesting } from "@main/shared/testing/test-providers";

@Component({
  template: `<a appScroll="contact">Contact</a>`,
  imports: [ScrollableDirective],
})
class TestHostComponent {}

describe("ScrollableDirective", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideAppTesting()],
    }).compileComponents();
  });

  it("should create an instance", () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const directive = fixture.debugElement
      .query(By.directive(ScrollableDirective))
      .injector.get(ScrollableDirective);
    expect(directive).toBeTruthy();
  });
});
