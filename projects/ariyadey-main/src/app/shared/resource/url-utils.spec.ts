import { TestBed } from "@angular/core/testing";

import { UrlUtils } from "@main/shared/resource/url-utils";

describe("PathUtils", () => {
  let service: UrlUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlUtils);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
