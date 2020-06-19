import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFetchHackerNewsData } from "../hooks/useFetchData";
import { ErrorModalContext } from "../components/ErrorModalContext";

export default function HomePage() {
  const { showErrorModal } = React.useContext(ErrorModalContext);
  const [query, setQuery] = React.useState(8863);
  const resp = useFetchHackerNewsData(query);

  function handleInputChange(value: string) {
    setQuery(parseInt(value, 10));
  }

  function handleButtonClick() {
    showErrorModal("button was clicked");
  }

  if (resp.loading) {
    return <div>Loading....</div>;
  }

  if (resp.error) {
    showErrorModal("loading error");
  }

  return (
    <div>
      <h2>Home Page</h2>
      <h4>Response</h4>
      <div style={{ width: "200px", margin: "auto" }}>
        <Form.Control
          type="number"
          value={query}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
        />
      </div>
      <div>{JSON.stringify(resp.data)}</div>
      <Button onClick={handleButtonClick}>show error modal</Button>
    </div>
  );
}
