import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Budget() {
  
  const initialBudget = [
    { category: "Ceremony", budget: 0, cost: 0, paid: 0 },
    { category: "Wedding party", budget: 0, cost: 0, paid: 0 },
    { category: "Clothing and Beauty", budget: 0, cost: 0, paid: 0 },
    { category: "Catering", budget: 0, cost: 0, paid: 0 },
    { category: "Transportation", budget: 0, cost: 0, paid: 0 },
    { category: "Accommodation", budget: 0, cost: 0, paid: 0 },
    { category: "Invitations", budget: 0, cost: 0, paid: 0 },
  ];
  const [user, setUser] = useState(null);

  const [budget, setBudget] = useState(initialBudget);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return; 
        const response = await axios.get('https://backendcapwedplanappevent.onrender.com/auth/current-user', {
          withCredentials: true 
        });
        const userData = response.data.data;
        setUser(userData);
        const savedBudget = JSON.parse(localStorage.getItem(`budget-${userData._id}`));
        setBudget(savedBudget || initialBudget);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return; 
    localStorage.setItem(`budget-${user._id}`, JSON.stringify(budget));
  }, [user, budget]);

  const handleChange = (index, field, value) => {
    const updatedBudget = [...budget];
    updatedBudget[index][field] = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    setBudget(updatedBudget);
};

  const calculateTotal = (field) => {
    return budget.reduce((total, item) => total + item[field], 0);
};


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan="2">Total</th>
          <th>{calculateTotal("budget").toFixed(2)}</th>
          <th>{calculateTotal("cost").toFixed(2)}</th>
          <th>{calculateTotal("paid").toFixed(2)}</th>
          <th>
            {(calculateTotal("cost") - calculateTotal("paid")).toFixed(2)}
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>Budget</th>
          <th>Cost</th>
          <th>Paid</th>
          <th>Owed</th>
        </tr>
      </thead>
      <tbody>
        {budget.map((item, index) => (
          <tr key={`${item.category}-${index}`}>
            <td>{item.category}</td>
            <td>
              <Form.Control
                type="number"
                value={item.budget}
                onChange={(e) => handleChange(index, "budget", e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={item.cost}
                onChange={(e) => handleChange(index, "cost", e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={item.paid}
                onChange={(e) => handleChange(index, "paid", e.target.value)}
              />
            </td>
            <td>{(item.cost - item.paid).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
