import React, { useEffect, useState } from "react";
import BackButton from "../../Components/BackButton/BackButton";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Ticket from "../../Components/TicketComponent/Ticket";
import Result from "../../Components/ResultModal/Result";
import Accordion from "react-bootstrap/Accordion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "../../Services/axios";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import "./Support.css";
const Support = () => {
  const user = useSelector((state) => state.userReducer.user);

  const [validated, setValidated] = useState(false);
  const [tickets, setTickets] = useState([]);

  const [showResultModal, setShowResultModal] = useState(false);

  const toggleResultModal = () => {
    setShowResultModal(!showResultModal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      // Access form data as needed
      const category = formData.get("validationCustomDropdown");
      const subject = formData.get("validationCustom01");
      const description = formData.get("validationCustom02");
      const file = formData.get("validationCustomFile");
      const status = "open";
      const messages = [];
      const ticketId = uuid({ format: "integer" })
        .replace(/[^0-9]/g, "")
        .slice(0, 7)
        .padEnd(7, "0");

      formData.append("status", status);
      formData.append("messages", messages);
      formData.append("ticketId", ticketId);
      formData.append("file", file);
      formData.append("Category", category);
      formData.append("subject", subject);
      formData.append("description", description);
      console.log("form Data", {
        category,
        subject,
        description,
        file,
        ticketId,
      });
      axios
        .post("tickets/"+user.customerId, formData)
        .then(() => {
          console.log("Ticket Saved Succesfully");
          toggleResultModal();
          getUserTickets();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUserTickets = () => {
    axios.get("tickets/"+user.customerId).then((res) => {
      console.log(res.data);
      setTickets(res.data);
    })
    .catch((err)=>{
      console.log(err)
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["Id", "Title", "Issue", "Status"];

    const tableRows = [];

    tickets.forEach((ticket) => {
      const ticketData = [
        ticket.ticketId,
        ticket.subject,
        ticket.description,
        ticket.status,
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text("Submitted Support Tickets By User", 14, 15);
    doc.save(`report_${dateStr}.pdf`);
  };

  useEffect(() => {
    getUserTickets();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <BackButton />
        <div
          style={{
            color: "#5a287d !important",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Customer Support
        </div>
      </div>
      <div className="username">Hi {user?.customerName}</div>
      <div className="filler_box">
        <div className="filler_head"> Need Some Help ?</div>
        <div className="filler_content">
          *Our customer care executive will get back to you with a resolution
          within 24 hours.
        </div>
      </div>
      <div className="support_container">
        <div className="ticket_container">
          <div className="ticket_header">Create New Ticket</div>
          <div className="ticket_form">
            <Form noValidate validated={validated} onSubmit={handleSubmit} id="ticket_form">
              <Row className="mb-3">
                <Form.Group md="4" controlId="validationCustomDropdown">
                  <Form.Label>Select Issue Category</Form.Label>
                  <Form.Select required name="validationCustomDropdown">
                    <option value="">Select...</option>
                    <option value="option1">Fund & Payments</option>
                    <option value="option2">Debit Cards</option>
                    <option value="option3">Credits Card</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select an option.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Issue Subject"
                    name="validationCustom01"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Enter subject{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Label>Issue Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter detailed description about issue with correct explanation. "
                    name="validationCustom02"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Enter Detailed Description{" "}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustomFile">
                  <Form.Label>Choose a file</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    name="validationCustomFile"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a file.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button type="submit" id="ticketSubmit">Submit form</Button>
            </Form>
          </div>
        </div>

        <div className="history_container">
          <div className="history_header">My Tickets</div>
          <div className="history_data">
            <Card style={{ width: "100%" }}>
              <ListGroup variant="flush">
                {tickets.map((val) => {
                  return (
                    <ListGroup.Item className="list_item">
                      <Ticket
                        ticketId={val.ticketId}
                        status={val.status}
                        subject={val.subject}
                        messages={val.messages}
                        description={val.description}
                      />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
            <div className="report_container">
              <Button
                onClick={() => {
                  generatePDF();
                }}
              >
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_us">
        <div className="contact_header">Contact Us </div>
        <Row xs={1} md={2} lg={3} className="g-4" style={{ width: "100%" }}>
          <Col key={1}>
            <Card className="contact_card">
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope-at"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                  </svg>
                  Email{" "}
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Email us at abcd@gmail.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key={2}>
            <Card className="contact_card">
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone-inbound"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0zm-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                  Mobile{" "}
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Call us at +91 1133224411
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key={3}>
            <Card className="contact_card">
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  Twitter{" "}
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  Ping us @TheBank
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="faq">
        <div className="faq_header">Frequently Asked Questions</div>
        <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How Do I Set Up Online Banking for My Account?
            </Accordion.Header>
            <Accordion.Body>
              To set up online banking, visit our website or download our mobile
              app. Follow the registration process, which typically involves
              providing your account details and creating a username and
              password. Once registered, you can log in to access your account
              online.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              What Should I Do If I Forget My Online Banking Password?
            </Accordion.Header>
            <Accordion.Body>
              If you forget your password, click on the "Forgot Password" or
              "Reset Password" option on the login page. You will be prompted to
              verify your identity, often through security questions or a
              one-time verification code sent to your registered email or phone
              number.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How Can I Check My Account Balance Online?
            </Accordion.Header>
            <Accordion.Body>
              After logging in to your online banking account, you can usually
              find your account balance on the dashboard or account summary
              page. Additionally, you can view recent transactions and account
              statements in the app or website.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              What Should I Do If I Suspect Fraudulent Activity on My Account?
            </Accordion.Header>
            <Accordion.Body>
              If you suspect unauthorized or fraudulent activity on your
              account, contact our customer support immediately. They will guide
              you through the process of reporting and resolving the issue,
              which may involve freezing your account or initiating an
              investigation.{" "}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              How Can I Transfer Money Between My Accounts or to Another Person?
            </Accordion.Header>
            <Accordion.Body>
              To transfer money between your accounts or to another person, log
              in to your online banking account and navigate to the "Transfers"
              or "Payments" section. Follow the on-screen instructions to
              initiate the transfer, providing recipient details and the amount
              to be transferred.{" "}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              What Are the Security Measures in Place to Protect My Online
              Banking Information?
            </Accordion.Header>
            <Accordion.Body>
              We employ several security measures to protect your online banking
              information, including encryption, multi-factor authentication
              (MFA), and regular security audits. It's essential to keep your
              login credentials confidential, enable MFA when available, and log
              out of your account when finished.{" "}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Result
        title="Submission Successful"
        description="Your ticket has been submitted successfully."
        show={showResultModal}
        handleClose={toggleResultModal}
      />
    </div>
  );
};

export default Support;
