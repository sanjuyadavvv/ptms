
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const headers = { Authorization: `Bearer ${token}` };

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const[Permisson,setPermission]=useState([])

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/manager/${user._id}`,
          { headers }
        );

        const projectList = res.data.projects || [];
        setProjects(projectList);

        // 🔥 AUTO RESTORE SELECTED PROJECT
        const savedProjectId = localStorage.getItem("selectedProjectId");
        if (savedProjectId && projectList.length) {
          const found = projectList.find(
            (p) => p._id === savedProjectId
          );
          if (found) {
            setSelectedProject(found);
            fetchTasks(found._id);
          }
        }
      } catch (err) {
        console.log("Project fetch error", err);
      }
    };

    fetchProjects();
  }, [user]);

  /* ================= FETCH TASKS ================= */
  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(
        `${baseURL}/api/auth/task/project/${projectId}`,
        { headers }
      );
      // console.log(res)
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log("Task fetch error", err);
    }
  };

  /* ================= SELECT PROJECT ================= */
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    localStorage.setItem("selectedProjectId", project._id);
    fetchTasks(project._id);
  };

  /* ================= TASK STATUS CHANGE ================= */
  const handleTaskStatusChange = async (taskId, status) => {
    try {
      await axios.patch(
        `${baseURL}/api/auth/task/status/${taskId}`,
        { status },
        { headers }
      );
    

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status } : t
        )
      );
    } catch (err) {
      toast.error('complete the dependency first ')
      
    }
  };

  /* ================= PROJECT STATUS CHANGE ================= */
  const handleProjectStatusChange = async (status) => {
    try {
      
      const res = await axios.patch(
        `${baseURL}/api/auth/project/status/${selectedProject._id}`,
        { status },
        { headers }
      );

      // console.log(res)
      setSelectedProject(res.data.project);

      toast.success('status updated')
      setProjects((prev) =>
        prev.map((p) =>
          p._id === res.data.project._id ? res.data.project : p
        )
      );
    } catch (err) {
      console.log(err)
      alert("Failed to update project status");
    }
  };

  /* ================= DELETE TASK ================= */
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete task?")) return;

    try {
      await axios.delete(
        `${baseURL}/api/auth/deletetask/${taskId}`,
        { headers }
      );
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      alert("Delete failed");
    }
  };


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



useEffect(()=>{

  const fetchPermission=async()=>{
    const id=user._id
try {
  const res=await axios.get(`${baseURL}/api/auth/userpermissions/${id}`,{
    headers
  })
  // console.log(res.data)

  setPermission(res.data.permissions)
} catch (error) {
  console.log(error)
}
}
fetchPermission()

},[])






  return (




<>


    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-1/4 bg-white p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Projects</h2>

        {projects.map((project, idx) => (
          <div
            key={project._id}
            onClick={() => handleProjectClick(project)}
            className={`p-3 mb-2 rounded cursor-pointer ${
              selectedProject?._id === project._id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            {idx + 1}. {project.name}
          </div>
        ))}
       
<div className="mt-4">


  {Permisson?.length === 0 ? (
    <p className="text-gray-500">No permissions assigned</p>
  ) : (
    <select className="border rounded px-3 py-2 mt-2">
      <option value="">VIEW  PERMISSIONS</option>

      {Permisson.map((p) => (
        <option key={p._id} >
          {p.name}
        </option>
      ))}
    </select>
  )}
</div>

<div className="fixed bottom-4 left-4 flex gap-3">
  <button
    className="border rounded px-3 py-2"
    onClick={() => navigate("/alltasks")}
  >
    View All Tasks
  </button>

  <button className="border rounded px-3 py-2" onClick={hanldeLogout}>
    Log out
  </button>





</div>

      </aside>






      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6">
        {!selectedProject ? (
          <p className="text-gray-600">Select a project</p>
        ) : (
          <>
            {/* PROJECT DETAILS */}
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-2xl font-bold mb-2">
                <span>Title  </span>
               {selectedProject.name}
              </h2>
              <p className="text-gray-600 mb-3">
              Description  {selectedProject.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="font-medium">Status:</span>
                <select
                  value={selectedProject.status}
                  onChange={(e) =>
                    handleProjectStatusChange(e.target.value)
                  }
                  className="border px-3 py-1 rounded"
                >

              
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="ON-HOLD">ON-HOLD</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              
              <button
              onClick={() =>{
                  // localStorage.setItem('selected project is ',selectedProject)
                  console.log(selectedProject)
                  navigate(`/updateproject/${selectedProject._id}`)
              }   
              }
              className="mb-4 bg-gray-600 text-white px-5 py-2 rounded gap-y-2.5 mt-3"
            >
              + Update Project
            </button>
            </div>

            {/* CREATE TASK */}
            <button
              onClick={() =>
                navigate(`/create/${selectedProject._id}`)
              }
              className="mb-4 bg-gray-600 text-white px-5 py-2 rounded gap-2"
            >
              + Divide  Task
            </button>






  <button
              onClick={() =>
                navigate(`/createproject`)
              }
              className="mb-4 bg-gray-600 text-white px-5 py-2 rounded m-2.5"
            >
              + Create Project
            </button>








            {/* TASK TABLE */}
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Assigned</th>
                    <th>Dependency</th>
                    <th>Dependency Type</th>
                    <th>Due</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-t text-center">
                      <td className="p-3">{task.title}</td>

                      <td>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleTaskStatusChange(
                              task._id,
                              e.target.value
                            )
                          }
                          className="border px-2 py-1 rounded"
                        >
                          <option value="TODO">TODO</option>
                          <option value="IN_PROGRESS">
                            IN_PROGRESS
                          </option>
                          <option value="BLOCKED">BLOCKED</option>
                          <option value="REVIEW">REVIEW</option>
                          <option value="DONE">DONE</option>
                        </select>
                      </td>

                      <td>{task.priority}</td>
                      <td>{task.assigned_user?.name || "-"}</td>
                      <td>{task.due_date?.slice(0, 10)}</td>

                        {/* adding dependency  */}
                   <td className="p-2 text-center">
  {task.dependency_type || "NULL"}
</td>

                     <td className="p-2 text-center">
  {task.blocked_by_task ? (
    <div className="text-sm">
      <p className="font-medium">{task.blocked_by_task.title}</p>
      <p
        className={`text-xs ${
          task.blocked_by_task.status === "DONE"
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {task.blocked_by_task.status}
      </p>
    </div>
  ) : (
    "NULL"
  )}
</td>


{/* galat hua toh ye hta dena  */}

                      <td className="flex justify-center gap-2 p-2">
                        <button
                          onClick={() =>
                            navigate(`/task/${task._id}`)
                          }
                          className="text-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteTask(task._id)
                          }
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {tasks.length === 0 && (
                <p className="p-4 text-center text-gray-500">
                  No tasks found
                </p>
              )}
            </div>
          </>
        )}

      </main>
  
    </div>
    </>
  );
};

export default ManagerDashboard;
