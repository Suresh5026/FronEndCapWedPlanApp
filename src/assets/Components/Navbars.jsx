import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../Context/Auth';
import { useEffect } from 'react';

export default function Navbars() {
  const {isLoggedIn,isAdmin, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/login');
  };
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="custom-navbar" bg="light" variant="light">
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img src="./logo.jpg" alt="logo" className="navbar-logo" />
              <h5 className="mb-0 ms-2">Wedding Planner</h5>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Wedding Planner
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-4">
                  <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                  
                  {isAdmin && (
                    <Nav.Link as={Link} to="/events" className="nav-link">Events</Nav.Link>
                  )}
                  
                  
                  {isLoggedIn ? (
                    <>
                    <Nav.Link as={Link} to="/vendors" className="nav-link">Vendors</Nav.Link> 
                    <Nav.Link as={Link} to="/bookings" className="nav-link">My Bookings</Nav.Link>
                    <Nav.Link as={Link} to="/budget" className="nav-link">Budget</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout} className="nav-link">Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                      <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                      
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
