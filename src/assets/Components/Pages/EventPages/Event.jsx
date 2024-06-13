import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Event() {
  const navigate = useNavigate();
  const columnHeadings = [
    "S.No",
    "Name",
    "Description",
    "Vendor",
    "Phone",
    "City",
    "Price",
    "Image",
    "Action",
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.com/events/get-events",
          {
            withCredentials: true,
          }
        );
        const userData = response.data.data;

        setData(userData);
        const userIds = userData.map((item) => item._id);
        setIds(userIds);
        // console.log(userIds);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const [ids, setIds] = useState([]);
  // console.log(id)

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(`https://backendcapwedplanappevent.onrender.com/events/delete-event/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => prevData.filter((item) => item._id !== id));
      setIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
      console.log(item._id);
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between p-1">
        <h1>Events</h1>
        <Button onClick={() => navigate("/events/create")}>Create Event</Button>
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.vendor}</td>
              <td>{item.phone}</td>
              <td>{item.city}</td>
              <td>{item.price}</td>
              <td>{item.image}</td>
              <td>
                <Button
                  className="btn"
                  onClick={() => navigate(`/events/edit/${item._id}`)}
                >
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
  );
}
