import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

const app = express();

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.client.js").map((config: any) => {
    config.output.path = config.output.path.replace("dist/dist/", "dist/");
    return config;
  });

  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig[0].output.publicPath,
      writeToDisk: true,
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get("*", (req, res) => {
  const nodeStats = path.resolve(__dirname, "./node/loadable-stats.json");
  const webStats = path.resolve(__dirname, "./web/loadable-stats.json");
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const context = {};

  const jsx = (
    <ChunkExtractorManager extractor={webExtractor}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const html = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  res.set("content-type", "text/html");

  const createPage = (tags: {
    scripts: string;
    links: string;
    styles: string;
  }) => {
    const { scripts, links, styles } = tags;
    return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
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
  };

  const tags = {
    scripts: webExtractor.getScriptTags(),
    links: webExtractor.getLinkTags(),
    styles: webExtractor.getStyleTags(),
  };
  res.send(createPage(tags));
});

app.listen(3003, () => console.log("Server started http://localhost:3003"));
