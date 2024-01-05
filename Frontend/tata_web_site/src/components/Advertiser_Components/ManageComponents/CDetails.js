import { useParams } from 'react-router-dom'
import React from 'react'
import { MDBTextArea } from 'mdb-react-ui-kit'
import io from 'socket.io-client'
import { MDBBtn } from 'mdb-react-ui-kit'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBSpinner,
  MDBCardHeader,
  MDBCardFooter
} from 'mdb-react-ui-kit'
import fetchProposal from '../Fetch/fetchProposal'
import defaultImage from '../default.jpg'
import defaultImage1 from '../default1.png'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
import fetchCampaigns from '../Fetch/fetchCampaigns'
import fetchCollaboration from './fetchCollaboration'
import axios from 'axios'
import getAllCampaignsBYid from '../Fetch/getAllCampaignsBYid'
import { bufferToBase64 } from '../../../utils'
var socket = io.connect('http://localhost:3002')
function formatDateAndHour (dateStr) {
  let date = new Date(dateStr)
  let year = date.getFullYear()
  let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, '0')
  let hour = date.getHours()
  let minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minutes}`
}

const CDetails = () => {
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const user_name = cookies.get('user_name')
  const { id } = useParams()
  const result = useQuery(['proposal', id, token], fetchProposal)
  const c_result = useQuery(['xx', id, token], getAllCampaignsBYid)
  const collab = useQuery(
    ['collaboration66', user_id, token],
    fetchCollaboration
  )
  function formatDateAndHour (dateStr) {
    let date = new Date(dateStr)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0')
    let hour = date.getHours()
    let minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }
  const join_not = async newData => {
    await socket.emit('join_not', {
      user: user_id,
      user_name: user_name,
      notification: newData
    })
  }

  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  if (c_result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  if (collab.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  console.log('yaeh', collab.data)
  var data = result.data.proposal

  const c_data = c_result.data.campaign[0]

  console.log('sdata:', data)
  const headers = {
    Authorization: `Bearer ${token}`
  }
  var newData

  const acceptOrReject = async (type, id_proposal, user_id1, header) => {
    if (type == 0) {
      /*
        campaign_id: req.body.campaign_id,
          user_id: req.body.user_id,
          proposed_user_id: req.body.proposed_user_id,
          createdAt: new Date()
      */
      newData = {
        status: 'Approved',
        proposed_user_id: user_id1,
        user_id: user_id,
        campaign_id: id,
        createdAt: new Date()
      }
    } else {
      newData = { status: 'Rejected', proposed_user_id: user_id1 }
    }
    join_not(newData)
    const notification = {
      user: newData.user_id,
      status: newData.status,
      proposed_user_id: newData.proposed_user_id,
      campaign_header: header
    }
    await socket.emit('send_notification', notification)
    axios
      .put(
        `http://localhost:3001/api//acceptOrRejectProposal/${id_proposal}`,
        newData,
        { headers }
      )
      .then(response => {
        window.alert('success')
        window.location.reload()
      })
      .catch(error => {
        window.alert('error')
      })
  }
  return (
    <>
      <div className='campaignDetalis'>
        <MDBContainer className='py-5'>
          <MDBRow>
            <MDBCol lg='8'>
              <MDBCard className='mb-4'>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol className='d-flex justify-content-between'>
                      <MDBCardText className='d-inline fw-bold fs-4'>
                        {c_data.campaign_header}
                      </MDBCardText>
                      <MDBCardText className='d-inline fw-bold fs-8 text-end'>
                        {formatDateAndHour(c_data.createdAt)}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className='mb-4'>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm='3'>
                      <MDBCardText className='fw-semibold fs-6'>
                        Description
                      </MDBCardText>
                      <MDBCardImage
                        src={
                          c_data.campaign_image
                            ? `data:image/jpeg;base64,${bufferToBase64(
                                c_data.campaign_image.data
                              )}`
                            : defaultImage1
                        }
                        fluid
                        className='w-100'
                      />
                    </MDBCol>
                    <MDBCol sm='9'>
                      <MDBCardText className='text-muted'>
                        {c_data.campaign_description}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm='3'>
                      <MDBCardText className='fw-semibold fs-6'>
                        Status
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm='9'>
                      <MDBBadge color='success' pill>
                        {c_data.status}
                      </MDBBadge>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm='3'>
                      <MDBCardText className='fw-semibold fs-6'>
                        Start & End Date
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm='9'>
                      <MDBCardText className='text-muted'>
                        {formatDateAndHour(c_data.startedAt)} -{' '}
                        {formatDateAndHour(c_data.endedAt)}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol>
                      <MDBCardText className='fw-semibold fs-6'>
                        Information:
                      </MDBCardText>
                    </MDBCol>
                    <MDBRow>
                      <MDBCol sm='9' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Target Audience :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          {c_data.collaboration_preferences[0].target_audience}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm='9' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Age Interval :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          {c_data.collaboration_preferences[0].age_interval}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm='9' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Gender :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          {
                            c_data.collaboration_preferences[0]
                              .gender_information
                          }
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm='9' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Preferred Platforms :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          {
                            c_data.collaboration_preferences[0]
                              .preffered_platforms[0].platform
                          }
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>{' '}
                    <MDBRow>
                      <MDBCol sm='9' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Required Statistics :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          {
                            c_data.collaboration_preferences[0]
                              .statistical_interval
                          }
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol d-flex sm='12' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Campaign Tags :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          <MDBRow>
                            <MDBCol sm='2' style={{ marginRight: '1px' }}>
                              <MDBBadge pill light>
                                {c_data.campaing_tags[0].tag1}
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {c_data.campaing_tags[0].tag2}
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {c_data.campaing_tags[0].tag3}
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {c_data.campaing_tags[0].tag4}
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {c_data.campaing_tags[0].tag5}
                              </MDBBadge>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg='4'>
              <MDBCard className='mb-4'>
                <MDBCardBody className='text-center d-flex flex-column align-items-center'>
                  <MDBCardImage
                    src={
                      c_data.user.user_image
                        ? `data:image/jpeg;base64,${bufferToBase64(
                            c_data.user.user_image.data
                          )}`
                        : defaultImage // Provide a placeholder image
                    }
                    alt='avatar'
                    className='rounded-circle'
                    style={{ width: '150px' }}
                    fluid
                  />
                  <p className='mb-1 mt-2 fw-bold'>{c_data.user.name}</p>
                  <p className='text-muted mb-4'>@{c_data.user.user_name}</p>
                  <p className='text-muted mb-4'>
                    <MDBIcon>
                      <i class='fas fa-star'></i>
                      <i class='fas fa-star'></i>
                      <i class='fas fa-star'></i>
                      <i class='fas fa-star-half-stroke'></i>
                    </MDBIcon>{' '}
                    333 Reviews
                  </p>
                  <div className='d-flex justify-content-center mb-2'>
                    <MDBBtn outline className='ms-1'>
                      Message
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className='mb-4 mb-lg-0'>
                <MDBCardBody className='p-0'>
                  <MDBListGroup flush className='rounded-3'>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='twitter fa-lg'
                        style={{ color: '#55acee' }}
                      />
                      <MDBCardText>
                        {c_data.user.media_links[0].twitter}
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='instagram fa-lg'
                        style={{ color: '#ac2bac' }}
                      />
                      <MDBCardText>
                        {c_data.user.media_links[0].instagram}
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='youtube fa-lg'
                        style={{ color: '#3b5998' }}
                      />
                      <MDBCardText>
                        {c_data.user.media_links[0].youtube}
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='fa-brands fa-tiktok'
                        style={{ color: '#3b5998' }}
                      />
                      <MDBCardText>
                        {c_data.user.media_links[0].tiktok}
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <h2 style={{ textAlign: ' center', color: '#6677EA' }}>
        Given Proposals
      </h2>
      <div className='proposals' style={{ margin: '120px', marginTop: '50px' }}>
        <MDBCard alignment='left' style={{ marginTop: '10px' }}>
          <MDBCardHeader style={{ fontSize: '28px' }}>Proposals</MDBCardHeader>
          {data.length === 0 ? (
            <h6 className='text-center'>No Proposal Found</h6>
          ) : (
            data.map(data => (
              <MDBCardBody>
                <MDBCardBody className='square border border-3'>
                  <MDBRow>
                    <MDBCardHeader style={{ fontSize: '15px' }}>
                      📊 {data.belongsToUser.name} | 🎨
                      {data.belongsToUser.email} | 💡{' '}
                      {data.belongsToUser.user_name}
                    </MDBCardHeader>
                    <MDBCardBody>
                      <MDBCardText style={{ marginTop: '10px' }}>
                        {data.proposal_body}
                      </MDBCardText>
                      <MDBCardText style={{ marginTop: '10px' }}>
                        Tags: #{c_data.campaing_tags[0].tag1} #
                        {c_data.campaing_tags[0].tag2} #
                        {c_data.campaing_tags[0].tag3} #
                        {c_data.campaing_tags[0].tag4} #
                        {c_data.campaing_tags[0].tag5}
                      </MDBCardText>
                      <MDBCardText style={{ marginTop: '10px' }}>
                        {data.belongsToUser.name} @
                        {data.belongsToUser.user_name} Created At:{' '}
                        {formatDateAndHour(data.createdAt)}
                      </MDBCardText>
                    </MDBCardBody>
                    <MDBRow
                      style={{
                        fontSize: '15px'
                      }}
                    ></MDBRow>
                  </MDBRow>
                  <MDBCardFooter>
                    <MDBCol
                      md='12'
                      className='d-flex justify-content-end'
                      style={{ marginLeft: '0px' }}
                    >
                      <MDBBtn
                        onClick={() => {
                          acceptOrReject(
                            0,
                            data.proposal_id,
                            data.belongsToUser.user_id,
                            data.belongsToCampaign.campaign_header
                          )
                        }}
                        color='success'
                        className='me-2'
                      >
                        Accept
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => {
                          console.log(data.belongsToCampaign.campaign_header)
                          acceptOrReject(
                            1,
                            data.proposal_id,
                            data.belongsToUser.user_id,
                            data.belongsToCampaign.campaign_header
                          )
                        }}
                        color='danger'
                      >
                        Reject
                      </MDBBtn>
                    </MDBCol>
                  </MDBCardFooter>
                </MDBCardBody>
              </MDBCardBody>
            ))
          )}
        </MDBCard>
       
      </div>
    </>
  )
}

export default CDetails
/*

        */
