import { TestBed } from "@angular/core/testing";
import { I18nPipe } from "@main/shared/i18n/i18n.pipe";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("I18nPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
  });

  it("create an instance", () => {
    const pipe = TestBed.runInInjectionContext(() => new I18nPipe());
    expect(pipe).toBeTruthy();
  });
});
