import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useFetchData } from "../hooks/useFetchData";

jest.mock("../requests", () => ({
  get: (url) => {
    if (url === "init") return new Promise(() => {});
    if (url === "resolve") return Promise.resolve("mydata");
    if (url === "error") return Promise.reject(42);
  },
}));

function testHook(callback) {
  const TestHook = ({ callback }) => {
    callback();
    return null;
  };
  render(<TestHook callback={callback} />);
}

it("has loading, data, and error states", async () => {
  let resp: any = { loading: null, error: null, data: null };

  testHook(() => {
    resp = useFetchData("init");
  });
  expect(resp.loading).toBe(true);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe(null);

  await act(async () => {
    testHook(() => {
      resp = useFetchData("resolve");
    });
  });
  expect(resp.loading).toBe(false);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe("mydata");

  await act(async () => {
    testHook(() => {
      resp = useFetchData("error");
    });
  });
  expect(resp.loading).toBe(false);
  expect(resp.error).toBe(42);
  expect(resp.data).toBe(null);
});
