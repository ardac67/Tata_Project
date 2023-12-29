import { MDBCol, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit'
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
const TopCategoreis = () => {
  return (
    <MDBCardBody>
      <MDBCardText style={{ fontSize: '15px' }}>
        <MDBListGroup horizontal horizontalSize='md'>
          <MDBListGroupItem>#SocialMedia</MDBListGroupItem>
          <MDBListGroupItem>#Marketing</MDBListGroupItem>
          <MDBListGroupItem>#Creativity</MDBListGroupItem>
        </MDBListGroup>
        <MDBListGroup horizontal horizontalSize='md'>
          <MDBListGroupItem>#SmallBusiness</MDBListGroupItem>
          <MDBListGroupItem>#Entrepreneur</MDBListGroupItem>
          <MDBListGroupItem>#Innovation</MDBListGroupItem>
        </MDBListGroup>
      </MDBCardText>
    </MDBCardBody>
  )
}

export default TopCategoreis
