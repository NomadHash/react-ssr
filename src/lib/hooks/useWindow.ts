import { useEffect, useState } from 'react';

function useWindow() {
  const [isWindow, setIsWindow] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWindow(true);
    }
  }, []);
  return { isWindow };
}

export default useWindow;
