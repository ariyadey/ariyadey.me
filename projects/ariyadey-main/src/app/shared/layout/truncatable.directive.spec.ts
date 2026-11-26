import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TruncatableDirective } from "@main/shared/layout/truncatable.directive";
import { provideAppTesting } from "@main/shared/testing/test-providers";

@Component({
  template: `<p appTruncate>Sample text</p>`,
  imports: [TruncatableDirective],
})
class TestHostComponent {}

describe("TruncatableDirective", () => {
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
      .query(By.directive(TruncatableDirective))
      .injector.get(TruncatableDirective);
    expect(directive).toBeTruthy();
  });
});
