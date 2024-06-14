import { Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../../Context/Eventcontext";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Editevent() {
  const { fetchEvents } = useEvent();
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    vendor: "",
    phone: "",
    city: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://backendcapwedplanappevent.onrender.com/events/get-events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const eventData = response.data.data;
        setInitialValues(eventData);
        console.log(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (!values.vendor) {
            errors.vendor = "Required";
          }
          if (!values.phone) {
            errors.phone = "Required";
          }
          if (!values.city) {
            errors.city = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          }
          if (!values.image) {
            errors.image = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const token = localStorage.getItem("token");
          try {
            const response = await axios.put(
              `https://backendcapwedplanappevent.onrender.com/events/edit-event/${id}`,
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data.message);
            fetchEvents();
            navigate("/events");
          } catch (error) {
            console.error("There was an error creating the event!", error);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className="w-75" onSubmit={handleSubmit}>
            <h4 className="mb-4 text-center">Edit Event</h4>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="nameHelp"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="nameHelp"
                name="description"
                onChange={handleChange}
                style={{ textAlign: "start" }}
                onBlur={handleBlur}
                value={values.description}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="vendor">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Vendors</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="nameHelp"
                name="vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.vendor}
                isInvalid={touched.vendor && !!errors.vendor}
              />
              <Form.Control.Feedback type="invalid">
                {errors.vendor}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="cityHelp"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.city}
                isInvalid={touched.city && !!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneHelp">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="phoneHelp"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.phone}
                isInvalid={touched.phone && !!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="imgHelp"
                name="image"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.image}
                isInvalid={touched.image && !!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="PriceHelp"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ textAlign: "start" }}
                value={values.price}
                isInvalid={touched.price && !!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Update Event
            </Button>
            <Button variant="primary" onClick={()=>navigate('/events')}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
