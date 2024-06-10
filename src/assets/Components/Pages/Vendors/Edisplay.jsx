import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Reqform from './Reqform';
export default function Edisplay({data}) {
      const [alldata, setAllData] = useState([]);
      const [showForm, setShowForm] = useState(false); 
      const [selectedEvent, setSelectedEvent] = useState(null);
      
      useEffect(() => {
        const token = Cookies.get("token");
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/events/get-events",
              {
                withCredentials: true,
              }
            );
            const userData = response.data.data;
            console.log(userData)
            setAllData(userData);
          } catch (error) {
            console.log("Error fetching user data:", error);
          }
        };
    
        if (token) {
          fetchData();
        }
      }, []);

      const handleClick = (event) => {
        setSelectedEvent(event); 
        setShowForm(true); 
      };
      
  return (
    <Container fluid className="p-3">
      {data.map((values,index)=>(
        <Card className="mb-3 w-100 card-full-height" key={`${values.name}-${index}`}>
        <Row>
          <Col md={4} className="image-container">
            <Card.Img
              src={values.image}
              className="img-fluid card-image"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title className='text-danger'>{values.name}</Card.Title>
              
              <Card.Subtitle className="mb-2 text-muted">
                {values.description}
                </Card.Subtitle>
              
                <Card.Text>{values.vendor}</Card.Text>
                <Card.Text>📞 {values.phone}</Card.Text>
                <Card.Text>📍 {values.city}</Card.Text>
                <Card.Text><b>From Rs. {values.price}</b></Card.Text>
              <Button className='myButton' variant="outline-success" onClick={() => handleClick(values)}>Book Now</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      ))}
       {showForm && <div className="position-fixed top-50 start-50 translate-middle">
          <Reqform eventName={selectedEvent.name} eventId={selectedEvent._id} eventPrice={selectedEvent.price} closeForm={() => setShowForm(false)} />
        </div>} 
    </Container>
  );
}
