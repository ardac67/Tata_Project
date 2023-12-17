import { React, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    platform: [],
    // industry: [],
    tags: [],
  });
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      <MDBContainer fluid className="mt-5 w-75">
        <MDBRow center>
          <h1>Browse</h1>
          <MDBInputGroup>
            <MDBInput
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MDBBtn rippleColor="dark">
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </MDBRow>
      </MDBContainer>

      <MDBContainer fluid>
        <MDBRow className="justify-content-center mt-5">
          <FilterBar onFilterChange={handleFilterChange} />
          <BrowseCampaigns searchTerm={searchTerm} filters={selectedFilters} />
        </MDBRow>
      </MDBContainer>
    </>
  );
}
