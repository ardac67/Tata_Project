import React from "react";
import {
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import BrowseCampaigns from "./BrowseCampaigns";
import FilterBar from "./Filter";

export default function Browse() {
  
  return (
    <>
      <MDBContainer fluid className="mt-5 w-75">
        <MDBRow center>
          <h1>Browse</h1>
          <MDBInputGroup>
            <MDBInput label="Search" />
            <MDBBtn rippleColor="dark">
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </MDBRow>
      </MDBContainer>

      <MDBContainer fluid>
        <MDBRow className="justify-content-center mt-5">
          <FilterBar />
          <BrowseCampaigns />
        </MDBRow>
      </MDBContainer>
    </>
  );
}
