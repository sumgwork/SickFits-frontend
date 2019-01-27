describe("Sample test 101", () => {
  it("works as expected ", () => {
    expect(1).toEqual(1);
  });
  it("handles range fine", () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });
});
