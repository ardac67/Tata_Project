import React from 'react'
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
  MDBInputGroup,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import fetchProposal from '/Users/ardac/Desktop/Arda/term3/software_engineering/Frontend/tata_web_site/src/components/Advertiser_Components/Fetch/fetchIndividualProposals'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
export default function MyProposals () {
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const id = cookies.get('user_id')
  const result = useQuery(['proposalIndidual', id, token], fetchProposal)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var data = result.data.proposal
  const redirect = path => {
    navigate(path)
  }
  return (
    <>
      <div className='d-flex mt-4 ms-5'>
        <h2>My Proposals</h2>
      </div>
      <>
        <div className='d-flex justify-content-center mt-4'>
          <MDBInputGroup className='w-50'>
            <MDBInput label='Search' />
            <MDBBtn rippleColor='dark'>
              <MDBIcon icon='search' />
            </MDBBtn>
          </MDBInputGroup>
        </div>
        <MDBTable align='middle mt-4'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Proposal ID</th>
              <th scope='col'>Campaign</th>
              <th scope='col'>Campaign Owner</th>
              <th scope='col'>Campaign Status</th>
              <th scope='col'>Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.length === 0 ? (
              <h1>No Proposal Found</h1>
            ) : (
              data.map(data => (
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{data.proposal_id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      onClick={() => redirect('/CampaignDetails')}
                      style={{ cursor: 'pointer' }}
                      className='hover-link'
                    >
                      {data.belongsToCampaign.campaign_header}
                    </a>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src='https://upload.wikimedia.org/wikipedia/commons/2/20/Hepsiburada_logo_official.svg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>
                          {data.belongsToCampaign.user.name}
                        </p>
                        <p className='text-muted mb-0'>
                          {data.belongsToCampaign.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.proposal_status === 'pending' ? (
                      <MDBBadge color='warning' pill>
                        Pending
                      </MDBBadge>
                    ) : data.proposal_status === 'Rejected' ? (
                      <MDBBadge color='danger' pill>
                        Rejected
                      </MDBBadge>
                    ) : (
                      <MDBBadge color='success' pill>
                        Approved
                      </MDBBadge>
                    )}
                  </td>
                  <td>{data.createdAt}</td>
                  <td>
                    <MDBBtn color='light' rounded size='md'>
                      <i class='far fa-pen-to-square fa-lg text-primary'></i>
                    </MDBBtn>
                    <MDBBtn color='light' rounded size='md'>
                      <i class='far fa-trash-can fa-lg text-danger'></i>
                    </MDBBtn>
                  </td>
                </tr>
              ))
            )}
          </MDBTableBody>
        </MDBTable>
      </>
    </>
  )
}
