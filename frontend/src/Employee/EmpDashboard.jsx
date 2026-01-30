

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmpDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.auth)

  // Fetch assigned tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/task/user",
          { headers },
        );
        console.log("taska are ", res);
        setTasks(res.data.task || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);










  const hanldeLogout=()=>{
    const isConfirmed = confirm("Are you sure you want to log out ?");

if (!isConfirmed) {
  return; // No dabaya → yahin se function stop
}
    localStorage.removeItem("token")
    localStorage.removeItem("selectedProjectId")
    localStorage.removeItem("user")

    navigate('/')
  }










  // Fetch permissions for selected task






useEffect(()=>{

  const fetchPermission=async()=>{
    const id=user._id
try {
  const res=await axios.get(`http://localhost:3000/api/auth/userpermissions/${id}`,{
    headers
  })
  // console.log(res.data)

  setPermissions(res.data.permissions)
} catch (error) {
  console.log(error)
}
}
fetchPermission()

},[])





  // Change status
  const handleChangeStatus = async (newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/auth/task/status/${selectedTask._id}`,
        { status: newStatus },
        { headers },
      );
      setSelectedTask(res.data.task);
      toast.success("status updated");
      setTasks((prev) =>
        prev.map((t) => (t._id === res.data.task._id ? res.data.task : t)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/task/addcomment/${selectedTask._id}`,
        { comment },
        { headers },
      );
      setSelectedTask(res.data.task);
  

      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };





useEffect(()=>{
  const savedTaskId=localStorage.getItem("selectedTask")
  if (savedTaskId && tasks.length > 0) {
    const task = tasks.find((t) => t._id === savedTaskId);
    if (task) {
      setSelectedTask(task);
    }
  }
},[tasks])


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task._id}
            onClick={() => {setSelectedTask(task);
              localStorage.setItem("selectedTask",task._id)}
            }
            className={`p-3 mb-2 rounded cursor-pointer ${selectedTask?._id === task._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            {task.title}
          </div>
        ))}


        <div className="mt-4">


  {permissions?.length === 0 ? (
    <p className="text-gray-500">No permissions assigned</p>
  ) : (
    <select className="border rounded px-3 py-2 mt-2">
      <option value="">VIEW  PERMISSIONS</option>

      {permissions.map((p) => (
        <option key={p._id} >
          {p.name}
        </option>
      ))}
    </select>
  )}
</div>


  <button className="border rounded px-3 py-2" onClick={hanldeLogout}>
    Log out
  </button>

      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {!selectedTask ? (
          <p>Select a task to view details</p>
        ) : (
          <div className="bg-white p-5 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
            <p className="text-gray-600">
              Description: {selectedTask.description}
            </p>
            <p className="text-gray-600">
              Project: {selectedTask.project_id?.name}
            </p>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <select
                className="border p-2 rounded"
                value={selectedTask.status}
                onChange={(e) => handleChangeStatus(e.target.value)}
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>REVIEW</option>
              </select>
            </div>

            {/* Permissions */}
            {/* <div>
              <span className="font-semibold">Permissions: </span>
              {permissions.join(", ") || "No permissions"}
            </div> */}

            {/* Comments */}
            <div className="space-y-2">
              <h3 className="font-semibold">Comments:</h3>
              {selectedTask.comments.map((c, idx) => (
                <div key={idx} className="border p-2 rounded">
                  <p>
                    <strong>{c.user?.name || "Unknown"}:</strong> {c.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}


              <div className="flex gap-2">
                <input
                  type="text"
                  className="border p-2 rounded flex-1"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
               
                  <div className="space-y-20">
                    <button onClick={()=>navigate(`/viewproject/${selectedTask.project_id._id}`)} className="bg-blue-600 text-white px-4 py-2 rounded">
                      View Project Details{" "}
                    </button>
                  </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmpDashboard;
