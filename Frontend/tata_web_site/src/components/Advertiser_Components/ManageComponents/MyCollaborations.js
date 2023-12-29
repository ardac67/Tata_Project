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
import defaultimage from "../default.jpg"
import { bufferToBase64 } from '../../../utils'

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
  function formatDateAndHour (dateStr) {
    let date = new Date(dateStr)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0')
    let hour = date.getHours()
    let minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }
  var data = result.data.proposal
  console.log(data)
  const redirect = path => {
    navigate(path)
  }
  console.log(data.belongToCampaign);
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
              <th scope='col'>Influencer</th>
              <th scope='col'>Created & End Date</th>
              <th scope='col'>Campaing Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.length === 0 ? (
              <h1>No Collaborations Found</h1>
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
                      onClick={() => navigate(`/details/${data.belongToCampaign.campaign_id}`)}
                      style={{ cursor: 'pointer' }}
                      className='hover-link'
                    >
                      {data.belongToCampaign.campaign_description}
                    </a>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                    <img
                        src={
                          data.user.user_image
                      ?` data:image/jpeg;base64,${bufferToBase64(
                        data.user.user_image.data
                        )}`
                      : defaultimage // Provide a placeholder image
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "60px" }}
                  fluid
                      />
                      <div className='ms-3'>
                      <a
                      onClick={() => navigate(`/ShowProfile/${data.proposed_user_id}`)}
                      style={{ cursor: 'pointer' }}
                      className='hover-link'
                    >
                      {data.user.name}
                    </a>
                    <p className='text-muted mb-0'>
                          {data.user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{formatDateAndHour(data.belongToCampaign.startedAt)} || {formatDateAndHour(data.belongToCampaign.endedAt)}</td>
                  <td>
                    <MDBBadge color='success' pill>
                    {data.belongToCampaign.status}
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
