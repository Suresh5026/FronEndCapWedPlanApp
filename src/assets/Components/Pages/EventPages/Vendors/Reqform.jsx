import {
  Button,
  ButtonGroup,
  Container,
  Form,
  Row,
  Col,
  CloseButton,
} from "react-bootstrap";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";

import { jwtDecode } from "jwt-decode";


export default function Reqform({ eventName, eventId, eventPrice, closeForm }) {
  const [events, setEvents] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const token = localStorage.getItem("token");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.com/events/get-events",
          {
            headers: {
              'Authorization': `Bearer ${token}`
          },
          
          }
        );
        const eventData = response.data.data;
        setEvents(eventData);
        
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  
  return (
    <Container className="myForm">
      <div className="d-flex justify-content-end">
        <CloseButton onClick={closeForm} />
      </div>

      <h1>{eventName}</h1>
      <h3>Event Booking Form</h3>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          fromDate: "",
          toDate: "",
          guests: ""
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.phone) {
            errors.phone = "Phone number is required";
          }
          if (!values.fromDate) {
            errors.fromDate = "Event From Date is required";
          }
          if (!values.toDate) {
            errors.toDate = "Event To Date is required";
          }
          if (!values.guests) {
            errors.guests = "Guests count is required";
          }
          return errors;
        }}
        onSubmit={(values,{ setSubmitting }) => {
          try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const bookingData = {
              ...values,
              eventId: eventId,
              price: eventPrice,
              userId: userId
            };

            axios
              .post(
                "https://backendcapwedplanappevent.onrender.com/bookings/create-booking",
                bookingData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  withCredentials: true
                }
              )
              .then((response) => {
                console.log(response.data);
                setSubmitting(false);
              })
              .catch((error) => {
                console.error("Error creating booking:", error);
                setSubmitting(false);
              });
              setAlertMessage("Registered successfully!");
            closeForm();
          } catch (error) {
            console.error("Error decoding token:", error);
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="name.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  style={{ textAlign: "start" }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                />
                {errors.name && touched.name ? (
                  <div className="invalid-feedback">{errors.name}</div>
                ) : null}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="email.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  style={{ textAlign: "start" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback">{errors.email}</div>
                ) : null}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="phone.ControlInput1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  style={{ textAlign: "start" }}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.phone && !!errors.phone}
                />
                {errors.phone && touched.phone ? (
                  <div className="invalid-feedback">{errors.phone}</div>
                ) : null}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="event.ControlInput1">
                <Form.Label>Event From Date</Form.Label>
                <Form.Control
                  type="date"
                  name = "fromDate"
                  value={values.fromDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.fromDate && !!errors.fromDate}
                />
                {errors.fromDate && touched.fromDate ? (
                  <div className="invalid-feedback">{errors.fromDate}</div>
                ) : null}
              </Form.Group>
              <Form.Group as={Col} controlId="event.ControlInput1">
                <Form.Label>Event To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={values.toDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.toDate && !!errors.toDate}
                />
                {errors.toDate && touched.toDate ? (
                  <div className="invalid-feedback">{errors.toDate}</div>
                ) : null}
              </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Guests approx count.</Form.Label>
                  <br />
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="secondary"
                      onClick={() => setFieldValue("guests", "0-100")}
                      active={values.guests === "0-100"}
                    >
                      0-100
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setFieldValue("guests", "100-200")}
                      active={values.guests === "100-200"}
                    >
                      100-200
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setFieldValue("guests", "200-500")}
                      active={values.guests === "200-500"}
                    >
                      200-500
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setFieldValue("guests", "500+")}
                      active={values.guests === "500+"}
                    >
                      500+
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setFieldValue("guests", "not require")}
                      active={values.guests === "not require"}
                    ></Button>
                  </ButtonGroup>
                </Form.Group>
              </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="amount.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="Number"
                  name="price"
                  value={eventPrice}
                  readOnly
                  style={{ textAlign: "start" }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Button
                  variant="danger"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Group>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
