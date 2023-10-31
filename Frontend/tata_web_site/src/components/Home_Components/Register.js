import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBCol
} from 'mdb-react-ui-kit'
import Form from 'react-bootstrap/Form'
import './register.css'
import { useState } from 'react'
import FooterUniversal from '../../FooterUniversal'
const Register = () => {
  const [generateNewMedia, setNewMedia] = useState([])
  const [getType, setType] = useState('')

  const handleAddInput = () => {
    const newInput = (
      <>
        <MDBCol
          md='6'
          style={{
            paddingLeft: '0px'
          }}
        >
          <MDBInput
            wrapperClass='mb-4'
            label='Media Link'
            size='lg'
            id='platform'
            type='email'
          />
        </MDBCol>
        <MDBCol
          md='6'
          style={{
            paddingRight: '0px'
          }}
        >
          <MDBInput
            className='mb-4'
            label='Url'
            size='lg'
            id='textAreaExample'
          />
        </MDBCol>
      </>
    )

    setNewMedia([...generateNewMedia, newInput])
  }
  return (
    <>
      <div className='centered-container'>
        <div className='regFluid'>
          <MDBRow className='justify-content-center align-items-center m-5'>
            <MDBCard>
              <MDBCardBody className='px-4'>
                <h3 className='fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center'>
                  Registration
                </h3>

                <MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Full Name'
                      size='lg'
                      id='fullName'
                      type='text'
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='User Name'
                      size='lg'
                      id='userName'
                      type='text'
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Password'
                      size='lg'
                      id='password'
                      type='password'
                    />
                  </MDBRow>
                  <MDBRow>
                    <Form.Select
                      aria-label='Default select example'
                      style={{
                        fontWeight: 350
                      }}
                      onChange={e => {
                        setType(e.target.value)
                        //console.log(e.target.value)
                      }}
                      value={getType}
                    >
                      <option value=''>User Type</option>
                      <option value='Influencer'>Influencer</option>
                      <option value='Advertiser'>Advertiser</option>
                    </Form.Select>
                  </MDBRow>
                  <MDBRow className='mt-3'>
                    <MDBTextArea
                      className='mt-3'
                      label='Description'
                      id='textAreaExample'
                      rows={4}
                    />
                  </MDBRow>
                </MDBRow>
                <MDBRow>
                  <h4 className='fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3'>
                    Contact
                  </h4>

                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Email'
                      size='lg'
                      id='userName'
                      type='email'
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBTextArea
                      className='mt-3'
                      label='Address'
                      id='textAreaExample'
                      rows={2}
                    />
                  </MDBRow>
                  <MDBRow className='mt-3'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Phone'
                      size='lg'
                      id='userName'
                      type='phone'
                    />
                  </MDBRow>
                </MDBRow>
                <MDBRow>
                  <MDBRow className='d-flex justify-content-between'>
                    <MDBCol
                      style={{
                        textAlign: 'right'
                      }}
                    >
                      <h4 className='fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3'>
                        Media Links
                      </h4>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol
                      md='6'
                      style={{
                        paddingLeft: '0px'
                      }}
                    >
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Media Link'
                        size='lg'
                        id='platform'
                        type='email'
                      />
                    </MDBCol>
                    <MDBCol
                      md='6'
                      style={{
                        paddingRight: '0px'
                      }}
                    >
                      <MDBInput
                        className='mb-4'
                        label='Url'
                        size='lg'
                        id='textAreaExample'
                      />
                    </MDBCol>
                  </MDBRow>
                  {generateNewMedia.map((input, index) => (
                    <MDBRow> {input} </MDBRow>
                  ))}

                  <MDBRow></MDBRow>
                  <MDBCol
                    className='mr-0'
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <MDBBtn
                      className='mb-4 mt-3'
                      size='sm'
                      onClick={() => {
                        handleAddInput()
                      }}
                    >
                      Add More
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                {getType === 'Influencer' ? (
                  <MDBRow>
                    <MDBRow className='d-flex justify-content-between'>
                      <MDBCol
                        style={{
                          textAlign: 'right'
                        }}
                      >
                        <h4 className='fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3'>
                          Audience Demography
                        </h4>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol
                        md='6'
                        style={{
                          paddingLeft: '0px'
                        }}
                      >
                        <MDBInput
                          wrapperClass='mb-4'
                          label='Age Interval'
                          size='lg'
                          id='platform'
                          type='email'
                        />
                      </MDBCol>
                      <MDBCol
                        md='6'
                        style={{
                          paddingRight: '0px'
                        }}
                      >
                        <MDBInput
                          className='mb-4'
                          label='Gender'
                          size='lg'
                          id='textAreaExample'
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol
                        md='6'
                        style={{
                          paddingLeft: '0px'
                        }}
                      >
                        <MDBInput
                          wrapperClass='mb-4'
                          label='Location'
                          size='lg'
                          id='platform'
                          type='email'
                        />
                      </MDBCol>
                      <MDBCol
                        md='6'
                        style={{
                          paddingRight: '0px'
                        }}
                      >
                        <MDBInput
                          className='mb-4'
                          label='Social Economic Status'
                          size='lg'
                          id='textAreaExample'
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBCol
                      className='mr-0'
                      style={{
                        textAlign: 'right'
                      }}
                    ></MDBCol>
                  </MDBRow>
                ) : null}
                <MDBBtn className='mb-4 mt-3' size='lg'>
                  Submit
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </div>
      </div>
      <div className='footer' style={{
        marginTop:'50px'
      }}><FooterUniversal />
      </div>
      
    </>
  )
}

export default Register
