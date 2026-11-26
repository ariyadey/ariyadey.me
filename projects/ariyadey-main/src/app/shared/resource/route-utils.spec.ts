import { TestBed } from "@angular/core/testing";
import { RouteUtils } from "@main/shared/resource/route-utils";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("RouteUtils", () => {
  let service: RouteUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
    service = TestBed.inject(RouteUtils);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
