import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import toast from 'react-hot-toast'
const AllTasks = () => {
    
const[tasks,setTasks]=useState([])

const baseURL = import.meta.env.VITE_API_URL;



useEffect(()=>{
const fetchAllTask=async()=>{

  try {
    
      const res= await axios.get(`${baseURL}/api/auth/getalltask`,{
     headers :{
        Authorization:`Bearer ${localStorage.getItem("token")}`
     }})
     console.log(res)
     if(res.data.tasks.length===0) return 
     setTasks(res.data.tasks)


  } catch (error) {
    console.log('error fetching tasks',error)
  }

}
fetchAllTask()


},[])







const deleteTasks=async(id)=>{

const isConfirmed = confirm("Are you sure you want to delete user?");

if (!isConfirmed) {
  return; // No dabaya → yahin se function stop
}
    try {
      const res=  await axios.delete(`${baseURL}/api/auth/deletetask/${id}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})
console.log(res)
toast.success('user deleted ')


setTasks((prevTasks)=>prevTasks.filter(task=>task._id!==id))

        
    } catch (error) {
        console.log(error)
    }

}



  return (
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
                            deleteTasks(task._id)
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
  )
}

export default AllTasks
