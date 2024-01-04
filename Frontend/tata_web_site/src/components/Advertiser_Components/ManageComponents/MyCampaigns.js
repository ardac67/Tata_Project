import { MDBRow, MDBCol, MDBSpinner, MDBBtn } from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import DataTable from 'react-data-table-component'
import fetchCampaigns from '../Fetch/fetchCampaigns'
import { Link, useNavigate } from 'react-router-dom'
function formatDateAndHour(dateStr) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, "0");
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minutes}`;
}

const MyCampaigns = () => {
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const id = cookies.get('user_id')
  const token = cookies.get('token')
  const result = useQuery(['campaign', id, token], fetchCampaigns)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const campaigns = result.data.campaign
  const columns = [
    {
      name: 'Campaign ID',
      selector: row => (
        <Link to={`/details/${row.campaign_id}`}>{row.campaign_id}</Link>
      )
    },
    {
      name: 'Campaign Header',
      selector: row => row.campaign_header,  // Corrected: Now this just returns the campaign header.
      cell: row => (  // 'cell' is used in react-data-table-component for custom render
        <Link to={`/details/${row.campaign_id}`}>{row.campaign_header}</Link>  // Display the link with the campaign header
      )
    },
    {
      name: 'Status',
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === 'pending',
          style: {
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        {
          when: row => row.status === 'Active',
          style: {
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              cursor: 'pointer'
            }
          }
        }
      ]
    },
    {
      name: 'Start Date',
      selector: row => formatDateAndHour(row.startedAt)
    },
    {
      name: 'End Date',
      selector: row => formatDateAndHour(row.endedAt)
    },
    {
      name: 'Applications',
      select: row => formatDateAndHour(row.createdAt)
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <MDBRow>
            <MDBCol md='6'>
              <MDBBtn size='md'>
                <FontAwesomeIcon
                  onClick={() => {
                    navigate(`/details/${row.campaign_id}`)
                  }}
                  icon={faEye}
                />
              </MDBBtn>
            </MDBCol>
            <MDBCol md='6'>
              <MDBBtn size='md'>
                <FontAwesomeIcon onClick={() => {
                  navigate(`/details/:${row.campaign_id}`)
                }} icon={faPenToSquare} />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </>
      )
    }
  ]
  const data = []
  for (var i = 0; i < campaigns.length; i++) {
    data.push(campaigns[i])
  }

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
      <p>This Table Shows All Campaigsn</p>
      <MDBRow style={{ border: '1px solid rgb(222 231 249)' }}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </MDBRow>
    </div>
  )
}

export default MyCampaigns
