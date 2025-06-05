import { ImgResolvePipe } from "@main/shared/resource/image-resolver.pipe";

describe("ImageResolverPipe", () => {
  it("create an instance", () => {
    const pipe = new ImgResolvePipe();
    expect(pipe).toBeTruthy();
  });
});
