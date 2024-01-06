import React, { useState } from "react";
import {
  MDBBadge,
  MDBSpinner,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import defaultImage from "../default.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import fetchCollaboration from "./fetchCollaboration";
import { formatDateAndHour, bufferToBase64 } from "../../../utils";

export default function MyCollaborations() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  const result = useQuery(
    ["collaboration", user_id, token],
    fetchCollaboration
  );
  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const data = result.data.proposal.filter((item) =>
    item.belongToCampaign.campaign_header
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="d-flex mt-4 ms-5">
        <h2>My Collaborations</h2>
      </div>
      <>
        <div className="d-flex justify-content-center mt-4">
          <MDBInputGroup className="w-50">
            <MDBInput
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MDBBtn rippleColor="dark">
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </div>
        <MDBTable align="middle mt-4">
          <MDBTableHead>
            <tr>
              <th scope="col">Collaboration ID</th>
              <th scope="col">Campaign</th>
              <th scope="col">Campaign Owner</th>
              <th scope="col">Created & End Date</th>
              <th scope="col">Campaing Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.length === 0 ? (
              <h1>No Collaborations Found</h1>
            ) : (
              data.map((data) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{data.collaboration_id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      onClick={() =>
                        navigate(
                          `/CampaignDetails/${data.belongToCampaign.campaign_id}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                      className="hover-link"
                    >
                      {data.belongToCampaign.campaign_description}
                    </a>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          data.belongToUser.user_image
                            ? ` data:image/jpeg;base64,${bufferToBase64(
                                data.belongToUser.user_image.data
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
                          style={{ cursor: "pointer" }}
                          className="hover-link fw-bold"
                          onClick={() =>
                            navigate(
                              `/ShowProfile/${data.belongToCampaign.user_id}`
                            )
                          }
                        >
                          {data.belongToCampaign.user.name}
                        </p>
                        <p className="text-muted mb-0">
                          {data.belongToCampaign.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {formatDateAndHour(data.belongToCampaign.startedAt)} -{" "}
                    {formatDateAndHour(data.belongToCampaign.endedAt)}
                  </td>
                  <td>
                    <MDBBadge
                      color={
                        data.belongToCampaign.status === "Ended"
                          ? "danger"
                          : "success"
                      }
                      pill
                    >
                      {data.belongToCampaign.status}
                    </MDBBadge>
                  </td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </>
    </>
  );
}
