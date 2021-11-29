/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as todoApi from '@src/store/todo/todoApi';
import type { RootState } from '../index';

export interface ITodo {
  id: number;
  title: string;
  content: string;
}

export interface ITodoState {
  todos: ITodo[];
  error: string | undefined;
  loading: boolean;
}

const initialState: ITodoState = {
  todos: [],
  error: '',
  loading: false,
};

const prefix = 'todo';

export const fetchTodo = createAsyncThunk<
  ITodo[],
  void,
  {
    rejectValue: string;
  }
>(`${prefix}/fetchTodo`, async (_arg, { rejectWithValue }) => {
  try {
    return await todoApi.getTodo();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(fetchTodo.rejected, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    });
  },
});

export const selectTodo = (state: RootState) => state.todo;
export default todoSlice.reducer;
