/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { Helmet } from "react-helmet";

const style = css`
  color: hotpink;
`;

const News = () => (
  <div>
    <Helmet>
      <title>News</title>
    </Helmet>
    <h1 css={style}>Ne</h1>
  </div>
);

export default News;
