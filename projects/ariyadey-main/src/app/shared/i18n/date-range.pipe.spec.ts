import { TestBed } from "@angular/core/testing";
import { DateRangePipe } from "@main/shared/i18n/date-range.pipe";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("DateRangePipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
  });

  it("create an instance", () => {
    const pipe = TestBed.runInInjectionContext(() => new DateRangePipe());
    expect(pipe).toBeTruthy();
  });
});
