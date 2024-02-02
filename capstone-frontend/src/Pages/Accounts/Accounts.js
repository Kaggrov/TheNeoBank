import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../Services/axios";
import Advertisements from "./Advertisements";
import Pagination from "./Pagination";
import TransactionHistory from "./TransactionHistory";
import AccountModal from "./AccountModal";
import BackButton from "../../Components/BackButton/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Accounts.css";

function Accounts() {
  const user = useSelector((state) => state.userReducer.user);

  const [banks, setBanks] = useState([]);
  const [showBalance, setShowBalance] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [accountNo, setAccountNo] = useState("");
  const [isValidAccountNo, setIsValidAccountNo] = useState(true);
  const [accountType, setAccountType] = useState("");
  const [bankOptions, setBankOptions] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [addAccountSuccess, setAddAccountSuccess] = useState("");
  const [addAccountError, setAddAccountError] = useState("");

  const bankColors = {
    SBI: "#1063D6",
    HDFC: "#ea1a21",
    ICICI: "#f09a37",
    AXIS: "#156E2F",
    default: "#00B6EF",
  };

  const handleAccountNoChange = (e) => {
    const inputAccountNo = e.target.value;
    const accountNoRegex = /^\d{4}-\d{4}-\d{4}$/;

    if (accountNoRegex.test(inputAccountNo)) {
      setAccountNo(inputAccountNo);
      setIsValidAccountNo(true);
    } else {
      setAccountNo(inputAccountNo);
      setIsValidAccountNo(false);
    }
  };

  const toggleBalance = (accountId) => {
    setShowBalance((prevState) => ({
      ...prevState,
      [accountId]: !prevState[accountId],
    }));
  };

  const handleNameSearch = (e) => {
    setSearchName(e.target.value.toLowerCase());
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setAccountNo("");
    setAccountType("");
    setSelectedBank("");
    setAddAccountSuccess("");
    setAddAccountError("");
    setIsValidAccountNo(true);
  };

  const handleSave = async () => {
    try {
      const accountExistsResponse = await axios.get(
        `accounts/check/${accountNo}`
      );

      if (accountExistsResponse.data === true) {
        setAddAccountError("Account already linked!");
        setAddAccountSuccess("");
      } else {
        const response = await axios.post(`accounts`, {
          accountNo,
          accountType,
          balance: parseInt(50000),
          customerId: parseInt(user.customerId, 10),
          bankId: parseInt(selectedBank, 10),
        });
        setAddAccountSuccess("Pending approval from bank...");
        setAddAccountError("");
        setTimeout(() => {
          setBanks((prevBanks) => [...prevBanks, response.data]);
        }, 10000);
      }
    } catch (error) {
      setAddAccountError("Account does not exist with bank.");
      setAddAccountSuccess("");
    }
  };

  async function getBankAccounts() {
    try {
      const response = await axios.get(`accounts/${user.customerId}`);
      setBanks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await axios.get(
        `transactions/sender/${user.customerId}`
      );
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBanksData() {
    try {
      const response = await axios.get(`banks`);
      setBankOptions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBankAccounts();
    getTransactions();
    getBanksData();
  }, []);

  const startIndexTransactions = (currentPage - 1) * itemsPerPage;
  const endIndexTransactions = startIndexTransactions + itemsPerPage;

  //filter transaction table based on account selected or name searched & to remove these filters
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (!selectedCard || transaction.account === selectedCard.accountNo) &&
      (!searchName ||
        (transaction.receiver.payeeName.toLowerCase().includes(searchName) &&
          (viewAll || !selectedCard)))
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const startIndexFilteredTransactions = (currentPage - 1) * itemsPerPage;
  const endIndexFilteredTransactions =
    startIndexFilteredTransactions + itemsPerPage;
  const pagedTransactions = filteredTransactions.slice(
    startIndexFilteredTransactions,
    endIndexFilteredTransactions
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setCurrentPage(1);
    setTimeout(() => {
      const transactionHistoryTable = document.getElementById(
        "transaction-history-table"
      );
      if (transactionHistoryTable) {
        transactionHistoryTable.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewAll = () => {
    setViewAll(true);
    setSelectedCard(null);
  };

  return (
    <div className="accounts">
      {/* 1. Back button */}
      <div className="back-button-container1 mt-1">
        <div>
          <BackButton />
        </div>
        <div className="back-button-title1">Accounts</div>
      </div>

      {/* 2. Accounts List */}
      <div className="accounts-container mx-2 my-2">
        <div className="mx-3 my-3">
          <h5>Your Accounts:</h5>
        </div>

        <div className="my-2 mx-4">
          <div className="row">
            {banks &&
              banks?.map((x) => (
                <div key={x.accountId} className="col-md-4 mb-3">
                  <a
                    href="#"
                    className="card-link"
                    style={{ textDecoration: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!e.target.classList.contains("btn")) {
                        handleCardSelection(x);
                      }
                    }}
                  >
                    <div
                      className="card d-flex flex-column h-100"
                      style={{ borderRadius: "15px", backgroundColor: "white" }}
                    >
                      <div className="card-body text-center">
                        <FontAwesomeIcon
                          icon={faBuildingColumns}
                          style={{
                            width: "80px",
                            height: "80px",
                            margin: "0 auto",
                            color:
                              bankColors[x?.bank.bankName] ||
                              bankColors.default,
                          }}
                        />
                        <h5 className="card-title">{x?.bank.bankName}</h5>
                        <br></br>
                        <div>
                          <p className="card-text">
                            <b>Account No.: </b>
                            {x.accountNo}{" "}
                          </p>
                          <p className="card-text">
                            <i>{x.accountType} Account</i>
                          </p>
                          {showBalance[x.accountId] ? (
                            <p className="card-text mt-4">
                              <span className="border border-primary p-2">
                                <b>Balance:</b> ₹{x.balance}
                              </span>
                            </p>
                          ) : (
                            <button
                              className="btn btn-primary"
                              style={{ background: "#3C1053" }}
                              onClick={() => toggleBalance(x.accountId)}
                            >
                              Show Balance
                            </button>
                          )}
                        </div>
                        <br></br>
                      </div>
                    </div>
                  </a>
                </div>
              ))}

            {/* "Link new account" card */}
            <div className="col-md-4 mb-3">
              <a
                href="#"
                className="link-account"
                style={{ textDecoration: "none" }}
                onClick={handleShowModal}
              >
                <div
                  className="card d-flex flex-column h-100"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#FFDBEC",
                    border: "2px dashed #e65398",
                  }}
                >
                  <br />
                  <br />
                  <br />
                  <div
                    className="card-body text-center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h1>+</h1>
                    <h5 className="card-title">Link new account</h5>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </a>
            </div>
          </div>
          <p>(*Click on an account above to see all its transactions.)</p>
        </div>
        <br></br>
        {/* Modal Form for new account */}

        <AccountModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          accountNo={accountNo}
          isValidAccountNo={isValidAccountNo}
          handleAccountNoChange={handleAccountNoChange}
          accountType={accountType}
          setAccountType={setAccountType}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          addAccountSuccess={addAccountSuccess}
          addAccountError={addAccountError}
          handleSave={handleSave}
          bankOptions={bankOptions}
        />
      </div>

      {/* 3. Advertisement Carousel */}
      <div className="advertisement-container mx-2 my-5">
        <div className="mx-3 my-3">
          <h5>Advertisements:</h5>
        </div>
        <div className="my-2 mx-4">
          <Advertisements />
        </div>
        <br></br>
      </div>

      {/* 4. Transaction History */}
      <div
        className="transaction-history-container mx-2 my-5"
        id="transaction-history-table"
      >
        <div className="mx-3 my-3">
          <div className="my-3 d-flex justify-content-between align-items-center">
            <h5>Transaction History:</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-primary"
                style={{
                  background: "#3C1053",
                  whiteSpace: "nowrap",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
                onClick={handleViewAll}
              >
                View All
              </button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  color: "#3C1053",
                  marginRight: "5px",
                  marginTop: "20px",
                }}
              />
              <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={handleNameSearch}
                className="form-control"
                style={{
                  maxWidth: "300px",
                  marginRight: "25px",
                  marginTop: "20px",
                  backgroundColor: "#F2F2F8",
                }}
              />
            </div>
          </div>
        </div>
        <div className="my-2 mx-4">
          <TransactionHistory
            transactions={filteredTransactions}
            searchName={searchName}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Accounts;
