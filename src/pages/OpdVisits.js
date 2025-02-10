import React, { useState, useEffect } from 'react';
import { createOpdVisit, fetchOpdVisits } from '../api';

const OpdVisits = () => {
    const [patientId, setPatientId] = useState('');
    const [visits, setVisits] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: '',
        chiefComplaint: '',
        vitals: '',
        diagnosis: '',
        comments: '',
        followUpInstructions: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (patientId) {
            fetchOpdVisits(patientId, token).then(response => {
                setVisits(response.data.visits);
            });
        }
    }, [patientId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createOpdVisit({ ...formData, patientId }, token);
        alert('OPD visit created successfully');
    };

    return (
        <div>
            <h2>Manage OPD Visits</h2>
            <input type="text" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
            <button onClick={() => fetchOpdVisits(patientId, token)}>Fetch Visits</button>

            <table border="1">
                <thead>
                <tr>
                    <th>Visit ID</th>
                    <th>Doctor</th>
                    <th>Diagnosis</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>
                {visits.map(visit => (
                    <tr key={visit.id}>
                        <td>{visit.id}</td>
                        <td>{visit.doctor_name}</td>
                        <td>{visit.diagnosis}</td>
                        <td>{visit.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Create OPD Visit</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Doctor ID" name="doctorId" onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })} required />
                <input type="text" placeholder="Chief Complaint" name="chiefComplaint" onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })} required />
                <input type="text" placeholder="Vitals" name="vitals" onChange={(e) => setFormData({ ...formData, vitals: e.target.value })} />
                <input type="text" placeholder="Diagnosis" name="diagnosis" onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} />
                <textarea placeholder="Comments" name="comments" onChange={(e) => setFormData({ ...formData, comments: e.target.value })}></textarea>
                <input type="text" placeholder="Follow Up Instructions" name="followUpInstructions" onChange={(e) => setFormData({ ...formData, followUpInstructions: e.target.value })} />
                <button type="submit">Create Visit</button>
            </form>
        </div>
    );
};

export default OpdVisits;
