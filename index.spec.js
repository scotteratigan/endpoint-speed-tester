const fastestUrl = require("./index");
jest.mock("node-fetch");
const fetch = require("node-fetch");

const url1 = "https://news.ycombinator.com/";
const url2 = "https://www.twitter.com";
const url3 = "https://www.reddit.com";

beforeEach(() => {
  jest.clearAllMocks();
});

test("it should attempt to ping each endpoint", async () => {
  fetch.mockReturnValue(Promise.resolve({ status: 200 }));
  await fastestUrl([url1, url2, url3], 0);
  expect(fetch).toHaveBeenCalledTimes(3);
  expect(fetch).toHaveBeenCalledWith(url1);
  expect(fetch).toHaveBeenCalledWith(url2);
  expect(fetch).toHaveBeenCalledWith(url3);
});

test("it should return the fastest url", async () => {
  // mock the fetch so that the last value passed should resolve the fastest
  let delay = 10;
  fetch.mockImplementation(() => {
    delay -= 1;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200 });
      }, delay * 100);
    });
  });
  const { url: fastUrl } = await fastestUrl([url1, url2]);
  expect(fastUrl).toBe(url2);
});

test("it should return first url in case all requests timeout", async () => {
  fetch.mockReturnValue(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200 });
      }, 6000);
    })
  );
  const { url: fastUrl } = await fastestUrl([url1, url2, url3], 100);
  expect(fastUrl).toBe(url1);
});
