import React, { useState, useEffect } from "react";
import axios from "../../Services/axios";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  Card,
  FloatingLabel,
  Alert,
  ButtonGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import BackButton from "../../Components/BackButton/BackButton";
import Spinner from "react-bootstrap/Spinner";
import "./Profile.css";
import ExpenseChart from "./ExpenseChart";
import Result from '../../Components/ResultModal/Result'

function Profile() {
  const user = useSelector((state) => state.userReducer.user);

  const [profileDetails, setProfileDetails] = useState({
    name:user.customerName,
    phone:user.phoneNumber
  });

  const [passWordModal, setPasswordModal] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [passwordSuccess,setPasswordSuccess] = useState(false);

  const [addWallet, setAddWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("c");
  const [walletBalance, setWalletBalance] = useState();
  const [transactionPosted, setTransactionPosted] = useState(false);

  const [debitCardDetails, setDebitCardDetails] = useState([]);

  const [creditCardDetails, setCreditCardDetails] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDebitCard, setSelectedDebitCard] = useState({});

  const handleAddMoney = () => {
    setAddWallet(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let request = {
      balance: (
        parseInt(walletBalance) + parseInt(formData.get("amount"))
      ).toString(),
    };

    const newCardDetails = {
      ...selectedCard,
      availableLimit:
        selectedCard.availableLimit - parseInt(formData.get("amount")),
    };

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const transactionDetails = {
      timeStamp: currentDate,
      transactionType: "creditCard",
      amount: formData.get("amount"),
      account: selectedCard?.cardNumber,
      description: "Amount Added to Wallet ",
      receiver: {
        accountNumber: selectedCard?.cardNumber,
        payeeName: "Self",
      },
    };

    axios.put("wallet/" + user.customerId, request).then((res) => {
      axios.put("creditCards", newCardDetails).then((res) => {
        console.log(res.data);
      });
      axios
        ?.post("transactions/" + user.customerId + "/-1", transactionDetails)
        .then((res) => {
          console.log(res.data);
        });

      axios.get(`wallet/${user.customerId}`).then((res) => {
        setWalletBalance(res.data);
        handleAddMoney(false);
        setTransactionPosted((trans) => !trans);
      });
    });
  };

  const handleDebitCardSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let request = {
      balance: (
        parseInt(walletBalance) + parseInt(formData.get("amount"))
      ).toString(),
    };

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const paymentDetails = {
      amount: formData.get("amount"),
      account: "xxxx-xxxx-" + selectedDebitCard?.accountNo.slice(-4),
      description: "Amount Added to Wallet ",
      timeStamp: currentDate,
      transactionType: "debitCard",
      receiver: {
        accountNumber: selectedDebitCard?.accountNo,
        payeeName: "Self",
      },
    };

    console.log("Payment Details", paymentDetails);

    selectedDebitCard.balance -= parseInt(formData.get("amount"));

    console.log("Account", selectedDebitCard);

    axios.put("wallet/" + user.customerId, request).then((res) => {
      axios
        .post("transactions/" + user.customerId + "/-1", paymentDetails)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      axios
        .put("accounts", selectedDebitCard)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      axios.get(`wallet/${user.customerId}`).then((res) => {
        setWalletBalance(res.data);
        handleAddMoney(false);
        setTransactionPosted((trans) => !trans);
      });
    });
  };

  const handleCurrentCard = (e) => {
    creditCardDetails.forEach((card) => {
      if (card?.cardId == e.target.value) {
        setSelectedCard(card);
      }
    });
  };

  const handleDebitCardChange = (e) => {
    debitCardDetails.forEach((card) => {
      if (card?.accountId == e.target.value) {
        setSelectedDebitCard(card);
      }
    });
  };

  const fetchCreditCardDetails = () => {
    axios.get("creditCards/" + user.customerId).then((res) => {
      setCreditCardDetails(res.data);
    });
  };

  const fetchDebitCardDetails = () => {
    axios.get("accounts/" + user.customerId).then((res) => {
      setDebitCardDetails(res.data);
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(localStorage.getItem("customerDetails"));

    if (
      formData.get("newPass").toString() !==
      formData.get("reNewPass").toString()
    ) {
      setWrongPass(true);
      return;
    } else {
      const payLoad = {
        oldPassword: formData.get("oldPass"),
        phoneNumber: JSON.parse(localStorage.getItem("customerDetails"))
          .phoneNumber,
        password: formData.get("newPass"),
      };
      setWrongPass(false);

      axios.put("change-password/" + user.customerId, payLoad).then((res) => {
        if (res.status == 200) {
           setPasswordSuccess(true);
        }
        else{

            window.alert("Unable to change Password. Try Again later!!!");
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    setPasswordModal(false);
  };

  useEffect(() => {
    axios.get(`wallet/${user.customerId}`).then((res) => {
      setWalletBalance(res.data);
    });
    fetchCreditCardDetails();
    fetchDebitCardDetails();
  }, []);

  return (
    <div className="profile_page">
      <div className="container ">
        <BackButton />

        <div
          className="row border  rounded"
          style={{ backgroundColor: "#F2F2F8", margin: "0px" }}
        >
          <div className="col-md-4">
            <img
              src="https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1" // Replace with your profile image URL
              alt="Profile"
              style={{ width: "7rem", height: "7rem" }}
              className="img-fluid rounded-circle"
            />
          </div>

          <div className="col-md-8" style={{ padding: "15px" }}>
            <h2>{profileDetails.name}</h2>
            <p> {profileDetails.phone}</p>
            <button
              id="resetpass"
              className="btn btn-primary"
              onClick={() => setPasswordModal(true)}
            >
              Set New Password
            </button>
          </div>
        </div>
      </div>

      <div className="wallet">
        <p style={{ margin: "auto", marginLeft: 0, fontSize: "32px" }}>
          Wallet Balance
        </p>
        <div className="balance">
          <FontAwesomeIcon
            icon={faWallet}
            color="#0D6EFD"
            style={{ height: "4rem", width: "4rem" }}
          />
          <p style={{ margin: "auto", width: "50%", fontSize: "32px" }}>
            {" "}
            <FontAwesomeIcon icon={faIndianRupeeSign} /> {walletBalance}
          </p>
          <Button
            onClick={() => {
              setAddWallet(true);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>

      <Modal show={addWallet} onHide={handleAddMoney}>
        <Modal.Header closeButton>
          <Modal.Title>Select Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <div
                key={`inline`}
                className="mb-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Form.Check
                  inline
                  label="Credit Card"
                  name="group1"
                  type={"radio"}
                  value="c"
                  checked={paymentMethod === "c"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
                <Form.Check
                  inline
                  label="Debit Card"
                  name="group1"
                  value="d"
                  type={"radio"}
                  checked={paymentMethod === "d"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                />
              </div>
            </Form>

            {paymentMethod === "c" && (
              <Form id="paymentForm" onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="Cnumber"
                  label="Credit Card Number"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Credit Cards "
                    name="cardNo"
                    onChange={handleCurrentCard}
                  >
                    {creditCardDetails.map((val) => {
                      return (
                        <option value={val.cardId}>{val.cardNumber}</option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
                <Row>
                  <Col>
                    <FloatingLabel controlId="cvc" label="CVC" className="mb-3">
                      <Form.Control type="password" name="cvc" />
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
                        value={selectedCard?.expiry}
                        disabled
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <FloatingLabel
                  controlId="amount"
                  label="amount"
                  className="mb-3"
                >
                  <Form.Control type="text" name="amount" />
                </FloatingLabel>
              </Form>
            )}

            {paymentMethod === "d" && (
              <Form id="paymentForm" onSubmit={handleDebitCardSubmit}>
                <FloatingLabel
                  controlId="Dnumber"
                  label="Account Number"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Debit Cards "
                    name="cardNo"
                    onChange={handleDebitCardChange}
                  >
                    {debitCardDetails.map((val) => {
                      return (
                        <option value={val.accountId}>{val.accountNo}</option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="DebitPin"
                      label="pin"
                      className="mb-3"
                    >
                      <Form.Control type="password" name="pin" />
                    </FloatingLabel>
                  </Col>
                </Row>

                <FloatingLabel
                  controlId="amount"
                  label="amount"
                  className="mb-3"
                >
                  <Form.Control type="text" name="amount" />
                </FloatingLabel>
              </Form>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="paymentForm"
            id="submitPayee"
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={passWordModal}
        onHide={() => {
          setPasswordModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="changePassword" onSubmit={handleChangePassword}>
            <FloatingLabel
              controlId="oldPass"
              label="Enter Current Password"
              className="mb-3"
            >
              <Form.Control type="text" name="oldPass" />
            </FloatingLabel>
            <FloatingLabel
              controlId="NewPass"
              label="Enter New Password"
              className="mb-3"
            >
              <Form.Control type="password" name="newPass" />
            </FloatingLabel>

            <FloatingLabel
              controlId="reNewPass"
              label="Re-enter new Password"
              className="mb-3"
            >
              <Form.Control type="text" name="reNewPass" />
            </FloatingLabel>
          </Form>
          {wrongPass && (
            <h5 style={{ color: "red" }}>New Password do not match </h5>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="changePassword">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Result title={"PassWord Change Successfully"} show={passwordSuccess} handleClose={()=>{setPasswordSuccess(false)}}/>

      <div
        className="transactions"
        style={{ margin: "10px", width: "100%", padding: "8px" }}
      >
        <ExpenseChart transactionPosted={transactionPosted} />
      </div>
    </div>
  );
}

export default Profile;
