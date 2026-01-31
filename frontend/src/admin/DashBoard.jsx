import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  console.log('i m in admin page ')
  // const [allUsers, setAllUsers] = useState([]);

  const baseURL = import.meta.env.VITE_API_URL;


  const handleCreateUser = () => {
    navigate('/admin/users');
  };

  const handleAllUser=()=>{
    navigate('/admin/allusers')
  }


  const handleCreateRole=()=>{
    navigate('/admin/createrole')
  }

  return (
    <div className="bg-blue-900 min-h-screen p-6 text-white">
  <h1 className="text-3xl font-bold mb-6">ADMIN PANEL</h1>

  <div className="flex gap-4">
    <button
      onClick={handleCreateUser}
      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md font-medium"
    >
      Create User
    </button>

    <button
      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md font-medium text-black"
    >
      Create Project
    </button>

  <button
      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md font-medium text-black"
    >
     Get ALL project
    </button>

    <button
      onClick={handleAllUser}
      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium"
    >
      Get All Users
    </button>
    <button
      onClick={handleCreateRole}
      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md font-medium"
    >
      create New Role 
    </button>

    
  </div>
</div>

  );
};

export default DashBoard;




