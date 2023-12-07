import { useParams } from 'react-router-dom'
import React from 'react'
import { MDBTextArea } from 'mdb-react-ui-kit'
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
  MDBSpinner
} from 'mdb-react-ui-kit'
import fetchProposal from '../Fetch/fetchProposal'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const CDetails = () => {
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const { id } = useParams()
  const result = useQuery(['proposal', id, token], fetchProposal)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var data = result.data.proposal
  console.log(data.proposal_id)
  console.log(data)
  const headers = {
    Authorization: `Bearer ${token}`
  }
  var newData;
  const acceptOrReject = (type, id_proposal,user_id1) => {
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
      newData = { status: 'Rejected' }
    }
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
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
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
                        <MDBCardText className='fs-8 d-inline'>
                          {' '}
                          Male
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
                          1M+
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBRow>
                  <hr />
                  <MDBRow className='justify-content-end'>
                    <MDBCol className='d-flex justify-content-center' sm='3'>
                      <MDBBtn color='success' size='sm'>
                        Propose
                      </MDBBtn>
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
      </div>
      <h2 style={{ textAlign: ' center', color: '#6677EA' }}>
        Given Proposals
      </h2>
      <div className='proposals' style={{ margin: '120px', marginTop: '50px' }}>
        <MDBListGroup style={{}} light>
          {data.length === 0 ? (
            <h1>No Campaigns Found</h1>
          ) : (
            data.map(data => (
              <MDBListGroupItem className='d-flex justify-content-between align-items-center square bg-secondary rounded-8 border-dark mb-2 ps-4 pe-4'>
                <MDBRow className='w-100'>
                  <MDBCol md='8'>
                    <div className='d-flex align-items-center'>
                      <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>
                          {data.belongsToUser.name}
                        </p>
                        <p className='text-muted mb-0'>
                          {data.belongsToUser.email}
                        </p>
                        <p className='text-muted mb-0'>{data.proposal_body}</p>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol
                    md='4'
                    className='d-flex justify-content-end'
                    style={{ marginLeft: '0px' }}
                  >
                    <MDBBtn
                      onClick={() => {
                        acceptOrReject(0, data.proposal_id,data.belongsToUser.user_id)
                      }}
                      color='success'
                      className='me-2'
                    >
                      Accept
                    </MDBBtn>
                    <MDBBtn
                      onClick={() => {
                        acceptOrReject(1, data.proposal_id)
                      }}
                      color='danger'
                    >
                      Reject
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBListGroupItem>
            ))
          )}
        </MDBListGroup>
      </div>
    </>
  )
}

export default CDetails
