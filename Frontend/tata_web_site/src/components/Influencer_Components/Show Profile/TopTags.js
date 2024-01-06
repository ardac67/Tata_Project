import { MDBCol, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import { MDBListGroup, MDBListGroupItem, MDBSpinner } from "mdb-react-ui-kit";
import { useQuery } from "@tanstack/react-query";
import fetchCollaboration from "./fetchCollaboration";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const TopTags = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const { id } = useParams();
  const result = useQuery(["collaboration", id, token], fetchCollaboration);
  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  var data = result.data.proposal;
  var index = data.length;

  const tags = data[index - 1]?.belongToCampaign?.campaing_tags[0];

  if (!tags) {
    return (
      <MDBCardBody align="center">
        <MDBCardText style={{ fontSize: "20px" }}>
          <MDBCol>
            <MDBListGroup style={{ minWidth: "22rem" }} light>
              <MDBListGroupItem
                noBorders
                color="primary"
                className="px-3 mb-2 rounded-3"
              >
                {"This User Has No Campaign Yet."}
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCol>
        </MDBCardText>
      </MDBCardBody>
    );
  }

  return (
    <MDBCardBody align="center">
      <MDBCardText style={{ fontSize: "20px" }}>
        <MDBCol>
          <MDBListGroup style={{ minWidth: "22rem" }} light>
            <MDBListGroupItem
              noBorders
              color="primary"
              className="px-3 mb-2 rounded-3"
            >
              {tags.tag1}
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color="primary"
              className="px-3 mb-2 rounded-3"
            >
              {tags.tag2}
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color="primary"
              className="px-3 mb-2 rounded-3"
            >
              {tags.tag3}
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color="primary"
              className="px-3 mb-2 rounded-3"
            >
              {tags.tag4}
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color="primary"
              className="px-3 mb-2 rounded-3"
            >
              {tags.tag5}
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
      </MDBCardText>
    </MDBCardBody>
  );
};

export default TopTags;
