import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../services/patientService";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-patient/${id}`); // ✅ Redirect to edit form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await deletePatient(id);
      fetchPatients(); // ✅ Refresh list after deletion
    }
  };

  return (
    <div>
      <h2>📋 Patient List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ABHA Number</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th> {/* ✅ New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.abha_number}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.address}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(patient.id)}>✏ Edit</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(patient.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
