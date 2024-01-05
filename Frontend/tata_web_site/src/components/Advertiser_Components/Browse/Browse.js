import React, { useState } from "react";
import {
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import BrowseInf from "./BrowseInf";
import FilterBar from "./Filter";

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    collaborationsCompleted: null, // Set an initial value, or you can set it to null
    subscribers: null, // Set an initial value, or you can set it to null
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
          </MDBInputGroup>
        </MDBRow>
      </MDBContainer>

      <MDBContainer fluid>
        <MDBRow className="justify-content-center mt-5">
          <FilterBar onFilterChange={handleFilterChange} />
          <BrowseInf searchTerm={searchTerm} filters={selectedFilters} />
        </MDBRow>
      </MDBContainer>
    </>
  );
}
