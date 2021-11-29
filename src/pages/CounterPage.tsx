/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import Counter from '@src/components/Counter';
import Footer from '@src/components/Footer';
import { Helmet } from 'react-helmet';

const style = css`
  color: hotpink;
`;

const CounterPage = () => (
  <>
    <div>
      <Helmet>
        <title>CounterPage</title>
      </Helmet>
      <h1 css={style}>CounterPage</h1>
      <Counter />
    </div>
    <Footer />
  </>
);

export default CounterPage;
