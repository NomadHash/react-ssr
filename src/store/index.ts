import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import counterReducer from '@store/counter';
import todoReducer from '@store/todo';

const createStoreConfigure = (initialState: unknown) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const config = {
    reducer: {
      counter: counterReducer,
      todo: todoReducer,
    },
    devTools: isDevelopment,
    preloadedState: initialState,
  };

  const middleware = {
    middleware: (getDefaultMiddleware: () => MiddlewareArray<any>) => getDefaultMiddleware().concat(logger),
  };

  if (isDevelopment) {
    return { ...config, ...middleware };
  }
  return config;
};

export const createStore = (initialState?: unknown) => configureStore(createStoreConfigure(initialState));
