import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [allPerms, setAllPerms] = useState([]);
  const [selectedPerms, setSelectedPerms] = useState([]);



  const baseURL = import.meta.env.VITE_API_URL;

  // fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/allperms`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAllPerms(res.data.availablePerm);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPermissions();
  }, []);

  // add/remove permission (ID only)
  const togglePermission = (permId) => {
    setSelectedPerms((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  // create role
  const handleCreateRole = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/createrole`,
        {
          name: roleName,
          default_permissions: selectedPerms,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      

      alert("Role created successfully");
      // console.log(res.data);

      setRoleName("");
      setSelectedPerms([]);
    } catch (error) {
      alert(error.response?.data?.message || "Error creating role");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Enter role name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <ul className="space-y-2">
        {allPerms.map((perm) => (
          <li
            key={perm._id}
            className="flex justify-between items-center border px-4 py-2 rounded"
          >
            <span>{perm.name}</span>
            <button
              onClick={() => togglePermission(perm._id)}
              className={`px-3 py-1 text-sm rounded text-white ${
                selectedPerms.includes(perm._id)
                  ? "bg-red-600"
                  : "bg-indigo-600"
              }`}
            >
              {selectedPerms.includes(perm._id) ? "Remove" : "Add"}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreateRole}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Create Role
      </button>
    </div>
  );
};

export default CreateRole;
