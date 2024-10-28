beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ data: "mocked data" })
  });
});

afterEach(() => {
  jest.clearAllMocks();
});