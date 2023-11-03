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
import Cookies from 'universal-cookie'
import fetchMedia from '../Fetch/fetchMedia'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
const MediaEdit = () => {
  const [buttonStateContact, setButtonStateContact] = useState(true)
  const [newData, setNewData] = useState({})
  const cookies = new Cookies(null, { path: '/' })
  const id = cookies.get('user_id')
  const token = cookies.get('token')

  const result = useQuery(['media', id, token], fetchMedia)
  if (result.isLoading) {
    return (
      <MDBSpinner
        style={{ marginLeft: '50%', marginRight: '50%' }}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var user = result.data
  const handleEdit = e => {
    if (e.target.value === user.data[0].twitter && e.target.value === user.data[0].instagram && e.target.value === user.data[0].youtube && e.target.value === user.data[0].tiktok) {
      setButtonStateContact(true) // Deactivate the button
    } else {
      setButtonStateContact(false) // Enable the button
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
      .put(`http://localhost:3001/api/updateMediaLinks/${id}`, newData, {
        headers
      })
      .then(response => {
        toast.success('Succesfully Updated', {
          position: toast.POSITION.TOP_LEFT
        })
        result.refetch()
        setButtonStateContact(true)
      })
      .catch(error => {
        toast.warning('Succesfully Updated', {
          position: toast.POSITION.TOP_LEFT
        })
      })
  }
  return (
    <MDBCardBody>
      <ToastContainer></ToastContainer>
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
              Twitter
            </h6>
          </MDBCol>
          <MDBCol md='4' className='justify-content-start'>
            <MDBInput
              label='Twitter'
              id='formControlDefault'
              type='text'
              name='twitter'
              defaultValue={user.data[0].twitter}
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
              Instagram
            </h6>
          </MDBCol>
          <MDBCol md='4' className='justify-content-start'>
            <MDBInput
              label='Instagram'
              id='formControlDefault'
              type='text'
              name='twitter'
              defaultValue={user.data[0].instagram}
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
              Youtube
            </h6>
          </MDBCol>
          <MDBCol md='4' className='justify-content-start'>
            <MDBInput
              label='Youtube'
              id='formControlDefault'
              type='text'
              name='twitter'
              defaultValue={user.data[0].youtube}
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
              Tiktok
            </h6>
          </MDBCol>
          <MDBCol md='4' className='justify-content-start'>
            <MDBInput
              label='Tiktok'
              id='formControlDefault'
              type='text'
              name='twitter'
              defaultValue={user.data[0].tiktok}
              onChange={handleEdit}
            />
          </MDBCol>
        </MDBRow>
      </MDBCardText>
      <MDBBtn disabled={buttonStateContact} onClick={pushEditUser}>
        Edit
      </MDBBtn>
    </MDBCardBody>
  )
}

export default MediaEdit
