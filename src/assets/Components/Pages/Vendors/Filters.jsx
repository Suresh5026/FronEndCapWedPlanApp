import React, { useState,useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function Filters({ data, selectedTags, handleTagChange }) {
  

  const uniqueVendors = Array.from(new Set(data.map(item => item.vendor)));
  const uniqueCity = Array.from(new Set(data.map(item => item.city)));


  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Vendors</Accordion.Header>
        <Accordion.Body>
          <Form>
            {uniqueVendors.map((ele, index) => (
              <Form.Check 
                type="checkbox"
                label={ele}
                value={ele}
                key={`${ele}-${index}`}
                checked={selectedTags.includes(ele)}
                onChange={handleTagChange}
                
              />
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>City</Accordion.Header>
        <Accordion.Body>
          <Form>
            {uniqueCity.map((ele, index) => (
              <Form.Check 
                type="checkbox"
                label={ele}
                value={ele}
                key={`${ele}-${index}`}
                checked={selectedTags.includes(ele)}
                onChange={handleTagChange}
                
              />
            ))}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
