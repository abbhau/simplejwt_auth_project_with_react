import React, { useEffect, useState } from 'react';
import api from './Auth/Api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile/');
        setUser(response.data);
      } catch (error) {
        console.log("error",error)
        // Handle error or redirect to login
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      {/* Render other user details */}
    </div>
  );
};

export default Profile;
