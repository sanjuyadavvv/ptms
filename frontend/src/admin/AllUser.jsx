import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate=useNavigate()






const handleDelete=async(id)=>{
  const isConfirmed = confirm("Are you sure you want to delete user?");

if (!isConfirmed) {
  return; // No dabaya → yahin se function stop
}
  try {
    const res=await axios.delete(`http://localhost:3000/api/auth/deleteuser/${id}`,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
console.log(res)
setAllUsers((prevusers) => prevusers.filter(user => user._id !== id))
toast.success('user deleted ')
  } catch (error) {
    console.log(error)
  }


}


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // If your route is protected, add token header
        // const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/auth/getusers"
          ,  
          {headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );


        console.log(res)

        setAllUsers(res.data.users);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Error fetching users");
      }
    };

    fetchUsers();
  }, []);





  return (
   <>
   <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
  <div className="grid grid-cols-6  gap-5 px-5 py-2 bg-gray-200 font-semibold text-gray-700   pr-1.5">

    <span>EMPLOYEE ID</span>
    <span>Name</span>

    <span>Email</span>
    <span>Role</span>
    <span>Edit permissions</span>
    <span>Delete User </span>
  </div>
  <br/>

  {allUsers.map((user) => (
    <div
      key={user._id}
      className="grid grid-cols-6 gap-5 px-5  py-2  hover:bg-gray-50 text-gray-800 pr-2"
    >
      <span>{user._id}</span>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span className="capitalize">{user.role}</span>
      <button className="text-red-500" onClick={()=>navigate(`/editpermission/${user._id}`)}>editPermission</button>
      <span      className="text-red-500"  onClick={()=>handleDelete(user._id)}>Remove User</span>

       <br/>
    </div>
   
  ))}
</div>


   </>
  );
};

export default AllUser;

