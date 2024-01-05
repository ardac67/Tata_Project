import {
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBBtn,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import fetchCampaigns from '../Fetch/fetchCampaigns'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import emailjs from '@emailjs/browser'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import fetchUser from '../Fetch/fetchUser'
function formatDateAndHour (dateStr) {
  let date = new Date(dateStr)
  let year = date.getFullYear()
  let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, '0')
  let hour = date.getHours()
  let minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minutes}`
}
var arrayList = []

const SelectCampaign = () => {
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const {id_to_user} = useParams()
  const id = cookies.get('user_id')
  const token = cookies.get('token')
  const user_name = cookies.get('user_name')
  const result = useQuery(['campaign', id, token], fetchCampaigns)
  const result_user = useQuery(['userss', id_to_user, token], fetchUser)
  console.log("ardacccc",id_to_user)
  const hashMap = {
    key1: 'value1'
  }
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const pushStatus = async (id, status) => {
    console.log(id, status)
    console.log(newData)
    var newData = {
      newStatus: status
    }
    axios
      .put(`http://localhost:3001/api/updateCampaignStatus/${id}`, newData, {
        headers
      })
      .then(response => {
        console.log(response)
        toast.success('Succesfully Updated', {
          position: toast.POSITION.TOP_LEFT
        })
      })
      .catch(error => {
        toast.warning('Succesfully ERROR', {
          position: toast.POSITION.TOP_LEFT
        })
      })
  }
  const pushToList = (id, flag) => {
    arrayList.push(id)
    var data = {
      service_id: 'service_pj39pyi',
      template_id: 'template_ecz5m98',
      user_id: 'VKrkaoeufRnL9Eyxm',
      template_params: {
        from_name: user_name,
        to_email: result_user.data.user.email,
        message: `You have been invited to campaign http://localhost:3000/CampaignDetails/${id}`,
        'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
        
      }
    }
    axios
      .post(`https://api.emailjs.com/api/v1.0/email/send`, data)
      .then(response => {
        window.alert('success')
        window.location.reload()
      })
      .catch(error => {
        window.alert('error')
      })
  }
  if (result.isLoading || result_user.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  console.log("email",result_user.data)
  const campaigns = result.data.campaign
  const prop = result.data
  for (var i = 0; i < prop.campaign.length; i++) {
    hashMap[prop.campaign[i].campaign_id] = prop.campaign[i].proposal.length
  }
  const filteredData = campaigns.filter(row => row.status !== 'Ended');

  console.log('arda', hashMap)
  console.log(campaigns)
  console.log("arda",   result_user.data)
  const columns = [
    {
      name: 'Campaign ID',
      selector: row => (
        <Link to={`/details/${row.campaign_id}`}>{row.campaign_id}</Link>
      )
    },
    {
      name: 'Campaign Header',
      selector: row => row.campaign_header, // Corrected: Now this just returns the campaign header.
      cell: (
        row // 'cell' is used in react-data-table-component for custom render
      ) => (
        <Link to={`/details/${row.campaign_id}`}>{row.campaign_header}</Link> // Display the link with the campaign header
      )
    },
    {
      name: 'Status',
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === 'pending',
          style: {
            backgroundColor: 'yellow',
            color: 'black',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        {
          when: row => row.status === 'Ended',
          style: {
            backgroundColor: 'red',
            color: 'black',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        {
          when: row => row.status === 'Active',
          style: {
            backgroundColor: 'green',
            color: 'black',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        }
      ]
    },
    {
      name: 'Start Date',
      selector: row => (row.startedAt ? formatDateAndHour(row.startedAt) : '')
    },
    {
      name: 'End Date',
      selector: row => (row.endedAt ? formatDateAndHour(row.endedAt) : '')
    },
    {
      name: 'Applications',
      selector: row => hashMap[row.campaign_id]
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          {row.startedAt && row.status !== 'Ended' &&(
            <MDBRow>
              <ToastContainer></ToastContainer>
              <MDBCol md='6'>
                <MDBDropdown>
                  <MDBDropdownToggle size='md' color='primary'>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem
                      link
                      onClick={() => pushToList(row.campaign_id, 1)}
                    >
                      <i
                        style={{ color: 'green' }}
                        className='fas fa-circle-check'
                      ></i>{' '}
                      Send
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBCol>
            </MDBRow>
          )}
        </>
      )
    }
  ]
  const data = []
  for (var i = 0; i < campaigns.length; i++) {
    data.push(campaigns[i])
  }
  let lastIndex = campaigns.length
  console.log(lastIndex)
  data.push([])
  return (
    <div
      style={{
        marginTop: '45px',
        marginBottom: '45px',
        marginLeft: '5%',
        marginRight: '5%'
      }}
    >
      <h1
        style={{ marginTop: '10px', marginBottom: '20px', fontSize: '1.5rem' }}
      >
        All Campaign
      </h1>
      <p>This Table Shows All Campaigns</p>
      <MDBRow style={{ border: '1px solid rgb(222 231 249)' }}>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </MDBRow>
    </div>
  )
}

export default SelectCampaign
