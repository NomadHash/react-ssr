import ReactDOM, { hydrate } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import App from "./App";

loadableReady(() => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}
