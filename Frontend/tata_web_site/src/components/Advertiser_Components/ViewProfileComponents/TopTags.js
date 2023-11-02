import { MDBCol, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit'
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit'
import {
  faEnvelope,
  faAddressBook,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const TopTags = () => {
  return (
    <MDBCardBody align="center">
      <MDBCardText style={{ fontSize: '20px' }}>
        <MDBCol>
          <MDBListGroup style={{ minWidth: '22rem' }} light>
            <MDBListGroupItem
              noBorders
              color='primary'
              className='px-3 mb-2 rounded-3'
            >
              Technology
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color='primary'
              className='px-3 mb-2 rounded-3'
            >
              Fitness
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color='primary'
              className='px-3 mb-2 rounded-3'
            >
              Cosmetic
            </MDBListGroupItem>
            <MDBListGroupItem
              noBorders
              color='primary'
              className='px-3 mb-2 rounded-3'
            >
              Care Giving
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
      </MDBCardText>
    </MDBCardBody>
  )
}

export default TopTags
