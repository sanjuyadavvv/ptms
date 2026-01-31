import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UpdateProject = () => {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const[employees,setEmployees]=useState([])

  const [editProject, setEditProject] = useState({
    name: "",
    description: "",
    status: "",
    manager:" "

  });






  
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get(
        `${baseURL}/api/auth/allusers`,
        { headers }
      );
      setEmployees(res.data.employees || []);
    };
    fetchEmployees();
  }, []);







  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/auth/getprojects`,
          { headers }
        );
      
        console.log(res)

        const list = res.data.projects || [];
        setProjects(list);

        // restore selected project
        const savedId = localStorage.getItem("selectedProjectId");
        if (savedId) {
          const found = list.find((p) => p._id === savedId);
          if (found) {
            handleProjectClick(found);
          }
        }
      } catch (err) {
        console.error("Project fetch error", err);
      }
    };

    fetchProjects();
  }, [user]);

  /* ================= SELECT PROJECT ================= */
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    localStorage.setItem("selectedProjectId", project._id);

    setEditProject({
      name: project.name,
      description: project.description,
      status: project.status,
      manager:project.manager_id.name
    });
  };

  /* ================= UPDATE PROJECT ================= */
  const handleUpdateProject = async () => {
    try {
      const res = await axios.patch(
        `${baseURL}/api/auth/update/project/${selectedProject._id}`,
        editProject,
        { headers }
      );
      console.log(res)

      toast.success("Project updated successfully ✅");


      
      setSelectedProject(res.data.project);

      // update sidebar list
      setProjects((prev) =>
        prev.map((p) =>
          p._id === res.data.project._id ? res.data.project : p
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project ❌");
    }
  };

  return (
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
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6">
        {!selectedProject ? (
          <p className="text-gray-600">Select a project to update</p>
        ) : (
          <div className="bg-white p-6 rounded shadow max-w-xl">
            <h2 className="text-2xl font-bold mb-4">
              Update Project
            </h2>

            {/* NAME */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Project Name
              </label>
              <input
                value={editProject.name}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    name: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Description
              </label>
              <textarea
                value={editProject.description}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    description: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* STATUS */}
            <div className="mb-6">
              <label className="block text-sm font-medium">
                Status
              </label>
              <select
                value={editProject.status}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    status: e.target.value,
                  })
                }
                className="border px-3 py-2 rounded"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON-HOLD">ON-HOLD</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>





{/* resassign to user  */}


 <div className="mb-6">
              <label className="block text-sm font-medium">
                Reassihn 
              </label>
              <select
                value={editProject.status}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    manager : e.target.value,
                  })
                }
                className="border px-3 py-2 rounded"
              >
                <option>Reassign project</option>
                 {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
              </select>
            </div>


            <button
              onClick={handleUpdateProject}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Update Project
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UpdateProject;




