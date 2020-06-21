import React from "react";
import { ErrorModalContext } from "../components/ErrorModalContext";
import { Button } from "react-bootstrap";

export default function HomePage() {
  const { showErrorModal } = React.useContext(ErrorModalContext);

  function handleButtonClick() {
    showErrorModal("button was clicked");
  }

  return (
    <div>
      <h2>Home Page</h2>
      <h4>Response</h4>
      <p>ErrorModal context is mounted in App.tsx.</p>
      <Button onClick={handleButtonClick}>show error modal</Button>
    </div>
  );
}
