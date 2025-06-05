import { TestBed } from "@angular/core/testing";

import { LayoutObserver } from "@main/shared/layout/layout-observer";

describe("LayoutService", () => {
  let service: LayoutObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutObserver);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
