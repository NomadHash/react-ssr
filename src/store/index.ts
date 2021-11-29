import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from './counter';
import todoReducer from './todo';

declare global {
  interface Window {
    __APP_INITIAL_STATE__: object;
  }
}

let initialStateFromServer = {};
if (typeof window !== 'undefined') {
  initialStateFromServer = window.__APP_INITIAL_STATE__;
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: initialStateFromServer ? process.env.NODE_ENV === 'development' : null,
  preloadedState: initialStateFromServer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
