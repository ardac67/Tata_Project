import React from 'react'
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBtnGroup,
  MDBContainer,
  MDBFooter,
  MDBIcon,
  MDBCarousel,
  MDBCarouselItem
} from 'mdb-react-ui-kit'
import './Home.css'
import Pic1 from './pictures/Home1.png'
import Pic2 from './pictures/Home2.png'
import Pic3 from './pictures/Home3.png'
import FooterUniversal from '../../FooterUniversal'
const Home = () => {

  return (
    <div className='App'>
      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
          alt='...'
        >
          <div className='Main'>
            <h4 className='Header'>
              Find the best influencer for your product. Cheap and safely.
            </h4>
            <div className='mainPictures'>
              <MDBRow>
                <MDBCol lg='4' md='12' className='mb-4'>
                  <img src={Pic1} className='img-fluid rounded' alt='' />
                </MDBCol>

                <MDBCol lg='4' md='6' className='mb-4'>
                  <img src={Pic2} className='img-fluid rounded' alt='' />
                </MDBCol>

                <MDBCol lg='4' md='6' className='mb-4'>
                  <img src={Pic3} className='img-fluid rounded' alt='' />
                </MDBCol>
              </MDBRow>
            </div>

            <p className='MainLow'>
              Register on our site to introduce clothes, cosmetics,technological
              devices, nutrition and everything like that .
            </p>
            <div className='mainbuttons text-center'></div>
          </div>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
          alt='...'
        >
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </MDBCarouselItem>
      </MDBCarousel>

      <div className='MainBottom'>
        <h2 className='MainBottomHeader'>
          Do you want to advertise a product?
        </h2>
        <MDBContainer>
          <MDBRow className='m-5 text-center'>
            <MDBCol size='md-3'>
              <p className='fw-bold fs-3'>Post a product</p>
              <div className='MainBottomExp'>
                It’s free and easy to post a job. Simply fill in a title,
                description and budget and competitive bids come within minutes.
              </div>
            </MDBCol>
            <MDBCol size='md-3'>
              <p className='fw-bold fs-3'>Choose an influencer</p>
              <div className='MainBottomExp'>
                We've got influencers for your products of any type of. Choose
                the one with the budget and features that suits you.
              </div>
            </MDBCol>
            <MDBCol size='md-3'>
              <p className='fw-bold fs-3'>Pay Safely</p>
              <div className='MainBottomExp'>
                Only pay for work when it has been completed and you're 100%
                satisfied with the quality using our milestone payment system.
              </div>
            </MDBCol>
            <MDBCol size='md-3'>
              <p className='fw-bold fs-3'>We're here to help</p>
              <div className='MainBottomExp'>
                Our talented team of recruiters can help you find the best
                influencer for the job and our technical co-pilots can even
                manage the project for you.
                asdsasad
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <FooterUniversal />
    </div>
  )
    return (
        <div className="App">
            This is home
            asd
        </div>
    )
}

export default Home
