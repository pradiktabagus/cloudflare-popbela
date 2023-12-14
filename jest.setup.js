/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line import/extensions
import { server } from './src/utils/testing';

// butuh untuk test react-slick dan responsive
window.matchMedia =
  window.matchMedia ||
  function match() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
