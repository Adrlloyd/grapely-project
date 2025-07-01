// Global test setup
// Suppress console.error for cleaner test output
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterEach(() => {
  jest.restoreAllMocks();
}); 