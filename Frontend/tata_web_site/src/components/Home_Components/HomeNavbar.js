import "./HomeNavbar.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export const HomeNavbar = () => {
  const navigate = useNavigate();
  const redirectLogin = () => {
    let path = "/Login";
    navigate(path);
  };
  const redirectRegister = () => {
    let path = "/Register";
    navigate(path);
  };
  const [showNav, setShowNav] = useState(false);
  return (
    <MDBNavbar expand="lg" light bgColor="white" id="homeNavBar">
      <MDBContainer fluid>
        <MDBNavbarBrand
          to="/Home"
          style={{
            marginLeft: "45px",
            marginRight: "45px",
          }}
        >
          <Link to="/">TATA</Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        ></MDBNavbarToggler>
        <div className="d-flex justify-content-end">
          <MDBCollapse navbar show={showNav} style={{ marginRight: "45px" }}>
            <MDBNavbarNav>
              <MDBNavbarItem className="d-flex justify-content-center">
                <MDBBtn
                  style={{
                    backgroundColor: "rgb(79, 101, 241)",
                    backgroundImage:
                      "linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(97, 109, 245) 33%, rgb(92, 82, 235) 100%)",
                    width: "150px", // Adjust the width as needed
                  }}
                  onClick={redirectLogin}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      marginRight: "20px",
                      height: "17px",
                    }}
                  />{" "}
                  Login
                </MDBBtn>
              </MDBNavbarItem>
              <MDBBtn
                style={{
                  marginLeft: "20px",
                  backgroundColor: "rgb(79, 101, 241)",
                  backgroundImage:
                    "linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(97, 109, 245) 33%, rgb(92, 82, 235) 100%)",
                  width: "150px", // Adjust the width as needed
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={redirectRegister}
              >
                <FontAwesomeIcon
                  icon={faAddressCard}
                  style={{
                    marginRight: "20px",
                    height: "17px",
                  }}
                />
                Register
              </MDBBtn>
            </MDBNavbarNav>
          </MDBCollapse>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default HomeNavbar;
