import React from "react";

type FetchDataType<T> = {
  data: null | T;
  error: null | string;
  loading: boolean;
};

/**
 * Async sleep in milli seconds
 */
function sleep(ms: number): Promise<NodeJS.Timeout> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Dummy fetch hook that waits a second and then returns
 * data, error, loading - where data is a list of string
 * reports and error is the keyword string is greater 10
 */
export function useDummyFetch(keyword: string): FetchDataType<string[]> {
  /**
   * TODO: trying to use firstRender to avoid initial fetch, but the ref is not persisted
   * supposed to work like this: https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
   * I should make a minimal example
   */
  const firstRender = React.useRef(true);
  const [state, setState] = React.useState({
    data: null as null | string[],
    error: null as null | string,
    loading: false,
  });

  React.useEffect(() => {
    if (firstRender) {
      console.log("first render");
      firstRender.current = false;
    } else {
      console.log("at least second render");
      setState((state) => ({ ...state, loading: true }));
      sleep(1000).then(() => {
        if (keyword.length <= 10) {
          setState({
            data:
              keyword.length < 3
                ? [keyword]
                : [keyword.slice(0), keyword.slice(1), keyword.slice(2)],
            loading: false,
            error: null,
          });
        } else {
          console.error("Loading data failed: length > 10");
          setState((state) => ({
            ...state,
            error: "length > 10",
            loading: false,
          }));
        }
      });
    }
  }, [keyword]);
  return state;
}
