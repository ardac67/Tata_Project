import { MDBRow, MDBCol, MDBSpinner, MDBBtn } from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import DataTable from 'react-data-table-component'
import fetchCampaigns from '../Fetch/fetchCampaigns'
const MyCampaigns = () => {
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
      selector: row => row.campaign_id
    },
    {
      name: 'Campaign Header',
      selector: row => row.campaign_header
    },
    {
      name: 'Status',
      selector: row => row.status,
      conditionalCellStyles: [
        {
          when: row => row.status === 'pending',
          style: {
            backgroundColor: 'yellow',
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
      selector: row => row.startedAt
    },
    {
      name: 'End Date',
      selector: row => row.endedAt
    },
    {
      name: 'Applications',
      select: row => row.createdAt
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <MDBRow>
            <MDBCol md='6'>
              <MDBBtn size='md'>
                <FontAwesomeIcon icon={faEye} />
              </MDBBtn>
            </MDBCol>
            <MDBCol md='6'>
              <MDBBtn size='md'>
                <FontAwesomeIcon icon={faPenToSquare} />
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

  console.log(data)
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
