import React from 'react'
import {
  MDBBadge,
  MDBSpinner,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
  MDBInputGroup
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import fetchCollaboration from './fetchCollaboration'

export default function MyCollaborations () {
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const result = useQuery(['collaboration', user_id, token], fetchCollaboration)
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
        <h2>My Collaborations</h2>
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
              <th scope='col'>Collaboration ID</th>
              <th scope='col'>Campaign</th>
              <th scope='col'>Campaign Owner</th>
              <th scope='col'>Created & End Date</th>
              <th scope='col'>Status</th>
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
                        <p className='fw-bold mb-1'>{data.collaboration_id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      onClick={() => redirect('/CampaignDetails')}
                      style={{ cursor: 'pointer' }}
                      className='hover-link'
                    >
                      Influencer Partnership
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
                        <p className='fw-bold mb-1'>Hepsiburada</p>
                        <p className='text-muted mb-0'>hepsiburada@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>11.11.2023 - 25.11.2023</td>
                  <td>
                    <MDBBadge color='success' pill>
                      Ongoing
                    </MDBBadge>
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
