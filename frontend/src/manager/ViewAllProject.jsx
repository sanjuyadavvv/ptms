import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const ViewAllProject = () => {
  const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
  
  
    const navigate=useNavigate();
  
    const token = localStorage.getItem("token");
  
    /* ================= FETCH PROJECTS ================= */
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${baseURL}/api/auth/getprojects`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch projects ❌");
      } finally {
        setLoading(false);
      }
    };
  
  
  
  
    useEffect(() => {
      fetchProjects();
    }, []);
  
    /* ================= DELETE PROJECT ================= */
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this project?")) return;
  
      try {
        await axios.delete(
          `${baseURL}/api/auth/project/deleteproject/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        toast.success("Project deleted ✅");
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Delete failed ❌"
        );
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            All Projects
          </h2>
  
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-500">
              No projects found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">#</th>
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Description</th>
                    <th className="border p-3 text-left">Status</th>
                    <th className="border p-3 text-left">Manager</th>
                    <th className="border p-3 text-center">Actions</th>
                  <th className="border p-3 text-center">Update</th>
                  </tr>
                </thead>
  
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3 font-medium">
                        {project.name}
                      </td>
                      <td className="border p-3">
                        {project.description || "-"}
                      </td>
                      <td className="border p-3">
                        <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-700">
                          {project.status}
                        </span>
                      </td>
                      <td className="border p-3">
                        {project.manager_id?.name || "—"}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
  
  
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };
  


export default ViewAllProject
