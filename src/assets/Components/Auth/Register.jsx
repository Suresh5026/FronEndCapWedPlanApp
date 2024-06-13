import Welcome from "./Welcome";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);

  return (
    <>
      <Container fluid className="vh-100">
        <Row className="h-100">
          <Col
            md={6}
            className="d-none d-md-flex justify-content-center align-items-center bg-dark text-white"
          >
            <Welcome />
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center align-items-center bg-light"
          >
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required";
                } else if (values.name.length < 3) {
                  errors.name = "Account name should be at least 3 characters";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                axios
                  .post("http://localhost:8000/auth/register", values)
                  .then((response) => {
                    const result = response.data;
                    if (result.message === "User Registered Successfully") {
                      navigate("/login");
                    } else {
                      setAlertMessage(result.message);
                    }
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.message
                    ) {
                      setAlertMessage(error.response.data.message);
                    } else {
                      console.error(error);
                    }
                    setSubmitting(false);
                  });
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
                  <h4 className="mb-4 text-center">Register your account</h4>

                  {alertMessage && (
                    <Alert
                      variant="danger"
                      onClose={() => setAlertMessage(null)}
                      dismissible
                    >
                      {alertMessage}
                    </Alert>
                  )}

                  <Form.Group className="mb-3" controlId="regname">
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      aria-describedby="nameHelp"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      isInvalid={touched.name && !!errors.name}
                      style={{ textAlign: "start" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleInputEmail1">
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="inputPassword6">
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      aria-describedby="passwordHelpInline"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="dark"
                      className="btn-custom"
                      disabled={isSubmitting}
                    >
                      Register
                    </Button>
                  </div>
                  <br />
                  <Link to="/login">Already have an account? Login</Link>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}
