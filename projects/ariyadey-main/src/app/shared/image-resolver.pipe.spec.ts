import { ImgResolvePipe } from "./image-resolver.pipe";

describe("ImageResolverPipe", () => {
  it("create an instance", () => {
    const pipe = new ImgResolvePipe();
    expect(pipe).toBeTruthy();
  });
});
