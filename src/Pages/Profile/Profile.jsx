import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [Data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    UserProfile();
  }, []);

  const logOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/signup");
    }
  };

  const UserProfile = async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        console.log('Token not found');
        return;
      }

      let response = await fetch('https://sample-backend-topaz.vercel.app/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let result = await response.json();
      setData(result.authData.user);

    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile data');
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-lg max-w-xl">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500 mb-4">
            <img
              src="https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name and Email */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{Data?.name || 'Name N/A'}</h2>
          <p className="text-gray-600 text-lg">{Data?.email || 'Email N/A'}</p>
          <p className="text-gray-600 text-lg capitalize">{Data?.role || ' N/A'}</p>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className=" w-full md:w-1/2 mt-6 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
