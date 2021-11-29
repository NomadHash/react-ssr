import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import counterReducer from './counter';
import todoReducer from './todo';

export const createStore = (initialState?: unknown) =>
  configureStore({
    reducer: {
      counter: counterReducer,
      todo: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: initialState,
  });
