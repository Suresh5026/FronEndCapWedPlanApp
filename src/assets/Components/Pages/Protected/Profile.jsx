import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
export default function Profile(){
    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/150" />
                        <Card.Body>
                            <Card.Title>John Doe</Card.Title>
                            <Card.Text>
                                Wedding Planner
                            </Card.Text>
                            <Button variant="primary">Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h2>About Me</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    </p>
                    <h2>Services</h2>
                    <ul>
                        <li>Wedding planning</li>
                        <li>Decoration</li>
                        <li>Vendor coordination</li>
                        <li>Event management</li>
                    </ul>
                    <h2>Contact Information</h2>
                    <p>Email: john@example.com</p>
                    <p>Phone: +1234567890</p>
                    <h2>Reviews</h2>
                    <div>
                        {/* Render reviews here */}
                        <p>No reviews yet.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}


