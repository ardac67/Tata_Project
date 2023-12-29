import "./AdvertiserNavbar.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBBtn,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdown,
  MDBIcon,
  MDBBadge,
} from "mdb-react-ui-kit";
import profileTest from "../test.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export const AdvertiserNavbar = () => {
  const navigate = useNavigate();
  const redirect = (path) => {
    navigate(path);
  };
  const cookies = new Cookies(null, { path: "/" });
  const logOut = () => {
    cookies.set("token", null, { path: "/" });
    cookies.set("full_name", null, { path: "/" });
    cookies.set("user_id", null, { path: "/" });
    cookies.set("type", null, { path: "/" });
    navigate("/Home");
    window.location.reload();
  };
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="white" id="homeNavBar">
      <MDBContainer fluid>
        <MDBNavbarBrand
          style={{ marginLeft: "50px" }}
          onMouseEnter={(e) => (e.target.style.fontWeight = "bold")}
          onMouseLeave={(e) => (e.target.style.fontWeight = "normal")}
        >
          <Link to="/">TATA</Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        ></MDBNavbarToggler>

        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav fullWidth={false}>
            <MDBNavbarItem>
              <MDBBtn
                style={{ width: "150px" }}
                onMouseEnter={(e) => (e.target.style.color = "black")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={() => navigate("/Browse")}
              >
                Browse
              </MDBBtn>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  style={{ width: "150px" }}
                  onMouseEnter={(e) => (e.target.style.color = "black")}
                  onMouseLeave={(e) => (e.target.style.color = "white")}
                >
                  Manage
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/Campaigns">
                    My Campaigns
                  </MDBDropdownItem>
                  <MDBDropdownItem link href="/MyCollaborations">
                    My Colloborations
                  </MDBDropdownItem>
                  <MDBDropdownItem link>Campaign Milesones</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav
            right
            fullWidth={false}
            className="mb-2 mb-lg-0 mr-2"
            style={{ marginRight: "50px" }}
          >
            <MDBBtn
              onMouseEnter={(e) => (e.target.style.color = "black")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
              onClick={() => navigate("/CreateCampaign")}
            >
              <FontAwesomeIcon
                icon={faSquarePlus}
                style={{ marginRight: "10px", color: "white" }}
              />{" "}
              Create Campaign
            </MDBBtn>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" id="notification">
                  <MDBBadge pill color="danger">
                    !
                  </MDBBadge>
                  <span>
                    <MDBIcon
                      icon="bell"
                      far
                      style={{
                        fontSize: "1.5rem",
                        background: "none",
                        color: "inherit",
                        border: "none",
                        marginTop: "5px",
                        transition: "color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "black")}
                      onMouseLeave={(e) => (e.target.style.color = "inherit")}
                    />
                  </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>not1</MDBDropdownItem>
                  <MDBDropdownItem link>not2</MDBDropdownItem>
                  <MDBDropdownItem link>not2</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" id="messages">
                  <MDBBadge pill color="danger">
                    !
                  </MDBBadge>
                  <span>
                    <MDBIcon
                      far
                      icon="envelope"
                      style={{
                        fontSize: "1.5rem",
                        background: "none",
                        color: "inherit",
                        border: "none",
                        marginTop: "5px",
                        transition: "color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "black")}
                      onMouseLeave={(e) => (e.target.style.color = "inherit")}
                    />
                  </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Message 1</MDBDropdownItem>
                  <MDBDropdownItem link>Message 2</MDBDropdownItem>
                  <MDBDropdownItem link>Message 3</MDBDropdownItem>
                  <MDBDropdownItem link onClick={() => redirect("/ShowAllMessages")}>Show all Messages</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link d-flex align-items-center"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "5px" }}
                  />
                  {cookies.get("full_name")}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/ViewProfile">
                    View Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem link href="/Settings">
                    Account Settings
                  </MDBDropdownItem>
                  <MDBDropdownItem link onClick={logOut}>
                    Log Out
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdvertiserNavbar;
