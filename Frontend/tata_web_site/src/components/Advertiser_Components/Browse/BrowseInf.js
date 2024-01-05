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
import fetchAllInf from "../Fetch/fetchAllInf";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { bufferToBase64 } from "../../../utils";
import defaultImage from "../../Influencer_Components/default.jpg";
import FetchRatingsComponent from "./fetchRatingsComponent";

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

function BrowseInf({ searchTerm }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const InfluencersPerPage = 5; // Adjust this according to your needs

  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const result = useQuery(["InfluencerAll", token], fetchAllInf);
  const hashMap = {
    key1: "value1",
  };

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
  const collabs = result.data;
  console.log("influencers: ", influencers);
  console.log("collabs: ", collabs);
  // Filter campaigns based on the search term
  const filteredInfluencers = influencers.filter((influencer) =>
    influencer.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  for (var i = 0; i < collabs.influencer.length; i++) {
    hashMap[collabs.influencer[i].user_id] =
      collabs.influencer[i].proposal.length;
  }

  // Reset current page when searchTerm changes
  if (currentPage !== 1 && searchTerm) {
    setCurrentPage(1);
  }

  // Calculate the indexes of the campaigns to be displayed on the current page
  const indexOfLastInfluencer = currentPage * InfluencersPerPage;
  const indexOfFirstInfluencer = indexOfLastInfluencer - InfluencersPerPage;
  const currentInfluencers = filteredInfluencers.slice(
    indexOfFirstInfluencer,
    indexOfLastInfluencer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log({ influencers });
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
                    <span className="">Total Proposals</span>
                    <span className="text-success ms-2 me-2">
                      {hashMap[influencer.user_id]}
                    </span>
                    <span className="ms-2">Rating </span>
                    <span className="text-success ms-2 me-2"> <FetchRatingsComponent user_id={ influencer.user_id}/></span>
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
                    <MDBBtn color="primary" size="sm" className="mt-5">
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
