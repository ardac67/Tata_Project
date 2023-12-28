import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FooterUniversal from '../../FooterUniversal';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/' });
  const [login_data, setLoginData] = useState({});
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const signIn = () => {
    if (!login_data.user_name) {
      toast.error("Username is required!", { position: toast.POSITION.TOP_LEFT });
      return;
    }
    if (!login_data.password) {
      toast.error("Password is required!", { position: toast.POSITION.TOP_LEFT });
      return;
    }


    axios.post('http://localhost:3001/signin', login_data)
      .then(function (response) {
        if (response.status === 200) {
          cookies.set('user_id', response.data.user_id, { path: '/' });
          cookies.set('token', response.data.token, { path: '/' });
          cookies.set('type', response.data.type, { path: '/' });
          cookies.set('user_name', response.data.user_name, { path: '/' });
          cookies.set('full_name', response.data.full_name, { path: '/' });
          window.alert("Login Successful");
          navigate(`/`);
          setIsAuth(cookies.get("type"), true);
        } else if (response.status === 401) {
          toast.error("Invalid Credentials!", {
            position: toast.POSITION.TOP_LEFT
          });
        } else {
          toast.error("SERVER ERROR!", {
            position: toast.POSITION.TOP_LEFT
          });
        }
      })
      .catch(function (error) {
        toast.error("Invalid Credentials!", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };

  const updateData = e => {
    const { name, value } = e.target;
    setLoginData({
      ...login_data,
      [e.target.name]: e.target.value
    });

    // Check for username input
    if (name === 'user_name' && value.trim() === '') {
      // Set an error message for an empty username
      setUserNameError('Username is required.');
    } else {
      // Clear the error message for the username
      setUserNameError('');
    }

    // Check for password input
    if (name === 'password' && value.length < 6) {
      // Set an error message for a password less than 6 characters
      setIsButtonEnabled(false);
      setPasswordError('Password should be at least 6 characters long.');
    } else {
      setIsButtonEnabled(true);
      // Clear the error message for the password
      setPasswordError('');
    };
  }
  /*
    const updateData = e => {
      setLoginData({
        ...login_data,
        [e.target.name]: e.target.value
      });
    };
  */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      signIn();
    }
  };

  return (
    <div className='App' style={{ color: 'black' }}>
      <MDBContainer fluid>
        <ToastContainer />
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
                  label='Username'
                  id='form1'
                  type='email' // Change this to 'email'
                  name="user_name" // Consider renaming this to 'email' for clarity
                  onChange={updateData}
                />
                {/* Display error message for username */}
                {userNameError && <div style={{ color: 'red' }}>{userNameError}</div>}

                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='form2'
                  type='password'
                  name="password"
                  onChange={updateData}
                  onKeyPress={handleKeyPress}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                <p className='small mb-3 pb-lg-2'>
                  <a className='text-dark-50' href='#!'>
                    Forgot password?
                  </a>
                </p>
                <MDBBtn className='mb-4'
                disabled={!isButtonEnabled}
                 onClick={signIn}>
                  Sign in
                </MDBBtn>

                <div
                  className='d-flex justify-content-between mx-auto mb-4'
                  style={{ width: '40%' }}
                >
                  {/* ... (previous code) */}
                </div>

                <div>
                  <p className='mb-0'>
                    Don't have an account?
                    <Link className='text-dark-50 fw-bold' to={`/register`}>
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
  );
};

export default Login;
