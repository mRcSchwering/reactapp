import React from "react";
import { Button } from "react-bootstrap";
import { ErrorModalContext } from "../components/ErrorModalContext";

export default function TestTriggersPage() {
  const { showErrorModal } = React.useContext(ErrorModalContext);

  function handleButtonClick() {
    showErrorModal("triggered by button on test page");
  }

  return (
    <div>
      <h2>Test Triggers Page</h2>
      <p>Manually triggering some events.</p>
      <Button onClick={handleButtonClick}>show global error modal</Button>
    </div>
  );
}
