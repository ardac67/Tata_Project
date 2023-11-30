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
  MDBInput
} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {useParams} from 'react-router-dom';

export default function CreateProposal () {
  const  campaign_id  = useParams()
  //console.log(campaign_id)
  var id1=campaign_id.id
  const navigate = useNavigate()
  const [proposal, setProposal] = useState()
  const setProposals = e => {
    setProposal(e.target.value)
  }
  //console.log(proposal);
  const cookies = new Cookies(null, { path: '/' })
  const id = cookies.get('user_id')
  const token = cookies.get('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const postProposal = async () => {
    var data = {
      user_id: id,
      campaign_id: id1,
      proposal_status: 'pending',
      proposal_body: proposal
    }
    console.log(data)
    axios
      .post(`http://localhost:3001/api/postProposal`, data, { headers })
      .then(response => {
        window.alert('success')
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  const redirect = path => {
    navigate(path)
  }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className='py-5'>
        <MDBRow>
          <MDBCol lg='8'>
            <MDBCard className='mb-4'>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol className='d-flex justify-content-between'>
                    <MDBCardText className='d-inline fw-bold fs-4'>
                      Influencer Partnership
                    </MDBCardText>
                    <MDBCardText className='d-inline fw-bold fs-8 text-end'>
                      10.11.2023
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
                      src='https://cdn.discordapp.com/attachments/1049750616571924581/1169615345062006815/square_thumb__1-7.jpg?ex=65560c2c&is=6543972c&hm=625e5c1df99c32a9ba5712342b0f5150c6b3a17f0b77d6b5ebe5a7d5b2f31a35&'
                      fluid
                      className='w-100'
                    />
                  </MDBCol>
                  <MDBCol sm='9'>
                    <MDBCardText className='text-muted'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
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
                      Ongoing
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
                      11.11.2023 - 25.11.2023
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
                        • Target Audience
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'>
                        {' '}
                        Tech-savvy young adults passionate about fitness and
                        wellness.
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
                        25 - 35
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Gender :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'> Male</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm='9' className='ms-5'>
                      <MDBCardText className='fs-8 d-inline fw-semibold'>
                        • Subscription Interval :
                      </MDBCardText>
                      <MDBCardText className='fs-8 d-inline'> 1M+</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className='mb-4'>
              <MDBCardBody>
                <MDBCardText className=' fw-semibold fs-8'>
                  Why we choose you ?
                </MDBCardText>{' '}
                <div className='mb-0'>
                  <textarea
                    onChange={setProposals}
                    className='form-control'
                    id='additionalInfo'
                    rows={4}
                    placeholder='Enter additional information'
                  ></textarea>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className='mb-0'>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol className='d-flex justify-content-end'>
                    <MDBRow className='justify-content-end'>
                      <MDBBtn color='success' size='sm' onClick={postProposal}>
                        Propose
                      </MDBBtn>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='4'>
            <MDBCard className='mb-4'>
              <MDBCardBody className='text-center'>
                <MDBCardImage
                  src='https://scontent.fsaw3-1.fna.fbcdn.net/v/t1.6435-9/123879012_2955516941347982_2950858687048705095_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=c2f564&_nc_ohc=lEaOmWCU41UAX8sR4Ch&_nc_oc=AQnGDYrWqm7iNXShCGmnCO4eNOjs-bYFiWwDU1X9YDA9BQTOnHdIy8R4PJt4UEYemp4&_nc_ht=scontent.fsaw3-1.fna&oh=00_AfAqrpIJ0u4KHmV_xy_HbBCUU8akReYjYH0bULkn8WW0-Q&oe=656C494F'
                  alt='avatar'
                  className='rounded-circle'
                  style={{ width: '150px' }}
                  fluid
                />
                <p className='mb-1 mt-2 fw-bold'>Trendyol</p>
                <p className='text-muted mb-4'>@trendyol</p>
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
                    <MDBCardText>@MrBeast</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='instagram fa-lg'
                      style={{ color: '#ac2bac' }}
                    />
                    <MDBCardText>www.instagram.com/MrBeast</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='facebook fa-lg'
                      style={{ color: '#3b5998' }}
                    />
                    <MDBCardText>www.facebook.com/MrBeast</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <MDBIcon
                      fab
                      icon='fa-brands fa-tiktok'
                      style={{ color: '#3b5998' }}
                    />
                    <MDBCardText>www.tiktok.com/MrBeast</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
