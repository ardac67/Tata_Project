import {
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBSpinner,
} from "mdb-react-ui-kit";
import Cookies from "universal-cookie";
import fetchContact from "../Fetch/fetchContact";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const ContactEdit = () => {
  const [buttonStateContact, setButtonStateContact] = useState(true);
  const [newData, setNewData] = useState({});
  const cookies = new Cookies(null, { path: "/" });
  const id = cookies.get("user_id");
  const token = cookies.get("token");

  const result = useQuery(["contact", id, token], fetchContact);
  if (result.isLoading) {
    return (
      <MDBSpinner
        style={{ marginLeft: "50%", marginRight: "50%" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  var user = result.data.user;

  const handleEdit = (e) => {
    if (e.target.value === user.phone || e.target.value === user.address) {
      setButtonStateContact(true); // Deactivate the button
    } else {
      setButtonStateContact(false); // Enable the button
    }

    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const pushEditUser = async () => {
    axios
      .put(`http://localhost:3001/api/updateContact/${id}`, newData, {
        headers,
      })
      .then((response) => {
        toast.success("Succesfully Updated", {
          position: toast.POSITION.TOP_LEFT,
        });
        result.refetch();
        setButtonStateContact(true);
      })
      .catch((error) => {
        toast.warning("Succesfully Updated", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };
  return (
    <MDBCardBody>
      <ToastContainer></ToastContainer>
      <MDBCardText>
        <MDBRow>
          <MDBCol md="2">
            <h6
              style={{
                marginTop: "5px",
                color: "#7d8fb1",
                fontWeight: "400",
              }}
            >
              PHONE
            </h6>
          </MDBCol>
          <MDBCol md="4" className="justify-content-start">
            <MDBInput
              label="Phone"
              id="formControlDefault"
              type="text"
              name="phone"
              defaultValue={user.phone}
              onChange={handleEdit}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ marginTop: "10px" }}>
          <MDBCol md="2">
            <h6
              style={{
                marginTop: "5px",
                color: "#7d8fb1",
                fontWeight: "400",
              }}
            >
              ADDRESS
            </h6>
          </MDBCol>
          <MDBCol md="8" className="justify-content-start">
            <MDBTextArea
              label="Address"
              id="formControlDefault"
              type="text"
              rows={6}
              name="address"
              defaultValue={user.address}
              onChange={handleEdit}
            />
          </MDBCol>
        </MDBRow>
      </MDBCardText>
      <MDBBtn disabled={buttonStateContact} onClick={pushEditUser}>
        Edit
      </MDBBtn>
    </MDBCardBody>
  );
};

export default ContactEdit;
