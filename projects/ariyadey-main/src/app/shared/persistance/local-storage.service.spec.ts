import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "@main/shared/persistance/local-storage.service";

describe("LocalStorageService", () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
