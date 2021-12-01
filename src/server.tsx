/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import GlobalStyle from '@src/assets/styles/GlobalStyle';
import theme from '@src/assets/styles/theme';
import { createStore } from './store/index';
import { routes } from './routes';

const app = express();

//* On development
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js').map((config: any) => {
    config.output.path = config.output.path.replace('dist/dist/', 'dist/');
    return config;
  });

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig[0].output.publicPath,
      writeToDisk: true,
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));
app.get('*', (req, res) => {
  //* Setup Chunks
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const context = {};

  //* Create new redux store.
  const store = createStore();

  //* Find the getInitialData(server-side fetching) method on every route path. and create Promise Array
  const promises = routes.reduce((actions, route) => {
    const isCurrentPath = matchPath(req.url, route.path);

    if (isCurrentPath && route.component && route.getInitialData) {
      actions.push(Promise.resolve(store.dispatch(route.getInitialData())));
    }
    return actions;
  }, []);

  //* Create page after 'Promise.all'
  Promise.all(promises).then(() => {
    res.set('content-type', 'text/html');
    const jsx = (
      <ChunkExtractorManager extractor={webExtractor}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </StaticRouter>
        </Provider>
      </ChunkExtractorManager>
    );
    //* Create new Styled-components style sheet
    const sheet = new ServerStyleSheet();
    //* JSX to string.
    const html = renderToString(sheet.collectStyles(jsx));
    const helmet = Helmet.renderStatic();

    //* */ Get all style tags from ServerStyleSheet (styled-components)
    const styles = sheet.getStyleTags();

    //* Create HTML page
    const createPage = (tags: { scripts: string; links: string }) => {
      const { scripts, links } = tags;
      const initialHtml = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
           <script><!--initialState--></script>
          ${helmet.title.toString()}
          ${links}
          ${styles}
          </head>
        <body>
          <div id="root">${html}</div>
          ${scripts}
        </body>
      </html>
  `;

      //*  Passing the server's redux store state to the client
      const finalState = store.getState();
      const finalHtml = initialHtml.replace(
        '<!--initialState-->',
        `window.__APP_INITIAL_STATE__ = ${serialize(finalState)};`,
      );
      return finalHtml;
    };

    //* Chunks from webExtractor (@loadable/server)
    const tags = {
      scripts: webExtractor.getScriptTags(),
      links: webExtractor.getLinkTags(),
      styles: webExtractor.getStyleTags(),
    };

    res.send(createPage(tags));
  });
});

// eslint-disable-next-line no-console
app.listen(3003, () => console.log('Server started http://localhost:3003'));
