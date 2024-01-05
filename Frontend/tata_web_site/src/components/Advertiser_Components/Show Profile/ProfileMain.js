import { MDBRow, MDBCol, MDBCardBody, MDBBtn,MDBSpinner } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faThumbsUp,faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import fetchCollaboration from './fetchCollaboration'
import fetchRatings from "../ViewProfileComponents/fetchRatings";
import { useQuery } from '@tanstack/react-query'
import defaultImage from "../default.jpg";
import Cookies from 'universal-cookie'
import { bufferToBase64 } from "../../../utils";

function formatDate(dateStr) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, "0");
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDate(){
// Create a new Date object
var currentDate = new Date();

// Get the current date components
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
var day = currentDate.getDate();

// Format the date as a string (you can customize the format as needed)
var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
return formattedDate;
}

const ProfileMain = ({ user }) => {
  const navigate = useNavigate();
  const editButton = () => {
    navigate("/AccountSettings");
  };
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const {id} = useParams()
  const result2 = useQuery(['rating1', id, token], fetchRatings)
  const result = useQuery(['collaboration', id, token], fetchCollaboration)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
console.log("İDDDD",id)
  console.log('asdsadsad', result2)
  var rating_sum = 0
  var rating_average = 0
  var counter = 0
  if(result2 != undefined){
  for (var i = 0; i < result2.data.rating.length; i++) {
    rating_sum += result2.data.rating[i].rating
    if (result2.data.rating[i].rating === 5) {
      counter++
    }
  }
  rating_average = rating_sum / result2.data.rating.length
}
 console.log("sssssssssss")
  console.log(result)
  var data = result.data.proposal
  var index =data.length;
  console.log("sayıııı : " + index)
  var ongoing_collaborations = [];
  var completed_collaborations = [];

  for(var i=0;i<index;i++){
    var campaignEndDate = formatDate(data[i].belongToCampaign.endedAt)
    var todayDate = getDate();
    if(campaignEndDate < todayDate){
      completed_collaborations.push(data[i])
    }
    if(campaignEndDate >= todayDate){
      ongoing_collaborations.push(data[i])
    }
  }

  var num_of_completed_collaborations = completed_collaborations.length;

  var num_of_ongoing_collaborations = ongoing_collaborations.length;

  function parseDateString(dateString) {
    const parsedDate = new Date(dateString);
    return parsedDate;
  }

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
              marginLeft: '19px',
              fontSize: '20px',
              marginTop: '10px'
            }}
          >
            {(() => {
              const stars = []
              for (var i = 0; i < Math.floor(rating_average); i++) {
                stars.push(
                  <MDBCol md='1' key={i}>
                    <FontAwesomeIcon icon={faStar} />
                  </MDBCol>
                )
              }

              // Check if there's a half star to add
              if (rating_average % 1 >= 0.5) {
                stars.push(
                  <MDBCol md='1' key={'half'}>
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                  </MDBCol>
                )
              }

              return stars
            })()}

            <MDBCol md='7'>
              ({rating_average.toFixed(1)}) {result2.data.rating.length} Reviews
            </MDBCol>
          </MDBRow>
          <MDBRow
            style={{
              marginLeft: "19px",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            <MDBCol md="6">
              <MDBRow style={{color:"#4040a1"}}>{num_of_completed_collaborations} Collaborations Completed</MDBRow>
              <MDBRow style={{color:"#feb236"}}>{num_of_ongoing_collaborations} Ongoing Collaborations</MDBRow>
            </MDBCol>
            <MDBCol md="6">
              <MDBRow>
              </MDBRow>
              <MDBCol>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ marginRight: '10px' }}
                />{' '}
                {counter} Recommendations
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
