import React from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBSpinner,
  MDBInput
} from 'mdb-react-ui-kit'
import './rating.css' // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom'
import fetchCampaign from './fetchCampaign'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import { bufferToBase64, formatDateAndHour } from '../../../utils'
import defaultImage from '../default1.png'
import defaultImage1 from '../default.jpg'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import fetchComments from './fetchComments'
export default function CampaignDetails() {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
 
  const { id } = useParams()
  const [selectedRating, setSelectedRating] = useState(0)
  const handleStarClick = index => {
    setSelectedRating(index + 1)
    console.log('Selected Rating:', index + 1)
  }
  console.log(token)
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const [isHovered, setIsHovered] = useState(false);
  
  
 
  
  var provide = {
    user_id:user_id,
    toUser_id:id,
  }
  const result2 = useQuery(['abcd', id, token,provide], fetchComments)
  const result = useQuery(['abcd', id, token], fetchCampaign)
  if (result.isLoading || result2.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  
  var campaign = result.data.campaign[0]
  console.log("camppp: ", campaign)
  console.log(result.data.campaign[0].campaign_header)
  console.log("bum",result2.data)
  const createRating = () => {
    var data = {
      rating: selectedRating,
      rating_text: message,
      user_id: user_id,
      toUser_id: campaign.user.user_id,
      campaign_id: campaign.campaign_id
    }
    console.log(data)
    axios
      .post(`http://localhost:3001/api/postRating`, data, { headers })
      .then(response => {
        toast.success('Success message here', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
      })
      .catch(error => {
        toast.error(`Already applied ${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
      })
  }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className='py-5' key={campaign}>
        <ToastContainer></ToastContainer>
        <MDBRow>
          <MDBCol lg='8'>
            <MDBCard className='mb-4'>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol className='d-flex justify-content-between'>
                    <MDBCardText className='d-inline fw-bold fs-4'>
                      {campaign.campaign_header}
                    </MDBCardText>
                    <MDBCardText className='d-inline fw-bold fs-8 text-end'>
                      {formatDateAndHour(campaign.createdAt)}
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
                        campaign.campaign_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                            campaign.campaign_image.data
                          )}`
                          : defaultImage // Provide a placeholder image
                      }
                      fluid
                      className='w-100'
                    />
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>
                      {campaign.campaign_description}
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
                      {campaign.status}
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
                      {formatDateAndHour(campaign.startedAt)} -{' '}
                      {formatDateAndHour(campaign.endedAt)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText className='fw-semibold fs-6'>
                      Collaboration Preferences
                    </MDBCardText>
                  </MDBCol>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Target Audience :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'>
                        {campaign.collaboration_preferences[0].target_audience}
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
                        {campaign.collaboration_preferences[0].age_interval}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Gender :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'>
                        {
                          campaign.collaboration_preferences[0]
                            .gender_information
                        }
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Subscription Interval :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'>
                        {' '}
                        {
                          campaign.collaboration_preferences[0]
                            .statistical_interval
                        }
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Preffered Platforms :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'>
                        {
                          campaign.collaboration_preferences[0]
                            .preffered_platforms[0].platform
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
                              {campaign.campaing_tags[0].tag1}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm='2'>
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag2}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm='2'>
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag3}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm='2'>
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag4}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm='2'>
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag5}
                            </MDBBadge>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBRow>
                <hr />
                <MDBRow className='justify-content-end'>
                  <MDBCol className='d-flex justify-content-center' sm='3'>
                    <MDBBtn
                      color='success'
                      size='sm'
                      onClick={() =>
                        navigate(`/CreateProposal/${campaign.campaign_id}`)
                      }
                    >
                      Propose
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
            <MDBCard className='mb-4'>
              <MDBCardBody className='text-center d-flex flex-column align-items-center'>
                <MDBCardImage
                  src={
                    campaign.user.user_image
                      ? `data:image/jpeg;base64,${bufferToBase64(
                        campaign.user.user_image.data
                      )}`
                      : defaultImage1 // Provide a placeholder image
                  }
                  alt='avatar'
                  className='rounded-circle'
                  style={{ width: '150px' }}
                  fluid
                />
                <p
                  className='mb-1 mt-2 fw-bold'
                  style={{
                    color: isHovered ? 'blue' : 'black', // Change color on hover
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/ShowProfile/${campaign.user_id}`)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {campaign.user.name}
                </p>

                <p className='text-muted mb-4'>@{campaign.user.user_name}</p>
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
                      {campaign.user.media_links[0].twitter}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='instagram fa-lg'
                      style={{ color: '#ac2bac' }}
                    />
                    <MDBCardText>
                      {campaign.user.media_links[0].instagram}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='youtube fa-lg'
                      style={{ color: '#cd201f' }}
                    />
                    <MDBCardText>
                      {campaign.user.media_links[0].youtube}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='fa-brands fa-tiktok'
                      style={{ color: '#000000' }}
                    />
                    <MDBCardText>
                      {campaign.user.media_links[0].tiktok}
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow
          style={{ marginTop: '50px', marginLeft: '20px', marginRight: '20px' }}
        >
          {(campaign.status === 'Ended' && result2.data.exists===0 ) && (
            <MDBRow
              style={{
                marginTop: '50px',
                marginLeft: '20px',
                marginRight: '20px'
              }}
            >
              <MDBCol>
                <div className='rating-box'>
                  <header>How was your experience?</header>
                  <div className='stars'>
                    {[1, 2, 3, 4, 5].map(index => (
                      <i
                        key={index}
                        className={`fa-solid fa-star${index <= selectedRating ? ' active' : ''
                          }`}
                        onClick={() => handleStarClick(index)}
                      ></i>
                    ))}
                  </div>
                  <MDBInput
                    style={{ marginTop: '25px' }}
                    label='Comments'
                    id='typeText'
                    type='text'
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>
              </MDBCol>
              <MDBRow style={{ marginTop: '20px' }}>
                <MDBCol>
                  <MDBBtn onClick={createRating}>Apply</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBRow>
          )}
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
