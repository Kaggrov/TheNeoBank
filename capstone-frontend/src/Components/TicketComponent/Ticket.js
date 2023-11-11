import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "../../Services/axios";
import { useSelector } from "react-redux";

import "./Ticket.css";

const Ticket = ({ ticketId, status, subject, description, messages }) => {
  const user = useSelector((state) => state.userReducer.user);

  const [show, setShow] = useState(false);
  const [val, setVal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReply = () => {
    messages.push(val);
    const payLoad = {
      ticketId:ticketId,
      status:status,
      subject:subject,
      description:description,
      messages:messages
    }
    console.log(payLoad);

    axios.put("tickets/"+user.customerId,payLoad).then(()=>{
      console.log("Tickets Updated Successfully");
    })
    
    setVal("");
  };
  return (
    <div className="ticket_list_container">
      <div className="ticket_1">
        <div style={{ fontSize: "14px", color: "grey", fontWeight: "400" }}>
          {ticketId}
        </div>
        <div>
          <Badge pill bg="warning" text="dark">
            {status}
          </Badge>
        </div>
      </div>
      <div className="ticket_2">
        <div style={{}} className="ticket_2_description">
          {subject}
        </div>
        <div style={{ cursor: "pointer" }} onClick={handleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat-left-dots"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conversations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:'center',fontSize:'16px',color:'purple',fontWeight:'500'}}>Description</div>
          <div style={{fontSize:'13px',fontWeight:'400'}}>{description}</div>
          <div className="message_body">
            {messages.map((val) => {
              return <div className="message_container">{val}</div>;
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <FloatingLabel
            controlId="floatingInput"
            label="Reply..."
            style={{ width: "100%" }}
          >
            <Form.Control
              type="text"
              placeholder="Enter your reply"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="primary" onClick={() => handleReply()}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Ticket;
