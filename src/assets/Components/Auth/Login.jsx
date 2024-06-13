import Welcome from "./Welcome";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import Cookies from "js-cookie";

const validateEmail = (email) => {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

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
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (validateEmail(values.email)) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                fetch("http://localhost:8000/auth/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    if (result.message === "Login Successful") {
                      setIsLoggedIn(true);
                      Cookies.set("token", result.token, { expires: 1 / 24 });
                      navigate("/");
                    } else {
                      console.error("Login failed:", result.message);
                    }
                    setSubmitting(false);
                  })
                  .catch((err) => {
                    console.error("Error:", err);
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
                  <h4 className="mb-4 text-center">Login to your account</h4>
                  <Form.Group className="mb-3" controlId="exampleInputEmail1">
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      aria-describedby="emailHelp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && errors.email}
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
                      name="password"
                      aria-describedby="passwordHelpInline"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br />
                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="dark"
                      className="btn-custom"
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                  </div>
                  <br />
                  <Link to="/register">Don't have an account? Register</Link>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}
