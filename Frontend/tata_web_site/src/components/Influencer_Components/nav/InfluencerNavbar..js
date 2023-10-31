import "./InfluencerNavbar.css";
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const InfluencerNavbar = () => {
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
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
                onClick={() => redirect("/Browse")}
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
                  <MDBDropdownItem link>My Proposals</MDBDropdownItem>
                  <MDBDropdownItem link>My Colloborations</MDBDropdownItem>
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
                  <MDBDropdownItem link>Show all Messages</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link d-flex align-items-center"
                  href="#"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                    className="rounded-circle"
                    height="22"
                    alt="Avatar"
                    loading="lazy"
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem
                    link
                    onClick={() => redirect("/ViewProfile")}
                  >
                    View Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    onClick={() => redirect("/AccountSettings")}
                  >
                    Account Settings
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

export default InfluencerNavbar;