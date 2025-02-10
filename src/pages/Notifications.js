import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        fetchNotifications(userId, token).then(response => setNotifications(response.data));
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notif => <li key={notif.id}>{notif.message}</li>)}
            </ul>
        </div>
    );
};

export default Notifications;
