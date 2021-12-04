import axios from 'axios';

function useFetch<T1, T2>(
  rejectWithValue: (value: string) => void,
  endPoint: string,
  httpRequestType: 'get' | 'post' | 'put' | 'delete',
  requestData?: T2,
): Promise<T1 | any> {
  return (async (): Promise<T1 | any> => {
    const urlEndPoint = `${process.env.DEVELOPMENT_HOST}${endPoint}`;
    try {
      const { data }: { data: T1 } = await axios[httpRequestType](urlEndPoint, requestData || null);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  })();
}

export default useFetch;
