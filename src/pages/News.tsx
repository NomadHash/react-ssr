/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import TestComponent from '@src/components/TestComponent';
import { Helmet } from 'react-helmet';

const style = css`
  color: hotpink;
`;

const News = () => (
  <div>
    <Helmet>
      <title>News</title>
    </Helmet>
    <h1 css={style}>News</h1>
    <TestComponent />
  </div>
);

export default News;
