import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateTaskModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [task, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assigned_user: "",
    due_date: "",
    estimated_time: "",
    dependency_type: "NULL",
    blocked_by_task: "NULL",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/auth/createtask",
        { ...form, project_id: id },
        { headers },
      );
      alert("Task created");
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("Create task failed");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get("http://localhost:3000/api/auth/emp", {
        headers,
      });
      setEmployees(res.data.employees || []);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/getalltask",
          {
            headers,
          },
        );
        // console.log(res);
        //  if(res.data.tasks.length===0) return
        setTasks(res.data.tasks);
      } catch (error) {
        console.log("error fetching tasks", error);
      }
    };
    fetchAllTask();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-xl rounded-xl shadow-md p-6 space-y-5"
      >
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Create Task</h2>
          <p className="text-sm text-gray-500">Fill the details below</p>
        </div>

        {/* Title */}
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            rows={3}
            className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>TODO</option>
              <option>IN_PROGRESS</option>
              <option>DONE</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Priority</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>
          </div>
        </div>

        {/* Assign */}
        <div>
          <label className="text-sm text-gray-600">Assign To</label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2"
            value={form.assigned_user}
            onChange={(e) =>
              setForm({ ...form, assigned_user: e.target.value })
            }
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Dependency Type</label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2"
            value={form.dependency_type}
            onChange={(e) =>
              setForm({ ...form, dependency_type: e.target.value })
            }
          >
            <option>Select </option>
            <option>INTERNAL</option>
            <option>EXTERNAL</option>
            <option>APPROVAL</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600"> Blocked By Task</label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2"
            value={form.blocked_by_task}
            onChange={(e) =>
              setForm({ ...form, blocked_by_task: e.target.value })
            }
          >
            <option value="">select task </option>
            {!task || task.length === 0 ? (
              <option >No tasks</option>
            ) : (
              task.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Due Date</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Estimated Hours</label>
            <input
              type="number"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="e.g. 4"
              value={form.estimated_time}
              onChange={(e) =>
                setForm({
                  ...form,
                  estimated_time: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
