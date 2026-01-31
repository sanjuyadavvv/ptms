import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);




  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/viewproject/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(res.data.project);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);






  if (!project) {
    return <p className="p-6 text-gray-500">Loading project...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            📁 {project.name}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : project.status === "ON-HOLD"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            Description
          </h3>
          <p className="text-gray-700">{project.description}</p>
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-sm text-gray-500">Start Date</h4>
            <p className="font-medium">
              {project.start_date?.slice(0, 10)}
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">End Date</h4>
            <p className="font-medium">
              {project.end_date?.slice(0, 10)}
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Created At</h4>
            <p className="font-medium">
              {project.createdAt?.slice(0, 10)}
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-500">Last Updated</h4>
            <p className="font-medium">
              {project.updatedAt?.slice(0, 10)}
            </p>
          </div>
        </div>

        {/* Manager Info */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            👤 Assigned Manager
          </h3>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium text-gray-800">
              {project.manager_id?.name}
            </p>
            <p className="text-sm text-gray-600">
              {project.manager_id?.email}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            ⬅ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;

