import React, { useState, useEffect } from "react";

import { Container, Button, Card, Row, Col } from "react-bootstrap";

import axios from "axios";
import Cookies from "js-cookie";

export default function Decorations() {
  const [decoItem, setDecoItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backendcapwedplanappevent.onrender.com/decorate/get-decoration`,
          {
            withCredentials: true,
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

    const storedWishlist = Cookies.get("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleSelect = (decoItem) => {
    if (!wishlist.some((item) => item._id === decoItem._id)) {
      const updatedWishlist = [...wishlist, decoItem];
      setWishlist(updatedWishlist);
      Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
      alert(`${decoItem.title} added to your wishlist!`);
    }
  };

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
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
