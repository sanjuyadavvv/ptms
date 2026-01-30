
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const TaskDetail = () => {
  const { id: taskId } = useParams(); // task ID from route
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [employees, setEmployees] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH TASK DETAILS ----------------
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/task/${taskId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTask(res.data.task);
        setStatus(res.data.task.status);
        setAssignedUser(res.data.task.assigned_user?._id || "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load task");
        navigate(-1);
      }
    };
    fetchTask();
  }, [taskId, token, navigate]);

  // ---------------- FETCH EMPLOYEES ----------------
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/emp", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, [token]);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/auth/task/status/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(res.data.task);
      alert("✅ Status updated");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  // ---------------- REASSIGN TASK ----------------
  const handleReassign = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/auth/task/reassign/${taskId}`,
        { assigned_user: assignedUser },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask(res.data.task);
      alert("✅ Task reassigned");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to reassign task");
    }
  };

  // ---------------- ADD COMMENT ----------------
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/task/addcomment/${taskId}`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res)
      setTask(res.data.task); // refresh comments
      setComment("");
      alert("✅ Comment added");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add comment");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
        </div>

        <p className="text-gray-300">{task.description}</p>

        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label>Status</label>
            <select
              className="w-full p-2 rounded bg-gray-700"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {["TODO", "IN_PROGRESS", "BLOCKED", "REVIEW", "DONE"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
            </select>
            <button
              onClick={handleStatusChange}
              className="mt-2 bg-blue-600 px-4 py-2 rounded"
            >
              Update Status
            </button>
          </div>

          {/* Reassign */}
          <div>
            <label>Assigned To</label>
            <select
              className="w-full p-2 rounded bg-gray-700"
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name} ({e.email})
                </option>
              ))}
            </select>
            <button
              onClick={handleReassign}
              className="mt-2 bg-green-600 px-4 py-2 rounded"
            >
              Reassign Task
            </button>
          </div>
        </div>

        {/* Dependency Info */}
        <div className="space-y-2">
          <p>
            <strong>Dependency Type:</strong> {task.dependency_type}
          </p>
          {task.dependency_type === "EXTERNAL" && (
            <p>
              <strong>Blocked By:</strong> {task.blocked_by_external_party}
            </p>
          )}
          {task.blocked_by_task && (
            <p>
              <strong>Blocked By Task:</strong> {task.blocked_by_task}
            </p>
          )}
          {task.dependency_description && (
            <p>
              <strong>Dependency Description:</strong> {task.dependency_description}
            </p>
          )}
        </div>

        {/* Comments */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          {task.comments?.length === 0 && <p>No comments yet</p>}
          <div className="space-y-2">
            {task.comments?.map((c) => (
              <div key={c._id} className="p-2 bg-gray-700 rounded">
                <p>{c.text}</p>
                <small className="text-gray-400">
                  By {c.user?.name} on {new Date(c.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 rounded bg-gray-700"
            />
            <button
              onClick={handleAddComment}
              className="bg-purple-600 px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default TaskDetail
