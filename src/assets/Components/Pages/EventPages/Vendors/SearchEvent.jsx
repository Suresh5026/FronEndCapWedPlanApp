
import { Form, FormControl, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function SearchEvents({onSearch}){
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form >
            <InputGroup>
              <FormControl
                type="search"
                placeholder="🔎"
                className='mr-2'
                aria-label='Search'
                value={query}
                style={{textAlign:"start"}}
                onChange={handleChange}
                
              />
              <Button type="submit" variant="outline-success" onClick={() => onSearch(query)}>
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}