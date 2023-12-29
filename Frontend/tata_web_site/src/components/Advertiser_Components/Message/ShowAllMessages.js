import React from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import fetchCollaboration from '../ManageComponents/fetchCollaboration'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'
import { create } from '@mui/material/styles/createTransitions'
import getMessage from './getMessage'
var socket = io.connect('http://localhost:3002')
export default function App () {
  const navigate = useNavigate()
  const [messageList, setMessageListe] = useState([])
  const [room_idd, setRoom] = useState('')
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const user_name = cookies.get('user_name')
  const [message, setMessage] = useState('')
  const [idLast, setID] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  const setMessageList = e => {
    setMessage(e.target.value)
  }
  const messageData = useQuery(['message', token, room_idd], getMessage, {
    enabled: shouldFetch,
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
  useEffect(() => {
    if (messageData.isSuccess && messageData.data.messages) {
      const oldMessages = messageData.data.messages.map(msg => ({
        user: msg.user_name,
        message: msg.message_body
      }))
      setMessageListe(oldMessages)
    }
  }, [messageData.isSuccess, messageData.data])
  function bufferToBase64 (buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }

    return window.btoa(binary)
  }

  useEffect(() => {
    const handleMessageReceive = data => {
      if (data.user !== user_name) {
        setMessageListe(list => [...list, data])
      }
    }

    socket.on('receive_message', handleMessageReceive)

    return () => {
      socket.off('receive_message', handleMessageReceive)
    }
  }, [socket, user_name]) // Include user_name in the dependency array

  const result = useQuery(['collaboration', user_id, token], fetchCollaboration)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const collaborations = result.data
  const joinRoom = async id => {
    setMessageListe([])
    setRoom(id)
    //const messageData = useQuery(['message', token, id], getMessage)
    //
    setShouldFetch(true)
    await socket.emit('join_room', {
      user: user_id,
      user_name: user_name,
      room: id
    })
   
    if (messageData.isLoading) {
      return (
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      )
    }


    console.log('message', messageData.data.messages)
    const oldMessages = messageData.data.messages.map(msg => ({
      user: msg.user_name,
      message: msg.message_body
    }))
    console.log('oldMessage', oldMessages)
    setMessageListe(list => [...list], oldMessages)
    setID(id)
  }

  const sendMessage = async () => {
    const newMessage = {
      user: user_name,
      message: message,
      room: idLast,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    await socket.emit('send_message', newMessage)
    const formData = {
      collaboration_id: idLast,
      user_name: user_name,
      message_body: message
    }
    // Add the message to the list when sending
    setMessageListe(list => [...list, newMessage])
    const headers = {
      Authorization: `Bearer ${token}`
    }
    
    axios
      .post(`http://localhost:3001/api/createMessage`, formData, { headers })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //console.log(collaborations)
  return (
    <MDBContainer fluid className='py-5' style={{ backgroundColor: '#eee' }}>
      <MDBRow>
        <MDBCol md='6' lg='5' xl='4' className='mb-4 mb-md-0'>
          <h5 className='font-weight-bold mb-3 text-center text-lg-start'>
            Collaborations
          </h5>

          <MDBCard>
            {!collaborations.proposal.length ? (
              <h1>No collaborations yet</h1>
            ) : (
              collaborations.proposal.map(collab => (
                <MDBCardBody
                  onClick={() => {
                    joinRoom(collab.collaboration_id)
                  }}
                >
                  <MDBTypography listUnStyled className='mb-0'>
                    <li
                      className='p-2 border-bottom'
                      style={{ backgroundColor: '#eee' }}
                    >
                      <a href='#!' className='d-flex justify-content-between'>
                        <div className='d-flex flex-row'>
                          <img
                            src={
                              collab.belongToCampaign.campaign_image
                                ? `data:image/jpeg;base64,${bufferToBase64(
                                    collab.belongToCampaign.campaign_image.data
                                  )}`
                                : '' // Provide a placeholder image
                            }
                            alt='avatar'
                            className='rounded-circle d-flex align-self-center me-3 shadow-1-strong'
                            width='60'
                          />
                          <div className='pt-1'>
                            <p className='fw-bold mb-0'>
                              {collab.user.name} - {collab.user.email}
                            </p>
                            <p className='small text-muted'>
                              {collab.belongToCampaign.campaign_description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </MDBTypography>
                </MDBCardBody>
              ))
            )}
          </MDBCard>
        </MDBCol>

        <MDBCol md='6' lg='7' xl='8'>
          <MDBTypography listUnStyled>
            {messageList.map((val, index) => (
              <MDBRow key={index}>
                {' '}
                {/* Use a unique key, preferably not the index */}
                <MDBCol>
                  <li className='justify-content-between mb-4'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp'
                      alt='avatar'
                      className='rounded-circle d-flex align-self-start me-3 shadow-1-strong'
                      width='60'
                      style={{ marginBottom: '10px' }}
                    />
                    <MDBCard>
                      <MDBCardHeader className='d-flex justify-content-between p-3'>
                        <p className='fw-bold mb-0'>{val.user}</p>
                        <p className='text-muted small mb-0'>
                          <MDBIcon far icon='clock' /> {val.created_at}
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className='mb-0'>{val.message}</p>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                </MDBCol>
              </MDBRow>
            ))}
            <MDBRow style={{ marginTop: '40px' }}>
              <MDBCard style={{ marginRight: '20px' }}>
                <MDBCardBody>
                  <li className='bg-white mb-3'>
                    <MDBTextArea
                      onChange={setMessageList}
                      label='Message'
                      id='textAreaExample'
                      rows={4}
                    />
                  </li>
                  <MDBCol>
                    <MDBBtn
                      onClick={sendMessage}
                      color='info'
                      rounded
                      className='float-end'
                    >
                      Send
                    </MDBBtn>
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
