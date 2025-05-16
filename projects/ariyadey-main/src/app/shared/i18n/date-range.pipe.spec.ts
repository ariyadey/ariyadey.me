import { DateRangePipe } from "@main/shared/i18n/date-range.pipe";

describe("DateRangePipe", () => {
  it("create an instance", () => {
    const pipe = new DateRangePipe();
    expect(pipe).toBeTruthy();
  });
});
