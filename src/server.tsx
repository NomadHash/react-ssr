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

import { store } from './store/index';
import routes from './routes';

const app = express();

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
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
  const webStats = path.resolve(__dirname, './web/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const context = {};
  // eslint-disable-next-line no-undef

  const promises = routes.reduce((actions, route: any) => {
    const requestInfo = matchPath(req.url, route.path);
    if (requestInfo && route.component && route.getInitialData) {
      actions.push(Promise.resolve(store.dispatch(route.getInitialData())));
    }
    return actions;
  }, []);

  Promise.all(promises).then(() => {
    res.set('content-type', 'text/html');
    const jsx = (
      <ChunkExtractorManager extractor={webExtractor}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </ChunkExtractorManager>
    );

    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();

    const createPage = (tags: { scripts: string; links: string; styles: string }) => {
      const { scripts, links, styles } = tags;
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
      const finalState = store.getState();
      const finalHtml = initialHtml.replace(
        '<!--initialState-->',
        `window.__APP_INITIAL_STATE__ = ${serialize(finalState)};`,
      );
      return finalHtml;
    };

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
