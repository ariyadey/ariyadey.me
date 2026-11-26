import { TestBed } from "@angular/core/testing";
import { provideAppTesting } from "@main/shared/testing/test-providers";
import { SeoService } from "./seo.service";

describe("SeoService", () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
    service = TestBed.inject(SeoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
