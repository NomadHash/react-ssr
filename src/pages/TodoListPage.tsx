import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchTodo, selectTodo } from '@store/todo';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TodoListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(selectTodo);

  useEffect(() => {
    console.log(todos);
    console.log('change!');
    if (!todos.length) {
      dispatch(fetchTodo());
    }
  }, [todos]);

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
