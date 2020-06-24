import { getResultElement } from "../pages/RequestsPage";

it("shows loading fragment", () => {
  const data = { loading: true, error: null, data: null };
  const res = getResultElement(data);
  expect(res).toMatchSnapshot();
});

it("shows error fragment", () => {
  const data = { loading: false, error: "test error", data: null };
  const res = getResultElement(data);
  expect(res).toMatchSnapshot();
});

it("shows data fragment", () => {
  const data = { loading: false, error: null, data: { a: [1, 2] } };
  const res = getResultElement(data);
  expect(res).toMatchSnapshot();
});
