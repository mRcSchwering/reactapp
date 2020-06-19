import React from "react";
import { Modal, Button } from "react-bootstrap";

type ErrorModalPropsType = {
  show: boolean;
  message: string;
  handleClose: () => void;
};

function ErrorModal(props: ErrorModalPropsType) {
  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>The Error Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        It's not you.... it's us! <br />
        {props.message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

type ErrorModalContextType = {
  showErrorModal: (msg: string) => void;
};

const defaultContext = {
  showErrorModal: () => {},
};

export const ErrorModalContext = React.createContext<ErrorModalContextType>(
  defaultContext
);

type ErrorModalContextProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides function for popping up error modal with message
 * @param props only children props
 */
export function ErrorModalContextProvider(
  props: ErrorModalContextProviderProps
) {
  const [state, setState] = React.useState({ show: false, message: "" });

  function showModal(msg: string) {
    setState((state) => ({ ...state, show: true, message: msg }));
  }

  function hideModal() {
    setState((state) => ({ ...state, show: false, message: "" }));
  }

  return (
    <ErrorModalContext.Provider value={{ showErrorModal: showModal }}>
      {props.children}
      <ErrorModal
        show={state.show}
        message={state.message}
        handleClose={hideModal}
      />
    </ErrorModalContext.Provider>
  );
}
