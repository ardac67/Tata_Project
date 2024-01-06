import { MDBRow } from "mdb-react-ui-kit";
import EditUserInformation from "./EditUserInformation";
const EditProfile = () => {
  return (
    <div
      style={{
        marginTop: "2.5rem",
        marginRight: "5%",
        marginLeft: "5%",
      }}
    >
      <h4 className="mb-3">Profile</h4>
      <MDBRow style={{ marginBottom: "10px", marginTop: "30px" }}>
        <EditUserInformation />
      </MDBRow>
    </div>
  );
};

export default EditProfile;
