import React from 'react';
import CounterPage from '@src/pages/CounterPage';
import TodoListPage from '@src/pages/TodoListPage';
import { fetchTodo } from '@src/store/todo';
import { AsyncThunkAction } from '@reduxjs/toolkit';

interface IRoute {
  path: string;
  component: React.FC;
  exact: boolean;
  getInitialData?: (params?: unknown) => AsyncThunkAction<
    unknown,
    unknown,
    {
      rejectValue: string;
    }
  >;
}

export const routes: IRoute[] = [
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
