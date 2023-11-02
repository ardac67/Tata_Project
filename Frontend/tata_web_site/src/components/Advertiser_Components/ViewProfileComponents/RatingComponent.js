import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { CardBody } from 'react-bootstrap'
const RatingComponent = () => {
  return (
    <div>
      Showing 1 - 5 out of 31 reviews
      <MDBCardBody className='square border border-3'>
        <MDBRow>
          <MDBCardHeader style={{ fontSize: '15px' }}>
            📊 Data-Driven Strategies | 🎨 Creative Ads | 💡 Expert Guidance
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardText style={{ marginTop: '10px' }}>
              David delivered not only the project goals itself, but went above
              & beyond while communicating with the team, suggesting changes to
              the functionality that was incorrectly designed, adding nice
              touches here and there that were not accounted for, but are
              aesthetically pleasing, as well as was able to work overtime to
              meet the deadlines and deliver the product in time.
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
      <MDBCardBody className='square border border-3'>
        <MDBRow>
          <MDBCardHeader style={{ fontSize: '15px' }}>
            📊 Data-Driven Strategies | 🎨 Creative Ads | 💡 Expert Guidance
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardText style={{ marginTop: '10px' }}>
              David delivered not only the project goals itself, but went above
              & beyond while communicating with the team, suggesting changes to
              the functionality that was incorrectly designed, adding nice
              touches here and there that were not accounted for, but are
              aesthetically pleasing, as well as was able to work overtime to
              meet the deadlines and deliver the product in time.
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
      <MDBCardBody className='square border border-3'>
        <MDBRow>
          <MDBCardHeader style={{ fontSize: '15px' }}>
            📊 Data-Driven Strategies | 🎨 Creative Ads | 💡 Expert Guidance
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardText style={{ marginTop: '10px' }}>
              David delivered not only the project goals itself, but went above
              & beyond while communicating with the team, suggesting changes to
              the functionality that was incorrectly designed, adding nice
              touches here and there that were not accounted for, but are
              aesthetically pleasing, as well as was able to work overtime to
              meet the deadlines and deliver the product in time.
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
    </div>
  )
}

export default RatingComponent
