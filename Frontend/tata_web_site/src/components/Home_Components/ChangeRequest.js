import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FooterUniversal from '../../FooterUniversal'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { set } from 'date-fns'
import { useParams } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import fetchUserEmail from './fetchUserEmail'
const ForgotPassword = () => {
    var token =31
  const { id } = useParams()
  const {id2}=useParams()
  function decode(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 5)).join('');
    }
    var pass=decode(id2)
  const result = useQuery(['userss', id, token], fetchUserEmail)
  if (result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  var data = {
    password:pass
  }
  axios
  .put(`http://localhost:3001/updateUser2/${result.data.user.user_id}`, data)
  .then(response => {
    window.alert('success')
  })
  .catch(error => {
    window.alert('error')
  })
  return (<div></div>)
}

export default ForgotPassword
