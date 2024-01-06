import {
  MDBCol,
  MDBCardBody,
  MDBCardText,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import {
  faEnvelope,
  faAddressBook,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import fetchContact from '../Fetch/fetchContact'
import { useParams } from 'react-router-dom'
const ContactMainProfile = ({user}) => {
  const cookies = new Cookies(null, { path: '/' })
  const {id} = useParams()
  const token = cookies.get('token')
  const result = useQuery(['contact', id,token], fetchContact)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var contact_data = result.data.user

  return (
    <MDBCardBody>
      <MDBCardText style={{ fontSize: '20px' }}>
        <MDBCol>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />{' '}
          {user.email}
        </MDBCol>
        <MDBCol>
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />{' '}
          {contact_data.phone}
        </MDBCol>
        <MDBCol>
          <FontAwesomeIcon
            icon={faAddressBook}
            style={{ marginRight: '10px' }}
          />{' '}
          {contact_data.address}
        </MDBCol>
      </MDBCardText>
    </MDBCardBody>
  )
}

export default ContactMainProfile
