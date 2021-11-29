import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { fetchTodo, selectTodo } from '@src/store/todo';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TodoListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(selectTodo);

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTodo());
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>TodoListPage</title>
      </Helmet>
      <h1>Todo page</h1>
      <ul>
        {todos.map(({ id, title, content }) => (
          <li key={id}>
            <header>
              ID : {id} | {title}
            </header>
            <div>{content}</div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListPage;
