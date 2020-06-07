import React from 'react';
import { useGlobal } from 'reactn';
import { Modal, Button } from 'react-bootstrap';


/**
 * Error modal listening to global state "errorModal"
 */
export default function ErrorModal() {
    const [errorModal, setErrorModal] = useGlobal('errorModal');
    const handleClose = () => setErrorModal({show: false, message: ''});

    return (
        <Modal show={errorModal.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>The Error Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                It's not you.... it's us! <br/>
                {errorModal.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
      </Modal>
    );
}