import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FooterUniversal from '../../FooterUniversal'
import Cookies from 'universal-cookie';
import axios from 'axios'

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate()
  const cookies = new Cookies(null ,{ path: '/' });
  const [login_data, setLoginData] = useState({})
  const signIn = () => {
        //let jsonData=JSON.stringify(login_data)
        //console.log(jsonData)
        axios.post('http://localhost:3001/signin',login_data)
        .then(function (response) {
            if(response.status===200){
                cookies.set('user_id', response.data.user_id, {
                    path:'/'                    
                })
                  cookies.set('token', response.data.token, {
                    path:'/'                    
                })
                cookies.set('type', response.data.type, {
                    path:'/'                    
                })
                cookies.set('user_name', response.data.user_name, {
                  path:'/'                    
              })
              cookies.set('full_name', response.data.full_name, {
                  path:'/'                    
              })
                window.alert("Login Successful")
                navigate(`/`)
                setIsAuth(cookies.get("type"),true)
            }
            else{
              window.alert(response.data.message)
            }
        })
        .catch(function (error) {
          window.alert(error)
        })
  }

  const updateData = e => {
    setLoginData({
        ...login_data,
        [e.target.name]: e.target.value
    })
  }
  return (
    <div
      className='App'
      style={{
        color: 'black'
      }}
    >
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard
              className='bg-white my-5 mx-auto'
              style={{ borderRadius: '1rem', maxWidth: '400px' }}
            >
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className='mb-5 text-uppercase'>Login</h2>

                <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  id='form1'
                  type='user_name'
                  name="user_name"
                  onChange={updateData }
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='form2'
                  type='password'
                  name="password"
                  onChange={ updateData }
                />

                <p className='small mb-3 pb-lg-2'>
                  <a class='text-dark-50' href='#!'>
                    Forgot password?
                  </a>
                </p>
                <MDBBtn className='mb-4' onClick={signIn}>
                  Sign in
                </MDBBtn>

                <div
                  className='d-flex justify-content-between mx-auto mb-4'
                  style={{ width: '40%' }}
                >
                  <MDBBtn
                    tag='a'
                    color='none'
                    className='m-1'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='facebook-f' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='m-1'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='twitter' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='m-1'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='google' size='sm' />
                  </MDBBtn>

                  <MDBBtn
                    tag='a'
                    color='none'
                    className='m-1'
                    style={{ color: '#1266f1' }}
                  >
                    <MDBIcon fab icon='github' size='sm' />
                  </MDBBtn>
                </div>

                <div>
                  <p className='mb-0'>
                    Don't have an account?
                    <Link class='text-dark-50 fw-bold' to={`/register`}>
                      {' '}
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <FooterUniversal />
    </div>
  )
}

export default Login
