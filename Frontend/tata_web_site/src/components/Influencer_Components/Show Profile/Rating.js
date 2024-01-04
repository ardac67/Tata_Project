import React, { useState } from 'react'
import './rating.css' // Import your CSS file
import {
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit'
const StarRating = () => {
  const [selectedRating, setSelectedRating] = useState(0)
  const handleStarClick = index => {
    setSelectedRating(index + 1)
    console.log('Selected Rating:', index + 1)
  }

  return (
    <MDBRow style={{marginTop:'50px',marginLeft:'20px',marginRight:'20px'}}>
      <MDBCol>
        arda
      </MDBCol>
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
        <MDBInput style={{marginTop:'25px'}} label='Comments' id='typeText' type='text' />
      </div>
      </MDBCol>
    </MDBRow>
  )
}

export default StarRating
