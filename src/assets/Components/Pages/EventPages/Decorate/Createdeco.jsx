import { Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDeco } from "../../../../Context/Decocontext";
import { Form } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

export default function Createdeco() {
  const { fetchDeco } = useDeco();
  const navigate = useNavigate();

  return (
    <Container>
      <Formik
        initialValues={{
          title: "",
          text: "",
          image: "",
          price: "",
          selection: "",
        }}
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
          const token = Cookies.get("token");
          try {
            const response = await axios.post(
              "http://localhost:8000/decorate/create-decoration",
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
            console.error("There was an error creating the decoration!", error);
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
            <h4 className="mb-4 text-center">Creating Event</h4>
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
              Create Decoration
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
