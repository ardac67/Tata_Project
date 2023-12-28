import {
  MDBCard,
  MDBCardBody,
  // MDBCardTitle,
  // MDBCardText,
  MDBBtn,
  MDBCardHeader,
  MDBCardFooter,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBTextArea,
} from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "quill/dist/quill.snow.css";
const cookies = new Cookies(null, { path: "/" });
const CreateCampaign = () => {
  const navigate = useNavigate();
  const token = cookies.get("token");
  const [image, setImage] = useState(null);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [buttonState, setButtonState] = useState(false);
  const [formData, setFormData] = useState({
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
  });

  const tagsOptions = [
    "Wellness",
    "Beauty",
    "Tech",
    "Eco",
    "Fashion",
    "Gourmet",
    "Travel",
    "Parenting",
    "DIY",
    "Fitness",
    "Entertainment",
    "Finance",
    "Gaming",
    "Learning",
    "Pets",
  ]; // Add more tags as needed
  const setData = (e) => {
    setFormData({
      ...formData,
      campaign_image: image,
      [e.target.name]: e.target.value,
      campaignStartDate: dateStart,
      campaignEndDate: dateEnd,
      user_id: cookies.get("user_id"),
      status: "pending",
    });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    // Convert the selected image to binary data (base64)
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(",")[1]);
        console.log("image", image);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  console.log(setFormData);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const pushToApi = () => {
    setIsButtonClicked(true);
    console.log(formData);

    axios
      .post(`http://localhost:3001/api/createCampaign`, formData, { headers })
      .then((response) => {
        toast.success("Succesfully Created Redirecting....", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
        setButtonState(true);
        const delayInMilliseconds = 5000;
        setTimeout(() => {
          navigate("/");
        }, delayInMilliseconds);
      })
      .catch((error) => {
        if (error.response.status === 413) {
          toast.error("Entity too large", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Error Occured", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div
      style={{
        marginRight: "5%",
        marginLeft: "5%",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      {" "}
      <h1
        style={{ marginTop: "10px", marginBottom: "20px", fontSize: "1.5rem" }}
      >
        Create a New Campaign
      </h1>
      <p>
        Create your campaign carefully on our website goes through the info that
        you have supplied.
      </p>
      <MDBRow style={{ marginTop: "30px", marginBottom: "50px" }}>
        <ToastContainer />
        <MDBCol md="3">
          {" "}
          <MDBListGroup style={{ minWidth: "8rem" }} light>
            <MDBListGroupItem
              tag="a"
              href="#campaign"
              action
              noBorders
              aria-current="true"
              className="px-3"
              color="primary"
              style={{
                color: "rgb(96 100 118/var(--tw-text-opacity))",
              }}
            >
              Campaign Information
            </MDBListGroupItem>
            <MDBListGroupItem
              tag="a"
              href="#preferences"
              action
              noBorders
              className="px-3"
              color="primary"
              style={{
                color: "rgb(96 100 118/var(--tw-text-opacity))",
              }}
            >
              Collaboration Preferences
            </MDBListGroupItem>
            <MDBListGroupItem
              tag="a"
              href="#platforms"
              action
              noBorders
              className="px-3"
              color="primary"
              style={{
                color: "rgb(96 100 118/var(--tw-text-opacity))",
              }}
            >
              Preferred Platforms and Campaign Tags
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
        <MDBCol md="9">
          <MDBCard alignment="left">
            <MDBCardHeader
              id="campaign"
              style={{ fontSize: "1.125rem", fontWeight: "500" }}
            >
              Campaign Information
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="6">
                  <MDBRow>
                    {" "}
                    <MDBCol md="3">
                      <h6
                        style={{
                          marginTop: "5px",
                          color: "#7d8fb1",
                          fontWeight: "400",
                        }}
                      >
                        Start Date
                      </h6>
                    </MDBCol>
                    <MDBCol md="3">
                      <DatePicker
                        selected={dateStart}
                        onChange={(dateStart) => setDateStart(dateStart)}
                        dateFormat="Pp"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                  {" "}
                  <MDBRow>
                    <MDBCol md="3">
                      <h6
                        style={{
                          marginTop: "5px",
                          color: "#7d8fb1",
                          fontWeight: "400",
                        }}
                      >
                        End Date
                      </h6>
                    </MDBCol>
                    <MDBCol md="3">
                      <DatePicker
                        selected={dateEnd}
                        onChange={(dateEnd) => setDateEnd(dateEnd)}
                        dateFormat="Pp"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Upload Image
                  </h6>
                </MDBCol>
                <MDBCol md="7" className="justify-content-start">
                  <MDBInput
                    type="file"
                    accept="image/*"
                    name="campaign_image"
                    onChange={handleImageChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Campaing Header
                  </h6>
                </MDBCol>
                <MDBCol md="10" className="justify-content-start">
                  <MDBInput
                    label="Campaign Header"
                    id="formControlDefault"
                    type="text"
                    name="campaign_header"
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-5" style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Description
                  </h6>
                </MDBCol>
                <MDBCol md="10" className="justify-content-start">
                  <MDBTextArea
                    name="campaign_description"
                    id="textAreaExample"
                    rows={4}
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCard alignment="left" style={{ marginTop: "20px" }}>
            <MDBCardHeader
              id="preferences"
              style={{ fontSize: "1.125rem", fontWeight: "500" }}
            >
              Collaboration Preferences
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12">
                  <MDBRow>
                    {" "}
                    <MDBCol md="2">
                      <h6
                        style={{
                          marginTop: "5px",
                          color: "#7d8fb1",
                          fontWeight: "400",
                        }}
                      >
                        Target Audience
                      </h6>
                    </MDBCol>
                    <MDBCol md="10">
                      <MDBTextArea
                        name="target_audience"
                        id="textAreaExample"
                        rows={4}
                        onChange={setData}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Age Interval
                  </h6>
                </MDBCol>
                <MDBCol md="10" className="justify-content-start">
                  <MDBTextArea
                    name="age_interval"
                    id="textAreaExample"
                    rows={4}
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Target Gender
                  </h6>
                </MDBCol>
                <MDBCol md="10" className="justify-content-start">
                  <MDBTextArea
                    name="gender_information"
                    id="textAreaExample"
                    rows={4}
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: "25px" }}>
                <MDBCol md="2">
                  <h6
                    style={{
                      marginTop: "5px",
                      color: "#7d8fb1",
                      fontWeight: "400",
                    }}
                  >
                    Required Channel Statistics
                  </h6>
                </MDBCol>
                <MDBCol md="10" className="justify-content-start">
                  <MDBTextArea
                    name="statistical_interval"
                    id="textAreaExample"
                    rows={4}
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCard alignment="left" style={{ marginTop: "20px" }}>
            <MDBCardHeader
              id="platforms"
              style={{ fontSize: "1.125rem", fontWeight: "500" }}
            >
              Preferred Platforms and Campaign Tags
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBRow>
                      {" "}
                      <MDBCol md="2">
                        <h6
                          style={{
                            marginTop: "5px",
                            color: "#7d8fb1",
                            fontWeight: "400",
                          }}
                        >
                          Platforms
                        </h6>
                      </MDBCol>
                      <MDBCol md="10">
                        <MDBTextArea
                          name="platform"
                          id="textAreaExample"
                          rows={4}
                          onChange={setData}
                        />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBCol md="12" style={{ marginTop: "10px" }}>
                  <MDBRow>
                    {" "}
                    <h6
                      style={{
                        marginTop: "5px",
                        color: "#7d8fb1",
                        fontWeight: "400",
                      }}
                    >
                      Campaign Tags
                    </h6>
                    {[1, 2, 3, 4, 5].map((tagNumber) => (
                      <MDBCol>
                        <label htmlFor={`tag${tagNumber}`}>
                          Tag {tagNumber}
                        </label>
                        <select
                          id={`tag${tagNumber}`}
                          name={`tag${tagNumber}`}
                          onChange={setData}
                          value={formData[`tag${tagNumber}`]}
                          className="form-control"
                        >
                          <option value="">Select Tag</option>
                          {tagsOptions.map((tag, index) => (
                            <option key={index} value={tag}>
                              {tag}
                            </option>
                          ))}
                        </select>
                      </MDBCol>
                    ))}
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCardFooter style={{ marginTop: "10px" }}>
            <MDBBtn
              outline
              className="mx-2"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(97, 109, 245) 33%, rgb(92, 82, 235) 100%)",
                color: "white",
              }}
              size="lg"
              color="primary"
              onClick={pushToApi}
              enabled={buttonState}
              disabled={isButtonClicked}
            >
              Create Campaign
            </MDBBtn>
          </MDBCardFooter>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default CreateCampaign;
