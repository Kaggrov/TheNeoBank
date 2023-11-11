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
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import SuccessModal from "./SuccessModal";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import BackButton from "../../Components/BackButton/BackButton";
import BorderExample from "../../Components/Loading";
import ExpenseChart from "./ExpenseChart";
import FailModal from "./FailModal";

function Profile() {
  const user = useSelector((state) => state.userReducer.user);
  const [inputValue, setInputValue] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [profilename, setprofilename] = useState("");
  const [phone, setphone] = useState("");
  const [balance, setBalance] = useState(0);
  const [walletExists, setWalletExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState();
  const [verifyotpResponse, setverifyotpResponse] = useState("");

  const [transactionPosted, setTransactionPosted] = useState(false);

  useEffect(() => {
    checkwallet();
    /*axios.get(`wallet/${user.customerId}`)
      .then((response) => {
        setLoading(false)
        setBalance(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wallet balance:', error);
        setLoading(false)
      }); */
    fetchname();
    fetchAccount();
  }, [user.customerId, walletExists]);

  const checkwallet = () => {
    axios
      .get(`wallet/check/${user.customerId}`)
      .then((response) => {
        const exists = response.data;
        setWalletExists(exists);

        if (walletExists) {
          // Wallet exists, get its balance
          axios
            .get(`wallet/${user.customerId}`)
            .then((response) => {
              setBalance(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fetchname = () => {
    axios.get("customers/" + user.customerId).then((res) => {
      console.log(res.data);
      setLoading(false);
      setphone(res.data.phoneNumber);
      setprofilename(res.data.customerName);
    });
  };

  const handleActivate = () => {
    axios
      .post("wallet/" + user.customerId, {
        customer: {
          customerId: user.customerId,
          customerName: profilename,
          phoneNumber: phone,
        },
        balance: 0,
      })
      .then((response) => {
        // Handle the response as needed
        setWalletExists(true);
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const handleClosefailureModal = () => {
    setshowfailedImage(false);
  };
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [acc, setacc] = useState(null);
  const handleAccountChange = (e) => {
    const newval = e.target.value;

    setSelectedAccountId(newval);
    console.log(selectedAccountId);
    const foundAccount = accounts.find(
      (account) => account.accountId === parseInt(selectedAccountId)
    );
    setacc(foundAccount);
    console.log(acc?.balance);
  };

  const [accounts, setAccounts] = useState([]);

  const fetchAccount = () => {
    axios
      .get("accounts/" + user.customerId)
      .then((response) => {
        setAccounts(response.data);

      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showcard, setshowcard] = useState(false);
  const [cc, setcc] = useState(false);
  const [dc, setdc] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [upi, setupi] = useState(false);
  const [upival, setupival] = useState(null);
  const [isValid2, setIsValid2] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+91 8595238441");
  const [response, setResponse] = useState(null);
  const [showpasswordmodel, setshowpasswordmodel] = useState(false);
  //const handleAccountSelect = (accountId) => {
  //const selected = accounts.find((account) => account.id === accountId);
  //setSelectedAccount(selected);

  //};

  const [cards, setCards] = useState([]);
  //const [selectedcreditCard, setSelectedcreditCard] = useState(null);
  const [cvc, setCVC] = useState("");
  const [fetchcvc, setfetchcvc] = useState("");
  const [showcc, setshowcc] = useState(false);
  const [cardId, setcardId] = useState(0);
  const [availabelimit, setavailablelimit] = useState("");
  
  const handlenewcreditcardclick = (card) => {
    setSelectedAccountId(card.account.accountId);
    console.log(selectedAccountId);
    const foundAccount = accounts.find(
      (account) => account.accountId === parseInt(selectedAccountId)
    );
    setacc(foundAccount);
    setcardId(card.cardId);
    setSelectedCard(card);
    setavailablelimit(card.availableLimit);
    setfetchcvc(card.cvc);
    setshowcc(true);
    setcc(false);
  };

  const handlecreditcardclick = () => {
    {
      /* check the amount and implement payment logic */
    }
    axios
      .get("creditCards/" + user.customerId)
      .then((response) => {
        setCards(response.data);
        //console.log(response.data[0].account.accountId)
        
        //setSelectedCard(response.data[0]); // Select the first card by default
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });

    setcc(true);
    setShowPaymentModal(false);
  };

  const handledebitcardclick = () => {
    {
      /* check the amount and implement payment logic */
    }

    setdc(true);
    setShowPaymentModal(false);
  };
  const handleupiclick = () => {
    {
      /* check the amount and implement payment logic */
    }

    setupi(true);
    setShowPaymentModal(false);
  };

  const handleShowPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };
  const handleupiInputChange2 = (e) => {
    setupival(e.target.value);
    const pattern = /@ybl/;

    // Test if the input contains the pattern
    const isInputValid = pattern.test(upival);
    setIsValid2(isInputValid);
    //console.log(upival)
  };
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  }
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });

    const pattern = /^\d{14}$/;

    // Test if the input matches the pattern
    const isInputValid = pattern.test(cardDetails.cardNumber);
    setIsValid(isInputValid);
  };
  const [username, setUsername] = useState("manogna");
  const requestBody = {
    phoneNumber: phoneNumber,
  };
  {
    /* handle change password click */
  }
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(confirmPassword);

    if (password !== confirmPassword) {
      setConfirmPasswordError("password does not match");
      return;
    } else {
      sendOTP();
    }

    /*

        try {
            const response = await axios.post('/api/users/reset-password', {
                username,
                password,
            });
            alert('Password reset successful');
            // Redirect or handle success as needed
        } catch (error) {
            alert('Password reset failed');
            console.error(error);
        } */
  };
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validation for minimum 6 characters
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Validation for minimum 6 characters and matching with the password
    if (newConfirmPassword.length < 6) {
      setConfirmPasswordError("Password must be at least 6 characters long");
    } else {
      setConfirmPasswordError("");
    }
  };
  const [show, setshow] = useState(false);
  const [showfailedImage, setshowfailedImage] = useState(false);
  const sendOTP = () => {
    axios.post("otp/router/sendOTP", requestBody).then((res) => {
      console.log(res.data);
      setshow(true);
    });
  };
  const validateOTP = () => {
    console.log(confirmPassword);
    axios
      .put(
        `change-password/${user.customerId}`,
        { password: confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("otp/router/validateOTP", {
        oneTimePassword: otp,
      })
      .then((res) => {
        console.log(res);

        if (res.data == "Valid OTP please proceed with your transaction !") {
          setverifyotpResponse("Password Reset Successfull");
          setShowSuccessModal(true);
          setshowpasswordmodel(false);
          <SuccessModal
            response={verifyotpResponse}
            show={showSuccessModal}
            onClose={handleCloseSuccessModal}
          />;
        }
      })
      .catch((error) => {
        setshowpasswordmodel(false);
        setshowfailedImage(true);
      });
  };

  const payviacreditcard = (e) => {
    e.preventDefault();
    if (cvc == fetchcvc) {
      const newamt = parseFloat(availabelimit) - parseFloat(inputValue);
      axios
        .put("creditCards/" + cardId, { availableLimit: newamt })
        .then((res) => {
          console.log(res.data);
        });
      let newbalance = balance + parseFloat(inputValue);
      setBalance(newbalance);
      updateWalletBalance(newbalance);
      postTransaction();
      setshowcc(false);
      setShowSuccessModal(true);
    } else {
      alert("cvc does not match");
    }
  };
  const updateBalance = () => {
    const accountDetails = accounts.filter(
      (res) => res.accountId === parseInt(selectedAccountId)
    );
    if (parseInt(accountDetails[0]?.balance )> parseInt(inputValue)) {
      accountDetails[0].balance =
        parseInt(accountDetails?.[0]?.balance) - parseInt(inputValue);

      console.log("Update Balance ", accountDetails[0]);

      axios
        .put(`accounts/${selectedAccountId}`, accountDetails[0], {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const updateWalletBalance = (newbalance) => {
    axios
      .put(`wallet/${user.customerId}`, newbalance, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching wallet balance:", error);
      });
  };
  const postTransaction = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    //setcurrdate(currentDate)
    const accountDetails = accounts.filter(
      (res) => res.accountId === parseInt(selectedAccountId)
    );
    const transaction = {
      transactionType: "wallet",
      timeStamp: currentDate,
      description: "",
      account: `${accountDetails?.[0]?.accountNo ?? 1111}`,
      amount: inputValue,
      receiver: {
        payeeName: "Yourself",
      },
    };
    console.log(accountDetails);

    axios
      .post("transactions/" + user.customerId + "/" + "-1", transaction)
      .then((res) => {
        setTransactionPosted((prev) => !prev);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    //otpgeneration();
    let newbalance = balance + parseFloat(inputValue);
    setBalance(newbalance);
    console.log(newbalance);
    updateWalletBalance(newbalance);
    postTransaction();
    updateBalance();

    handledcCloseModal();
    handleClosePaymentModal();
    setInputValue(0);
  };
  const handleupiFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    //console.log('Card Details:', cardDetails);
    // Close the modal
    handleupiclose();
  };
  const handleCloseModal = () => {
    setshowcard(false);
    setShowPaymentModal(true);
  };
  const handleccCloseModal = () => {
    setshowcc(false);
    setcc(false);
    setShowPaymentModal(true);
  };
  const handledcCloseModal = () => {
    setdc(false);
    setShowPaymentModal(true);
  };
  const handleupiclose = () => {
    setupi(false);
    setShowPaymentModal(true);
  };
  const handleClodePasswordModal = () => {
    setshowpasswordmodel(false);
  };

  return (
    <div className="App">
      <div className="container mt-5 " style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <FailModal show={showfailedImage} onClose={handleClosefailureModal} />
          <BackButton />
        </div>
        <div
          className="row border  rounded"
          style={{ backgroundColor: "#F2F2F8", marginRight: "10px" }}
        >
          <div className="col-md-4">
            <img
              src="https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1" // Replace with your profile image URL
              alt="Profile"
              style={{ width: "250px", height: "200px" }}
              className="img-fluid rounded-circle"
            />
          </div>
          {loading ? (
            <BorderExample />
          ) : (
            <div className="col-md-8" style={{ padding: "15px" }}>
              <h2>{profilename}</h2>
              <p> {phone}</p>
              <button
                id="resetpass"
                className="btn btn-primary"
                onClick={() => setshowpasswordmodel(true)}
              >
                Set New Password
              </button>
            </div>
          )}
        </div>
      </div>
      <Container className="mt-5">
        {walletExists ? (
          <Row>
            <Col
              className="rounded"
              style={{
                backgroundColor: "#FFEAE6",
                marginRight: "15px",
                paddingBottom: "30px",
                paddingTop: "10px",
              }}
            >
              <h4>
                <span>
                  <img
                    src="https://1000logos.net/wp-content/uploads/2021/02/Paytm-emblem.png"
                    alt="wallet"
                    style={{ width: "90px", height: "60px" }}
                  />
                </span>
                &nbsp;{" "}
                <span>
                  <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                </span>
                &nbsp;{balance}
              </h4>
              <p>Total Wallet Balance</p>

              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                  </span>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Amount (to the nearest rupees)"
                  placeholder="enter amount .."
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              <Button variant="primary" onClick={handleShowPaymentModal}>
                Add Money
              </Button>
            </Col>
          </Row>
        ) : (
          <div>
            <button onClick={handleActivate} className="btn btn-primary">
              Activate Wallet
            </button>
          </div>
        )}

        <br></br>

        <div>
          <h2>Monthly Transactions</h2>
          <div style={{ height: "700px", width: "700px" }}>
            <ExpenseChart transactionPosted={transactionPosted} />
          </div>
        </div>
        {/*Model for set new password */}
        <Modal show={showpasswordmodel} onHide={handleClodePasswordModal}>
          <Modal.Header closeButton>
            <Modal.Title>Password Reset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <Alert variant="danger">{passwordError}</Alert>
                )}
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {confirmPasswordError && (
                  <Alert variant="danger">{confirmPasswordError}</Alert>
                )}
              </Form.Group>
              <br></br>
              <Button variant="secondary" type="submit">
                Reset Password
              </Button>
              {show && (
                <div>
                  <p style={{ color: "green" }}>
                    OTP sent to xxxxxx{phoneNumber?.slice(-4)}
                  </p>
                  <Form.Group controlId="otp">
                    <Form.Control
                      type="text"
                      value={otp}
                      placeholder="enter Otp"
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br></br>
                  <Button variant="secondary" onClick={validateOTP}>
                    Verify
                  </Button>
                </div>
              )}
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showPaymentModal} onHide={handleClosePaymentModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add buttons for payment methods */}
            <Button
              variant="outline-secondary"
              style={{ margin: "5px" }}
              onClick={() => {
                handlecreditcardclick();
              }}
            >
              Credit Card
            </Button>
            <Button
              variant="outline-secondary"
              style={{ margin: "5px" }}
              onClick={() => {
                handledebitcardclick();
              }}
            >
              Debit Card
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePaymentModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={cc} onHide={handleccCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select Your Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* <FloatingLabel
                controlId="accountSelect"
                label="Select an Account"
              >
                <Form.Control
                  as="select"
                  onChange={handleAccountChange}
                  value={selectedAccountId}
                >
                  <option value="">Select an Account</option>
                  {accounts.map((account) => (
                    <option key={account.accountId} value={account.accountId}>
                      xxxx xxxx {account.accountNo.slice(-4)}
                    </option>
                  ))}
                </Form.Control>
              </FloatingLabel> */}

              <div className="card-list">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    className="l-bg-cherry"
                    onClick={() => handlenewcreditcardclick(card)}
                    style={{
                      cursor: "pointer",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{card.holderName}</Card.Title>
                      <Card.Text>
                        <strong>Card Number:</strong> {card.cardNumber}
                        <br />
                        <strong>Expiry Date:</strong> {card.expiry}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        <div>
          <Modal show={showcc} onHide={handleccCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Card Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCard && (
                <div>
                  <div>
                    <Form.Group>
                      <Form.Label>Card Number:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedCard.cardNumber}
                        readOnly
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group>
                      <Form.Label>Expiry Date:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedCard.expiry}
                        readOnly
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group>
                      <Form.Label>CVC:</Form.Label>
                      <Form.Control
                        type="text"
                        value={cvc}
                        onChange={(e) => setCVC(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              )}
              <Button variant="secondary" onClick={payviacreditcard}>
                Pay
              </Button>
            </Modal.Body>
          </Modal>
        </div>

        {/* Nested Modal for Card Details */}
        <Modal show={dc} onHide={handledcCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter {paymentType} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <FloatingLabel
                  controlId="accountSelect"
                  label="Select an Account"
                >
                  <Form.Control
                    as="select"
                    onChange={handleAccountChange}
                    value={selectedAccountId}
                  >
                    <option value="">Select an Account</option>
                    {accounts.map((account) => (
                      <option key={account.accountId} value={account.accountId}>
                        xxxx xxxx {account.accountNo.slice(-4)}
                      </option>
                    ))}
                  </Form.Control>
                </FloatingLabel>

                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange2}
                  required
                />
                {!isValid && (
                  <p style={{ color: "red" }}>
                    Card number must have exactly 14 digits.
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  onChange={handleInputChange3}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange3}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              {response && <p>{response.message}</p>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handledcCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <SuccessModal
          show={showSuccessModal}
          onClose={handleCloseSuccessModal}
        />
        <Modal show={upi} onHide={handleupiclose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter UPI ID </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleupiFormSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="upi"
                  value={upival}
                  onChange={handleupiInputChange2}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Profile;
