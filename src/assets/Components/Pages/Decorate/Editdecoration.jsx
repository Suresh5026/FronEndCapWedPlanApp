import { Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDeco } from "../../../Context/Decocontext";

export default function Editdecoration() {
  const { fetchDeco } = useDeco();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    text: "",
    image: "",
    price: "",
    selection: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDecorationDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/decorate/get-decoration/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
        );
        const decoData = response.data.data;
        setInitialValues(decoData);
        console.log(decoData);
      } catch (error) {
        console.error("Error fetching Decoration details:", error);
      }
    };

    fetchDecorationDetails();
  }, [id]);
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.text) {
            errors.text = "Required";
          }
          if (!values.image) {
            errors.image = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          }
          if (!values.selection) {
            errors.selection = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const token = localStorage.getItem("token");
          try {
            const response = await axios.put(
              `http://localhost:8000/decorate/edit-decoration/${id}`,
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data.message);
            fetchDeco();
            navigate("/decorate");
            resetForm();
          } catch (error) {
            console.error("There was an error updating the decoration!", error);
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
            <h4 className="mb-4 text-center">Updating Event</h4>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="titleDecoHelp"
                name="title"
                style={{ textAlign: "start" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="textDeco">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="textDesc"
                name="text"
                style={{ textAlign: "start" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                isInvalid={touched.text && !!errors.text}
              />
              <Form.Control.Feedback type="invalid">
                {errors.text}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="imgHelp"
                name="image"
                style={{ textAlign: "start" }}
                onChange={handleChange}
                onBlur={handleBlur}
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
                style={{ textAlign: "start" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                isInvalid={touched.price && !!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label className="text-danger">*</Form.Label>
              <Form.Label>Selection</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="selectionHelp"
                name="selection"
                style={{ textAlign: "start" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.selection}
                isInvalid={touched.selection && !!errors.selection}
              />
              <Form.Control.Feedback type="invalid">
                {errors.selection}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Update Decoration
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
