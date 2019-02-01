function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    //mock API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("mocking learning", () => {
  it("mocks a reg function", () => {
    const fetchDogs = jest.fn();
    fetchDogs("snickers");
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("snickers");
    fetchDogs("hugo");
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });
  it("can create a person", () => {
    const me = new Person("sumit", ["pizza", "burger"]);
    expect(me.name).toBe("sumit");
  });

  it("can fetch foods", async () => {
    const me = new Person("sumit", ["pizza", "burger"]);
    // mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(["sushi", "fries"]);

    // Actual (mockAPI) API Call, takes long time
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain("fries");
  });
});
