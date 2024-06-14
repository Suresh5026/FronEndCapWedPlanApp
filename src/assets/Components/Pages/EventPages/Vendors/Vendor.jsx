
import { Container, Row, Col } from 'react-bootstrap';
import Edisplay from './Edisplay';
import Filters from './Filters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchEvents from './SearchEvent';


export default function Vendors() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/events/get-events",
          {
            headers: {
              'Authorization': `Bearer ${token}`
          },
          
          }
        );
        const getData = response.data.data;
        setData(getData);
        setFilteredData(getData); 
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);


  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    );
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    let results = data;

    if (selectedTags.length > 0) {
      results = results.filter(item =>
        selectedTags.includes(item.vendor) || selectedTags.includes(item.city)
      );
    }

    if (searchQuery) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(results);
  }, [selectedTags, searchQuery, data]);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={3} className="d-none d-md-flex p-3 bg-white text-white flex-column">
          <h3>Filter</h3>
          <Filters 
          data={data}
          selectedTags={selectedTags}
          handleTagChange={handleTagChange} />
        </Col>
        <Col xs={12} md={9} className="p-3 bg-light">
        <Row className="align-items-center mb-3">
            <Col xs={6}>
              <h3>Vendors</h3>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <SearchEvents onSearch={handleSearchChange}/>
            </Col>
          </Row>
          
          <Row>
            <Col xs={12}  className="mb-3">
              <Edisplay data={filteredData}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
