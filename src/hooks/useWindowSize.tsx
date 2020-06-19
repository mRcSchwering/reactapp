import { useState, useEffect } from "react";

type WindowSizeType = {
  width: number | undefined;
  height: number | undefined;
};

/**
 * Get current client window size
 */
export default function useWindowSize(): WindowSizeType {
  const isClient = typeof window === "object";

  function getSize(): WindowSizeType {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize); // add listener
    return () => window.removeEventListener("resize", handleResize); // clean up
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
