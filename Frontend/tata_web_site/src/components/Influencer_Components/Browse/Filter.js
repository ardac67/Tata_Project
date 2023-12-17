import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const FilterBar = ({ onFilterChange }) => {
  const [platformFilters, setPlatformFilters] = useState([]);
  // const [industryFilters, setIndustryFilters] = useState([]);
  const [tagsFilters, setTagsFilters] = useState([]);

  useEffect(() => {
    // Combine all selected filters and pass them to the parent component
    const selectedFilters = {
      platform: platformFilters,
      // industry: industryFilters,
      tags: tagsFilters,
    };

    // Apply filters immediately upon change
    onFilterChange(selectedFilters);
  }, [platformFilters, tagsFilters, onFilterChange]);

  return (
    <MDBCol md="2">
      <MDBCard className="filter-bar">
        <MDBCardBody>
          <h4 className="mb-3">Platform</h4>
          <div className="checkboxes">
            <MDBCheckbox
              id="youtube"
              label={
                <div>
                  <MDBIcon fab icon="youtube" />
                  <span className="filter-label1"> Youtube</span>
                </div>
              }
              checked={platformFilters.includes("youtube")}
              onChange={() =>
                setPlatformFilters((prevFilters) =>
                  prevFilters.includes("youtube")
                    ? prevFilters.filter((filter) => filter !== "youtube")
                    : [...prevFilters, "youtube"]
                )
              }
            />
            {/* Add similar checkboxes for other platform filters */}
          </div>

          {/* Industry Filters */}
          {/* Uncomment and add similar checkboxes for industry filters */}

          {/* Tags Filters */}
          <h4 className="mt-5 mb-3">Tags</h4>
          <div className="checkboxes">
            <MDBCheckbox
              id="summer"
              label={
                <div>
                  <span className="summerFilter">Summer</span>
                </div>
              }
              checked={tagsFilters.includes("Summer")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Summer")
                    ? prevFilters.filter((filter) => filter !== "Summer")
                    : ["Summer", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="test1"
              label={
                <div>
                  <span className="test1">Test1</span>
                </div>
              }
              checked={tagsFilters.includes("Test1")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Test1")
                    ? prevFilters.filter((filter) => filter !== "Test1")
                    : ["Test1", ...prevFilters]
                )
              }
            />
            {/* Add similar checkboxes for other tag filters */}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default FilterBar;
