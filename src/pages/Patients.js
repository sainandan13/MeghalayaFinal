import React, { useState } from 'react';
import { createPatient, fetchPatientHistory } from '../api';

const Patients = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        abhaNumber: '',
        gender: '',
        dob: '',
        phone: '',
        email: '',
        address: '',
    });

    const [patientId, setPatientId] = useState('');
    const [history, setHistory] = useState([]);
    const token = localStorage.getItem('token');

    // Handle Input Change for Form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit Patient Creation Form
    const handleCreatePatient = async (e) => {
        e.preventDefault();
        const formattedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            abhaNumber: formData.abhaNumber,
            gender: formData.gender,
            dob: formData.dob,
            contactInfo: {  // ✅ Ensure contactInfo is an object
                phone: formData.phone,
                email: formData.email,
                address: formData.address
            }
        };

        try {
            const response = await createPatient(formattedData, token);
            alert('Patient Created Successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Error Creating Patient');
            console.error(error);
        }
    };

    // Fetch Patient History
    const handleFetchHistory = async () => {
        try {
            const response = await fetchPatientHistory(patientId, token);
            setHistory(response.data);
        } catch (error) {
            alert('Error Fetching Patient History');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Manage Patients</h2>

            {/* Create Patient Form */}
            <h3>Create Patient</h3>
            <form onSubmit={handleCreatePatient}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="abhaNumber" placeholder="ABHA Number" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="date" name="dob" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <button type="submit">Create Patient</button>
            </form>

            {/* Fetch Patient History */}
            <h3>Fetch Patient History</h3>
            <input type="text" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
            <button onClick={handleFetchHistory}>Fetch History</button>

            {/* Display Patient History */}
            <h3>Patient History</h3>
            {history.visits && history.orders ? (
                <div>
                    <h4>OPD Visits</h4>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Visit ID</th>
                            <th>Diagnosis</th>
                            <th>Doctor</th>
                            <th>Comments</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.visits.map(visit => (
                            <tr key={visit.id}>
                                <td>{visit.id}</td>
                                <td>{visit.diagnosis}</td>
                                <td>{visit.doctor_name}</td>
                                <td>{visit.comments}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <h4>Orders</h4>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Type</th>
                            <th>Ordered By</th>
                        </tr>
                        </thead>
                        <tbody>
                        {history.orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.order_type}</td>
                                <td>{order.ordered_by_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No history found.</p>
            )}
        </div>
    );
};

export default Patients;
