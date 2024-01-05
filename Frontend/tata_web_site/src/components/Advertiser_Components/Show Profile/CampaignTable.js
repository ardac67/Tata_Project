import DataTable from 'react-data-table-component'
import {
  MDBRow,
  MDBSpinner,

} from 'mdb-react-ui-kit'

import { useQuery } from '@tanstack/react-query'
import fetchCollaboration from './fetchCollaboration'
import Cookies from 'universal-cookie'
import { Link, useNavigate, useParams } from 'react-router-dom'
const CampaingTable = () => {
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const {id } = useParams()
  const result = useQuery(['collaboration', id, token], fetchCollaboration)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var data = result.data.proposal
  console.log(data)
  function formatDateAndHour(dateStr) {
    let date = new Date(dateStr)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0')
    let hour = date.getHours()
    let minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }
  
  
const columns = [
  {
    name: 'Campaign Header',
    selector: row =>(
      <Link to={`/details/${row.belongToCampaign.campaign_id}`}>{row.belongToCampaign.campaign_header}</Link>
    )  // Corrected: Now this just returns the campaign header.

  },
  {
    name: 'Start Date',
    selector: row => formatDateAndHour(row.belongToCampaign.startedAt)
  },
  {
    name: 'End Date',
    selector: row => formatDateAndHour(row.belongToCampaign.endedAt)
  }
 
]

return (
  <div
    style={{
      marginTop: '15px',
      marginBottom: '15px',
      marginLeft: '5%',
      marginRight: '5%'
    }}
  >
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
export default CampaingTable
