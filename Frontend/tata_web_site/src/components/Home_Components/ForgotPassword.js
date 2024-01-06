import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FooterUniversal from "../../FooterUniversal";
import Cookies from "universal-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "date-fns";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const email_setting = (e) => {
    setEmail(e.target.value);
  };
  const password_setting = (e) => {
    setPassword(e.target.value);
  };
  function encode(str) {
    return str
      .split("")
      .map((char) => String.fromCharCode(char.charCodeAt(0) + 5))
      .join("");
  }

  const send_email = () => {
    var data = {
      service_id: "service_pj39pyi",
      template_id: "template_ecz5m98",
      user_id: "VKrkaoeufRnL9Eyxm",
      template_params: {
        from_name: "Tata Team",
        to_email: email,
        message: `Click this url if you submitted the password change http://localhost:3000/ChangeRequest/${email}/${encode(
          password
        )}`,
        "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
      },
    };
    axios
      .post(`https://api.emailjs.com/api/v1.0/email/send`, data)
      .then((response) => {
        window.alert("success");
        window.location.reload();
      })
      .catch((error) => {
        window.alert("error");
      });
  };
  return (
    <div className="App" style={{ color: "black" }}>
      <MDBContainer fluid>
        <ToastContainer />
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="mb-5 text-uppercase">Forgot Password</h2>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  type="email" // Change this to 'email'
                  name="user_name" // Consider renaming this to 'email' for clarity
                  onChange={email_setting}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="New Password"
                  id="form2"
                  type="password"
                  name="password"
                  onChange={password_setting}
                />
                <MDBBtn className="mb-4" onClick={send_email}>
                  Send Email
                </MDBBtn>

                <div
                  className="d-flex justify-content-between mx-auto mb-4"
                  style={{ width: "40%" }}
                ></div>

                <div></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <FooterUniversal />
    </div>
  );
};

export default ForgotPassword;
