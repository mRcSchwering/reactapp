import React from "react";
import { get } from "../requests";

type HackerNewsDataType = {
  id: number;
  title: string;
  type: string;
  url: string;
  time: number;
  by: string;
  descendants?: number;
  kids?: number[];
  score?: number;
};

type FetchDataType<T> = {
  data: null | T;
  error: null | string;
  loading: boolean;
};

/**
 * Fetch data by GET and return parsed data, error, loading
 * reacts immediately on URL
 * @param url full URL to GET
 */
export function useFetchData(url: string): FetchDataType<any> {
  const [state, setState] = React.useState({
    data: null,
    error: null,
    loading: false,
  });

  React.useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    get(url)
      .then((response) => response.json())
      .then((json) => {
        setState((state) => ({ ...state, data: json, loading: false }));
      })
      .catch((err) => {
        console.error("Loading data failed: " + err);
        setState((state) => ({ ...state, error: err, loading: false }));
      });
  }, [url]);

  return state;
}

/**
 * Query https://hacker-news.firebaseio.com/v0/item/
 * @param queryId item id to query
 */
export function useFetchHackerNewsData(
  queryId: number
): FetchDataType<HackerNewsDataType> {
  const url = "https://hacker-news.firebaseio.com/v0/item/";
  return useFetchData(`${url}${queryId}.json?print=pretty`);
}
