import React from "react";

type FetchDataType<T> = {
  data: null | T;
  error: null | string;
  loading: boolean;
};

export type FetchDummyDataType = FetchDataType<string[]>;

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
export function useDummyFetch(keyword: string): FetchDummyDataType {
  const firstRender = React.useRef(true);
  const [state, setState] = React.useState({
    data: null as null | string[],
    error: null as null | string,
    loading: false,
  });

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
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
