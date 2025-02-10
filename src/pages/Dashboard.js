import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Link to="/opd">Manage OPD Visits</Link><br />
            <Link to="/orders">Manage Orders</Link><br />
            <Link to="/patients">Manage Patients</Link><br />
            <Link to="/notifications">View Notifications</Link><br />
        </div>
    );
};

export default Dashboard;
