import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import successImage from '../../assets/success.jpg';
import './Profile.css'

function SuccessModal(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
    const timer = setTimeout(() => {
      setShow(false);
      props.onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [props.show]);

  return (
    <Modal show={show} onHide={props.onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <div className="centered-image">
        <img src={successImage} alt="Success" width="100" height="100" className="centered-image"/>
        <p>{props.response}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessModal;