import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DefaultPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, taskRes] = await Promise.all([
          axios.get(`${baseURL}/api/auth/project/user`, { headers }),
          axios.get(`${baseURL}/api/auth/task/user`, { headers }),
        ]);

        setProjects(projectRes.data.project || []);
        setTasks(taskRes.data.task || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading your workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Here’s what’s currently assigned to you
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* PROJECT CARD */}
        {projects.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                📁 Manage  Projects 
              </h2>
              <p className="text-gray-600 text-sm">
                You are managing{" "}
                <span className="font-semibold">
                  {projects.length}
                </span>{" "}
                project(s).
              </p>
            </div>

            <button
              onClick={() => navigate("/manager")}
              className="mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Projects
            </button>
          </div>
        )}

        {/* TASK CARD */}
        {tasks.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                ✅  Manage Tasks 
              </h2>
              <p className="text-gray-600 text-sm">
                You have{" "}
                <span className="font-semibold">
                  {tasks.length}
                </span>{" "}
                task(s) to work on.
              </p>
            </div>

            <button
              onClick={() => navigate("/emp")}
              className="mt-6 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
              View Tasks
            </button>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {projects.length === 0 && tasks.length === 0 && (
        <div className="mt-16 text-center text-gray-400">
          <p className="text-lg">
            No projects or tasks assigned yet.
          </p>
          <p className="text-sm mt-2">
            Please wait for your manager to assign work.
          </p>
        </div>
      )}
    </div>
  );
};

export default DefaultPage;
