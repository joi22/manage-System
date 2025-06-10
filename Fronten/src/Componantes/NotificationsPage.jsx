// src/pages/NotificationsPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import axios from 'axios';

const NotificationsPage = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications/${user._id}`);
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?._id]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? {...n, read: true} : n
      ));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Activity Notifications</h1>
      
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`p-4 border rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification._id)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;