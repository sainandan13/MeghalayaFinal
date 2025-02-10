import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Importing Navbar from src/
import PatientList from "./pages/PatientList";
import RegisterPatient from "./pages/RegisterPatient";
import OPDList from "./pages/OPDList";
import RegisterOPD from "./pages/RegisterOPD";
import PrescriptionList from "./pages/PrescriptionList";
import RegisterPrescription from "./pages/RegisterPrescription";
import EditPatient from "./pages/EditPatient";
import EditOPD from "./pages/EditOPD";
import EditPrescription from "./pages/EditPrescription";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/register-opd" element={<RegisterOPD />} />
          <Route path="/opd-list" element={<OPDList />} />
          <Route path="/register-prescription" element={<RegisterPrescription />} />
          <Route path="/prescriptions" element={<PrescriptionList />} />
          <Route path="/edit-patient/:id" element={<EditPatient />} />
          <Route path="/edit-opd/:id" element={<EditOPD />} />
          <Route path="/edit-prescription/:id" element={<EditPrescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
