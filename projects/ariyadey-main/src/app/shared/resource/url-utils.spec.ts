import { TestBed } from "@angular/core/testing";
import { UrlUtils } from "@main/shared/resource/url-utils";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("UrlUtils", () => {
  let service: UrlUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
    service = TestBed.inject(UrlUtils);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
