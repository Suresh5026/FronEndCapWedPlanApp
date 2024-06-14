import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  InputGroup,
  Button,
  Row,
  Container,
  Table,
} from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { usePlan } from "../../../Context/Plancontex";

export default function Planning() {
  const { fetchPlan } = usePlan();
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.complan/get-plan",
          {
            headers: {
              'Authorization': `Bearer ${token}`
          },
          
          }
        );
        const userPlan = response.data.data;
        setData(userPlan);
        const userIds = userPlan.map((item) => item._id);
        setIds(userIds);
      } catch (error) {
        console.log("Error fetching Plan data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://backendcapwedplanappevent.onrender.complan/delete-plan/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
      setIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
    } catch (error) {
      console.log("Error deleting plan:", error);
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

  return (
    <div>
      <Container className="d-flex justify-content-center">
        <Formik
          enableReinitialize={true}
          initialValues={{
            event_name: currentItem ? currentItem.event_name : "",
            event_date: currentItem ? currentItem.event_date : "",
            event_todos: currentItem ? currentItem.event_todos : "",
            selection: currentItem ? currentItem.selection : "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.event_name) {
              errors.event_name = "Required";
            }
            if (!values.event_date) {
              errors.event_date = "Required";
            }
            if (!values.event_todos) {
              errors.event_todos = "Required";
            }
            if (!values.selection) {
              errors.selection = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const token = localStorage.getItem("token");
            try {
              if (editMode) {
                await axios.put(
                  `https://backendcapwedplanappevent.onrender.complan/edit-plan/${currentItem._id}`,
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              } else {
                await axios.post(
                  "https://backendcapwedplanappevent.onrender.complan/create-plan",
                  values,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              }
              fetchPlan();
              handleCancelEdit();
            } catch (error) {
              console.error("There was an error saving the plan!", error);
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
            <Form className="w-50" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEventName">
                  <Form.Label>Event Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Name
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
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
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Todo's
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
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
                    aria-label="Default select example"
                    name="selection"
                    value={values.selection}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>Selection criteria</option>
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
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {editMode ? "Update" : "Submit"}
                  </Button>
                  {editMode && (
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleCancelEdit}
                    >
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
                  <Button
                    className="btn"
                    onClick={() => handleDelete(item._id)}
                  >
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
