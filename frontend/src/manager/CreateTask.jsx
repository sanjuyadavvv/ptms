// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const CreateTask = () => {
//   const { id: projectId } = useParams(); // project ID from URL
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     status: "TODO",
//     priority: "MEDIUM",
//     assigned_to: "", // optional: dropdown for employees
//     due_date: "",
//     estimated_time: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post("${baseURL}/api/auth/createtask", {
//         ...form,
//         project_id: projectId,
//       });
//       alert("Task created successfully!");
//       setForm({
//         title: "",
//         description: "",
//         status: "TODO",
//         priority: "MEDIUM",
//         assigned_to: "",
//         due_date: "",
//         estimated_time: "",
//       });
//     } catch (error) {
//       console.log(error);
//       alert("Error creating task");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-md rounded-md space-y-4">
//       <h2 className="text-2xl font-bold text-gray-700">
//         Add Task to Project {projectId}
//       </h2>

//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-gray-600">Title</label>
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Enter task title"
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-gray-600">Description</label>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Enter task description"
//           className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col">
//           <label className="mb-1 font-medium text-gray-600">Status</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="TODO">TODO</option>
//             <option value="IN_PROGRESS">IN PROGRESS</option>
//             <option value="DONE">DONE</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 font-medium text-gray-600">Priority</label>
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="LOW">LOW</option>
//             <option value="MEDIUM">MEDIUM</option>
//             <option value="HIGH">HIGH</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col">
//           <label className="mb-1 font-medium text-gray-600">Due Date</label>
//           <input
//             name="due_date"
//             type="date"
//             value={form.due_date}
//             onChange={handleChange}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 font-medium text-gray-600">
//             Estimated Time (hrs)
//           </label>
//           <input
//             name="estimated_time"
//             type="number"
//             value={form.estimated_time}
//             onChange={handleChange}
//             className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Hours"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-200"
//       >
//         Create Task
//       </button>
//     </div>
//   );
// };

// export default CreateTask;





import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const defaultTask = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  assigned_to: "",
  due_date: "",
  estimated_time: "",
};

const CreateTasks = ({projectId}) => {
  // const { projectId } = useParams();
  console.log('id is ',projectId)
  const [tasks, setTasks] = useState([ { ...defaultTask } ]);
  const [loading, setLoading] = useState(false);

  // Handle field change for a task
  const handleChange = (index, e) => {
    const newTasks = [...tasks];
    newTasks[index][e.target.name] = e.target.value;
    setTasks(newTasks);
  };

  // Add new empty task
  const addTask = () => {
    setTasks([...tasks, { ...defaultTask }]);
  };

  // Remove a task
  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  // Submit all tasks
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res= await axios.post(`${baseURL}/api/auth/createtask`, {
        project_id: projectId,
        tasks, // send array of tasks
      });


      console.log('task added successfullty ',res)

      alert("Tasks created successfully!");
      setTasks([{ ...defaultTask }]); // reset
    } catch (err) {
      console.error(err);
      alert("Error creating tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-700">
        Create Tasks for Project {projectId}
      </h2>

      {tasks.map((task, index) => (
        <div
          key={index}
          className="p-4 bg-gray-100 rounded-md border border-gray-300 space-y-4 relative"
        >
          {tasks.length > 1 && (
            <button
              onClick={() => removeTask(index)}
              className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800"
            >
              &times;
            </button>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Title</label>
              <input
                name="title"
                value={task.title}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Task title"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Assigned To</label>
              <input
                name="assigned_to"
                value={task.assigned_to}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Employee ID"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Due Date</label>
              <input
                name="due_date"
                type="date"
                value={task.due_date}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Estimated Time (hrs)
              </label>
              <input
                name="estimated_time"
                type="number"
                value={task.estimated_time}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Hours"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Task description"
              rows={3}
            />
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={addTask}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Task
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit All Tasks"}
        </button>
      </div>
    </div>
  );
};

export default CreateTasks;
