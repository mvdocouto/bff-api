const nock = require("nock");
const ColorAPI = require("./colorApi");
const { COLOR_API_URL } = process.env;

describe("ColorAPI", () => {
  const colorAPI = new ColorAPI();
  colorAPI.initialize({
    context: {},
  });

  beforeEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("Should return a colors list", async () => {
    const expectedResult = expect.arrayContaining([
      expect.objectContaining({
        _id: "5ffa1ca4676ab01cdd4eb4f7",
        category: "normal",
        color: "#3498DB",
      }),
    ]);

    nock(COLOR_API_URL)
      .get("/colors")
      .reply(200, [
        {
          _id: "5ffa1ca4676ab01cdd4eb4f5",
          category: "fighting",
          color: "#ECF0F1",
        },
        {
          _id: "5ffa1ca4676ab01cdd4eb4f6",
          category: "flying",
          color: "#2E86C1",
        },
        {
          _id: "5ffa1ca4676ab01cdd4eb4f7",
          category: "normal",
          color: "#3498DB",
        },
      ]);

    const response = await colorAPI.listAllcolors();
    expect(response).toEqual(expectedResult);
  });

  test("Should return error in getColorByCategory", async () => {
    const mockCategory = "bbb";
    const expectedResult = { message: "500: Internal Server Error" };

    nock(COLOR_API_URL)
      .get("/colors")
      .query({ category: mockCategory })
      .reply(500, expectedResult);

    await expect(colorAPI.getColorByCategory(mockCategory)).rejects.toThrow(
      expectedResult
    );
  });

  test("Should return color by category", async () => {
    const mockCategory = "fighting";
    const expectedResult = expect.arrayContaining([
      expect.objectContaining({
        _id: "5ffa1ca4676ab01cdd4eb4f5",
        category: "fighting",
        color: "#ECF0F1",
      }),
    ]);

    nock(COLOR_API_URL)
      .get("/colors")
      .query({ category: mockCategory })
      .reply(200, [
        {
          _id: "5ffa1ca4676ab01cdd4eb4f5",
          category: "fighting",
          color: "#ECF0F1",
        },
      ]);

    const response = await colorAPI.getColorByCategory(mockCategory);
    expect(response).toEqual(expectedResult);
  });

  test("Should return category not found", async () => {
    const mockCategory = "bbb";
    const mockResult = { message: "404: Not Found" };

    nock(COLOR_API_URL)
      .get("/colors")
      .query({ category: mockCategory })
      .reply(404, mockResult);

    await expect(colorAPI.getColorByCategory(mockCategory)).rejects.toThrow();
  });
});
