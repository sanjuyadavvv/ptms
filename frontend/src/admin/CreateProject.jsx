import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
/* ---------- Reusable Form Row ---------- */
const FormRow = ({ label, children }) => (
  <div className="flex items-center gap-4">
    <label className="w-40 text-sm font-medium text-gray-600">{label}</label>
    <div className="flex-1">{children}</div>
  </div>
);

const CreateProject = () => {
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

  const handleChange = (e) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/project/createproject`, // correct URL
        projectDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // include token if needed
          },
        },
      );
      toast.success('project created ')
      console.log("Project created:", res.data);
    } catch (error) {
      //  console.log(error)
      console.error("Error creating project:", error);
     
      toast.error('Permission denied ,check your permissions ')
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/allusers`, // backend wala route
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(res)
        setManagers(res.data.employees || []);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };

    fetchManagers();
  }, []);

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Project</h1>

      <div className="flex flex-col gap-4">
        <FormRow label="Project Name">
          <input
            name="name"
            value={projectDetails.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </FormRow>

        <FormRow label="Description">
          <textarea
            name="description"
            value={projectDetails.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500"
          />
        </FormRow>

        <FormRow label="Assign To">
          <select
            name="manager_id"
            value={projectDetails.manager_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select manager</option>

            {managers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormRow>

        <FormRow label="Status">
          <select
            name="status"
            value={projectDetails.status}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="ON-HOLD">ON-HOLD</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </FormRow>

        <FormRow label="Start Date">
          <input
            type="date"
            name="start_date"
            value={projectDetails.start_date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </FormRow>

        <FormRow label="End Date">
          <input
            type="date"
            name="end_date"
            value={projectDetails.end_date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </FormRow>

        <button
          onClick={handleCreateProject}
          className="self-end mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
