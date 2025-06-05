import { TestBed } from "@angular/core/testing";
import { LocalStorage } from "@main/shared/persistance/local-storage";

describe("LocalStorageService", () => {
  let service: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorage);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
