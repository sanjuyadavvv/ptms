import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);


  const[permission,setPermission]=useState([]);

  const baseURL = import.meta.env.VITE_API_URL;


  useEffect(()=>{
    const getPermission = async () => {
    try {
         const res=await axios.get(`${baseURL}/api/auth/userpermissions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // include token if needed
        },
      });
      setPermission(res.data.permission)
    } catch (error) {
        console.log(error)

    }

  };
  getPermission()

  },[])

  

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <h3>Your id is : {user._id}</h3>
      <h3>Your permissions are </h3>
      {permission.map((p)=>(
        <div key={p._id}>
            <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
