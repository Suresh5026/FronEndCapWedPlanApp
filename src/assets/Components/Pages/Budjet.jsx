import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';

const Budget = () => {
    const initialBudget = [
        { category: 'Ceremony', budget: 0, cost: 0, paid: 0 },
        { category: 'Wedding party', budget: 0, cost: 0, paid: 0 },
        { category: 'Clothing and Beauty', budget: 0, cost: 0, paid: 0 },
        { category: 'Catering', budget: 0, cost: 0, paid: 0 },
        { category: 'Transportation', budget: 0, cost: 0, paid: 0 },
        { category: 'Accommodation', budget: 0, cost: 0, paid: 0 },
        { category: 'Invitations', budget: 0, cost: 0, paid: 0 },
    ];

    const [budget, setBudget] = useState(() => {
        const savedBudget = JSON.parse(localStorage.getItem('budget'));
        return savedBudget || initialBudget;
    });

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    const handleChange = (index, field, value) => {
        const updatedBudget = [...budget];
        updatedBudget[index][field] = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        setBudget(updatedBudget);
    };

    const calculateTotal = (field) => {
        return budget.reduce((total, item) => total + item[field], 0);
    };

    return (
        <Container className='container'>
            <Row>
                <Col>
                    <Table bordered className='table'>
                        <thead>
                            <tr>
                                <th colSpan="2">Total</th>
                                <th>{calculateTotal('budget').toFixed(2)}</th>
                                <th>{calculateTotal('cost').toFixed(2)}</th>
                                <th>{calculateTotal('paid').toFixed(2)}</th>
                                <th>{(calculateTotal('cost') - calculateTotal('paid')).toFixed(2)}</th>
                            </tr>
                            <tr>
                                <th>Category</th>
                                <th>Budget</th>
                                <th>Cost</th>
                                <th>Paid</th>
                                <th>Owed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budget.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.budget}
                                            onChange={(e) => handleChange(index, 'budget', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.cost}
                                            onChange={(e) => handleChange(index, 'cost', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.paid}
                                            onChange={(e) => handleChange(index, 'paid', e.target.value)}
                                        />
                                    </td>
                                    <td>{(item.cost - item.paid).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Budget;
