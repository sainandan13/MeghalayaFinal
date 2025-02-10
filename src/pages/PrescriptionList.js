import React, { useEffect, useState } from "react";
import { getPrescriptions, deletePrescription } from "../services/prescriptionService";
import { useNavigate } from "react-router-dom";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await getPrescriptions();
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-prescription/${id}`); // ✅ Redirect to edit form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      await deletePrescription(id);
      fetchPrescriptions(); // ✅ Refresh list after deletion
    }
  };

  return (
    <div>
      <h2>💊 Prescription List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>OPD Visit ID</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Actions</th> {/* ✅ New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{prescription.patient_id}</td>
                <td>{prescription.opd_id}</td>
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.frequency}</td>
                <td>{prescription.duration}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(prescription.id)}>✏ Edit</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(prescription.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No prescriptions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionList;
