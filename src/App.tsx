import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';

const Header = loadable(() => import(/* webpackChunkName: "Header" */ './components/Header'));
const Home = loadable(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const CounterPage = loadable(() => import(/* webpackChunkName: "Counter" */ './pages/CounterPage'));
const TodoListPage = loadable(() => import(/* webpackChunkName: "TodoList" */ './pages/TodoListPage'));

const App: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      <Route path="/" render={() => <Header />} />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/counter" render={() => <CounterPage />} />
        <Route path="/todo" render={() => <TodoListPage />} />
      </Switch>
    </div>
  );
};

export default App;
