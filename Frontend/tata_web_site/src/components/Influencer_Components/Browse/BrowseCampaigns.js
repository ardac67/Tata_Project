import React, { useEffect, useState } from "react";
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
import fetchAllCampaigns from "./fetchAllCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import "./BrowseCampaigns.css";
import defaultImage from "../default1.png";
import { bufferToBase64 } from "../../../utils";

function BrowseCampaigns({ searchTerm, filters }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5; // Adjust this according to your needs

  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const result = useQuery(["campaignAll", token], fetchAllCampaigns);

  // Check if the current page is not 1 and there are filters or search term
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  if (result.isLoading) {
    return (
      <MDBCol md="7">
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBCol>
    );
  }

  const campaigns = result.data.campaign;

  // Filter campaigns based on the search term
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearchTerm = campaign.campaign_header
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if platform, industry, and tags filters match
    const matchesFilters =
      (filters.platform.length === 0 ||
        filters.platform.some((platform) =>
          campaign.collaboration_preferences[0]?.preffered_platforms[0]?.platform
            ?.toLowerCase()
            .includes(platform)
        )) &&
      // (filters.industry.length === 0 ||
      //   filters.industry.includes(campaign.industry)) &&
      (filters.tags.length === 0 ||
        filters.tags.every((tag) =>
          campaign.campaing_tags.some(
            (tagObj) =>
              tagObj.tag1 === tag ||
              tagObj.tag2 === tag ||
              tagObj.tag3 === tag ||
              tagObj.tag4 === tag ||
              tagObj.tag5 === tag
          )
        ));

    return matchesSearchTerm && matchesFilters;
  });

  console.log("uzunluksafasfas:", filters.tags.length);
  console.log("searchTerm:", searchTerm);
  console.log("filters:", filters.platform);

  // Calculate the indexes of the campaigns to be displayed on the current page
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(campaigns);

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
                    onClick={() =>
                      navigate(`/CampaignDetails/${campaign.campaign_id}`)
                    }
                  >
                    <MDBCardImage
                      src={
                        campaign.campaign_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                              campaign.campaign_image.data
                            )}`
                          : defaultImage // Provide a placeholder image
                      }
                      className="w-100"
                      style={{
                        height: "200px",
                        width: "%100",
                        objectFit: "cover",
                      }}
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
                  <h5
                    onClick={() =>
                      navigate(`/CampaignDetails/${campaign.campaign_id}`)
                    }
                  >
                    {campaign.campaign_header}
                  </h5>
                  <div className="mt-1 mb-2 text-muted small">
                    {campaign.campaing_tags[0].tag1 && (
                      <span>{campaign.campaing_tags[0].tag1}</span>
                    )}
                    {campaign.campaing_tags[0].tag2 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag2}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag3 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag3}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag4 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag4}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag5 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag5}</span>
                      </>
                    )}
                  </div>

                  <p className="text-truncate-multiline mb-4 mb-md-0">
                    {campaign.campaign_description}
                  </p>
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
                      onClick={() =>
                        navigate(`/CampaignDetails/${campaign.campaign_id}`)
                      }
                    >
                      Campaign Details
                    </MDBBtn>
                    <MDBBtn
                      outline
                      color="success"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        navigate(`/CreateProposal/${campaign.campaign_id}`)
                      }
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
