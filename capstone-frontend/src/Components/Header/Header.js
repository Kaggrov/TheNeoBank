import React, { useState,useEffect } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser, LoginUser } from "../../Services/ReduxService/actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const handleItemClick = (path) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("customerDetails");
      dispatch(LogOutUser())
      navigate("/login");
      setActiveItem("/login")
    }
    else{
      navigate(path);
      setActiveItem(path);
    }
   
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);
  // console.log(user)

  return (
    <div className="header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            onClick={() => {
              handleItemClick("/home");
            }}
          >
            The NeoFin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {activeItem!=="/" && <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link
                onClick={() => {
                  handleItemClick("/accounts");
                }}
                className={activeItem === "/accounts" ? "active" : ""}
              >
                Accounts
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleItemClick("/credit");
                }}
                className={activeItem === "/credit" ? "active" : ""}
              >
                Credit Cards
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleItemClick("/transfer");
                }}
                className={activeItem === "/transfer" ? "active" : ""}
              >
                Money Transfer
              </Nav.Link>

              <NavDropdown title="Explore" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    handleItemClick("/home");
                  }}
                >
                  DashBoard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleItemClick("/landing");
                  }}
                >
                  Home
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                onClick={() => {
                  handleItemClick("/languages");
                }}
                className={activeItem === "/languages" ? "active" : ""}
              >
                Languages
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>}
          <Navbar.Collapse className="justify-content-end button_group">
            {(user?.customerId == null )&&<Button
              className="login_button"
              type="button"
              onClick={() => {
                handleItemClick("/register");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
              Register
            </Button>}
            {(user?.customerId == null) ? <Button
              className="login_button"
              type="button"
              onClick={() => {
                handleItemClick("/login");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
              Log in
            </Button>:<Button
              className="login_button"
              type="button"
              onClick={() => {
                handleItemClick("/logout");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
              Log Out
            </Button>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
