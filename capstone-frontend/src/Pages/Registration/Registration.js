import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./registration.css";
import axios from "../../Services/axios";
import { v4 as uuid } from "uuid";
import successImage from "../../assets/success.jpg";
import failedImage from "../../assets/failed.jpg";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [disableRegisterBtn, setDisableRegisterBtn] = useState(true);
  const [showRegisterResult, setshowRegisterResult] = useState({
    result: "",
    show: false,
  });
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    otp: otpSent
      ? Yup.string()
          .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
          .required("OTP is required")
      : null,
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      otp: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here, e.g., send data to a server
      console.log("Form submitted with values:", values);

      if (otpSent) {
        axios
          .post("otp/router/validateOTP", {
            oneTimePassword: values.otp,
          })
          .then((res) => {
            console.log(res.status);
            if (res.status == 200) {
              const customerId = uuid({ format: "integer" })
                .replace(/[^0-9]/g, "")
                .slice(0, 5)
                .padEnd(5, "0");
              const customerDetails = {
                customerId: customerId,
                customerName: values.firstName + " " + values.lastName,
                phoneNumber: values.phoneNumber,
              };

              axios.post("customers", customerDetails).then((res) => {
                console.log(res.data);
                axios
                  .post("loginUser", {
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                    customerId:customerId
                  })
                  .then((res) => {
                    console.log("User Registration created");
                    setshowRegisterResult({
                      result: "success",
                      show: true,
                    });
                  })
                  .catch((err)=>{
                    console.log(err);
                    setshowRegisterResult({
                      result: "failed",
                      show: true,
                    });
                  })
              });
            } else {
              setshowRegisterResult({
                result: "failed",
                show: true,
              });
            }
          })
          .catch((err)=>{
            console.log(err);
            setshowRegisterResult({
              result: "failed",
              show: true,
            });
          })
      } else {
        setshowRegisterResult({
          result: "failed",
          show: true,
        });
      }
    },
  });

  const sendOtp = () => {
    axios
      .post("otp/router/sendOTP", {
        phoneNumber: "+91 8595238441",
      })
      .then((res) => {
        console.log(res.data);
        setOtpSent(true);
      });
  };

  return (
    <div className="container mt-5 mx-auto registration-container">
      <h2 className="registration-heading">Register to The NeoFin </h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form id="registration_form" className="formcontainer" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label className="form_lablel">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Frist Name"
                data-testid="my-form-control-fn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                data-testid="my-form-control-ln"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                isInvalid={formik.touched.lastName && formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="9999999999"
                data-testid="my-form-control-pn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                isInvalid={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            {otpSent && (
              <Form.Group controlId="otp">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otp}
                  isInvalid={formik.touched.otp && formik.errors.otp}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.otp}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                data-testid="my-form-control-pass"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="btn_div">
            <Button
              disabled={
                formik.errors.firstName &&
                formik.errors.lastName &&
                formik.errors.otp &&
                formik.errors.phoneNumber &&
                formik.errors.password
              }
              className="registration_btn"
              type="submit"
            >
              Register
              </Button>
              {!otpSent && (
            <Button
              disabled={formik.errors.phoneNumber??true}
              onClick={sendOtp}
              className="send_otp_btn"
              data-testid="sendotpbtn"
            >
              Send OTP
            </Button>
              )}
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
          Already registered ?{" "}
          <p
            style={{
              color: "blueviolet",
              textDecoration: "underline",
              cursor: "pointer",
            }}

            onClick={()=>{
              navigate('/login')
            }}
          >
           Login now
          </p>
        </div>
          </Form>
        </Col>
      </Row>
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
              <p>Customer Added Succesfully</p>
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
              <p> OTP is invalid</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            variant="success"
            onClick={() => {
              setshowRegisterResult({
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
  );
};

export default Registration;
