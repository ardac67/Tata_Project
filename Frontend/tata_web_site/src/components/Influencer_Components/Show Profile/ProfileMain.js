import { MDBRow, MDBCol, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import defaultImage from "../default.jpg";
import { bufferToBase64 } from "../../../utils";

const ProfileMain = ({ user }) => {
  function parseDateString(dateString) {
    const parsedDate = new Date(dateString);
    return parsedDate;
  }
  const navigate = useNavigate();

  return (
    <MDBCardBody>
      <MDBRow>
        <MDBCol md="5">
          {" "}
          <MDBRow>
            <img
              src={
                user.user_image
                  ? `data:image/jpeg;base64,${bufferToBase64(
                      user.user_image.data
                    )}`
                  : defaultImage // Provide a placeholder image
              }
              style={{
                width: "300px", // Adjust as needed
                height: "300px", // Adjust as needed
                objectFit: "cover",
              }}
            />
          </MDBRow>
        </MDBCol>
        <MDBCol md="7">
          <MDBRow style={{ marginLeft: "10px", fontSize: "28px" }}>
            <MDBCol md="8">
              {user.name} @{user.user_name}
            </MDBCol>
            <MDBCol md="4" className="d-flex justify-content-end">
            </MDBCol>
          </MDBRow>
          <MDBRow
            style={{
              marginLeft: "19px",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            <MDBCol md="6">{user.Type}</MDBCol>
            <MDBCol md="6" className="d-flex justify-content-end">
              {parseDateString(user.createdAt).toDateString()}
            </MDBCol>
          </MDBRow>
          <MDBRow
            style={{
              marginLeft: "19px",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            <MDBCol md="1">
              <FontAwesomeIcon icon={faStar} />
            </MDBCol>
            <MDBCol md="1">
              <FontAwesomeIcon icon={faStar} />
            </MDBCol>
            <MDBCol md="1">
              <FontAwesomeIcon icon={faStar} />
            </MDBCol>
            <MDBCol md="1">
              <FontAwesomeIcon icon={faStar} />
            </MDBCol>
            <MDBCol md="1">
              <FontAwesomeIcon icon={faStar} />
            </MDBCol>
            <MDBCol md="7">(0.0) 0 Reviews</MDBCol>
          </MDBRow>
          <MDBRow
            style={{
              marginLeft: "19px",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            <MDBCol md="6">
              <MDBRow>N/A Collaboration Completed</MDBRow>
              <MDBRow>N/A Ongoing Campaign</MDBRow>
            </MDBCol>
            <MDBCol md="6">
              <MDBRow>
                <MDBCol>N/A Collaboration Completed</MDBCol>
              </MDBRow>
              <MDBCol>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ marginRight: "10px" }}
                />{" "}
                123 Recommendations
              </MDBCol>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow
        style={{
          marginTop: "25px",
          marginLeft: "15px",
          lineHeight: "1.3",
          fontSize: "19px",
        }}
      >
        {user.description}
      </MDBRow>
    </MDBCardBody>
  );
};

export default ProfileMain;
