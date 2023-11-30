import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBTextArea,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { ToastContainer, toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import fetchUser from '../Fetch/fetchUser'
import { useState } from 'react'
import axios from 'axios'
import ContactEdit from './ContactEdit'
import MediaEdit from './MediaEdit' 
const EditUserInformation = () => {
  const [buttonState, setButtonState] = useState(true)
  const [newData, setNewData] = useState({})
  const cookies = new Cookies(null, { path: '/' })
  const id = cookies.get('user_id')
  const token = cookies.get('token')

  const result = useQuery(['user', id, token], fetchUser)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const user = result.data.user
  const handleEdit = e => {
    if (
      e.target.value === user.user_name &&
      e.target.value === user.email &&
      e.target.value === user.name &&
      e.target.value === user.description
    ) {
      setButtonState(true) // Deactivate the button
    } else {
      setButtonState(false) // Enable the button
    }

    setNewData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const pushEditUser = async () => {
    axios
      .put(`http://localhost:3001/api/updateUser/${id}`, newData, { headers })
      .then(response => {
        toast.success('Succesfully Updated', {
          position: toast.POSITION.TOP_LEFT
        })
        result.refetch()
        setButtonState(true)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div>
      <ToastContainer />
      <MDBRow>
        <MDBCol md='2'>
          {' '}
          <MDBListGroup style={{ minWidth: '8rem' }} light>
            <MDBListGroupItem
              tag='a'
              href='#userInfo'
              action
              noBorders
              aria-current='true'
              className='px-3'
            >
              PROFILE
            </MDBListGroupItem>
            <MDBListGroupItem
              tag='a'
              href='#userContact'
              action
              noBorders
              className='px-3'
            >
              CONTACT
            </MDBListGroupItem>
            <MDBListGroupItem
              tag='a'
              href='#userMedia'
              action
              noBorders
              className='px-3'
            >
              MEDIA LINKS
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
        <MDBCol md='10' id='userInfo'>
          <MDBCard>
            <MDBCardHeader
              style={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginTop: '20px'
              }}
            >
              User Informations
            </MDBCardHeader>
            <MDBCardBody>
              <MDBCardText>
                <MDBRow>
                  <MDBCol md='2'>
                    <h6
                      style={{
                        marginTop: '5px',
                        color: '#7d8fb1',
                        fontWeight: '400'
                      }}
                    >
                      USER NAME
                    </h6>
                  </MDBCol>
                  <MDBCol md='4' className='justify-content-start'>
                    <MDBInput
                      label='USERNAME'
                      id='formControlDefault'
                      type='text'
                      name='user_name'
                      defaultValue={user.user_name}
                      onChange={handleEdit}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: '10px' }}>
                  <MDBCol md='2'>
                    <h6
                      style={{
                        marginTop: '5px',
                        color: '#7d8fb1',
                        fontWeight: '400'
                      }}
                    >
                      EMAIL
                    </h6>
                  </MDBCol>
                  <MDBCol md='4' className='justify-content-start'>
                    <MDBInput
                      label='EMAIL'
                      id='formControlDefault'
                      type='email'
                      name='email'
                      defaultValue={user.email}
                      onChange={handleEdit}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: '10px' }}>
                  <MDBCol md='2'>
                    <h6
                      style={{
                        marginTop: '5px',
                        color: '#7d8fb1',
                        fontWeight: '400'
                      }}
                    >
                      FULL NAME
                    </h6>
                  </MDBCol>
                  <MDBCol md='4' className='justify-content-start'>
                    <MDBInput
                      label='FULL NAME'
                      id='FULLNAME'
                      type='text'
                      name='name'
                      defaultValue={user.name}
                      onChange={handleEdit}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: '10px' }}>
                  <MDBCol md='2'>
                    <h6
                      style={{
                        marginTop: '5px',
                        color: '#7d8fb1',
                        fontWeight: '400'
                      }}
                    >
                      DESCRIPTION
                    </h6>
                  </MDBCol>
                  <MDBCol md='10' className='justify-content-start'>
                    <MDBTextArea
                      label='DESCRIPTION'
                      id='textAreaExample'
                      rows={8}
                      name='description'
                      defaultValue={user.description}
                      onChange={handleEdit}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardText>
              <MDBBtn disabled={buttonState} onClick={pushEditUser}>
                Edit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
          <MDBCard id='userContact' style={{ marginTop: '25px' }}>
            <MDBCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Contact
            </MDBCardHeader>
            
       
                <ContactEdit></ContactEdit>
         
              
          </MDBCard>
          <MDBCard id='userMedia' style={{ marginTop: '25px' }}>
            <MDBCardHeader style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Media Links
            </MDBCardHeader>
           <MediaEdit></MediaEdit>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default EditUserInformation
