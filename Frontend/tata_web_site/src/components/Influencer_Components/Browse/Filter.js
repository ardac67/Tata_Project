import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const FilterBar = () => {
  return (
    <MDBCol md="2">
      <MDBCard className="filter-bar">
        <MDBCardBody>
          <h2 className="mt-1 mb-5">Filters</h2>

          <h4 className="mb-3">Platform</h4>
          <div className="radio-buttons">
            <MDBCheckbox
              id="youtube"
              label={
                <div>
                  <MDBIcon fab icon="youtube" />
                  <span className="filter-label1"> Youtube</span>
                </div>
              }
            />
            <MDBCheckbox
              id="instagram"
              label={
                <div>
                  <MDBIcon fab icon="instagram" />
                  <span className="filter-label2"> Instagram</span>
                </div>
              }
            />
            <MDBCheckbox
              id="Tiktok"
              label={
                <div>
                  <span className="filter-label3"> Tiktok</span>
                </div>
              }
            />

            {/* Add more filter options as needed */}
          </div>
          <h4 className="mt-5 mb-3">Industry</h4>
          <div className="radio-buttons">
            <MDBCheckbox
              id="sport"
              label={
                <div>
                  <MDBIcon fas icon="futbol" />
                  <span className="filter-label4"> Sports</span>
                </div>
              }
            />
            <MDBCheckbox
              id="fashion"
              label={
                <div>
                  <MDBIcon fas icon="tshirt" />
                  <span className="filter-label5"> Fashion</span>
                </div>
              }
            />
            <MDBCheckbox
              id="Gaming"
              label={
                <div>
                  <MDBIcon fas icon="gamepad" />
                  <span className="filter-label6"> Gaming</span>
                </div>
              }
            ></MDBCheckbox>

            {/* Add more filter options as needed */}
          </div>
          <h4 className="mt-5 mb-3">Age Interval</h4>
          <div className="radio-buttons">
            <MDBCheckbox
              id="kids"
              label={
                <div>
                  <MDBIcon fas icon="baby" />
                  <span className="filter-label7"> Kids</span>
                </div>
              }
            />
            <MDBCheckbox
              id="young"
              label={
                <div>
                  <MDBIcon fas icon="tshirt" />
                  <span className="filter-label8"> Young</span>
                </div>
              }
            />
            <MDBCheckbox
              id="Elder"
              label={
                <div>
                  <MDBIcon fas icon="blind" />
                  <span className="filter-label9"> Elder</span>
                </div>
              }
            ></MDBCheckbox>

            {/* Add more filter options as needed */}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default FilterBar;
