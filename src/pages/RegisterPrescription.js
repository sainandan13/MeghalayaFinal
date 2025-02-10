import React, { useState, useEffect, useCallback } from "react";
import { createPrescription } from "../services/prescriptionService";
import { getPatients } from "../services/patientService";
import { useNavigate } from "react-router-dom";

const RegisterPrescription = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  // Fetch patients
  const fetchPatients = useCallback(async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleChange = (e) => {
    setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(prescriptionData);
      alert("Prescription Added!");
      navigate("/prescriptions");
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("Failed to add prescription.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">💊 Add Prescription</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Patient:</label>
            <select className="form-select" name="patient_id" required value={prescriptionData.patient_id}
                    onChange={handleChange}>
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Medication:</label>
            <input type="text" className="form-control" name="medication" required value={prescriptionData.medication}
                   onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Dosage:</label>
            <input type="text" className="form-control" name="dosage" required value={prescriptionData.dosage}
                   onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Frequency:</label>
            <input type="text" className="form-control" name="frequency" required value={prescriptionData.frequency}
                   onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">OPD ID:</label>
            <input type="text" className="form-control" name="opd_id" required value={prescriptionData.opd_id}
                   onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Duration:</label>
            <input type="text" className="form-control" name="duration" required value={prescriptionData.duration}
                   onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-success w-100">Add Prescription</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPrescription;
