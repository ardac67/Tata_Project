import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea, 
  MDBCol
}
from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import './register.css'
import { useState } from 'react';
const Register = () => {
    const [generateNewMedia,setNewMedia] = useState([]);

    const handleAddInput = () => {
        const newInput = (
            <MDBRow>
                <MDBCol>
                    <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='platform' type='email'/>
                </MDBCol>
                <MDBCol>
                    <MDBInput className='mb-4' label='Url' size="lg" id='textAreaExample'/>
                </MDBCol>
            </MDBRow>
        );
    
        setNewMedia([...generateNewMedia, newInput]);
      };
    return (
        <div className="centered-container">
            <div className='regFluid'>
                    <MDBRow className='justify-content-center align-items-center m-5'>

                    <MDBCard>
                        <MDBCardBody className='px-4'>

                        <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Registration</h3>

                        <MDBRow>

                            <MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Full Name' size='lg' id='fullName' type='text'/>
                            </MDBRow>
                            <MDBRow>
                                <MDBInput wrapperClass='mb-4' label='User Name' size='lg' id='userName' type='text'/>
                            </MDBRow>
                            <MDBRow>
                                <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' type='password'/>
                            </MDBRow>
                            <MDBRow>
                                <Form.Select aria-label="Default select example"  
                                style={
                                {
                                    fontWeight: 350

                                }}
                                >
                                    <option>
                                    User Type</option>
                                    <option value="1">Influencer</option>
                                    <option value="2">Advertiser</option>
                                </Form.Select>
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <MDBTextArea className='mt-3' label='Description' id='textAreaExample' rows={4} />
                            </MDBRow>
                        </MDBRow>    
                        <MDBRow>
                            <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3">Contact</h4>
                         
                            <MDBRow >
                                <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='userName' type='email'/>
                            </MDBRow>
                            <MDBRow>
                                <MDBTextArea className='mt-3' label='Address' id='textAreaExample' rows={2} />
                            </MDBRow>
                            <MDBRow className='mt-3'>
                                <MDBInput wrapperClass='mb-4' label='Phone' size='lg' id='userName' type='phone'/>
                            </MDBRow>
                        </MDBRow>    
                        <MDBRow>
                        <MDBRow className="d-flex justify-content-between">
                            <MDBCol style={{
                                textAlign: 'right'
                            }}>
                                <h4 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center mt-3">Media Links</h4>
                            </MDBCol>
                        </MDBRow>
                            {
                                generateNewMedia.map((input, index) => (
                                    <MDBRow key={index}> 
                                        {input}
                                    </MDBRow>
                            ))}
                            <MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='platform' type='email'/>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput className='mb-4' label='Url' size="lg" id='textAreaExample'/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBRow>

                        <MDBRow>     
                            </MDBRow>
                            <MDBCol className="mr-0" style={{
                                textAlign: 'right'
                            }} >
                                <MDBBtn className="mb-4 mt-3" size="sm" onClick={
                                    () => {
                                        handleAddInput()
                                    }
                                }>
                                    Add More
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>            
                        <MDBBtn className='mb-4 mt-3' size='lg'>Submit</MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                    </MDBRow>
                </div>
            </div>
    )
}

export default Register
