const timeWord = require("./timeWord");

describe("#timeword", () => {
  test("it is a function", () => {
    expect(typeof timeWord).toBe("function");
  });

  test("works: edge cases noon and midnight", () => {
    expect(timeWord("12:00")).toBe("noon");
    expect(timeWord("00:00")).toBe("midnight");
  });

  test("works: begins with 0X:XX", () => {
    expect(timeWord("02:31")).toBe("two thirty one am");
  });

  test("works: begins with 1X:XX", () => {
    expect(timeWord("16:46")).toBe("four fourty six pm");
  });

  test("works: edge case XX:12", () => {
    expect(timeWord("16:12")).toBe("four twelve pm");
  });

  test("works: edge case XX:00", () => {
    expect(timeWord("06:00")).toBe("six o'clock am");
  });

  test("works: edge case XX:0X", () => {
    expect(timeWord("16:02")).toBe("four oh two pm");
  });

  test("works: twelve oh nine", () => {
    expect(timeWord("12:09")).toBe("twelve oh nine pm");
  });
});
