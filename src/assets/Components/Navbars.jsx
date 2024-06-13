import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../Context/Auth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbars() {
  const { isLoggedIn, isAdmin, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/current-user",
          {
            withCredentials: true,
          }
        );
        const userData = response.data.data;
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="custom-navbar"
          bg="light"
          variant="light"
        >
          <Container fluid>
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center"
            >
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
                  <Nav.Link as={Link} to="/" className="nav-link">
                    Home
                  </Nav.Link>

                  {isAdmin && (
                    <>
                      <Nav.Link as={Link} to="/events" className="nav-link">
                        Events
                      </Nav.Link>
                      <Nav.Link as={Link} to="/decorate" className="nav-link">
                        Decoration Data
                      </Nav.Link>
                    </>
                  )}

                  {isLoggedIn ? (
                    <>
                      <Nav.Link as={Link} to="/vendors" className="nav-link">
                        Vendors
                      </Nav.Link>
                      <Nav.Link as={Link} to="/decorations" className="nav-link">
                        Decoration
                      </Nav.Link>
                      <Nav.Link as={Link} to="/bookings" className="nav-link">
                        My Bookings
                      </Nav.Link>
                      <Nav.Link as={Link} to="/budget" className="nav-link">
                        Budget
                      </Nav.Link>
                      <Nav.Link as={Link} to="/planning" className="nav-link">
                        Planning
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/decorations"
                        className="nav-link"
                      >
                        Decorations
                      </Nav.Link>
                      {user && (
                        <NavDropdown
                          title={
                            user.name
                              ? user.name.charAt(0).toUpperCase() +
                                user.name.slice(1)
                              : ""
                          }
                          id="basic-nav-dropdown"
                        >
                          <Nav.Link
                            as={Link}
                            to="/profile"
                            className="nav-link"
                          >
                            Profile
                          </Nav.Link>
                          <Nav.Link
                            as={Link}
                            to="/"
                            onClick={handleLogout}
                            className="nav-link"
                          >
                            Logout
                          </Nav.Link>
                        </NavDropdown>
                      )}
                    </>
                  ) : (
                    <>
                      <Nav.Link as={Link} to="/register" className="nav-link">
                        Register
                      </Nav.Link>
                      <Nav.Link as={Link} to="/login" className="nav-link">
                        Login
                      </Nav.Link>
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
