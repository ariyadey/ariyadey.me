import { TestBed } from "@angular/core/testing";

import { RouteUtils } from "ariyadey-main/src/app/shared/resource/route-utils";

describe("RouteUtils", () => {
  let service: RouteUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUtils);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
