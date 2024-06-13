import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Deco() {
  const navigate = useNavigate();
  const decoHeadings = [
    "S.No",
    "Title",
    "text",
    "Image",
    "Price",
    "User Choice",
    "Action",
  ];
  const [deco, setDeco] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.com/decorate/get-decoration",
          {
            withCredentials: true,
          }
        );
        const decoData = response.data.data;

        setDeco(decoData);
        const userIds = decoData.map((item) => item._id);
        setIds(userIds);
        // console.log(userIds);
      } catch (error) {
        console.log("Error fetching decoration data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `https://backendcapwedplanappevent.onrender.com/decorate/delete-decoration/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeco((prevData) => prevData.filter((item) => item._id !== id));
      setIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
      console.log(item._id);
    } catch (error) {
      console.log("Error deleting decoration:", error);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between p-1">
        <h1>Decoration Data</h1>
        <Button onClick={() => navigate("/decorate/create-decoration")}>
          Create Decoration
        </Button>
      </div>

      <Table responsive>
        <thead>
          <tr>
            {decoHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deco.map((item, index) => (
            <tr key={`${item.title}-${index}`}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.text}</td>
              <td>{item.price}</td>
              <td>{item.image}</td>
              <td>{item.selection}</td>
              <td>
                <Button
                  className="btn"
                  onClick={() =>
                    navigate(`/decorate/edit-decoration/${item._id}`)
                  }
                >
                  Edit Decoration
                </Button>
                <Button className="btn" onClick={() => handleDelete(item._id)}>
                  Delete Decoration
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
