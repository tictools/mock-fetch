import http from ".";

const POST_RESPONSE = {
  userId: 1,
  id: 1,
  title: "Post 1 title",
  body: "Post 1 body",
};

const EXPECTED_RESOLVED_RESULT = {
  userId: 1,
  id: 1,
  title: "Post 1 title",
  body: "Post 1 body",
};

const EXPECTED_REJECTED_RESULT = {
  data: null,
  error: { message: "API failure", name: "Error" },
};

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(RESPONSE),
//   })
// );

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    // json: jest.fn().mockResolvedValue(RESPONSE),
    // json: jest.fn(() => Promise.resolve(RESPONSE)),
    json: () => Promise.resolve(POST_RESPONSE),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("given a request", () => {
  test("when Promise is resolved then expected response should be returned", async () => {
    const data = await http.fetchRequest();
    expect(data).toEqual(EXPECTED_RESOLVED_RESULT);
  });

  test("when Promise is rejected then expected response should be returned", async () => {
    jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("API failure"));

    const data = await http.fetchRequest();
    expect(data).toEqual(EXPECTED_REJECTED_RESULT);
  });
});
