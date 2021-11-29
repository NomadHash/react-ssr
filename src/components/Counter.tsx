import { decrement, increment, selectCount } from '@src/store/counter';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import React from 'react';

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <h2>
        The current number is
        {count}
      </h2>
      <div>
        <button type="button" onClick={() => dispatch(decrement())}>
          Decrement by 1
        </button>
        <button type="button" onClick={() => dispatch(increment())}>
          Increment by 1
        </button>
      </div>
    </>
  );
};

export default Counter;
