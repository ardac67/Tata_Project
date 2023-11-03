import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBCol,
  MDBFile
} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import './register.css'
import { useState } from 'react'
import FooterUniversal from '../../FooterUniversal'
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate()
  const [generateNewMedia, setNewMedia] = useState([])
  const [getType, setType] = useState('')
  const [register_data, setRegisterData] = useState({})
  const [contact_data, setContactData] = useState({})
  const [media_links_data, setMedia_links_data] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)

  let post_object = {}
  const push_as_register = () => {
    post_object = {
      ...register_data,
      contact: contact_data,
      media_links: media_links_data
    }
    //console.log(post_object)
    
    axios
      .post('http://localhost:3001/createUser', post_object)
      .then(function (response) {
        if (response.status === 200) {
          window.alert('Başarili Yönlendiriliyorsunuz...')
          navigate('/Login')
        } else {
          window.alert(response.data.message)
        }
      })
      .catch(function (error) {
        window.alert(error)
      })
      
  }

  const updateData = e => {
    setRegisterData({
      ...register_data,
      [e.target.name]: e.target.value
    })
  }
  const setImage = e => {
    setSelectedFile(e.target.files[0])
  }
  const updateContactData = e => {
    setContactData({
      ...contact_data,
      [e.target.name]: e.target.value
    })
  }
  const update_media_links_data = e => {
    setMedia_links_data({
      ...media_links_data,
      [e.target.name]: e.target.value
    })
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
                      name='name'
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow style={{ marginBottom: '15px' }}>
                    <MDBFile
                      wrapperClass='mb-4'
                      size='lg'
                      id='userName'
                      type='file'
                      name='file_image'
                      onChange={setImage}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='User Name'
                      size='lg'
                      id='userName'
                      type='text'
                      name='user_name'
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Password'
                      size='lg'
                      id='password'
                      type='password'
                      name='password'
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow>
                    <Form.Select
                      aria-label='Default select example'
                      style={{
                        fontWeight: 350
                      }}
                      name='type'
                      onChange={e => {
                        setType(e.target.value)
                        updateData(e)
                      }}
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
                      name='description'
                      onChange={updateData}
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
                      id='email'
                      type='email'
                      name='email'
                      onChange={updateData}
                    />
                  </MDBRow>
                  <MDBRow>
                    <MDBTextArea
                      className='mt-3'
                      label='Address'
                      id='textAreaExample'
                      rows={2}
                      name='address'
                      onChange={updateContactData}
                    />
                  </MDBRow>
                  <MDBRow className='mt-3'>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Phone'
                      size='lg'
                      id='phone'
                      type='phone'
                      name='phone'
                      onChange={updateContactData}
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
                      md='3'
                      style={{
                        paddingLeft: '0px'
                      }}
                    >
                      <MDBInput
                        wrapperClass='mb-4'
                        label='Yotube'
                        size='lg'
                        id='media_link'
                        type='media_link1'
                        name='youtube'
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                    <MDBCol
                      md='3'
                      style={{
                        paddingRight: '0px'
                      }}
                    >
                      <MDBInput
                        className='mb-4'
                        label='Twitter'
                        size='lg'
                        id='Url'
                        name='twitter'
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                    <MDBCol
                      md='3'
                      style={{
                        paddingRight: '0px'
                      }}
                    >
                      <MDBInput
                        className='mb-4'
                        label='Tiktok'
                        size='lg'
                        id='textAreaExample'
                        name='tiktok'
                        onChange={update_media_links_data}
                      />
                    </MDBCol>{' '}
                    <MDBCol
                      md='3'
                      style={{
                        paddingRight: '0px'
                      }}
                    >
                      <MDBInput
                        className='mb-4'
                        label='Instagram'
                        size='lg'
                        id='textAreaExample'
                        name='instagram'
                        onChange={update_media_links_data}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow></MDBRow>
                  <MDBCol
                    className='mr-0'
                    style={{
                      textAlign: 'right'
                    }}
                  ></MDBCol>
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
                <MDBBtn
                  className='mb-4 mt-3'
                  size='lg'
                  onClick={push_as_register}
                >
                  Submit
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </div>
      </div>
      <div
        className='footer'
        style={{
          marginTop: '50px'
        }}
      >
        <FooterUniversal />
      </div>
    </>
  )
}

export default Register
