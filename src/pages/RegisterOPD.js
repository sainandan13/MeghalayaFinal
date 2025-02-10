import React, { useState, useEffect, useCallback } from "react";
import { createOPDVisit } from "../services/opdService";
import { getPatients } from "../services/patientService";
import { useNavigate } from "react-router-dom";

const RegisterOPD = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [opdData, setOPDData] = useState({
    patient_id: "",
    doctor_name: "",
    symptoms: "",
    diagnosis: "",
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
    setOPDData({ ...opdData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOPDVisit(opdData);
      alert("OPD Visit Registered!");
      navigate("/opd-list");
    } catch (error) {
      console.error("Error registering OPD visit:", error);
      alert("Failed to register OPD visit.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🏥 Register OPD Visit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Patient:</label>
            <select className="form-select" name="patient_id" required value={opdData.patient_id} onChange={handleChange}>
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Doctor's Name:</label>
            <input type="text" className="form-control" name="doctor_name" required value={opdData.doctor_name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Symptoms:</label>
            <input type="text" className="form-control" name="symptoms" required value={opdData.symptoms} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Diagnosis:</label>
            <input type="text" className="form-control" name="diagnosis" required value={opdData.diagnosis} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Register OPD Visit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOPD;
