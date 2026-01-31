

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const EmpDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [permissions, setPermissions] = useState([]);
//   const [comment, setComment] = useState("");
//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   const navigate=useNavigate();
//   const {user}=useSelector((state)=>state.auth)

//   // Fetch assigned tasks
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get(
//           "${baseURL}/api/auth/task/user",
//           { headers },
//         );
//         console.log("taska are ", res);
//         setTasks(res.data.task || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTasks();
//   }, []);










//   const hanldeLogout=()=>{
//     const isConfirmed = confirm("Are you sure you want to log out ?");

// if (!isConfirmed) {
//   return; // No dabaya → yahin se function stop
// }
//     localStorage.removeItem("token")
//     localStorage.removeItem("selectedProjectId")
//     localStorage.removeItem("user")

//     navigate('/')
//   }










//   // Fetch permissions for selected task






// useEffect(()=>{

//   const fetchPermission=async()=>{
//     const id=user._id
// try {
//   const res=await axios.get(`${baseURL}/api/auth/userpermissions/${id}`,{
//     headers
//   })
//   // console.log(res.data)

//   setPermissions(res.data.permissions)
// } catch (error) {
//   console.log(error)
// }
// }
// fetchPermission()

// },[])




// // PERMISSION CHECK
// const hasPermission = (perm) =>
//   permissions?.some(p => p.name === perm);



//   // Change status
//   const handleChangeStatus = async (newStatus) => {
//     try {
//       const res = await axios.patch(
//         `${baseURL}/api/auth/task/status/${selectedTask._id}`,
//         { status: newStatus },
//         { headers },
//       );
//       setSelectedTask(res.data.task);
//       toast.success("status updated");
//       setTasks((prev) =>
//         prev.map((t) => (t._id === res.data.task._id ? res.data.task : t)),
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   // Add comment
//   const handleAddComment = async () => {
//     if (!comment.trim()) return;
//     try {
//       const res = await axios.post(
//         `${baseURL}/api/auth/task/addcomment/${selectedTask._id}`,
//         { comment },
//         { headers },
//       );
//       setSelectedTask(res.data.task);
  

//       setComment("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add comment");
//     }
//   };





// useEffect(()=>{
//   const savedTaskId=localStorage.getItem("selectedTask")
//   if (savedTaskId && tasks.length > 0) {
//     const task = tasks.find((t) => t._id === savedTaskId);
//     if (task) {
//       setSelectedTask(task);
//     }
//   }
// },[tasks])


//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-white p-4 shadow">
//         <h2 className="text-xl font-bold mb-4">{user.name}'s' Tasks</h2>
//         {tasks.map((task) => (
//           <div
//             key={task._id}
//             onClick={() => {setSelectedTask(task);
//               localStorage.setItem("selectedTask",task._id)}
//             }
//             className={`p-3 mb-2 rounded cursor-pointer ${selectedTask?._id === task._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
//           >
//             {task.title}
//           </div>
//         ))}


//         <div className="mt-4">


//   {permissions?.length === 0 ? (
//     <p className="text-gray-500">No permissions assigned</p>
//   ) : (
//     <select className="border rounded px-3 py-2 mt-2">
//       <option value="">VIEW  PERMISSIONS</option>

//       {permissions.map((p) => (
//         <option key={p._id} >
//           {p.name}
//         </option>
//       ))}
//     </select>
//   )}


// </div>


// {hasPermission("CREATE_PROJECT") && <button className="border rounded px-3 py-2"  onClick={()=>navigate('/createproject')} >CREATE_PROJECT</button>}

// {hasPermission("VIEW_ALLPROJECT") && <button className="border rounded px-3 py-2" onClick={()=>navigate('/viewallproject')}  >VIEW_PROJECT</button>}


//   <button className="border rounded px-3 py-2" onClick={hanldeLogout}>
//     Log out
//   </button>

//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6">
//         {!selectedTask ? (
//           <p>Select a task to view details</p>
//         ) : (
//           <div className="bg-white p-5 rounded shadow space-y-4">
//             <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
//             <p className="text-gray-600">
//               Description: {selectedTask.description}
//             </p>
//             <p className="text-gray-600">
//               Project: {selectedTask.project_id?.name}
//             </p>

//             {/* Status */}
//             <div className="flex items-center gap-2">
//               <span>Status:</span>
//               <select
//                 className="border p-2 rounded"
//                 value={selectedTask.status}
//                 onChange={(e) => handleChangeStatus(e.target.value)}
//               >
//                 <option>TODO</option>
//                 <option>IN_PROGRESS</option>
//                 <option>REVIEW</option>
//               </select>
//             </div>

//             {/* Permissions */}
//             {/* <div>
//               <span className="font-semibold">Permissions: </span>
//               {permissions.join(", ") || "No permissions"}
//             </div> */}

//             {/* Comments */}
//             <div className="space-y-2">
//               <h3 className="font-semibold">Comments:</h3>
//               {selectedTask.comments.map((c, idx) => (
//                 <div key={idx} className="border p-2 rounded">
//                   <p>
//                     <strong>{c.user?.name || "Unknown"}:</strong> {c.text}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(c.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}


//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   className="border p-2 rounded flex-1"
//                   placeholder="Add a comment"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//                 <button
//                   onClick={handleAddComment}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Add
//                 </button>
               
//                   <div className="space-y-20">
//                     <button onClick={()=>navigate(`/viewproject/${selectedTask.project_id._id}`)} className="bg-blue-600 text-white px-4 py-2 rounded">
//                       View Project Details{" "}
//                     </button>
//                   </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default EmpDashboard;



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

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/task/user`,
          { headers }
        );
        setTasks(res.data.task || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  /* ================= FETCH PERMISSIONS ================= */
  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/userpermissions/${user._id}`,
          { headers }
        );
        setPermissions(res.data.permissions || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermission();
  }, []);

  /* ================= RESTORE SELECTED TASK ================= */
  useEffect(() => {
    const savedTaskId = localStorage.getItem("selectedTask");
    if (savedTaskId && tasks.length > 0) {
      const task = tasks.find((t) => t._id === savedTaskId);
      if (task) setSelectedTask(task);
    }
  }, [tasks]);

  /* ================= PERMISSION CHECK ================= */
  const hasPermission = (perm) =>
    permissions?.some((p) => p.name === perm);

  /* ================= LOGOUT ================= */
  const hanldeLogout = () => {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    localStorage.clear();
    navigate("/");
  };

  /* ================= CHANGE STATUS ================= */
  const handleChangeStatus = async (newStatus) => {
    try {
      const res = await axios.patch(
        `${baseURL}/api/auth/task/status/${selectedTask._id}`,
        { status: newStatus },
        { headers }
      );

      setSelectedTask(res.data.task);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === res.data.task._id ? res.data.task : t
        )
      );
      toast.success("Status updated");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  /* ================= ADD COMMENT ================= */
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `${baseURL}/api/auth/task/addcomment/${selectedTask._id}`,
        { comment },
        { headers }
      );

      setSelectedTask(res.data.task);
      setComment("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r p-5 flex flex-col justify-between">
        {/* Top */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {user.name}'s Tasks
          </h2>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task._id}
                onClick={() => {
                  setSelectedTask(task);
                  localStorage.setItem("selectedTask", task._id);
                }}
                className={`p-3 rounded-lg cursor-pointer text-sm
                  ${
                    selectedTask?._id === task._id
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-4">
          {/* Permissions */}
          <div>
            <p className="text-sm font-semibold mb-2">Permissions</p>
            {permissions.length === 0 ? (
              <p className="text-xs text-gray-400">No permissions</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {permissions.map((p) => (
                  <span
                    key={p._id}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {hasPermission("CREATE_PROJECT") && (
            <button
              onClick={() => navigate("/createproject")}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Project
            </button>
          )}

          {hasPermission("VIEW_ALLPROJECT") && (
            <button
              onClick={() => navigate("/viewallproject")}
              className="w-full border py-2 rounded hover:bg-gray-100"
            >
              View Projects
            </button>
          )}

          <button
            onClick={hanldeLogout}
            className="w-full text-red-600 border border-red-500 py-2 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">
        {!selectedTask ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a task to view details
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 space-y-5 max-w-3xl">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold">
                {selectedTask.title}
              </h2>
              <p className="text-sm text-gray-500">
                Project: {selectedTask.project_id?.name}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700">
              {selectedTask.description}
            </p>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">Status</span>
              <select
                className="border rounded px-3 py-2"
                value={selectedTask.status}
                onChange={(e) =>
                  handleChangeStatus(e.target.value)
                }
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>REVIEW</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold mb-2">Comments</h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedTask.comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="border rounded p-3 text-sm"
                  >
                    <p className="font-medium">
                      {c.user?.name || "Unknown"}
                    </p>
                    <p>{c.text}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(
                        c.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  className="border rounded px-3 py-2 flex-1"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/viewproject/${selectedTask.project_id._id}`
                  )
                }
                className="mt-4 border px-4 py-2 rounded hover:bg-gray-100"
              >
                View Project Details
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmpDashboard;
