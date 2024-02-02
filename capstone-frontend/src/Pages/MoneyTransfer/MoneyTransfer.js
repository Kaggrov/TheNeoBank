import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import BackButton from "../../Components/BackButton/BackButton";
import successImage from "../../assets/success.jpg";
import failedImage from "../../assets/failed.jpg";
import { useSelector } from "react-redux";
import axios from "../../Services/axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import "./MoneyTransfer.css";

const MoneyTransfer = () => {
  const user = useSelector((state) => state.userReducer.user);
  const modes = ["UPI", "Self", "Bank Account"];
  const [currentMode, setCurrentMode] = useState("UPI");
  const [payeeName, setPayeeName] = useState("");
  const [payee, setPayee] = useState([]);
  const [currentPayeeId, setCurrentPayeeId] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  const [showPayModal, setShowPayModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [payeeAdded, setPayeeAdded] = useState(false);

  const [currentPayee, setCurrentPayee] = useState({});

  const [userAccounts, setUserAccounts] = useState([]);

  const [showOverlay, setShowOverlay] = useState({});

  const [walletBalance, setWalletBalance] = useState();

  const openOverlay = (ind) => {
    setShowOverlay((prev) => ({
      ...prev,
      [ind]: true,
    }));
  };

  const closeOverlay = (ind) => {
    setShowOverlay((prev) => ({
      ...prev,
      [ind]: false,
    }));
  };

  const handleDeletePayee = (ind, payeeId) => {
    console.log(payeeId);
    axios
      .delete("/payees/" + payeeId)
      .then(() => {
        console.log("Payee Deleted Succesfully");
        getAllPayees();
        closeOverlay(ind);
      })
      .catch((err) => {
        console.log(err);
        alert("Can't delete once payment Made");
      });
  };

  const getAllPayees = () => {
    axios.get("/payees/" + user.customerId).then((res) => {
      const payeeList = [];

      res.data.map((val) => {
        const currentPayee = {
          payeeName: val.payeeName,
          payeeId: (val.upiId ?? val.accountNumber) + "-" + val.payeeName,
          id: val.payeeId,
        };

        payeeList.push(currentPayee);
      });
      setPayee(payeeList);
    });
  };
  const [showPaymentResult, setShowPaymentResult] = useState({
    result: "",
    show: false,
  });

  const handlePayeeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payeeData = {
      payeeName: formData.get("payeeName"),
      accountNumber: formData.get("accountNumber"),
      upiId: formData.get("upiId"),
      bankId: formData.get("bankId"),
    };
    console.log("Payee Data:", payeeData);
    console.log(user.customerId);

    axios.post("/payees/" + user.customerId, payeeData).then((res) => {
      console.log(res.data);
      setPayeeAdded(true);
      getAllPayees();
      setPayeeName("");
    });
    handleClose();
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const isNeoSaveEnabled = formData.get("neoEnable") == null ? false : true;

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const accountDetails = userAccounts.filter(
      (res) => res.accountId === parseInt(formData.get("account"))
    );

    if (accountDetails?.[0].balance < parseInt(formData.get("amount"))) {
      setShowPaymentResult({
        result: "failed",
        show: true,
      });
    } else {
      const paymentDetails = {
        amount: formData.get("amount"),
        account: "xxxx-xxxx-" + accountDetails?.[0]?.accountNo.slice(-4),
        description: formData.get("remarks"),
        timeStamp: currentDate,
        transactionType: "transfer",
      };

      if (isNeoSaveEnabled) {
        let extraAmount =
          Math.ceil(parseFloat(formData.get("amount"))) -
          parseFloat(formData.get("amount"));
        let request = {
          balance: (
            parseFloat(walletBalance) + extraAmount
          ).toString(),
        };
        axios.put("wallet/" + user.customerId, request).then((res) => {
          console.log(res);

        })
        .catch((err)=>{
          console.log(err)
        })
      }

      console.log("Payment Details", paymentDetails);

      axios
        .post(
          "transactions/" + user.customerId + "/" + currentPayeeId,
          paymentDetails
        )
        .then((res) => {
          console.log(res.data);
          setShowPayModal(false);
          setShowPaymentResult({
            result: "success",
            show: true,
          });
          getAllTransactions();
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(accountDetails);
      accountDetails[0].balance -= parseInt(formData.get("amount"));
      axios
        .put("accounts", accountDetails[0])
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getAllTransactions = () => {
    axios.get("transactions/sender/transfer/" + user.customerId).then((res) => {
      setTransactions(res.data);
    });
  };

  const getBankAccounts = () => {
    axios.get("accounts/" + user.customerId).then((res) => {
      setUserAccounts(res.data);
    });
  };

  const CustomPopOver = (ind, payeeId) => {
    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Are you sure to delete ? </Popover.Header>
        <Popover.Body>
          <div>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleDeletePayee(ind, payeeId)}
            >
              Yes
            </Button>{" "}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => closeOverlay(ind)}
            >
              No
            </Button>
          </div>
        </Popover.Body>
      </Popover>
    );
  };

  useEffect(() => {
    axios.get(`wallet/${user.customerId}`).then((res) => {
      setWalletBalance(res.data);
    });
    getBankAccounts();
    getAllPayees();
    getAllTransactions();
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
          Fund Transfer
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "12px",
          }}
        >
          Select Payment Mode
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonGroup>
            {modes.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={"outline-success"}
                name="radio"
                value={radio}
                checked={currentMode === radio}
                onChange={(e) => setCurrentMode(e.currentTarget.value)}
              >
                {radio}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>

      <div className="input_payee">
        <p
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "grey",
            marginBottom: "0",
          }}
        >
          Transfer To{" "}
        </p>

        <InputGroup className="input_group">
          <Form.Control
            placeholder="Enter Payees Name"
            aria-label=""
            onChange={(e) => setPayeeName(e.target.value)}
            value={payeeName}
          />
          <Button
            variant="outline-secondary"
            onClick={handleShow}
            id="addPayee"
          >
            Add Payee
          </Button>
        </InputGroup>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Provide Details of Payee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePayeeSubmit} id="payeeForm">
              <FloatingLabel
                controlId="floatingInput"
                label="Payee Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="payeeName"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                />
              </FloatingLabel>
              {currentMode !== "UPI" && (
                <FloatingLabel
                  controlId="floatingAccount"
                  label="Account Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                  />
                </FloatingLabel>
              )}
              {currentMode === "UPI" && (
                <FloatingLabel
                  controlId="floatingUPI"
                  label="UPI Id"
                  className="mb-3"
                >
                  <Form.Control type="text" name="upiId" placeholder="UPI ID" />
                </FloatingLabel>
              )}
              {currentMode !== "UPI" && (
                <FloatingLabel
                  controlId="floatingBankId"
                  label="Bank Id (IFSC)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="bankId"
                    placeholder="Band Id (IFSC)"
                  />
                </FloatingLabel>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              form="payeeForm"
              id="submitPayee"
            >
              Add Payee
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {payeeAdded && (
        <Alert
          variant="success"
          style={{ margin: "8px" }}
          onClose={() => setPayeeAdded(false)}
          dismissible
        >
          <Alert.Heading>Payee Added Successfully</Alert.Heading>
        </Alert>
      )}

      <div className="filler_box">
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          Confused About how to do Money Transfer ?
        </p>
        <p style={{ fontSize: "14px", fontWeight: "500", color: "grey" }}>
          Click on the given link to learn about safe and fast money transfer{" "}
          <a
            href="https://www.natwest.com/support-centre.html?intcam=PC_HP-P4-1-ALL-DEF"
            target="_blank"
          >
            Click Here
          </a>
        </p>
      </div>

      <div className="account_table_group">
        <div style={{ flex: "50%" }}>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>Added Payees</p>
          <Table striped responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payee.map((val, ind) => {
                return (
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>{ind + 1}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1px",
                        }}
                      >
                        <p style={{ fontSize: "16px", fontWeight: "500" }}>
                          {val.payeeName}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "gray",
                          }}
                        >
                          {val.payeeId}
                        </p>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        variant="success"
                        onClick={() => {
                          setShowPayModal(true);
                          setCurrentPayee({
                            id: val.payeeId,
                            name: val.payeeName,
                          });
                          setCurrentPayeeId(val.id);
                        }}
                      >
                        Pay
                      </Button>
                      <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={CustomPopOver(ind, val.id)}
                        show={showOverlay[ind] ?? false}
                      >
                        <div
                          style={{
                            color: " #f14252",
                            display: "inline-flex",
                            padding: "5px",
                            paddingTop: "10px",
                            paddingLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => openOverlay(ind)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-dash-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                          </svg>
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div style={{ flex: "50%" }}>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>
            Transaction History
          </p>

          <Table striped responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>TimeStamp</th>
                <th>Description</th>
                <th>Account</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((val, ind) => {
                return (
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>{ind + 1}</td>
                    <td style={{ verticalAlign: "middle" }}>{val.timeStamp}</td>

                    <td>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "gray",
                          wordWrap: "wrap",
                        }}
                      >
                        {val.description}
                      </p>
                    </td>
                    <td>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "gray",
                          wordWrap: "wrap",
                        }}
                      >
                        {val.account}
                      </p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "500",
                          color: "gray",
                          wordWrap: "wrap",
                        }}
                      >
                        {val.amount}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <Modal
          show={showPayModal}
          onHide={() => {
            setShowPayModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePayment} id="paymentForm">
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "grey",
                  textAlign: "center",
                  marginBottom: "1px",
                }}
              >
                Payee : {currentPayee.name}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "grey",
                  textAlign: "center",
                }}
              >
                {currentPayee.id}
              </p>
              <FloatingLabel
                controlId="floatingInput"
                label="Amount"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="amount"
                  placeholder="Enter Amount"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingSelect"
                label="Select Account "
                className="mb-3"
              >
                <Form.Select aria-label="Account List" name="account">
                  {userAccounts.map((val) => {
                    return (
                      <option value={val.accountId}>{val.accountNo}</option>
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingRemarks"
                label="Remarks"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="remarks"
                  placeholder="Remarks..."
                />
              </FloatingLabel>

              <Form.Check
                type="switch"
                id="custom-switch"
                label="Enable Neo save for this transaction"
                name="neoEnable"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" form="paymentForm">
              Pay
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowPayModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showPaymentResult.show}
          onHide={() => {
            setShowPaymentResult({
              result: "success",
              show: false,
            });
          }}
        >
          <Modal.Body>
            {showPaymentResult.result === "success" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={successImage}
                  roundedCircle
                  height="98px"
                  width="98px"
                />
                <p>Amount Transferred Successfully</p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={failedImage}
                  roundedCircle
                  height="98px"
                  width="98px"
                />
                <p>Amount Transferred Failed</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="success"
              onClick={() => {
                setShowPaymentResult({
                  result: "success",
                  show: false,
                });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MoneyTransfer;
