/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable react/display-name */
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import * as React from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

export const renderWithRouterContext = (
  Component: React.ReactNode,
  router: any,
  ags: any
) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <RouterContext.Provider value={router}>
      <QueryClientProvider client={testQueryClient}>
        {Component}
      </QueryClientProvider>
    </RouterContext.Provider>,
    { ...ags }
  );
  return {
    ...result,
    rerender: (rerenderUI: React.ReactNode) => {
      rerender(
        <RouterContext.Provider value={router}>
          <QueryClientProvider client={testQueryClient}>
            {rerenderUI}
          </QueryClientProvider>
        </RouterContext.Provider>
      );
    },
  };
};

export * from './server';
