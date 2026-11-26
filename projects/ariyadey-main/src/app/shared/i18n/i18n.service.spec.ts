import { TestBed } from "@angular/core/testing";
import { I18nService } from "@main/shared/i18n/i18n.service";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("I18nService", () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
    service = TestBed.inject(I18nService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
