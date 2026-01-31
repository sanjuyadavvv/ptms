// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProjectManager = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const [loading, setLoading] = useState(true);
//   const [managers, setManagers] = useState([]);

//   const [projectDetails, setProjectDetails] = useState({
//     name: "",
//     description: "",
//     status: "",
//     manager_id: "",
//     start_date: "",
//     end_date: "",
//   });

//   /* ================= FETCH PROJECT ================= */
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.get(
//           `${baseURL}/api/auth/project/${id}`,
//           { headers }
//         );

//         const project = res.data.project;

//         setProjectDetails({
//           name: project.name || "",
//           description: project.description || "",
//           status: project.status || "",
//           manager_id: project.manager_id?._id || "",
//           start_date: project.start_date?.slice(0, 10) || "",
//           end_date: project.end_date?.slice(0, 10) || "",
//         });
//       } catch (err) {
//         toast.error("Failed to load project");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   /* ================= FETCH MANAGERS ================= */
//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await axios.get(
//           "${baseURL}/api/auth/allusers",
//           { headers }
//         );

//         // ❌ exclude admin
//         const filtered = res.data.employees.filter(
//           (u) => u.role !== "ADMIN"
//         );

//         setManagers(filtered);
//       } catch (err) {
//         toast.error("Failed to load users");
//       }
//     };

//     fetchManagers();
//   }, []);

//   /* ================= HANDLERS ================= */
//   const handleChange = (e) => {
//     setProjectDetails({
//       ...projectDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdateProject = async () => {
//     console.log(id)
//     try {
//       await axios.patch(
//         `${baseURL}/api/auth/update/project/${id}`,
//         projectDetails,
//         { headers }
//       );

//       toast.success("Project updated successfully ✅");
//       navigate(-1);
//     } catch (err) {
//       toast.error("Failed to update project ❌");
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   /* ================= UI ================= */
//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6">Update Project</h1>

//       <div className="space-y-4">
//         {/* Project Name */}
//         <input
//           name="name"
//           value={projectDetails.name}
//           onChange={handleChange}
//           placeholder="Project Name"
//           className="w-full border p-2 rounded"
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           value={projectDetails.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full border p-2 rounded h-24"
//         />

//         {/* Status */}
//         <select
//           name="status"
//           value={projectDetails.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Status</option>
//           <option value="ACTIVE">ACTIVE</option>
//           <option value="ON-HOLD">ON-HOLD</option>
//           <option value="COMPLETED">COMPLETED</option>
//         </select>

//         {/* Manager */}
//         <select
//           name="manager_id"
//           value={projectDetails.manager_id}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Assign Manager</option>
//           {managers.map((m) => (
//             <option key={m._id} value={m._id}>
//               {m.name} ({m.email})
//             </option>
//           ))}
//         </select>

//         {/* Dates */}
//         <div className="flex gap-4">
//           <input
//             type="date"
//             name="start_date"
//             value={projectDetails.start_date}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="date"
//             name="end_date"
//             value={projectDetails.end_date}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-gray-500 text-white px-6 py-2 rounded"
//           >
//             Go Back
//           </button>

//           <button
//             onClick={handleUpdateProject}
//             className="bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             Update Project
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default  UpdateProjectManager





import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProjectManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]);



  const baseURL = import.meta.env.VITE_API_URL;

  
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    status: "",
    manager_id: "",
    start_date: "",
    end_date: "",
  });

  /* ================= FETCH PROJECT ================= */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${baseURL}/api/auth/viewproject/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res)

        const project = res.data.project;

        setProjectDetails({
          name: project?.name ?? "",
          description: project?.description ?? "",
          status: project?.status ?? "",
          manager_id: project?.manager_id?._id ?? "",
          start_date: project?.start_date?.slice(0, 10) ?? "",
          end_date: project?.end_date?.slice(0, 10) ?? "",
        });
      } catch (error) {
        console.log(error)
        toast.error("Failed to load project ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  /* ================= FETCH MANAGERS ================= */
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${baseURL}/api/auth/allusers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filteredManagers = res.data.employees.filter(
          (user) => user.role !== "ADMIN"
        );

        setManagers(filteredManagers);
      } catch (error) {
        toast.error("Failed to load users ❌");
      }
    };

    fetchManagers();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${baseURL}/api/auth/update/project/${id}`,
        projectDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Project updated successfully ✅");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update project ❌");
    }
  };

  if (loading) {
    return <p className="p-6 text-lg">Loading project...</p>;
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Update Project</h1>

      <div className="space-y-4">
        {/* Project Name */}
        <input
          type="text"
          name="name"
          value={projectDetails.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={projectDetails.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full border p-2 rounded h-24"
        />

        {/* Status */}
        <select
          name="status"
          value={projectDetails.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="ON-HOLD">ON-HOLD</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        {/* Manager */}
        <select
          name="manager_id"
          value={projectDetails.manager_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Assign Manager</option>
          {managers.map((manager) => (
            <option key={manager._id} value={manager._id}>
              {manager.name} ({manager.email})
            </option>
          ))}
        </select>

        {/* Dates */}
        <div className="flex gap-4">
          <input
            type="date"
            name="start_date"
            value={projectDetails.start_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="end_date"
            value={projectDetails.end_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Go Back
          </button>

          <button
            onClick={handleUpdateProject}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectManager;
