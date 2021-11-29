import CounterPage from '@src/pages/CounterPage';
import TodoListPage from '@src/pages/TodoListPage';
import { fetchTodo } from '@src/store/todo';

export default [
  {
    path: '/counter',
    component: CounterPage,
    exact: true,
  },
  {
    path: '/todo',
    component: TodoListPage,
    exact: true,
    getInitialData: () => {
      return fetchTodo();
    },
  },
];
