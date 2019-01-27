import formatMoney from "../lib/formatMoney";

describe("format money function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("A$0.01");
    expect(formatMoney(10)).toEqual("A$0.10");
    expect(formatMoney(9)).toEqual("A$0.09");
    expect(formatMoney(40)).toEqual("A$0.40");
  });

  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(100)).toEqual("A$1");
    expect(formatMoney(5000)).toEqual("A$50");
    expect(formatMoney(50000000)).toEqual("A$500,000");
  });

  it("works with whole and fractional dollars", () => {
    expect(formatMoney(5012)).toEqual("A$50.12");
    expect(formatMoney(105)).toEqual("A$1.05");
    expect(formatMoney(50000025)).toEqual("A$500,000.25");
    expect(formatMoney(52845824582)).toEqual("A$528,458,245.82");
  });
});
