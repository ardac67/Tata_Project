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
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookies from "universal-cookie";
import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import fetchCampaigns from "../Fetch/fetchCampaigns";
var socket = io.connect("http://localhost:3002");
export const AdvertiserNavbar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const [notList, setNotList] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const redirect = (path) => {
    navigate(path);
  };
  useEffect(() => {
    const handleMessageReceive = (data) => {
      setNotList((list) => [...list, data]);
    };
    socket.on("receive_not", handleMessageReceive);
    return () => {
      socket.off("receive_not", handleMessageReceive);
    };
  }, [socket]);

  const join_not = async () => {
    await socket.emit("join_camp", {
      user: user_id,
      user_name: user_name,
      notification: "",
    });
  };
  join_not();

  const logOut = () => {
    cookies.set("token", null, { path: "/" });
    cookies.set("full_name", null, { path: "/" });
    cookies.set("user_id", null, { path: "/" });
    cookies.set("type", null, { path: "/" });
    window.location.reload();
  };

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
                  {notList.length === 0 ? (
                    <MDBBadge pill color="success">
                      0
                    </MDBBadge>
                  ) : (
                    <MDBBadge pill color="danger">
                      {notList.length}
                    </MDBBadge>
                  )}

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
                <MDBDropdownMenu className="notification-dropdown-menu">
                  {notList.length === 0 ? (
                    <MDBDropdownItem className="text-center text-muted">
                      <MDBCard background="success" className="text-white mb-3">
                        <MDBCardHeader>Nothing New</MDBCardHeader>
                      </MDBCard>
                    </MDBDropdownItem>
                  ) : (
                    notList.map((val, index) => (
                      <MDBDropdownItem
                        link
                        key={val.id}
                        className="notification-item"
                      >
                        <MDBCard
                          background={
                            val.status === "Rejected" ? "danger" : "success"
                          }
                          className="text-white mb-3"
                        >
                          <MDBCardBody>
                            <MDBCardText>
                              Proposal on your campaign by {val.user_name}
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBDropdownItem>
                    ))
                  )}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                {/* <MDBBadge pill color="danger">
                  !
                </MDBBadge> */}
                <span>
                  <MDBIcon
                    far
                    icon="envelope"
                    style={{
                      fontSize: "1.5rem",
                      background: "none",
                      color: "#3b71ca",
                      border: "none",
                      marginTop: "5px",
                      transition: "color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => redirect("/ShowAllMessages")}
                    onMouseEnter={(e) => (e.target.style.color = "black")}
                    onMouseLeave={(e) => (e.target.style.color = "#3b71ca")}
                  />
                </span>
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
