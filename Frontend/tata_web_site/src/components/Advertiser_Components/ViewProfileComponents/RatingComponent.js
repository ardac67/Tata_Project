import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { CardBody } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
import fetchRatings from './fetchRatings'
function formatDateAndHour (dateStr) {
  let date = new Date(dateStr)
  let year = date.getFullYear()
  let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, '0')
  let hour = date.getHours()
  let minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minutes}`
}

const RatingComponent = () => {

  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const result = useQuery(['rating', user_id, token], fetchRatings)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  console.log("asdsadsad", result.data)
  return (
    <div>
      Showing 1 - {result.data.rating.length} out of {result.data.rating.length} reviews
      {!result.data.rating.length ? (
        <h1>No collaborations yet</h1>
      ) : (
        result.data.rating.map((rating) => (
          <MDBCardBody className='square border border-3'>
            <MDBRow>
              <MDBCardHeader style={{ fontSize: '15px' }}>
                📊 {formatDateAndHour(rating.createdAt)}
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText style={{ marginTop: '10px' }}>
                {rating.rating_text}
                </MDBCardText>
                <MDBCardText style={{ marginTop: '10px' }}>
                  Tags: #Data-Driven #Strategies #Creative #Ads #Expert #Guidance
                </MDBCardText>
                <MDBCardText style={{ marginTop: '10px' }}>
                  Taha Eren S. @tshain 8 days ago
                </MDBCardText>
              </MDBCardBody>
              <MDBRow
                style={{
                  fontSize: '15px'
                }}
              ></MDBRow>
            </MDBRow>
          </MDBCardBody>
        ))
      )}
    </div>
  )
}

export default RatingComponent
