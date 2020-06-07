import { useState, useEffect } from 'react';


interface IWindowSize {
    width: number | undefined;
    height: number | undefined;
}


/**
 * Get current client window size
 */
export default function useWindowSize(): IWindowSize {
  const isClient = typeof window === 'object';

  function getSize(): IWindowSize {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize); // add listener
    return () => window.removeEventListener('resize', handleResize); // clean up
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
