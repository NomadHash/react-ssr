import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import todoReducer from './todo';

declare global {
  interface Window {
    __APP_INITIAL_STATE__: object;
  }
}

export const createStore = (initialState?: unknown) =>
  configureStore({
    reducer: {
      counter: counterReducer,
      todo: todoReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: initialState ? process.env.NODE_ENV === 'development' : null,
    preloadedState: initialState,
  });
