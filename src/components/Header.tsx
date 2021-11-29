import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/counter">CounterPage</Link>
    <Link to="/todo">TodoListPage</Link>
  </header>
);

export default Header;
