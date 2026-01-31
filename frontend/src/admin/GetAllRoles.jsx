import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const GetAllRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_URL;

 const handelDeleteRole = async (id) => {


const isConfirmed = confirm("Are you sure you want to delete user?");

if (!isConfirmed) {
  return; // No dabaya → yahin se function stop
}

  try {
    const res = await axios.delete(
      `${baseURL}/api/auth/deleterole/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    // OPTIONAL: refresh role list

    // getAllRoles();

       setRoles((prevRoles) => prevRoles.filter(role => role._id !== id));
          toast.success("Role deleted successfully");


  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Failed to delete role");
  }
};

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("${baseURL}/api/auth/getrole");
        setRoles(res.data.roles || []); // assuming API returns { roles: [...] }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to fetch roles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);










  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Roles</h2>

        {loading ? (
          <p className="text-gray-500">Loading roles...</p>
        ) : roles.length === 0 ? (
          <p className="text-gray-500">No roles found.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Role Name</th>
                <th className="border px-4 py-2 text-left">Desription</th>
                <th className="border px-4 py-2 text-left">View Permissions</th>
                <th className="border px-4 py-2 text-left">Remove Role</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={role._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 font-semibold">
                    {role.name}
                  </td>
                  <td className="border px-4 py-2">
                    {role.description || "-"}
                  </td>
                  <td
                    className="border px-4 py-2 text-red-400"
                    onClick={() => {
                      console.log("view permission");
                      navigate(`/editrolepermission/${role._id}`);
                    }}
                  >
                    view permissions
                  </td>
                  <td
                    className="border px-4 py-2 text-red-400"
                    onClick={() => handelDeleteRole(role._id)}
                  >
                    Delete Role{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GetAllRoles;
