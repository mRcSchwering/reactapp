import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test.each`
  title
  ${"test"}
  ${"upload"}
  ${"login"}
`("App renders navbar link $title", ({ title }) => {
  render(<App />);
  const linkElement = screen.getByText(title);
  expect(linkElement).toBeInTheDocument();
});
