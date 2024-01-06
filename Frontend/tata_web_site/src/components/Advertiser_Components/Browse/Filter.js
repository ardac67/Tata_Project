import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRadio,
  MDBBtn,
} from "mdb-react-ui-kit";

const FilterBar = ({ onFilterChange }) => {
  const [totalProposalsFilter, setTotalProposalsFilter] = useState("");
  const [subscribersFilters, setSubscribersFilters] = useState("");
  const [ratingFilters, setRatingFilters] = useState("");

  useEffect(() => {
    // Combine selected filters and pass them to the parent component
    const selectedFilters = {
      totalProposals: totalProposalsFilter,
      subscribers: subscribersFilters,
      rating: ratingFilters,
      // Add more filters as needed
    };

    // Apply filters immediately upon change
    onFilterChange(selectedFilters);
  }, [totalProposalsFilter, subscribersFilters, ratingFilters]);

  const handleClearFilters = () => {
    setTotalProposalsFilter("");
    setSubscribersFilters("");
    setRatingFilters("");
  };

  return (
    <MDBCol md="2">
      <MDBCard className="filter-bar">
        <MDBCardBody>
          <h2 className="mt-1 mb-5">Filters</h2>

          <h4 className="mb-3 mt-5">Total Proposals</h4>
          <div className="radio-buttons">
            <MDBRadio
              id="tp_gt0"
              label={
                <div>
                  <span className="filter-label0"> More than 0</span>
                </div>
              }
              checked={totalProposalsFilter === 0}
              onChange={() => setTotalProposalsFilter(0)}
            />
            <MDBRadio
              id="tp_gt5"
              label={
                <div>
                  <span className="filter-label1"> More than 5</span>
                </div>
              }
              checked={totalProposalsFilter === 5}
              onChange={() => setTotalProposalsFilter(5)}
            />
            <MDBRadio
              id="tp_gt10"
              label={
                <div>
                  <span className="filter-label2"> More than 10</span>
                </div>
              }
              checked={totalProposalsFilter === 10}
              onChange={() => setTotalProposalsFilter(10)}
            />
            <MDBRadio
              id="tp_gt20"
              label={
                <div>
                  <span className="filter-label3"> More than 20</span>
                </div>
              }
              checked={totalProposalsFilter === 20}
              onChange={() => setTotalProposalsFilter(20)}
            />
            <MDBRadio
              id="tp_gt50"
              label={
                <div>
                  <span className="filter-label4"> More than 50</span>
                </div>
              }
              checked={totalProposalsFilter === 50}
              onChange={() => setTotalProposalsFilter(50)}
            />
          </div>

          <h4 className="mb-3 mt-5">Rating</h4>
          <div className="radio-buttons">
            <MDBRadio
              id="rating_gt4"
              label={
                <div>
                  <span className="filter-label1"> Rating greater than 4</span>
                </div>
              }
              checked={ratingFilters === 4}
              onChange={() => setRatingFilters(4)}
            />
            <MDBRadio
              id="rating_gt3"
              label={
                <div>
                  <span className="filter-label2"> Rating greater than 3</span>
                </div>
              }
              checked={ratingFilters === 3}
              onChange={() => setRatingFilters(3)}
            />
            <MDBRadio
              id="rating_gt2"
              label={
                <div>
                  <span className="filter-label3"> Rating greater than 2</span>
                </div>
              }
              checked={ratingFilters === 2}
              onChange={() => setRatingFilters(2)}
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
          <div className="mt-5">
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
