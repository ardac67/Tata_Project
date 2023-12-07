import React from 'react';
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
    MDBSpinner
} from 'mdb-react-ui-kit';
import { useNavigate,useParams } from "react-router-dom";
import fetchCampaign from "./fetchCampaign"
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";

export default function CampaignDetails() {
    const navigate = useNavigate();
    const cookies = new Cookies(null, { path: '/' })
    const token = cookies.get('token')
    const { id } = useParams()
    const result = useQuery(['abcd', id, token], fetchCampaign)
    if (result.isLoading) {
        return (
          <MDBSpinner role='status'>
            <span className='visually-hidden'>Loading...</span>
          </MDBSpinner>
        )
      }

    var campaign = result.data.campaign[0];
    console.log(result)
    console.log(result.data.campaign[0].campaign_header)
    
    const redirect = (path) => {
      navigate(path);
    };
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5" key={campaign}>
                <MDBRow>

                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol  className='d-flex justify-content-between'>
                                        <MDBCardText className='d-inline fw-bold fs-4'>{campaign.campaign_header}</MDBCardText>
                                        <MDBCardText className='d-inline fw-bold fs-8 text-end'>{campaign.createdAt}</MDBCardText>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText className='fw-semibold fs-6'>Description</MDBCardText>
                                        <MDBCardImage
                                            src={campaign.image}
                                            fluid
                                            className="w-100"
                                        />
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{campaign.campaign_description}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText className='fw-semibold fs-6'>Status</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBBadge color='success' pill>
                                        {campaign.status}
                                        </MDBBadge>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText className='fw-semibold fs-6'>Start & End Date</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{campaign.startedAt} - {campaign.endedAt}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol>
                                        <MDBCardText className='fw-semibold fs-6'>Collaboration Preferences</MDBCardText>
                                    </MDBCol>
                                    <MDBRow>
                                        <MDBCol sm="9" className='ms-5'>
                                            <MDBCardText className='fs-8 d-inline fw-semibold'>• Target Audience :</MDBCardText>
                                            <MDBCardText className='fs-8 d-inline'>{campaign.collaboration_preferences[0].target_audience}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="9" className='ms-5'>
                                            <MDBCardText className='fs-8 d-inline fw-semibold'>• Age Interval :</MDBCardText>
                                            <MDBCardText className='fs-8 d-inline'> {campaign.collaboration_preferences[0].age_interval}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="9" className='ms-5'>
                                            <MDBCardText className='fs-8 d-inline fw-semibold'>• Gender :</MDBCardText>
                                            <MDBCardText className='fs-8 d-inline'>{campaign.collaboration_preferences[0].gender_information}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="9" className='ms-5'>
                                            <MDBCardText className='fs-8 d-inline fw-semibold'>• Subscription Interval :</MDBCardText>
                                            <MDBCardText className='fs-8 d-inline'> {campaign.collaboration_preferences[0].statistical_interval}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="9" className='ms-5'>
                                            <MDBCardText className='fs-8 d-inline fw-semibold'>• Preffered Platforms :</MDBCardText>
                                            <MDBCardText className='fs-8 d-inline'>{campaign.collaboration_preferences[0].preffered_platforms[0].platform}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                      <MDBCol d-flex sm='12' className='ms-5'>
                        <MDBCardText className='fs-8 d-inline fw-semibold'>
                          • Campaign Tags :
                        </MDBCardText>
                        <MDBCardText className='fs-8 d-inline'>
                          <MDBRow>
                            <MDBCol sm='2' style={{marginRight:'1px'}}>
                              <MDBBadge pill light>
                                {
                                  campaign.campaing_tags[0].tag1
                                }
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {
                                  campaign.campaing_tags[0].tag2
                                }
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {
                                  campaign.campaing_tags[0].tag3
                                }
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {
                                  campaign.campaing_tags[0].tag4
                                }
                              </MDBBadge>
                            </MDBCol>
                            <MDBCol sm='2'>
                              <MDBBadge pill light>
                                {
                                  campaign.campaing_tags[0].tag5
                                }
                              </MDBBadge>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                                </MDBRow>
                                <hr />
                                <MDBRow className='justify-content-end'>
                                    <MDBCol className='d-flex justify-content-center' sm="3" >
                                     <MDBBtn color="success" size="sm" onClick={() => redirect("/CreateProposal")}>
                                        Propose</MDBBtn>
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
                  <p className='mb-1 mt-2 fw-bold'>{campaign.user.name}</p>
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
                      <MDBCardText>{campaign.user.media_links[0].twitter}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='instagram fa-lg'
                        style={{ color: '#ac2bac' }}
                      />
                      <MDBCardText>{campaign.user.media_links[0].instagram}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='youtube fa-lg'
                        style={{ color: '#3b5998' }}
                      />
                      <MDBCardText>{campaign.user.media_links[0].youtube}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                      <MDBIcon
                        fab
                        icon='fa-brands fa-tiktok'
                        style={{ color: '#3b5998' }}
                      />
                      <MDBCardText>{campaign.user.media_links[0].tiktok}</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}