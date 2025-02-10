import React, { useEffect, useState } from "react";
import { getOPDVisits, deleteOPDVisit } from "../services/opdService";
import { useNavigate } from "react-router-dom";

const OPDVisitList = () => {
  const [opdVisits, setOPDVisits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOPDVisits();
  }, []);

  const fetchOPDVisits = async () => {
    try {
      const response = await getOPDVisits();
      setOPDVisits(response.data);
    } catch (error) {
      console.error("Error fetching OPD visits:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-opd/${id}`); // ✅ Redirect to edit form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this OPD visit?")) {
      await deleteOPDVisit(id);
      fetchOPDVisits(); // ✅ Refresh list after deletion
    }
  };

  return (
    <div>
      <h2>🏥 OPD Visits</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Doctor Name</th>
            <th>Symptoms</th>
            <th>Diagnosis</th>
            <th>Actions</th> {/* ✅ New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {opdVisits.length > 0 ? (
            opdVisits.map((visit) => (
              <tr key={visit.id}>
                <td>{visit.patient_id}</td>
                <td>{visit.doctor_name}</td>
                <td>{visit.symptoms}</td>
                <td>{visit.diagnosis}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(visit.id)}>✏ Edit</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(visit.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No OPD visits found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OPDVisitList;
