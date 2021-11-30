import axios from 'axios';

function useFetch<T = unknown, U = unknown>(
  rejectWithValue: (value: string) => void,
  endPoint: string,
  httpRequestType: 'get' | 'post' | 'put' | 'delete',
  requestData?: U,
): Promise<T | any> {
  return (async (): Promise<T | any> => {
    const urlEndPoint = `http://localhost:3001/3${endPoint}`;
    try {
      const { data }: { data: T } = await axios[httpRequestType](urlEndPoint, requestData || null);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  })();
}

export default useFetch;
