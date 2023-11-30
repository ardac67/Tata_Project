import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardHeader,
  MDBCardFooter,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBTextArea
} from 'mdb-react-ui-kit'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Cookies from 'universal-cookie'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
const cookies = new Cookies(null, { path: '/' })
const CreateCampaign = () => {
  const navigate = useNavigate()
  const {quillRef } = useQuill();
  const token = cookies.get('token')
  const [dateStart, setDateStart] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())
  const [formData, setFormData] = useState({})
  const [buttonState, setButtonState] = useState(false)
  const setData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      campaignStartDate: dateStart,
      campaignEndDate: dateEnd,
      user_id: cookies.get('user_id'),
      status: 'pending'
    })
  }

  const setEditorData = (content) => {
    setFormData({
      ...formData,
      editorContent: content, // assuming 'editorContent' is the state field for the Quill content
      campaignStartDate: dateStart,
      campaignEndDate: dateEnd,
      user_id: cookies.get('user_id'),
      status: 'pending'
    });
  };

  const headers = {
    Authorization: `Bearer ${token}`
  }
  const pushToApi = () => {
    console.log(formData)
    
    axios
      .post(`http://localhost:3001/api/createCampaign`, formData, { headers })
      .then(response => {
        toast.success('Succesfully Created Redirecting....', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000
        })
        setButtonState(true)
        const delayInMilliseconds = 5000
        setTimeout(() => {
          navigate('/')
        }, delayInMilliseconds)
      })
      .catch(error => {
        toast.error('Error Occured', {
          position: toast.POSITION.TOP_CENTER
        })
      })
      
  }
  return (
    <div
      style={{
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: '20px',
        marginBottom: '20px'
      }}
    >
      {' '}
      <h1
        style={{ marginTop: '10px', marginBottom: '20px', fontSize: '1.5rem' }}
      >
        Create a New Campaign
      </h1>
      <p>
        Create your campaign carefully on our website goes through the info that
        you have supplied.
      </p>
      <MDBRow style={{ marginTop: '30px', marginBottom: '50px' }}>
        <ToastContainer />
        <MDBCol md='3'>
          {' '}
          <MDBListGroup style={{ minWidth: '8rem' }} light>
            <MDBListGroupItem
              tag='a'
              href='#campaign'
              action
              noBorders
              aria-current='true'
              className='px-3'
              color='primary'
              style={{
                color: 'rgb(96 100 118/var(--tw-text-opacity))'
              }}
            >
              Campaign Information
            </MDBListGroupItem>
            <MDBListGroupItem
              tag='a'
              href='#preferences'
              action
              noBorders
              className='px-3'
              color='primary'
              style={{
                color: 'rgb(96 100 118/var(--tw-text-opacity))'
              }}
            >
              Collaboration Preferences
            </MDBListGroupItem>
            <MDBListGroupItem
              tag='a'
              href='#platforms'
              action
              noBorders
              className='px-3'
              color='primary'
              style={{
                color: 'rgb(96 100 118/var(--tw-text-opacity))'
              }}
            >
              Preferred Platforms and Campaign Tags
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
        <MDBCol md='9'>
          <MDBCard alignment='left'>
            <MDBCardHeader
              id='campaign'
              style={{ fontSize: '1.125rem', fontWeight: '500' }}
            >
              Campaign Information
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='6'>
                  <MDBRow>
                    {' '}
                    <MDBCol md='3'>
                      <h6
                        style={{
                          marginTop: '5px',
                          color: '#7d8fb1',
                          fontWeight: '400'
                        }}
                      >
                        Start Date
                      </h6>
                    </MDBCol>
                    <MDBCol md='3'>
                      <DatePicker
                        selected={dateStart}
                        onChange={dateStart => setDateStart(dateStart)}
                        dateFormat='Pp'
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md='6'>
                  {' '}
                  <MDBRow>
                    <MDBCol md='3'>
                      <h6
                        style={{
                          marginTop: '5px',
                          color: '#7d8fb1',
                          fontWeight: '400'
                        }}
                      >
                        End Date
                      </h6>
                    </MDBCol>
                    <MDBCol md='3'>
                      <DatePicker
                        selected={dateEnd}
                        onChange={dateEnd => setDateEnd(dateEnd)}
                        dateFormat='Pp'
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: '25px' }}>
                <MDBCol md='2'>
                  <h6
                    style={{
                      marginTop: '5px',
                      color: '#7d8fb1',
                      fontWeight: '400'
                    }}
                  >
                    Campaing Header
                  </h6>
                </MDBCol>
                <MDBCol md='10' className='justify-content-start'>
                  <MDBInput
                    label='Campaign Header'
                    id='formControlDefault'
                    type='text'
                    name='campaign_header'
                    onChange={setData}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-5"style={{ marginTop: '25px'}}>
                <MDBCol md='2'>
                  <h6
                    style={{
                      marginTop: '5px',
                      color: '#7d8fb1',
                      fontWeight: '400'
                    }}
                  >
                    Description
                  </h6>
                </MDBCol>
                <MDBCol md='10' className='justify-content-start'>
                  <MDBCol ref={quillRef}
                    onChange={setData}
                    size={{marginBottom:'10px'}}
                  />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCard alignment='left' style={{ marginTop: '20px' }}>
            <MDBCardHeader
              id='preferences'
              style={{ fontSize: '1.125rem', fontWeight: '500' }}
            >
              Collaboration Preferences
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='12'>
                  <MDBRow>
                    {' '}
                    <MDBCol md='2'>
                      <h6
                        style={{
                          marginTop: '5px',
                          color: '#7d8fb1',
                          fontWeight: '400'
                        }}
                      >
                        Target Audience
                      </h6>
                    </MDBCol>
                    <MDBCol md='10'>
                       <ReactQuill theme="snow"  onChange={setEditorData} />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: '25px' }}>
                <MDBCol md='2'>
                  <h6
                    style={{
                      marginTop: '5px',
                      color: '#7d8fb1',
                      fontWeight: '400'
                    }}
                  >
                    Age Interval
                  </h6>
                </MDBCol>
                <MDBCol md='10' className='justify-content-start'>
                <ReactQuill theme="snow" name="age_interval" onChange={setEditorData} />
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: '25px' }}>
                <MDBCol md='2'>
                  <h6
                    style={{
                      marginTop: '5px',
                      color: '#7d8fb1',
                      fontWeight: '400'
                    }}
                  >
                    Target Gender
                  </h6>
                </MDBCol>
                <MDBCol md='10' className='justify-content-start'>
                <ReactQuill theme="snow" name="gender_information" onChange={setEditorData} />
                </MDBCol>
              </MDBRow>
              <MDBRow style={{ marginTop: '25px' }}>
                <MDBCol md='2'>
                  <h6
                    style={{
                      marginTop: '5px',
                      color: '#7d8fb1',
                      fontWeight: '400'
                    }}
                  >
                    Required Channel Statistics
                  </h6>
                </MDBCol>
                <MDBCol md='10' className='justify-content-start'>
                <ReactQuill theme="snow" name="statistical_interval" onChange={setEditorData} />
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCard alignment='left' style={{ marginTop: '20px' }}>
            <MDBCardHeader
              id='platforms'
              style={{ fontSize: '1.125rem', fontWeight: '500' }}
            >
              Preferred Platforms and Campaign Tags
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md='12'>
                  <MDBRow>
                    {' '}
                    <MDBCol md='2'>
                      <h6
                        style={{
                          marginTop: '5px',
                          color: '#7d8fb1',
                          fontWeight: '400'
                        }}
                      >
                        Platforms
                      </h6>
                    </MDBCol>
                    <MDBCol md='10'>
                    <ReactQuill theme="snow" name="platform"onChange={setEditorData} />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md='12' style={{ marginTop: '10px' }}>
                  <MDBRow>
                    {' '}
                    <MDBCol md='2'>
                      <h6
                        style={{
                          marginTop: '5px',
                          color: '#7d8fb1',
                          fontWeight: '400'
                        }}
                      >
                        Campaign Tags
                      </h6>
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Tag 1'
                        id='formControlDefault'
                        type='text'
                        name='tag1'
                        onChange={setData}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Tag 2'
                        id='formControlDefault'
                        type='text'
                        name='tag2'
                        onChange={setData}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Tag 3'
                        id='formControlDefault'
                        type='text'
                        name='tag3'
                        onChange={setData}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Tag 4'
                        id='formControlDefault'
                        type='text'
                        name='tag4'
                        onChange={setData}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Tag 5'
                        id='formControlDefault'
                        type='text'
                        name='tag5'
                        onChange={setData}
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBCardFooter style={{ marginTop: '10px' }}>
            <MDBBtn
              outline
              className='mx-2'
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(111, 137, 251) 0%, rgb(97, 109, 245) 33%, rgb(92, 82, 235) 100%)',
                color: 'white'
              }}
              size='lg'
              color='primary'
              onClick={pushToApi}
              enabled={buttonState}
            >
              Create Campaign
            </MDBBtn>
          </MDBCardFooter>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default CreateCampaign
