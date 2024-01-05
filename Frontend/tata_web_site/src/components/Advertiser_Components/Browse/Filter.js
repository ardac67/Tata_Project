import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRadio,
  MDBBtn,
} from "mdb-react-ui-kit";

const FilterBar = ({ onFilterChange }) => {
  const [collaborationsCompletedFilters, setCollaborationsCompletedFilters] =
    useState("");
  const [subscribersFilters, setSubscribersFilters] = useState("");

  useEffect(() => {
    // Combine selected filters and pass them to the parent component
    const selectedFilters = {
      collaborationsCompleted: collaborationsCompletedFilters,
      subscribers: subscribersFilters,
    };

    // Apply filters immediately upon change
    onFilterChange(selectedFilters);
  }, [collaborationsCompletedFilters, subscribersFilters]);

  const handleClearFilters = () => {
    // Clear all filters
    setCollaborationsCompletedFilters("");
    setSubscribersFilters("");
  };

  return (
    <MDBCol md="2">
      <MDBCard className="filter-bar">
        <MDBCardBody>
          <h2 className="mt-1 mb-5">Filters</h2>

          {/* Collaborations Completed Filters */}
          <h4 className="mb-3 mt-5">Collaborations Completed</h4>
          <div className="radio-buttons">
            <MDBRadio
              id="cc_gt0"
              label={
                <div>
                  <span className="filter-label1"> More than 0</span>
                </div>
              }
              checked={collaborationsCompletedFilters === 0}
              onChange={() => setCollaborationsCompletedFilters(0)}
            />
            <MDBRadio
              id="cc_gt10"
              label={
                <div>
                  <span className="filter-label1"> More than 10</span>
                </div>
              }
              checked={collaborationsCompletedFilters === 10}
              onChange={() => setCollaborationsCompletedFilters(10)}
            />
            <MDBRadio
              id="cc_gt100"
              label={
                <div>
                  <span className="filter-label2"> More than 100</span>
                </div>
              }
              checked={collaborationsCompletedFilters === 100}
              onChange={() => setCollaborationsCompletedFilters(100)}
            />
            <MDBRadio
              id="cc_gt1000"
              label={
                <div>
                  <span className="filter-label3"> Less than 1000</span>
                </div>
              }
              checked={collaborationsCompletedFilters === 1000}
              onChange={() => setCollaborationsCompletedFilters(1000)}
            />
          </div>

          {/* Subscribers Filters */}
          <h4 className="mb-3 mt-5">Subscribers</h4>
          <div className="radio-buttons">
            <MDBRadio
              id="lt10k"
              label={
                <div>
                  <span className="filter-label1"> Less than 10,000</span>
                </div>
              }
              checked={subscribersFilters === 10000}
              onChange={() => setSubscribersFilters(10000)}
            />
            <MDBRadio
              id="lt100k"
              label={
                <div>
                  <span className="filter-label2"> Less than 100,000</span>
                </div>
              }
              checked={subscribersFilters === 100000}
              onChange={() => setSubscribersFilters(100000)}
            />
            <MDBRadio
              id="lt1m"
              label={
                <div>
                  <span className="filter-label3"> Less than 1,000,000</span>
                </div>
              }
              checked={subscribersFilters === 1000000}
              onChange={() => setSubscribersFilters(1000000)}
            />
          </div>
          <div className="mt-3">
            <MDBBtn color="danger" onClick={handleClearFilters}>
              Clear Filters
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default FilterBar;
