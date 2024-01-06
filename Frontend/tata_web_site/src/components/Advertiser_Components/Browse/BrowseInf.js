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
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchAllInf from "../Fetch/fetchAllInf";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { bufferToBase64 } from "../../../utils";
import defaultImage from "../../Influencer_Components/default.jpg";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-UK", options);
}

function calculateAverageRating(influencer) {
  var totalRating = 0;
  for (var i = 0; i < influencer.ratings.length; i++) {
    totalRating += influencer.ratings[i].rating;
  }

  return (totalRating / influencer.ratings.length).toFixed(2);
}

function BrowseInf({ searchTerm, filters }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const InfluencersPerPage = 5; // Adjust this according to your needs

  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const result = useQuery(["InfluencerAll", token], fetchAllInf);
  const hashMap = {
    key1: "value1",
  };

  console.log("hashmap", hashMap);

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

  const influencers = result.data.influencer;
  console.log("influencers: ", influencers);
  const collabs = result.data;

  for (var i = 0; i < collabs.influencer.length; i++) {
    hashMap[collabs.influencer[i].user_id] =
      collabs.influencer[i].proposal.length;
  }

  // Filter campaigns based on the search term
  // Filter influencers based on the search term, collaborations completed, subscribers, and rating
  // Filter influencers based on the search term and filters
  const filteredInfluencers = influencers.filter((influencer) => {
    // console.log("totalRating: ", totalRating);
    // console.log("influencer.name: ", influencer.user_name);
    const matchesRatings =
      !filters.rating || calculateAverageRating(influencer) >= filters.rating;

    const matchesSearchTerm = influencer.user_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Apply filters based on the selected filters object
    const matchesTotalProposals =
      !filters.totalProposals ||
      hashMap[influencer.user_id] >= filters.totalProposals;

    // const matchesSubscribers =
    //   !filters.subscribers || influencer.subscribers <= filters.subscribers;

    return matchesSearchTerm && matchesTotalProposals && matchesRatings;
  });

  // Calculate the indexes of the campaigns to be displayed on the current page
  const indexOfLastInfluencer = currentPage * InfluencersPerPage;
  const indexOfFirstInfluencer = indexOfLastInfluencer - InfluencersPerPage;
  const currentInfluencers = filteredInfluencers.slice(
    indexOfFirstInfluencer,
    indexOfLastInfluencer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <MDBCol md="7">
      {!currentInfluencers.length ? (
        <h1>No Influencers Found</h1>
      ) : (
        currentInfluencers.map((influencer) => (
          <MDBCard className="border rounded-3 mb-2">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                    onClick={() =>
                      navigate(`/ShowProfile/${influencer.user_id}`)
                    }
                  >
                    <MDBCardImage
                      src={
                        influencer.user_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                              influencer.user_image.data
                            )}`
                          : defaultImage // Provide a placeholder image
                      }
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
                  <h1
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/ShowProfile/${influencer.user_id}`)
                    }
                  >
                    {influencer.name}
                  </h1>
                  <h5>{influencer.Type}</h5>
                  <div className="mt-3 mb-3 text-muted small">
                    <MDBRow>
                      <MDBCol>
                        <span
                          className="ms-2 text-muted"
                          style={{ fontSize: "20px" }}
                        >
                          Total Proposals
                        </span>
                        <span
                          className="ms-2 font"
                          style={{ fontSize: "20px" }}
                        >
                          {hashMap[influencer.user_id]}
                        </span>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ marginTop: "15px" }}>
                      <MDBCol>
                        <span
                          className="ms-2 font"
                          style={{ fontSize: "20px" }}
                        >
                          Rating{" "}
                        </span>
                        <span
                          className="text-success ms-2 me-2"
                          style={{ fontSize: "20px" }}
                        >
                          {" "}
                          {calculateAverageRating(influencer)
                            ? calculateAverageRating(influencer)
                            : "N/A"}
                        </span>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBRow className="ms-1">
                        {(() => {
                          const stars = [];
                          for (
                            var i = 0;
                            i < Math.floor(calculateAverageRating(influencer));
                            i++
                          ) {
                            stars.push(
                              <MDBCol md="1" key={i}>
                                <FontAwesomeIcon
                                  style={{ color: "orange" }}
                                  icon={faStar}
                                />
                              </MDBCol>
                            );
                          }

                          // Check if there's a half star to add
                          if (calculateAverageRating(influencer) % 1 >= 0.5) {
                            stars.push(
                              <MDBCol md="1" key={"half"}>
                                <FontAwesomeIcon
                                  style={{ color: "orange" }}
                                  icon={faStarHalfAlt}
                                />
                              </MDBCol>
                            );
                          }

                          return stars;
                        })()}
                      </MDBRow>
                    </MDBRow>
                  </div>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="text-center">
                    <p className="mb-5">
                      Join Date<br></br>
                    </p>
                    <p className="mb-5">{formatDate(influencer.createdAt)}</p>
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn
                      color="primary"
                      size="sm"
                      className="mt-5"
                      onClick={() =>
                        navigate(`/SelectCampaign/${influencer.user_id}`)
                      }
                    >
                      Invite
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
            Math.ceil(filteredInfluencers.length / InfluencersPerPage)
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
            Math.ceil(filteredInfluencers.length / InfluencersPerPage)
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

export default BrowseInf;
