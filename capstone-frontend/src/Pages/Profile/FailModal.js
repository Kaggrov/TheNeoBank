import React, { useState, useEffect } from 'react';
import failedImage from '../../assets/failed.jpg';
import Modal from 'react-bootstrap/Modal';

function FailModal(props) {
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
        <Modal.Title>Invalid OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body >
      <div className="centered-image">
        <img src={failedImage} alt="fail" width="100" height="100" className="centered-image"/>
       
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FailModal
