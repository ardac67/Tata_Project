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
  }, [platformFilters, tagsFilters]);

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
              id="DIY"
              label={
                <div>
                  <span className="DIYFilter">DIY</span>
                </div>
              }
              checked={tagsFilters.includes("DIY")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("DIY")
                    ? prevFilters.filter((filter) => filter !== "DIY")
                    : ["DIY", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Wellness"
              label={
                <div>
                  <span className="WellnessFilter">Wellness</span>
                </div>
              }
              checked={tagsFilters.includes("Wellness")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Wellness")
                    ? prevFilters.filter((filter) => filter !== "Wellness")
                    : ["Wellness", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Beauty"
              label={
                <div>
                  <span className="BeautyFilter">Beauty</span>
                </div>
              }
              checked={tagsFilters.includes("Beauty")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Beauty")
                    ? prevFilters.filter((filter) => filter !== "Beauty")
                    : ["Beauty", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Tech"
              label={
                <div>
                  <span className="TechFilter">Tech</span>
                </div>
              }
              checked={tagsFilters.includes("Tech")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Tech")
                    ? prevFilters.filter((filter) => filter !== "Tech")
                    : ["Tech", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Eco"
              label={
                <div>
                  <span className="EcoFilter">Eco</span>
                </div>
              }
              checked={tagsFilters.includes("Eco")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Eco")
                    ? prevFilters.filter((filter) => filter !== "Eco")
                    : ["Eco", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Fashion"
              label={
                <div>
                  <span className="FashionFilter">Fashion</span>
                </div>
              }
              checked={tagsFilters.includes("Fashion")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Fashion")
                    ? prevFilters.filter((filter) => filter !== "Fashion")
                    : ["Fashion", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Gourmet"
              label={
                <div>
                  <span className="GourmetFilter">Gourmet</span>
                </div>
              }
              checked={tagsFilters.includes("Gourmet")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Gourmet")
                    ? prevFilters.filter((filter) => filter !== "Gourmet")
                    : ["Gourmet", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Travel"
              label={
                <div>
                  <span className="TravelFilter">Travel</span>
                </div>
              }
              checked={tagsFilters.includes("Travel")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Travel")
                    ? prevFilters.filter((filter) => filter !== "Travel")
                    : ["Travel", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Parenting"
              label={
                <div>
                  <span className="ParentingFilter">Parenting</span>
                </div>
              }
              checked={tagsFilters.includes("Parenting")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Parenting")
                    ? prevFilters.filter((filter) => filter !== "Parenting")
                    : ["Parenting", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Fitness"
              label={
                <div>
                  <span className="FitnessFilter">Fitness</span>
                </div>
              }
              checked={tagsFilters.includes("Fitness")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Fitness")
                    ? prevFilters.filter((filter) => filter !== "Fitness")
                    : ["Fitness", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Entertainment"
              label={
                <div>
                  <span className="EntertainmentFilter">Entertainment</span>
                </div>
              }
              checked={tagsFilters.includes("Entertainment")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Entertainment")
                    ? prevFilters.filter((filter) => filter !== "Entertainment")
                    : ["Entertainment", ...prevFilters]
                )
              }
            /><MDBCheckbox
              id="Finance"
              label={
                <div>
                  <span className="FinanceFilter">Finance</span>
                </div>
              }
              checked={tagsFilters.includes("Finance")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Finance")
                    ? prevFilters.filter((filter) => filter !== "Finance")
                    : ["Finance", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Gaming"
              label={
                <div>
                  <span className="GamingFilter">Gaming</span>
                </div>
              }
              checked={tagsFilters.includes("Gaming")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Gaming")
                    ? prevFilters.filter((filter) => filter !== "Gaming")
                    : ["Gaming", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Learning"
              label={
                <div>
                  <span className="LearningFilter">Learning</span>
                </div>
              }
              checked={tagsFilters.includes("Learning")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Learning")
                    ? prevFilters.filter((filter) => filter !== "Learning")
                    : ["Learning", ...prevFilters]
                )
              }
            />
            <MDBCheckbox
              id="Pets"
              label={
                <div>
                  <span className="PetsFilter">Pets</span>
                </div>
              }
              checked={tagsFilters.includes("Pets")}
              onChange={() =>
                setTagsFilters((prevFilters) =>
                  prevFilters.includes("Pets")
                    ? prevFilters.filter((filter) => filter !== "Pets")
                    : ["Pets", ...prevFilters]
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
