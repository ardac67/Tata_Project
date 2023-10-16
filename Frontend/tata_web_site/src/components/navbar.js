import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCog,  faArrowCircleRight, faDove, faList,faPlus} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';


const navigation = () => {

    const user = {
        name: "Arda Çaltepe"
    }
    return (
        <>
            <Navbar className="navbarConstant" bg="white" data-bs-theme="white">
                <Container className="navbarContainer">
                    <Navbar.Brand className="site_name" href="#home">tata</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="navLink" href="#home">Find Influencers / Find Campaing</Nav.Link>
                        <Nav.Link className="navLink" href="#features">Collaborations</Nav.Link>
                        <Nav.Link className="navLink" href="#pricing">Collaboration History</Nav.Link>
                        <Nav.Link className="navLink" href="#pricing">Campaign Management</Nav.Link>
                    </Nav>
                        <Button variant="primary" className="createButtonGroup">New <FontAwesomeIcon icon={faPlus} className="createButtonPlus"/></Button>{}
                        <NavDropdown title={<> <FontAwesomeIcon icon={faUser} className="userIcon"/> {user.name}</>} id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1" className="dropdownItem"><FontAwesomeIcon icon={faCog} className="dropdownIcon"/> Account Settings</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" className="dropdownItem" ><FontAwesomeIcon icon={faDove} className="dropdownIcon"/>Collaboration Preferences</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.3" className="dropdownItem"><FontAwesomeIcon icon={faList} className="dropdownIcon"/>Audience Demography</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4" className="dropdownItem"><FontAwesomeIcon icon={faArrowCircleRight} className="dropdownIcon"/>Sign Out</NavDropdown.Item>
                        </NavDropdown>  
                </Container>
            </Navbar>
        </>
    );
}

export default navigation;