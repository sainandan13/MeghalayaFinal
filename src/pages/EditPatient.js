import React, { useState, useEffect, useCallback } from "react";
import { getPatientById, updatePatient } from "../services/patientService";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    abha_number: "",
    gender: "Male",
    dob: "",
    phone: "",
    email: "",
    address: "",
  });

  // Fetch patient details
  const fetchPatientData = useCallback(async () => {
    try {
      const response = await getPatientById(id);
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(id, patient);
      alert("Patient updated successfully!");
      navigate("/patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">✏ Edit Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" className="form-control" name="name" required value={patient.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">ABHA Number:</label>
            <input type="text" className="form-control" name="abha_number" required value={patient.abha_number} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <select className="form-select" name="gender" value={patient.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input type="date" className="form-control" name="dob" required value={patient.dob} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input type="text" className="form-control" name="phone" required value={patient.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" value={patient.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input type="text" className="form-control" name="address" value={patient.address} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100">Update Patient</button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
