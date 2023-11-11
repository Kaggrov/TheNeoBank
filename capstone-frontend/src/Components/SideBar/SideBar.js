import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometer, faTachometerAverage, faTachometerFast, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFileInvoice,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLandmark,
  faPiggyBank,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const handleItemClick = (path) => {
    navigate(path);
    
    setActiveItem(path);
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  return (
    <div style={(location.pathname==="/" || location.pathname==="/login" || location.pathname==="/register" )?{display:"none"}:{ flex: "18%" }} className="sidebar_container">
      <div className="App">
        <div class="container-fluid">
          <div class="row flex-nowrap">
            <div
              class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
              style={{ background: "#5A287D", width: "100%" }}
            >
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul
                  class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <br></br>
                  <br></br>
                  <br></br>
                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      className={
                        activeItem === "/home"
                          ? "nav-link align-middle px-0 active"
                          : "nav-link align-middle px-0"
                      }
                      onClick={() => {
                        handleItemClick("/home");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTachometerFast}
                        size="xl"
                        style={{ color: "#f0eff0" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Dashboard
                      </span>
                    </div>
                  </li>
                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      className={
                        activeItem === "/profile"
                          ? "nav-link align-middle px-0 active"
                          : "nav-link align-middle px-0"
                      }
                      onClick={() => {
                        handleItemClick("/profile");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        size="xl"
                        style={{ color: "#f0eff0" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Profile
                      </span>
                    </div>
                  </li>

                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      data-bs-toggle="collapse"
                      className={"nav-link align-middle px-0"}
                      onClick={() => {
                        handleItemClick("/accounts");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        size="xl"
                        style={{ color: "#f7f7f8" }}
                      />
                      &nbsp;&nbsp;&nbsp;{" "}
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Accounts
                      </span>{" "}
                    </div>
                  </li>

                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      data-bs-toggle="collapse"
                      className={"nav-link align-middle px-0"}
                      onClick={() => {
                        handleItemClick("/credit");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        size="xl"
                        style={{ color: "#f7f7f8" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Credit Cards
                      </span>
                    </div>
                  </li>

                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      className={"nav-link align-middle px-0"}
                      onClick={() => {
                        handleItemClick("/transfer");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMoneyBillTransfer}
                        size="lg"
                        style={{ color: "#f7f7f8" }}
                      />
                      &nbsp;&nbsp;{" "}
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Money Transfer
                      </span>{" "}
                    </div>
                  </li>
                  <li class="nav-item" style={{ width: "100%" }}>
                    <div
                      className={
                        activeItem === "/support"
                          ? "nav-link align-middle px-0 active"
                          : "nav-link align-middle px-0"
                      }
                      onClick={() => {
                        handleItemClick("/support");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="xl"
                        style={{ color: "#f7f7f8" }}
                      />
                      &nbsp;&nbsp;&nbsp;{" "}
                      <span
                        class="ms-1 d-none d-sm-inline"
                        style={{ color: "#f7f7f8" }}
                      >
                        Support
                      </span>{" "}
                    </div>
                  </li>
                </ul>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
