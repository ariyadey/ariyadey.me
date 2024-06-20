import { TestBed } from "@angular/core/testing";

import { ThemeService } from "src/app/shared/theming/theme.service";

describe("ThemeService", () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
