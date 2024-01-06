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
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import { useEffect } from "react";
var socket = io.connect("http://localhost:3002");

export const InfluencerNavbar = () => {
  const [notList, setNotList] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const redirect = (path) => {
    navigate(path);
  };
  var newData = {
    status: "Approved",
    proposed_user_id: user_id,
    user_id: user_id,
    campaign_id: "",
  };
  const join_not = async () => {
    await socket.emit("join_not", {
      user: user_id,
      user_name: user_name,
      notification: newData,
    });
  };
  join_not();
  useEffect(() => {
    const handleMessageReceive = (data) => {
      setNotList((list) => {
        // Example condition: only add data if someProperty meets a certain condition
        if (data.proposed_user_id === user_id) {
          return [...list, data];
        } else {
          return list;
        }
      });
    };
    socket.on("receive_notification", handleMessageReceive);
    return () => {
      socket.off("receive_notification", handleMessageReceive);
    };
  }, [socket]);

  const [showNav, setShowNav] = useState(false);
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
                  <MDBDropdownItem
                    link
                    onClick={() => redirect("/MyProposals")}
                  >
                    My Proposals
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    onClick={() => redirect("/MyCollaborations")}
                  >
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
            <MDBNavbarItem>
              <MDBBtn
                style={{ width: "160px" }}
                onMouseEnter={(e) => (e.target.style.color = "black")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
                onClick={() => redirect("/Browse")}
              >
                Create Proposal
              </MDBBtn>
            </MDBNavbarItem>
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
                          <MDBCardHeader>
                            {val.campaign_header.toUpperCase()}
                          </MDBCardHeader>
                          <MDBCardBody>
                            <MDBCardTitle>{val.status}</MDBCardTitle>
                            <MDBCardText>
                              Campaign proposal on {val.campaign_header} has
                              been {val.status}
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
              {/* <MDBBadge pill color='danger'>
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
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link d-flex align-items-center"
                  href="#"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "5px" }}
                  />
                  {cookies.get("full_name")}
                  <img
                    className="rounded-circle"
                    height="22"
                    alt=""
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
                  <MDBDropdownItem link onClick={logOut}>
                    Logout
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
