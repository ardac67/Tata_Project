import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
  MDBInputGroup,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import fetchProposal from "../../Advertiser_Components/Fetch/fetchIndividualProposals";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import defaultImage from "../../Advertiser_Components/default.jpg";
import { bufferToBase64 } from "../../../utils";
export default function MyProposals() {
  function formatDateAndHour(dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, "0");
    let hour = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minutes}`;
  }
  const [hoveredUser, setHoveredUser] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const id = cookies.get("user_id");
  const result = useQuery(["proposalIndidual", id, token], fetchProposal);

  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  var data = result.data.proposal;
  console.log(data);
  const redirect = (path) => {
    navigate(path);
  };
  return (
    <>
      <div className="d-flex mt-4 ms-5">
        <h2>My Proposals</h2>
      </div>
      <>
        <div className="d-flex justify-content-center mt-4">
          <MDBInputGroup className="w-50">
            <MDBInput label="Search" />
            <MDBBtn rippleColor="dark">
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </div>
        <MDBTable align="middle mt-4">
          <MDBTableHead>
            <tr>
              <th scope="col">Proposal ID</th>
              <th scope="col">Campaign</th>
              <th scope="col">Campaign Owner</th>
              <th scope="col">Proposal Status</th>
              <th scope="col">Created Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.length === 0 ? (
              <h1>No Proposal Found</h1>
            ) : (
              data.map((data) => (
                <tr>
                  <p hidden> {data.belongsToCampaign.campaign_id}</p>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{data.proposal_id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      onClick={() =>
                        redirect(
                          `/CampaignDetails/${data.belongsToCampaign.campaign_id}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="hover-link"
                    >
                      {data.belongsToCampaign.campaign_header}
                    </a>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          data.belongsToCampaign.user.user_image
                            ? `data:image/jpeg;base64,${bufferToBase64(
                                data.belongsToCampaign.user.user_image.data
                              )}`
                            : defaultImage // Provide a placeholder image
                        }
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "60px" }}
                        fluid
                      />
                      <div className="ms-3">
                        <p
                          className="mb-1 mt-2 fw-bold"
                          style={{
                            color:
                              hoveredUser === data.proposal_id
                                ? "blue"
                                : "black",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(
                              `/ShowProfile/${data.belongsToCampaign.user_id}`
                            )
                          }
                          onMouseEnter={() => setHoveredUser(data.proposal_id)}
                          onMouseLeave={() => setHoveredUser(null)}
                        >
                          {data.belongsToCampaign.user.name}
                        </p>
                        <p className="text-muted mb-0">
                          {data.belongsToCampaign.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.proposal_status === "pending" ? (
                      <MDBBadge color="warning" pill>
                        Pending
                      </MDBBadge>
                    ) : data.proposal_status === "Rejected" ? (
                      <MDBBadge color="danger" pill>
                        Rejected
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="success" pill>
                        Approved
                      </MDBBadge>
                    )}
                  </td>

                  <td>{formatDateAndHour(data.createdAt)}</td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </>
    </>
  );
}
