import React from "react";
import {
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import BrowseCampaigns from "./BrowseCampaigns";
import FilterBar from "./Filter";

export default function Browse() {
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <MDBInputGroup className="w-50">
          <MDBInput label="Search" />
          <MDBBtn rippleColor="dark">
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      <MDBRow className="justify-content-center">
        <FilterBar />
        <BrowseCampaigns />
      </MDBRow>
    </>
  );
}
