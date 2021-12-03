import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@assets/styles/theme-components';
import GlobalStyle from '@assets/styles/GlobalStyle';
import { createStore } from './store';
import theme from '@assets/styles/theme';
import App from './App';

const store = createStore(window.__APP_INITIAL_STATE__);
delete window.__APP_INITIAL_STATE__;
loadableReady(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
