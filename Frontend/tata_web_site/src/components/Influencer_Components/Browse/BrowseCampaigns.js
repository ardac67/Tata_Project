import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import fetchAllCampaigns from "../../Advertiser_Components/Fetch/fetchAllCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

function App() {
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });
  const id = cookies.get("user_id");
  const token = cookies.get("token");
  const result = useQuery(["campaignAll", token], fetchAllCampaigns);
  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  const campaigns = result.data.campaign;
  console.log(campaigns);

  const redirect = (path) => {
    navigate(path);
  };

  return (
    <MDBCol md="7">
      {!campaigns.length ? (
        <h1>No Campaigns Found</h1>
      ) : (
        campaigns.map((campaign) => (
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
                      src={campaign.image}
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{campaign.campaign_header}</h5>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>{campaign.category}</span>
                    <span className="text-primary"> • </span>
                    <span>{campaign.subcategory}</span>
                    <br />
                  </div>
                  <div className="mb-2 text-muted small">
                    <span>{campaign.feature1}</span>
                    <span className="text-primary"> • </span>
                    <span>{campaign.feature2}</span>
                    <span className="text-primary"> • </span>
                    <span>{campaign.feature3}</span>
                    <br />
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                    {campaign.campaign_description}
                  </p>
                  <p className="mb-4 mb-md-0">{campaign.hashtags}</p>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn
                      color="primary"
                      size="sm"
                      onClick={() => redirect("/CampaignDetails")}
                    >
                      Campaign Details
                    </MDBBtn>
                    <MDBBtn
                      outline
                      color="success"
                      size="sm"
                      className="mt-2"
                      onClick={() => redirect("/CreateProposal")}
                    >
                      Propose
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        ))
      )}
    </MDBCol>
  );
}

export default App;
