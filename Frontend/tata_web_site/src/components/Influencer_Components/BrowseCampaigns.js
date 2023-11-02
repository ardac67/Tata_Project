import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";

function App() {
  return (
    <MDBCol md="6" xl="7">
      <MDBCard className="shadow-0 border rounded-3 mt-5">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom hover-overlay"
              >
                <MDBCardImage
                  src="https://cdn.discordapp.com/attachments/1049750616571924581/1169615345062006815/square_thumb__1-7.jpg?ex=65560c2c&is=6543972c&hm=625e5c1df99c32a9ba5712342b0f5150c6b3a17f0b77d6b5ebe5a7d5b2f31a35&"
                  fluid
                  className="w-100"
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
              <h5>Geryon food vacuum sealer- Keep food freshness</h5>
              <div className="mt-1 mb-0 text-muted small">
                <span>Cooking</span>
                <span className="text-primary"> • </span>
                <span>Lifestyle</span>
                <span className="text-primary"> • </span>
                <span>
                  Informative
                  <br />
                </span>
              </div>
              <div className="mb-2 text-muted small">
                <span>Unique design</span>
                <span className="text-primary"> • </span>
                <span>Kitchen</span>
                <span className="text-primary"> • </span>
                <span>
                  BBQ
                  <br />
                </span>
              </div>
              <p className=" text-truncate mb-4 mb-md-0">
              Geryon have been specialized in the small kitchen appliance field for over 6 years.
              We make the production of "GERYON®" brand vacuum sealers.
              All our products are pass FDA, ETL approved, and BPA-FREE certifications.
              </p>
              <p className="mb-4 mb-md-0">#lifestyle #cooking #BBQ
              </p>
            </MDBCol>
            <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
              <div className="d-flex flex-column mt-4">
                <MDBBtn color="primary" size="sm">
                  Campaign Details
                </MDBBtn>
                <MDBBtn outline color="success" size="sm" className="mt-2">
                  Propose
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom hover-overlay"
              >
                <MDBCardImage
                  src="https://ddxcu89oqzgqh.cloudfront.net/uploads/campaign/image/634ed91a51d0aa0a5265b75e/square_thumb_Wahool_loego.png"
                  fluid
                  className="w-100"
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
              <h5>Brand Ambassador/Influencer - Fashion</h5>
              <div className="mt-1 mb-0 text-muted small">
                <span>Cooking</span>
                <span className="text-primary"> • </span>
                <span>Lifestyle</span>
                <span className="text-primary"> • </span>
                <span>
                  Informative
                  <br />
                </span>
              </div>
              <div className="mb-2 text-muted small">
                <span>Unique design</span>
                <span className="text-primary"> • </span>
                <span>Kitchen</span>
                <span className="text-primary"> • </span>
                <span>
                  BBQ
                  <br />
                </span>
              </div>
              <p className="text-truncate mb-4 mb-md-0">We are WAHOOL, one of the fastest-growing commerce platforms,
               designed to empower creators & entrepreneurs to grow their revenue streams through the 
               power of live and social selling. We provide a simple and easy way to sell affordable, 
               trendy fashion products to online audiences by building and launching your online fashion shop in minutes.
              </p>
              <p className="mb-4 mb-md-0">#lifestyle #fashion #BBQ
              </p>              
            </MDBCol>
            <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
              <div className="d-flex flex-column mt-4">
                <MDBBtn color="primary" size="sm">
                  Campaign Details
                </MDBBtn>
                <MDBBtn outline color="success" size="sm" className="mt-2">
                  Propose
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default App;
