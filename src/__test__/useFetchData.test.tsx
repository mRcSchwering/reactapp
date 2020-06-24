import React from "react";
import { render, act } from "@testing-library/react";
import { useFetchData } from "../hooks/useFetchData";

jest.mock("../requests", () => ({
  get: () => Promise.resolve({ a: [1, 2] }),
}));

// TODO: this doesnt work, need testing component for hook
function setup(): any {
  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useFetchData("aUrl"));
    return null;
  }
  render(<TestComponent />);
  return returnVal;
}

it("asd", () => {
  act(() => {
    const { data } = setup();
    expect(data).toEqual({ a: [1, 2] });
  });
});
