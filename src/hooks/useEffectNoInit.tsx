import React from "react";

/**
 * Like React.useEffect but it is not executed on initial render.
 *
 * @param fn useEffect function
 * @param deps useEffect dependencies
 */
export default function useEffectNoInit(fn: () => void, deps: any[]) {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, [deps, fn]);
}
