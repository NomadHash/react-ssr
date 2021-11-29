import axios from 'axios';
import { ITodo } from '@src/store/todo';

export const getTodo = async (): Promise<ITodo[]> => {
  const endPoint = 'http://localhost:3001/todo';
  const { data }: { data: ITodo[] } = await axios.get(endPoint);
  return data;
};
