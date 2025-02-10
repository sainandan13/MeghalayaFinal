import React, { useState, useEffect } from 'react';
import { createOrder, fetchOrdersByVisit } from '../api';

const Orders = () => {
    const [visitId, setVisitId] = useState('');
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        patientId: '',
        orderedBy: '',
        orderType: '',
        items: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (visitId) {
            fetchOrdersByVisit(visitId, token).then(response => {
                setOrders(response.data);
            });
        }
    }, [visitId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createOrder({ ...formData, visitId }, token);
        alert('Order created successfully');
    };

    return (
        <div>
            <h2>Manage Orders</h2>
            <input type="text" placeholder="Enter Visit ID" value={visitId} onChange={(e) => setVisitId(e.target.value)} />
            <button onClick={() => fetchOrdersByVisit(visitId, token)}>Fetch Orders</button>

            <table border="1">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Ordered By</th>
                    <th>Order Type</th>
                    <th>Items</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.ordered_by_name}</td>
                        <td>{order.order_type}</td>
                        <td>{JSON.stringify(order.items)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Create Order</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Patient ID" name="patientId" onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} required />
                <input type="text" placeholder="Ordered By" name="orderedBy" onChange={(e) => setFormData({ ...formData, orderedBy: e.target.value })} required />
                <select name="orderType" onChange={(e) => setFormData({ ...formData, orderType: e.target.value })} required>
                    <option value="">Select Order Type</option>
                    <option value="medication">Medication</option>
                    <option value="lab">Lab</option>
                    <option value="radiology">Radiology</option>
                </select>
                <input type="text" placeholder="Items (JSON format)" name="items" onChange={(e) => setFormData({ ...formData, items: e.target.value })} required />
                <button type="submit">Create Order</button>
            </form>
        </div>
    );
};

export default Orders;
