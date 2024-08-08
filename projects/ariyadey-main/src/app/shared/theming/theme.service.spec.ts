import { TestBed } from "@angular/core/testing";
import { ThemeService } from "@main/shared/theming/theme.service";

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
