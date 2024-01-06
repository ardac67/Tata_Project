import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBCol,
  MDBFile,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./register.css";
import { useState } from "react";
import FooterUniversal from "../../FooterUniversal";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [getType, setType] = useState("");
  const [register_data, setRegisterData] = useState({});
  const [contact_data, setContactData] = useState({});
  const [media_links_data, setMedia_links_data] = useState({});
  const [selectedImage, setImage] = useState(null);
  const [passwordError, setPasswordError] = useState(""); // State to hold password error message
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [emailError, setEmailError] = useState("");

  let post_object = {};
  const push_as_register = () => {
    post_object = {
      ...register_data,
      user_image: selectedImage,
      contact: contact_data,
      media_links: media_links_data,
    };

    axios
      .post("http://localhost:3001/createUser", post_object)
      .then(function (response) {
        if (response.status === 200) {
          window.alert("Başarili Yönlendiriliyorsunuz...");
          navigate("/Login");
        } else {
          window.alert(response.data.message);
        }
      })
      .catch(function (error) {
        window.alert(error);
      });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    // Convert the selected image to binary data (base64)
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const updateData = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Check if the name is 'email'
      if (!value) {
        setEmailError("Email is required.");
        setIsButtonEnabled(false);
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i.test(value)) {
        setEmailError("Invalid email address.");
        setIsButtonEnabled(false);
      } else {
        setEmailError("");
        setIsButtonEnabled(true);
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password should be at least 6 characters long.");
        setIsButtonEnabled(false);
      } else {
        setPasswordError("");
        setIsButtonEnabled(true);
      }
    }
    setRegisterData({
      ...register_data,
      [e.target.name]: e.target.value,
    });
  };

  const updateContactData = (e) => {
    setContactData({
      ...contact_data,
      [e.target.name]: e.target.value,
    });
  };
  const update_media_links_data = (e) => {
    setMedia_links_data({
      ...media_links_data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="centered-container">
        <div className="regFluid">
          <MDBRow className="justify-content-center align-items-center m-5">
            <MDBCard>
              <MDBCardBody className="px-4">
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                  Registration
                </h3>

                <MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Full Name"
                      size="lg"
                      id="fullName"
                      type="text"
                      name="name"
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow style={{ marginBottom: "15px" }}>
                    <MDBFile
                      wrapperClass="mb-4"
                      size="lg"
                      id="userName"
                      type="file"
                      name="file_image"
                      onChange={handleImageChange}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="User Name"
                      size="lg"
                      id="userName"
                      type="text"
                      name="user_name"
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      size="lg"
                      id="password"
                      type="password"
                      name="password"
                      onChange={updateData}
                    />
                    {/* Display error message if there's an error */}
                    {passwordError && (
                      <div style={{ color: "red" }}>{passwordError}</div>
                    )}
                  </MDBRow>
                  <MDBRow>
                    <Form.Select
                      aria-label="Default select example"
                      style={{
                        fontWeight: 350,
                      }}
                      name="type"
                      onChange={(e) => {
                        setType(e.target.value);
                        updateData(e);
                      }}
                    >
                      <option value="">User Type</option>
                      <option value="Influencer">Influencer</option>
                      <option value="Advertiser">Advertiser</option>
                    </Form.Select>
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBTextArea
                      className="mt-3"
                      label="Description"
                      id="textAreaExample"
                      rows={4}
                      name="description"
                      onChange={updateData}
                    />
                  </MDBRow>
                </MDBRow>
                <MDBRow>
                  <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3">
                    Contact
                  </h4>

                  <MDBRow>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      size="lg"
                      id="email"
                      type="email"
                      name="email"
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBTextArea
                      className="mt-3"
                      label="Address"
                      id="textAreaExample"
                      rows={2}
                      name="address"
                      onChange={updateContactData}
                    />
                  </MDBRow>
                  <MDBRow className="mt-3">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Phone"
                      size="lg"
                      id="phone"
                      type="phone"
                      name="phone"
                      onChange={updateContactData}
                    />
                  </MDBRow>
                </MDBRow>
                <MDBRow>
                  <MDBRow className="d-flex justify-content-between">
                    <MDBCol
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3">
                        Media Links
                      </h4>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol
                      md="3"
                      style={{
                        paddingLeft: "0px",
                      }}
                    >
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Yotube"
                        size="lg"
                        id="media_link"
                        type="media_link1"
                        name="youtube"
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                    <MDBCol
                      md="3"
                      style={{
                        paddingRight: "0px",
                      }}
                    >
                      <MDBInput
                        className="mb-4"
                        label="Twitter"
                        size="lg"
                        id="Url"
                        name="twitter"
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                    <MDBCol
                      md="3"
                      style={{
                        paddingRight: "0px",
                      }}
                    >
                      <MDBInput
                        className="mb-4"
                        label="Tiktok"
                        size="lg"
                        id="textAreaExample"
                        name="tiktok"
                        onChange={update_media_links_data}
                      />
                    </MDBCol>{" "}
                    <MDBCol
                      md="3"
                      style={{
                        paddingRight: "0px",
                      }}
                    >
                      <MDBInput
                        className="mb-4"
                        label="Instagram"
                        size="lg"
                        id="textAreaExample"
                        name="instagram"
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow></MDBRow>
                  <MDBCol
                    className="mr-0"
                    style={{
                      textAlign: "right",
                    }}
                  ></MDBCol>
                </MDBRow>
                {getType === "Influencer" ? (
                  <MDBRow className="d-flex justify-content-center">
                    <MDBRow>
                      <MDBCol
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3">
                          Audience Demography
                        </h4>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol
                        style={{
                          paddingLeft: "0px",
                        }}
                      >
                        <label className="mb-4" htmlFor="ageInterval">
                          Age Interval
                        </label>
                        <select
                          className="form-select form-select-lg"
                          id="ageInterval"
                          name="ageInterval"
                          onChange={updateData}
                        >
                          <option value="">Select Age Interval</option>
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                        </select>
                      </MDBCol>
                      <MDBCol
                        style={{
                          paddingRight: "0px",
                        }}
                      >
                        <label className="mb-4" htmlFor="ageInterval">
                          Gender
                        </label>
                        <MDBCol
                          style={{
                            paddingRight: "0px",
                          }}
                        >
                          <select
                            className="form-select form-select-lg"
                            id="gender"
                            name="gender"
                            onChange={updateData}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </MDBCol>
                      </MDBCol>
                    </MDBRow>
                    <MDBCol
                      className="mr-0"
                      style={{
                        textAlign: "right",
                      }}
                    ></MDBCol>
                  </MDBRow>
                ) : null}
                <MDBBtn
                  className="mb-4 mt-3"
                  size="lg"
                  disabled={!isButtonEnabled}
                  onClick={push_as_register}
                >
                  Submit
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </div>
      </div>
      <div
        className="footer"
        style={{
          marginTop: "50px",
        }}
      >
        <FooterUniversal />
      </div>
    </>
  );
};

export default Register;
