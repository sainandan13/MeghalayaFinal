import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // Update if using a different port

const API_URL = 'http://54.169.168.155:5000/api';
export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};

export const fetchNotifications = async (userId, token) => {
    return axios.get(`${API_URL}/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createOpdVisit = async (visitData, token) => {
    return axios.post(`${API_URL}/opd`, visitData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchOpdVisits = async (patientId, token) => {
    return axios.get(`${API_URL}/opd/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createOrder = async (orderData, token) => {
    return axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchOrdersByVisit = async (visitId, token) => {
    return axios.get(`${API_URL}/orders/visit/${visitId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createPatient = async (patientData, token) => {
    return axios.post(`${API_URL}/patients`, patientData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const fetchPatientHistory = async (patientId, token) => {
    return axios.get(`${API_URL}/patients/${patientId}/history`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
