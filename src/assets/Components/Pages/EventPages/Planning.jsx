import React, { useState, useEffect } from "react";
import { Form, Col, InputGroup, Button, Row, Container, Table } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { usePlan } from "../../../Context/Plancontex";

export default function Planning() {
  const { fetchPlan } = usePlan();
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const columnHeadings = [
    "S.no",
    "Event Name",
    "Event Date",
    "ToDos",
    "Selection Time",
    "Actions",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/plan/get-plan", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data.data);
        } catch (error) {
          console.error("Error fetching Plan data:", error);
        }
      };
      fetchData();
    }
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/plan/delete-plan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentItem(item);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentItem(null);
  };

  const initialValues = {
    event_name: currentItem ? currentItem.event_name : "",
    event_date: currentItem ? currentItem.event_date : "",
    event_todos: currentItem ? currentItem.event_todos : "",
    selection: currentItem ? currentItem.selection : "",
  };

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.event_name) errors.event_name = "Required";
            if (!values.event_date) errors.event_date = "Required";
            if (!values.event_todos) errors.event_todos = "Required";
            if (!values.selection) errors.selection = "Required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const token = localStorage.getItem("token");
            try {
              if (editMode) {
                await axios.put(`http://localhost:8000/plan/edit-plan/${currentItem._id}`, values, {
                  headers: { Authorization: `Bearer ${token}` },
                });
              } else {
                await axios.post("http://localhost:8000/plan/create-plan", values, {
                  headers: { Authorization: `Bearer ${token}` },
                });
              }
              fetchPlan();
              handleCancelEdit();
            } catch (error) {
              console.error("There was an error saving the plan!", error);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="w-50" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEventName">
                  <Form.Label>Event Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Name</InputGroup.Text>
                    <Form.Control
                      name="event_name"
                      value={values.event_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </InputGroup>
                  {errors.event_name && touched.event_name && (
                    <div className="text-danger">{errors.event_name}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="event.ControlInput1">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="event_date"
                    value={values.event_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.event_date && touched.event_date && (
                    <div className="text-danger">{errors.event_date}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEventTodos">
                  <Form.Label>Todo's</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>Todo's</InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      name="event_todos"
                      value={values.event_todos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </InputGroup>
                  {errors.event_todos && touched.event_todos && (
                    <div className="text-danger">{errors.event_todos}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Selection Criteria</Form.Label>
                  <Form.Select
                    name="selection"
                    value={values.selection}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Selection criteria</option>
                    <option value="1">One Day Before</option>
                    <option value="2">Marriage Day</option>
                    <option value="3">One Week Before</option>
                  </Form.Select>
                  {errors.selection && touched.selection && (
                    <div className="text-danger">{errors.selection}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Col className="d-grid gap-2">
                  <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                    {editMode ? "Update" : "Submit"}
                  </Button>
                  {editMode && (
                    <Button variant="secondary" size="lg" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>

      <Container>
        <div className="d-flex justify-content-between p-1">
          <h1>Events Planning</h1>
        </div>

        <Table responsive>
          <thead>
            <tr>
              {columnHeadings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.event_name}</td>
                <td>{item.event_date}</td>
                <td>{item.event_todos}</td>
                <td>{item.selection}</td>
                <td>
                  <Button className="btn" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button className="btn" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
