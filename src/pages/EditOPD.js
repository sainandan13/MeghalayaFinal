import React, { useState, useEffect, useCallback } from "react";
import { getOPDVisitById, updateOPDVisit } from "../services/opdService";
import { useNavigate, useParams } from "react-router-dom";

const EditOPD = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opdData, setOPDData] = useState({
    doctor_name: "",
    symptoms: "",
    diagnosis: "",
  });

  // Fetch OPD visit details
  const fetchOPDVisitData = useCallback(async () => {
    try {
      const response = await getOPDVisitById(id);
      setOPDData(response.data);
    } catch (error) {
      console.error("Error fetching OPD visit:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchOPDVisitData();
  }, [fetchOPDVisitData]);

  const handleChange = (e) => {
    setOPDData({ ...opdData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOPDVisit(id, opdData);
      alert("OPD Visit updated successfully!");
      navigate("/opd-list");
    } catch (error) {
      console.error("Error updating OPD visit:", error);
      alert("Failed to update OPD visit.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">✏ Edit OPD Visit</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-success w-100">Update OPD Visit</button>
        </form>
      </div>
    </div>
  );
};

export default EditOPD;
