import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,MDBInput,MDBCol,MDBIcon,MDBInputGroup } from 'mdb-react-ui-kit';

export default function MyProposals() {
  return (
    <><div className="d-flex justify-content-center mt-4">
      
      <MDBInputGroup className="w-50">
        <MDBInput label='Search' />
        <MDBBtn rippleColor='dark'>
          <MDBIcon icon='search' />
        </MDBBtn>
      </MDBInputGroup>
    </div><MDBTable align='middle mt-4'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Campaign ID</th>
            <th scope='col'>Campaign Owner</th>
            <th scope='col'>Campaign Status</th>
            <th scope='col'>Date</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>000001</p>
                </div>
              </div>
            </td>
            <td>
            <div className='d-flex align-items-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/2/20/Hepsiburada_logo_official.svg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle' />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Hepsiburada</p>
                  <p className='text-muted mb-0'>hepsiburada@gmail.com</p>
                </div>
              </div>
            </td>
            <td>
              <MDBBadge color='success' pill>
                Accepted
              </MDBBadge>
            </td>
            <td>01.11.2023</td>
            <td>
            <MDBBtn color='primary' rounded size='sm'>
                View
              </MDBBtn>
              <MDBBtn color='success' rounded size='sm'>
                Edit
              </MDBBtn>
              <MDBBtn color="danger" rounded size='sm'>
                Delete
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>000002</p>
                </div>
              </div>
            </td>
            <td>
            <div className='d-flex align-items-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle' />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Amazon</p>
                  <p className='text-muted mb-0'>amazon@gmail.com</p>
                </div>
              </div>
            </td>
            <td>
              <MDBBadge color='danger' pill>
                Rejected
              </MDBBadge>
            </td>
            <td>11.11.2023</td>
            <td >
              <div className='d-flex align-items-center'>
              <div className='ms-5'>
            <MDBBtn color='primary' rounded size='sm'>
                View
              </MDBBtn>
              </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
            <div className='ms-3'>
                  <p className='fw-bold mb-1'>000002</p>
                </div>
            </td>
            <div className='d-flex align-items-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Trendyol_logo.svg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle' />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Trendyol</p>
                  <p className='text-muted mb-0'>trendyol@gmail.com</p>
                </div>
              </div>
            <td>
              <MDBBadge color='warning' pill>
                In Process
              </MDBBadge>
            </td>
            <td>05.11.2023</td>
            <td>
            <MDBBtn color='primary' rounded size='sm'>
                View
              </MDBBtn>
              <MDBBtn color='success' rounded size='sm'>
                Edit
              </MDBBtn>
              <MDBBtn color="danger" rounded size='sm'>
                Delete
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable></>
  );
}