import { TestBed } from "@angular/core/testing";

import { PersonalInfoService } from "./personal-info.service";

describe("PersonalInfoService", () => {
  let service: PersonalInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInfoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
