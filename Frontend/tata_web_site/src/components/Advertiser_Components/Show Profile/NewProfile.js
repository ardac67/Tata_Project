import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBSpinner,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit'
import ProfileMain from './ProfileMain'
import ContactMainProfile from './ContactViewProfile'
import TopTags from './TopTags'
import CampaingTable from './CampaignTable'
import RatingComponent from './RatingComponent'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useState } from 'react'
import fetchUser from '../Fetch/fetchUser'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import fetchComments2 from '../../Influencer_Components/Browse/fetchComments2'
import getAllCampaignsBYid from '../Fetch/getAllCampaignsBYid'
import fetchRatings from '../ViewProfileComponents/fetchRatings'
const NewProfile = () => {
  const [message, setMessage] = useState('')
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const user_id = cookies.get('user_id')
  const { id } = useParams('id')
  const { camp_id } = useParams('camp_id')
  console.log('campid', camp_id)
  console.log('rating_id', id)
  const [selectedRating, setSelectedRating] = useState(0)
  const handleStarClick = index => {
    setSelectedRating(index + 1)
    console.log('Selected Rating:', index + 1)
  }
  const headers = {
    Authorization: `Bearer ${token}`
  }
  var provide = {
    user_id: user_id,
    toUser_id: id,
    campaign_id: camp_id
  }
  console.log('prov', provide)
  const result4 = useQuery(['rating', id, token], fetchRatings)
  const result2 = useQuery(['abcd12312', id, token, provide], fetchComments2)
  const result3 = useQuery(['asdsadsa', camp_id, token], getAllCampaignsBYid)
  const result = useQuery(['user', id, token], fetchUser)
  if (result3.isLoading || result2.isLoading || result.isLoading || result4.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const user = result.data
  console.log("taha",result)
  console.log('counter', result2.data)
  console.log('camp', result3.data)
  console.log('sesks', result3.data.campaign[0].status)
  const createRating = () => {
    var data = {
      rating: selectedRating,
      rating_text: message,
      user_id: user_id,
      toUser_id: id,
      campaign_id: camp_id
    }
    console.log(data)
    axios
      .post(`http://localhost:3001/api/postRating`, data, { headers })
      .then(response => {
        toast.success('Success message here', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
      })
      .catch(error => {
        toast.error(`Already applied ${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
      })
  }
  return (
    <div>
      <ToastContainer />
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
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '28px' }}>
              Collaborations
            </MDBCardHeader>
            <MDBCardBody>
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
              <RatingComponent result={result4}></RatingComponent>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {result3.data.campaign[0].status === 'Ended' && result2.data.exists2 === 0 && (
        <MDBRow
          style={{
            marginTop: '50px',
            marginLeft: '20px',
            marginRight: '20px'
          }}
        >
          <MDBCol>
            <div className='rating-box'>
              <header>How was your experience?</header>
              <div className='stars'>
                {[1, 2, 3, 4, 5].map(index => (
                  <i
                    key={index}
                    className={`fa-solid fa-star${
                      index <= selectedRating ? ' active' : ''
                    }`}
                    onClick={() => handleStarClick(index)}
                  ></i>
                ))}
              </div>
              <MDBInput
                style={{ marginTop: '25px' }}
                label='Comments'
                id='typeText'
                type='text'
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </MDBCol>
          <MDBRow style={{ marginTop: '20px' }}>
            <MDBCol>
              <MDBBtn onClick={createRating}>Apply</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBRow>
      )}
    </div>
  )
}

export default NewProfile
