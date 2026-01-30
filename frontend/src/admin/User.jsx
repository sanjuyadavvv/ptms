// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const User = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     is_active: "",
//   });

//   const handlechange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.role) {
//       toast.error("Please fill the required details");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/auth/createuser",
//         form
//       );

//       toast.success("User created successfully ✅");

//       // optional: reset form
//       setForm({
//         name: "",
//         email: "",
//         role: "",
//         is_active: "",
//       });

//     } catch (error) {
//       console.log("error creating user", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create user ❌"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="enter name"
//         type="text"
//         value={form.name}
//         onChange={handlechange}
//         name="name"
//       />

//       <input
//         name="email"
//         placeholder="enter email"
//         type="email"
//         value={form.email}
//         onChange={handlechange}
//       />

//       <select name="role" value={form.role} onChange={handlechange}>
//         <option value="">--Select Role--</option>
//         <option value="MANAGER">MANAGER</option>
//         <option value="EMPLOYEE">EMPLOYEE</option>
//       </select>

//       <select name="is_active" value={form.is_active} onChange={handlechange}>
//         <option value="">-activate user-</option>
//         <option value="ACTIVATE">ACTIVATE</option>
//         <option value="DEACTIVATE">DEACTIVATE</option>
//       </select>

//       <button type="submit">CREATE USER</button>
//     </form>
//   );
// };

// export default User;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// const User = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     is_active: "",
//   });

//   const [roles, setRoles] = useState([]); // dynamic roles from backend


  

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/auth/getrole");
//         console.log(res)

//         setRoles(res.data.roles.map((r) => r.name)); // assuming Role model has name
//       } catch (error) {
//         console.log(error)
//         toast.error("Failed to fetch roles");
//       }
//     };
//     fetchRoles();
//   }, []);

//   const handlechange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.role) {
//       toast.error("Please fill the required details");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/auth/createuser",
//         form
//       );

//       toast.success("User created successfully ✅");

//       setForm({
//         name: "",
//         email: "",
//         role: "",
//         is_active: "",
//       });
//     } catch (error) {
//       console.log("error creating user", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create user ❌"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="enter name"
//         type="text"
//         value={form.name}
//         onChange={handlechange}
//         name="name"
//       />

//       <input
//         name="email"
//         placeholder="enter email"
//         type="email"
//         value={form.email}
//         onChange={handlechange}
//       />

//       <select name="role" value={form.role} onChange={handlechange}>
//         <option value="">--Select Role--</option>
//         {roles.map((r) => (
//           <option key={r} value={r}>{r}</option>
//         ))}
//       </select>

//       <select name="is_active" value={form.is_active} onChange={handlechange}>
//         <option value="">-activate user-</option>
//         <option value="ACTIVATE">ACTIVATE</option>
//         <option value="DEACTIVATE">DEACTIVATE</option>
//       </select>

//       <button type="submit">CREATE USER</button>
//     </form>
//   );
// };

// export default User;



import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    is_active: "ACTIVATE",
  });

  const [roles, setRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const PROJECT_PERMISSIONS = [
    "CREATE_PROJECT",
    "UPDATE_PROJECT",
    "DELETE_PROJECT",
    "VIEW_PROJECT",
  ];

  const TASK_PERMISSIONS = [
    "CREATE_TASK",
    "UPDATE_TASK",
    "DELETE_TASK",
    "VIEW_TASK",
  ];

  // 🔹 Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/getrole", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRoles(res.data.roles.map((r) => r.name));
      } catch (error) {
        toast.error("Failed to fetch roles");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // 1️⃣ Create user first
      const res = await axios.post(
        "http://localhost:3000/api/auth/createuser",
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userId = res.data.user._id;

      // 2️⃣ Assign all selected permissions in one API call
      if (selectedPermissions.length > 0) {
        await axios.post(
          `http://localhost:3000/api/auth/addpermissions/${userId}`,
          { permissions: selectedPermissions },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      toast.success("User created with permissions ✅");

      // Reset form
      setForm({
        name: "",
        email: "",
        role: "",
        is_active: "ACTIVATE",
      });
      setSelectedPermissions([]);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed ❌");
    }
  };

  const PermissionGroup = ({ title, permissions }) => (
    <div className="bg-gray-50 border rounded-lg p-4">
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {permissions.map((perm) => (
          <label
            key={perm}
            className="flex items-center gap-2 bg-white border px-3 py-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedPermissions.includes(perm)}
              onChange={() => togglePermission(perm)}
              className="accent-blue-600"
            />
            <span className="text-sm">{perm}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Admin • Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              name="is_active"
              value={form.is_active}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option value="ACTIVATE">Active</option>
              <option value="DEACTIVATE">Inactive</option>
            </select>
          </div>

          {/* Permissions */}
          <h3 className="text-lg font-semibold">Assign Permissions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <PermissionGroup title="Project Permissions" permissions={PROJECT_PERMISSIONS} />
            <PermissionGroup title="Task Permissions" permissions={TASK_PERMISSIONS} />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
