import { TestBed } from "@angular/core/testing";
import { ImgResolvePipe } from "@main/shared/resource/image-resolver.pipe";
import { provideAppTesting } from "@main/shared/testing/test-providers";

describe("ImgResolvePipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAppTesting()],
    });
  });

  it("create an instance", () => {
    const pipe = TestBed.runInInjectionContext(() => new ImgResolvePipe());
    expect(pipe).toBeTruthy();
  });
});
