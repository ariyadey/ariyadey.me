import { I18nPipe } from "@main/shared/i18n/i18n.pipe";

describe("TranslatePipe", () => {
  it("create an instance", () => {
    const pipe = new I18nPipe();
    expect(pipe).toBeTruthy();
  });
});
