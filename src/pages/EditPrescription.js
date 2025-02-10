import React, { useState, useEffect, useCallback } from "react";
import { getPrescriptionById, updatePrescription } from "../services/prescriptionService";
import { useNavigate, useParams } from "react-router-dom";

const EditPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  // Fetch prescription details
  const fetchPrescriptionData = useCallback(async () => {
    try {
      const response = await getPrescriptionById(id);
      setPrescriptionData(response.data);
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPrescriptionData();
  }, [fetchPrescriptionData]);

  const handleChange = (e) => {
    setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePrescription(id, prescriptionData);
      alert("Prescription updated successfully!");
      navigate("/prescriptions");
    } catch (error) {
      console.error("Error updating prescription:", error);
      alert("Failed to update prescription.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">✏ Edit Prescription</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Medication:</label>
            <input type="text" className="form-control" name="medication" required value={prescriptionData.medication} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Dosage:</label>
            <input type="text" className="form-control" name="dosage" required value={prescriptionData.dosage} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Frequency:</label>
            <input type="text" className="form-control" name="frequency" required value={prescriptionData.frequency} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Duration:</label>
            <input type="text" className="form-control" name="duration" required value={prescriptionData.duration} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Update Prescription</button>
        </form>
      </div>
    </div>
  );
};

export default EditPrescription;
