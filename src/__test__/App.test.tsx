import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it.each`
  title
  ${"Home"}
  ${"Test"}
  ${"Requests"}
`("renders navbar link $title", ({ title }) => {
  render(<App />);
  console.log(title);
  const linkElement = screen.getByText(title);
  expect(linkElement).toBeInTheDocument();
});
