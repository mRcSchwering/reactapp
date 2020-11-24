import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFetchData } from "../hooks/useFetchData";
jest.useFakeTimers();

jest.mock("../modules/requests", () => ({
  get: (url) => {
    if (url === "init") return new Promise(() => {});
    if (url === "data") return Promise.resolve("mydata");
    if (url === "error") return Promise.reject(42);
    if (url === "dataAfter1s") {
      return new Promise((resolve) =>
        setTimeout(() => resolve("mydata"), 1000)
      );
    }
    if (url === "errorAfter1s") {
      return new Promise((resolve, reject) =>
        setTimeout(() => reject(42), 1000)
      );
    }
  },
}));

/**
 * Component for testing hooks
 */
function testHook(callback) {
  const TestHook = ({ callback }) => {
    callback();
    return null;
  };
  render(<TestHook callback={callback} />);
}

/**
 * Initial state with unresolved promise is "loading"
 */
test("has an instant loading state", async () => {
  let resp: any = { loading: null, error: null, data: null };

  testHook(() => {
    resp = useFetchData("init");
  });
  expect(resp.loading).toBe(true);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe(null);
});

/**
 * The other states fulfill promise.
 * They need to be wrapped in async act().
 */
test("has data and error states", async () => {
  let resp: any = { loading: null, error: null, data: null };

  await act(async () => {
    testHook(() => {
      resp = useFetchData("data");
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

/**
 * Here, I try to use fake timeouts to imitate
 * the switch from the initial "loading" state
 * to the "data" state
 */
test("updates loading state with data state", async () => {
  let resp: any = { loading: null, error: null, data: null };

  await act(async () => {
    testHook(() => {
      resp = useFetchData("dataAfter1s");
      jest.advanceTimersByTime(10);
    });
  });

  expect(resp.loading).toBe(true);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe(null);

  await act(async () => {
    testHook(() => {
      resp = useFetchData("dataAfter1s");
      jest.advanceTimersByTime(1000);
    });
  });

  expect(resp.loading).toBe(false);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe("mydata");
});

/**
 * Here, I try to use fake timeouts to imitate
 * the switch from the initial "loading" state
 * to the "error" state
 */
test("updates loading state with error state", async () => {
  let resp: any = { loading: null, error: null, data: null };

  await act(async () => {
    testHook(() => {
      resp = useFetchData("errorAfter1s");
      jest.advanceTimersByTime(10);
    });
  });

  expect(resp.loading).toBe(true);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe(null);

  await act(async () => {
    testHook(() => {
      resp = useFetchData("errorAfter1s");
      jest.advanceTimersByTime(1000);
    });
  });

  expect(resp.loading).toBe(false);
  expect(resp.error).toBe(42);
  expect(resp.data).toBe(null);
});

/**
 * Here, I have to add a button to interatively switch
 * from the "error" state to the "data" state.
 * I want to test that because earlier I had a bug that after
 * going into the "error" state, the hook did not set back error
 * to null when going into the "data" state.
 */
test("switches from error state to data state", async () => {
  let resp: any = { loading: null, error: null, data: null };

  const TestHook = () => {
    const [url, setUrl] = React.useState("error");
    resp = useFetchData(url);
    return <button onClick={() => setUrl("data")}></button>;
  };

  await act(async () => {
    render(<TestHook />);
  });

  await act(async () => {
    const button = screen.getByRole("button");
    userEvent.click(button);
  });

  expect(resp.loading).toBe(false);
  expect(resp.error).toBe(null);
  expect(resp.data).toBe("mydata");
});
