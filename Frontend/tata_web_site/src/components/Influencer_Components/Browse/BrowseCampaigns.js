import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBSpinner,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import fetchAllCampaigns from "../../Advertiser_Components/Fetch/fetchAllCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

function BrowseCampaigns({ searchTerm }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5; // Adjust this according to your needs

  const cookies = new Cookies(null, { path: "/" });
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

  // Filter campaigns based on the search term
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.campaign_header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset current page when searchTerm changes
  if (currentPage !== 1 && searchTerm) {
    setCurrentPage(1);
  }

  const redirect = (path) => {
    navigate(path);
  };

  // Calculate the indexes of the campaigns to be displayed on the current page
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(currentPage);

  return (
    <MDBCol md="7">
      {!currentCampaigns.length ? (
        <h1>No Campaigns Found</h1>
      ) : (
        currentCampaigns.map((campaign) => (
          <MDBCard className="border rounded-3 mb-2" key={campaign.id}>
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
                      onClick={() => redirect(`/CreateProposal/${campaign.campaign_id}`)}
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
      <MDBPagination className="mt-3 justify-content-end">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => paginate(currentPage - 1)}>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>

        {[
          ...Array(
            Math.ceil(filteredCampaigns.length / campaignsPerPage)
          ).keys(),
        ].map((number) => (
          <MDBPaginationItem
            key={number + 1}
            active={currentPage === number + 1}
          >
            <MDBPaginationLink onClick={() => paginate(number + 1)}>
              {number + 1}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}

        <MDBPaginationItem
          disabled={
            currentPage ===
            Math.ceil(filteredCampaigns.length / campaignsPerPage)
          }
        >
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </MDBCol>
  );
}

export default BrowseCampaigns;
