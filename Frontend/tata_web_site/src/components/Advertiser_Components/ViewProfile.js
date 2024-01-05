import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBSpinner
} from 'mdb-react-ui-kit'
import ProfileMain from './ViewProfileComponents/ProfileMain'
import ContactMainProfile from './ViewProfileComponents/ContactViewProfile'
import TopTags from './ViewProfileComponents/TopTags'
import CampaingTable from './ViewProfileComponents/CampaignTable'
import RatingComponent from './ViewProfileComponents/RatingComponent'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import fetchUser from './Fetch/fetchUser'
import fetchRating from './ViewProfileComponents/fetchRatings'
const ViewProfile = () => {
  const cookies = new Cookies(null, { path: '/' })
  const id = cookies.get('user_id')
  const token = cookies.get('token')
  const ratings = useQuery(['ratings', id,token], fetchRating)
  const result = useQuery(['user', id,token], fetchUser)
  if (result.isLoading || ratings.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const user = result.data
  return (
    <div>
      <MDBRow
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          marginTop: '5%'
        }}
      >
        <MDBCol md='8'>
          <MDBCard>
            <ProfileMain {...user}></ProfileMain>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard alignment='left'>
            <MDBCardHeader style={{ fontSize: '25px' }}>Contact</MDBCardHeader>
            <ContactMainProfile {...user}></ContactMainProfile>
          </MDBCard>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '25px' }}>Top Tags</MDBCardHeader>
            <TopTags></TopTags>
          </MDBCard>
        
        </MDBCol>
      </MDBRow>

      <MDBRow
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          marginTop: '1%',
          marginBottom: '5%'
        }}
      >
        <MDBCol md='8'>
          <MDBCard alignment='left' style={{ marginTop: '10px'}}>
            <MDBCardHeader style={{ fontSize: '28px' }}>
              Campaings
            </MDBCardHeader>
            <MDBCardBody style={{marginTop:"1px",marginLeft:"1px",marginRight:"1px",padding:0,backgroundColor: '#DFE7F6'}}>
              <CampaingTable></CampaingTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
        <MDBCol md='8'>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '28px' }}>
              Ratings & Reviews
            </MDBCardHeader>
            <MDBCardBody>
              <RatingComponent rating={ratings}></RatingComponent>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ViewProfile
