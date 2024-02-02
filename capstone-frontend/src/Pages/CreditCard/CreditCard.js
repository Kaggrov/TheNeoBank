import React, { useEffect, useState } from "react";
import BackButton from "../../Components/BackButton/BackButton";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import "./CreditCard.css";
import CardComponent from "../../Components/CardComponent/CardComponent";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import emptyScreen from "../../assets/empty.jpg";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "../../Services/axios";
import { useSelector } from "react-redux";
import Result from "../../Components/ResultModal/Result";
import Footer from "../../Components/Footer/Footer";

const CreditCard = () => {
  const user = useSelector((state) => state.userReducer.user);

  const [creditCardDetails, setCreditCardDetails] = useState({});
  const [cardTransactions, setCardTransactions] = useState([]);
  const [cardLinked,setCardLinked] = useState(false)
  const [show, setShow] = useState({
    transaction: false,
    rewards: false,
    pay: false,
    link: false,
  });

  const [accounts,setAccounts] =  useState([])

  const navigate = useNavigate();

  const [showResultModal, setShowResultModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleResultModal = () => {
    setShowResultModal(!showResultModal);
  };
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleCheck = (id) => {
    const newCardDetails = {
      ...creditCardDetails,
      preferences: {
        ...creditCardDetails.preferences,
        [id]: !creditCardDetails.preferences[id],
      },
    };
    setCreditCardDetails(newCardDetails);
    console.log(newCardDetails);
    axios.put("creditCards", newCardDetails).then((res) => {
      console.log(res.data);
    });
  };
  const updateBalance = (amount) => {
    const newCardDetails = {
      ...creditCardDetails,
      availableLimit: creditCardDetails.availableLimit - amount,
    };
    setCreditCardDetails(newCardDetails);
    console.log(newCardDetails);
    axios.put("creditCards", newCardDetails).then((res) => {
      console.log(res.data);
    });
  };
  const handleClose = (val) => {
    setShow((prev) => ({
      ...prev,
      [val]: false,
    }));
  };
  const handleShow = (val) => {
    setShow((prev) => ({
      ...prev,
      [val]: true,
    }));
  };

  const handleLinkCard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(accounts,formData.get("LinkAccounts"))
    const accountDetails = accounts.filter((res)=> res.accountId === parseInt(formData.get("LinkAccounts")))
    console.log(accountDetails)

    const linkDetails = {
      holderName: formData.get("Linkname"),
      cardNumber: formData.get("Linknumber"),
      expiry: formData.get("linkExpiry"),
      cvc: formData.get("linkCVC"),
      availableLimit: "50000",
      transactionalLimit: "50000",
      account:accountDetails[0],
      paymentDue: "18 Days",
      paymentCycle: " Oct - Nov 2023",
      preferences: {
        international: false,
        tap: false,
        block: false,
      },
    };

    axios?.post("creditCards/" + user.customerId, linkDetails).then((res) => {
      console.log(res.data);
      setCardLinked((prev)=>(!prev));
      handleClose("link");
      toggleAddModal()
    })
    .catch((err)=>{
      console.log(err);
    });
  };

  const getBankAccounts = () => {
    axios.get("/accounts/"+user.customerId).then((res)=>{
      setAccounts(res.data);
    })
  }

  const handlePayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const transactionDetails = {
      timeStamp: currentDate,
      transactionType: "creditCard",
      amount: formData.get("creditAmount"),
      account: creditCardDetails?.cardNumber,
      description: "Amount Debited ",
      receiver: {
        accountNumber: formData.get("payeeAccount"),
        payeeName: formData.get("payeeName"),
      },
    };
    console.log(transactionDetails);
    axios
      ?.post("transactions/" + user.customerId + "/-1", transactionDetails)
      .then((res) => {
        console.log(res.data);
        updateBalance(transactionDetails.amount);
        getCardTransactions();
        handleClose("pay");
        toggleResultModal();
      });
  };

  const getCardTransactions = () => {
    axios
      .get("transactions/creditCard/" + creditCardDetails?.cardNumber)
      .then((res) => {
        console.log(creditCardDetails?.cardNumber)
        console.log("Transactions", res.data);
        setCardTransactions(res.data);
      });
  };

  useEffect(() => {
    getBankAccounts();
    getCardTransactions();
  }, [creditCardDetails]);
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
          Credit Cards
        </div>
        <div style={{ margin: "10px", marginLeft: "auto", marginTop: "4px" }}>
          <Button variant="success" onClick={() => handleShow("link")}>
            Link Credit Card
          </Button>
        </div>
      </div>
      <div className="creditCardContainer">
        <div className="creditCardHeading">My Credit Cards</div>

        <CardComponent
          setCreditCardDetails={setCreditCardDetails}
          creditCardDetails={creditCardDetails}
          cardLinked={cardLinked}
        />
      </div>
      <div className="SummaryContainer">
        <div className="cardSummary">
          <div className="cardSummaryHeading">Card Details </div>
          <div className="cardSummaryBody">
            <div className="cardSummaryBody1">
              <div>Available Limit</div>
              <div>{creditCardDetails?.availableLimit}</div>
            </div>
            <div className="cardSummaryBody2">
              <div>Transactional Limit</div>
              <div>{creditCardDetails?.transactionalLimit}</div>
            </div>
            <div className="cardSummaryBody3">
              <div>Bill Due</div>
              <div>{creditCardDetails?.paymentDue}</div>
            </div>
            <div className="cardSummaryBody4">
              <div>Bill Cycle</div>
              <div>{creditCardDetails?.paymentCycle}</div>
            </div>
          </div>
        </div>

        <div className="cardPreferences">
          <div className="cardPreferenceHeading">Card Preferences</div>
          <div className="cardPreferenceBody">
            <div className="cardPreferenceBody1">
              <div>Request International Transaction</div>
              <div>
                <Form.Check
                  type="switch"
                  id="custom-switch1"
                  checked={creditCardDetails?.preferences?.international}
                  onChange={() => handleCheck("international")}
                />
              </div>
            </div>
            <div className="cardPreferenceBody1">
              <div>Request Tap & Pay</div>
              <div>
                <Form.Check
                  type="switch"
                  id="custom-switch2"
                  checked={creditCardDetails?.preferences?.tap}
                  onChange={() => handleCheck("tap")}
                />
              </div>
            </div>
            {/* <div>
              <Accordion flush className="accordian">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Reset Card Pin</Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Row style={{ marginBottom: "10px" }}>
                        <Col>
                          <Form.Control
                            placeholder="Enter Old Pin"
                            type="password"
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            placeholder="Enter new Pin"
                            type="password"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button variant="success">Reset</Button>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div> */}
            <div className="cardPreferenceBody1">
              <div>Request Block Card</div>
              <div>
                <Form.Check
                  type="switch"
                  id="custom-switch3"
                  checked={creditCardDetails?.preferences?.block}
                  onChange={() => handleCheck("block")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="servicesContainer">
        <div className="servicesHeader">Services</div>
        <div className="servicesBody">
          <div className="statement" onClick={() => handleShow("transaction")}>
            View Statement
          </div>
          <div className="rewards" onClick={() => handleShow("rewards")}>
            Rewards & Offers
          </div>
          <div className={(creditCardDetails?.preferences?.block==true)?"pay_disable":"apply"} onClick={() => handleShow("pay")}>
            Pay Now
          </div>
          <div className="support" onClick={() => navigate("/support")}>
            Contact Us
          </div>
        </div>
      </div>
      <Modal
        show={show["transaction"]}
        onHide={() => handleClose("transaction")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Credit Card Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {cardTransactions?.map((val) => {
              return (
                <ListGroup.Item>
                  <div className="transaction_container">
                    <Row style={{ width: "100%" }}>
                      <Col
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "rgb(90, 40, 125)",
                        }}
                      >
                        {val?.receiver?.payeeName}
                      </Col>
                      <Col
                        style={{
                          textAlign: "right",
                          fontSize: "16px",
                          fontWeight: "800",
                          color: val.amount < 0 ? "#79ea86" : "#E75757",
                        }}
                      >
                        {val.amount}
                      </Col>
                    </Row>
                    <Row style={{ width: "100%" }}>
                      <Col
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "rgb(165 162 162)",
                        }}
                      >
                        {val.description}
                      </Col>
                      <Col
                        style={{
                          textAlign: "right",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "rgb(165 162 162)",
                        }}
                      >
                        {val.timeStamp}
                      </Col>
                    </Row>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose("transaction")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show["rewards"]} onHide={() => handleClose("rewards")}>
        <Modal.Header closeButton>
          <Modal.Title>Current Offers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Currently No offers Available try again Later!!</div>
          <div>
            <Image src={emptyScreen} fluid />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose("rewards")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show["pay"]} onHide={() => handleClose("pay")}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Funds to Bank Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePayment} id="paymentForm">
            <FloatingLabel
              controlId="number"
              label="Credit Card Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={creditCardDetails?.cardNumber + "-xxxx-xxxx-xxxx"}
                disabled
                name="number"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="name"
              label="Card Holder Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={creditCardDetails?.holderName}
                disabled
                name="name"
              />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel controlId="cvc" label="CVC" className="mb-3">
                  <Form.Control type="password" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="Expiry"
                  label="Expiry"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={creditCardDetails?.expiry}
                    disabled
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel
              controlId="account"
              label="Account Number"
              className="mb-3"
            >
              <Form.Control type="text" name="payeeAccount" />
            </FloatingLabel>
            <FloatingLabel
              controlId="accountName"
              label="Account Holders Name"
              className="mb-3"
            >
              <Form.Control type="text" name="payeeName" />
            </FloatingLabel>
            <FloatingLabel controlId="amount" label="amount" className="mb-3">
              <Form.Control type="text" name="creditAmount" />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" form="paymentForm">
            Pay
          </Button>
          <Button variant="primary" onClick={() => handleClose("pay")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show["link"]} onHide={() => handleClose("link")}>
        <Modal.Header closeButton>
          <Modal.Title>Link Your Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLinkCard} id="linkForm">
            <FloatingLabel
              controlId="number"
              label="Credit Card Number"
              className="mb-3"
            >
              <Form.Control type="text" name="Linknumber" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSelect"
              label="Select Account"
              className="mb-3"
            >
              <Form.Select aria-label="Floating label select example" name="LinkAccounts">
                {
                  accounts.map((val)=>{
                    return <option value={val.accountId}>{val.accountNo}</option>
                  })
                }
                
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="name"
              label="Card Holder Name"
              className="mb-3"
            >
              <Form.Control type="text" name="Linkname" />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel controlId="cvc" label="CVC" className="mb-3">
                  <Form.Control type="password" name="linkCVC" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="Expiry"
                  label="Expiry"
                  className="mb-3"
                >
                  <Form.Control type="text" name="linkExpiry" />
                </FloatingLabel>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" form="linkForm">
            Submit
          </Button>
          <Button variant="primary" onClick={() => handleClose("link")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Result
        title="Payment Successful"
        description="Your payment has been completed successfully."
        show={showResultModal}
        handleClose={toggleResultModal}
      />
      <Result
        title="Credit Card Added Succesfully"
        description="New credit card Added"
        show={showAddModal}
        handleClose={toggleAddModal}
      />
    </div>
  );
};

export default CreditCard;
