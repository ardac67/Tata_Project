import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
  };
  return (
    <MDBCol md="7">
      <MDBCard className="border rounded-3">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom hover-overlay"
              >
                <MDBCardImage
                  src="https://yt3.googleusercontent.com/ytc/APkrFKaBA66UMsPD6mKXojVXoPMjn_Gltm3TaZUB87MLWg=s900-c-k-c0x00ffffff-no-rj"
                  fluid
                  className="w-100 square bg-primary rounded-circle"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol md="6">
              <h1>Elraenn</h1>
              <h5>Influencer</h5>
              <div className="mt-3 mb-3 text-muted small">
                <span className="">Collaboration Completed</span>
                <span className="text-success ms-2 me-2"> N/A </span>
                <span className="ms-2">Selection Rate</span>
                <span className="text-success ms-2 me-2"> N/A </span>
              </div>
              <div className="mt-3 mb-0 text-muted small">
                <span>Ongoing Campaign</span>
                <span className="text-success ms-2 me-2"> N/A </span>
                <span className="ms-4">Recomendations</span>
                <span className="text-success ms-2 me-2"> Counter </span>
              </div>
            </MDBCol>
            <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
            <div>
            <p className="ms-5 mb-5">Join Date</p>
            </div>
              <div className="d-flex flex-column mt-4">
                <MDBBtn color="primary" size="sm" className="mt-5" onClick={() =>redirect("/CampaignDetails")}>
                  Invite
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="border rounded-3 mt-3">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom hover-overlay"
              >
                <MDBCardImage
                  src="https://yt3.googleusercontent.com/ytc/APkrFKaBA66UMsPD6mKXojVXoPMjn_Gltm3TaZUB87MLWg=s900-c-k-c0x00ffffff-no-rj"
                  fluid
                  className="w-100 square bg-primary rounded-circle"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol md="6">
              <h1>Elraenn</h1>
              <h5>Influencer</h5>
              <div className="mt-3 mb-3 text-muted small">
                <span className="">Collaboration Completed</span>
                <span className="text-success ms-2 me-2"> N/A </span>
                <span className="ms-2">Selection Rate</span>
                <span className="text-success ms-2 me-2"> N/A </span>
              </div>
              <div className="mt-3 mb-0 text-muted small">
                <span>Ongoing Campaign</span>
                <span className="text-success ms-2 me-2"> N/A </span>
                <span className="ms-4">Recommendations</span>
                <span className="text-success ms-2 me-2"> Counter </span>
              </div>
            </MDBCol>
            <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
            <div>
            <p className="ms-5 mb-5">Join Date</p>
            </div>
              <div className="d-flex flex-column mt-4">
                <MDBBtn color="primary" size="sm" className="mt-5" onClick={() =>redirect("/Invite")}>
                  Invite
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default App;
