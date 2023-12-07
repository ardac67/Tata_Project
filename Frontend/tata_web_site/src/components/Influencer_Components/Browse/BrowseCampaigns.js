import React, { useState } from 'react'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBSpinner,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import fetchAllCampaigns from './fetchAllCampaign'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import './BrowseCampaigns.css'
import { ProgressBar } from 'react-loader-spinner'
function BrowseCampaigns ({ searchTerm }) {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const campaignsPerPage = 5 // Adjust this according to your needs

  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const result = useQuery(['campaignAll', token], fetchAllCampaigns)

  if (result.isLoading) {
    return (
      <ProgressBar
        height='500'
        width='500'
        ariaLabel='progress-bar-loading'
        wrapperStyle={{}}
        wrapperClass='progress-bar-wrapper'
        borderColor='#F4442E'
        barColor='#51E5FF'
      />
    )
  }

  const campaigns = result.data.campaign

  // Filter campaigns based on the search term
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaign_header.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset current page when searchTerm changes
  if (currentPage !== 1 && searchTerm) {
    setCurrentPage(1)
  }

  // Calculate the indexes of the campaigns to be displayed on the current page
  const indexOfLastCampaign = currentPage * campaignsPerPage
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  )

  const paginate = pageNumber => setCurrentPage(pageNumber)

  console.log(campaigns)

  return (
    <MDBCol md='7'>
      {!currentCampaigns.length ? (
        <h1>No Campaigns Found</h1>
      ) : (
        currentCampaigns.map(campaign => (
          <MDBCard className='border rounded-3 mb-2' key={campaign.id}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='12' lg='3' className='mb-4 mb-lg-0'>
                  <MDBRipple
                    rippleColor='light'
                    rippleTag='div'
                    className='bg-image rounded hover-zoom hover-overlay'
                  >
                    <MDBCardImage
                      src={campaign.image}
                      fluid
                      className='w-100'
                    />
                    <a href='#!'>
                      <div
                        className='mask'
                        style={{
                          backgroundColor: 'rgba(251, 251, 251, 0.15)'
                        }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md='6'>
                  <h5>{campaign.campaign_header}</h5>
<<<<<<< HEAD
                  <div className='mt-1 mb-2 text-muted small'>
                    <span>{campaign.campaing_tags[0].tag1}</span>
                    <span className='text-primary'> • </span>
                    <span>{campaign.campaing_tags[0].tag2}</span>
                    <span className='text-primary'> • </span>
                    <span>{campaign.campaing_tags[0].tag3}</span>
                    <span className='text-primary'> • </span>
                    <span>{campaign.campaing_tags[0].tag4}</span>
                    <span className='text-primary'> • </span>
                    <span>{campaign.campaing_tags[0].tag5}</span>
                    <br />
=======
                  <div className="mt-1 mb-2 text-muted small">
                    {campaign.campaing_tags[0].tag1 && (
                      <span>{campaign.campaing_tags[0].tag1}</span>
                    )}
                    {campaign.campaing_tags[0].tag2 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag2}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag3 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag3}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag4 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag4}</span>
                      </>
                    )}
                    {campaign.campaing_tags[0].tag5 && (
                      <>
                        <span className="text-primary"> • </span>
                        <span>{campaign.campaing_tags[0].tag5}</span>
                      </>
                    )}
>>>>>>> 8dedbbd46eb1cc0c365fd4afcab3bb7c36148bd2
                  </div>
                  <p className='text-truncate-multiline mb-4 mb-md-0'>
                    {campaign.campaign_description}
                  </p>
                </MDBCol>
                <MDBCol
                  md='6'
                  lg='3'
                  className='border-sm-start-none border-start'
                >
                  <div className='d-flex flex-column mt-4'>
                    <MDBBtn
                      color='primary'
                      size='sm'
                      onClick={() =>
                        navigate(`/CampaignDetails/${campaign.campaign_id}`)
                      }
                    >
                      Campaign Details
                    </MDBBtn>
                    <MDBBtn
                      outline
                      color='success'
                      size='sm'
                      className='mt-2'
                      onClick={() =>
                        navigate(`/CreateProposal/${campaign.campaign_id}`)
                      }
                    >
                      Propose
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        ))
      )}
      {/* <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image rounded hover-zoom hover-overlay"
                >
                  <MDBCardImage
                    src="https://ddxcu89oqzgqh.cloudfront.net/uploads/campaign/image/634ed91a51d0aa0a5265b75e/square_thumb_Wahool_loego.png"
                    fluid
                    className="w-100"
                  />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </MDBRipple>
              </MDBCol>
              <MDBCol md="6">
                <h5>Brand Ambassador/Influencer - Fashion</h5>
                <div className="mt-1 mb-0 text-muted small">
                  <span>Cooking</span>
                  <span className="text-primary"> • </span>
                  <span>Lifestyle</span>
                  <span className="text-primary"> • </span>
                  <span>
                    Informative
                    <br />
                  </span>
                </div>
                <div className="mb-2 text-muted small">
                  <span>Unique design</span>
                  <span className="text-primary"> • </span>
                  <span>Kitchen</span>
                  <span className="text-primary"> • </span>
                  <span>
                    BBQ
                    <br />
                  </span>
                </div>
                <p className="text-truncate mb-4 mb-md-0">
                  We are WAHOOL, one of the fastest-growing commerce platforms,
                  designed to empower creators & entrepreneurs to grow their
                  revenue streams through the power of live and social selling. We
                  provide a simple and easy way to sell affordable, trendy fashion
                  products to online audiences by building and launching your
                  online fashion shop in minutes.
                </p>
                <p className="mb-4 mb-md-0">#lifestyle #fashion #BBQ</p>
              </MDBCol>
              <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                <div className="d-flex flex-column mt-4">
                  <MDBBtn color="primary" size="sm">
                    Campaign Details
                  </MDBBtn>
                  <MDBBtn outline color="success" size="sm" className="mt-2">
                    Propose
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard> */}
      <MDBPagination className='mt-3 justify-content-end'>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => paginate(currentPage - 1)}>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>

        {[
          ...Array(
            Math.ceil(filteredCampaigns.length / campaignsPerPage)
          ).keys()
        ].map(number => (
          <MDBPaginationItem
            key={number + 1}
            active={currentPage === number + 1}
          >
            <MDBPaginationLink onClick={() => paginate(number + 1)}>
              {number + 1}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}

        <MDBPaginationItem
          disabled={
            currentPage ===
            Math.ceil(filteredCampaigns.length / campaignsPerPage)
          }
        >
          <MDBPaginationLink onClick={() => paginate(currentPage + 1)}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </MDBCol>
  )
}

export default BrowseCampaigns
