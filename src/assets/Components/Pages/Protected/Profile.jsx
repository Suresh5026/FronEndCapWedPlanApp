import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.com/auth/current-user",
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

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>
                  {user.name
                    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                    : ""}
                </h1>
              </Card.Title>
              <Card.Text>
                <p>Email: {user.email}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
