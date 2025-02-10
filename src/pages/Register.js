import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(formData);
        alert('User Registered! Please Login.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <select name="role" onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
