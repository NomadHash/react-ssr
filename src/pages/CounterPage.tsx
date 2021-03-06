import React from 'react';
import Counter from '@components/Counter';
import Footer from '@components/Footer';
import { Helmet } from 'react-helmet';

const CounterPage: React.FC = () => (
  <>
    <div>
      <Helmet>
        <title>CounterPage</title>
      </Helmet>
      <h1>CounterPage</h1>
      <Counter />
    </div>
    <Footer />
  </>
);

export default CounterPage;
