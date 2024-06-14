import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Decorations() {
  const [decoItem, setDecoItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/decorate/get-decoration`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
          },
          
          }
        );
        const userData = response.data.data;
        console.log(userData);
        setDecoItem(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleSelect = (item) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist, item];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const handleRemove = (itemId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item._id !== itemId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };


  

  if (!decoItem) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container fluid className="vh-100 p-4">
        <Row className="h-100">
          <Col md={6} className="bg-light overflow-auto">
            <h3 className="text-center mb-4">Available Decorations</h3>
            <Row className="g-4">
              {decoItem.map((decoItem) => (
                <Col key={decoItem._id} xs={12} sm={6} md={6} lg={4}>
                  <Card>
                    <Card.Img variant="top" src={decoItem.image} />
                    <Card.Body>
                      <Card.Title>{decoItem.title}</Card.Title>
                      <Card.Text>{decoItem.text}</Card.Text>
                      <h5>${decoItem.price}</h5>
                      <Button
                        variant="primary"
                        onClick={() => handleSelect(decoItem)}
                      >
                        Select
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6} className="bg-dark text-white overflow-auto">
            <h3 className="text-center mb-4">Your Wishlist</h3>
            <Row className="g-4">
              {wishlist.length === 0 ? (
                <div className="text-center w-100">Your wishlist is empty.</div>
              ) : (
                wishlist.map((decoItem) => (
                  <Col key={decoItem._id} xs={12} sm={6} md={6} lg={4}>
                    <Card bg="secondary">
                      <Card.Img variant="top" src={decoItem.image} />
                      <Card.Body>
                        <Card.Title>{decoItem.title}</Card.Title>
                        <Card.Text>{decoItem.text}</Card.Text>
                        <h5>${decoItem.price}</h5>
                        <Button
                          variant="danger"
                          onClick={() => handleRemove(decoItem._id)}
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
