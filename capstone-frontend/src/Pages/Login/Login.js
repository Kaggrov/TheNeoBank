import React, { useState } from "react";
import axios from "../../Services/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginUser,
  LogOutUser,
} from "../../Services/ReduxService/actions/userAction";
import { useNavigate } from "react-router-dom";
import successImage from "../../assets/success.jpg";
import failedImage from "../../assets/failed.jpg";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import "./login.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterResult, setshowRegisterResult] = useState({
    result: "",
    show: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payLoad = {
      phoneNumber: phoneNumber,
      password: password,
    };

    axios
      .post("authenticate", payLoad)
      .then((response) => {
        localStorage.setItem("token", response.data);
        axios
          .get("loginUser/" + phoneNumber, {
            headers: { Authorization: `Bearer ${response.data}` },
          })
          .then((res) => {
            dispatch(LoginUser(res.data["customerDetails"]));
            localStorage.setItem(
              "customerDetails",
              JSON.stringify(res.data["customerDetails"])
            );
            navigate("/home");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setshowRegisterResult({
              result: "failed",
              show: true,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setshowRegisterResult({
          result: "failed",
          show: true,
        });
      });
  };

  return (
    <div className="container mt-5 mx-auto">
      <h2 className="login-heading">Login to The NeoFin</h2>
      <form onSubmit={handleSubmit} className="formcontainer">
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="email" className="form-label">
            Enter Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="btn_div_login">
          <button type="submit" className="btn login_btn">
            Login
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            margin: "1rem auto",
            textAlign: "center",
          }}
        >
          Don't have an account yet?{" "}
          <p
            style={{
              color: "blueviolet",
              textDecoration: "underline",
              cursor: "pointer",
            }}

            onClick={()=>{
              navigate('/register')
            }}
          >
           Register now
          </p>
        </div>
      </form>
      <Modal
        show={showRegisterResult.show}
        onHide={() => {
          setshowRegisterResult({
            ...showRegisterResult,
            show: false,
          });
        }}
      >
        <Modal.Body>
          {showRegisterResult.result === "success" ? (
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
              <p>Login Successfull</p>
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
                height="40px"
                width="40px"
              />
              <p> Invalid User Credentials</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="success"
            onClick={() => {
              setshowRegisterResult({
                result: "failed",
                show: false,
              });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
