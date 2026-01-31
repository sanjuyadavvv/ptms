
import Task from "../models/Task.js";

/* =========================
   CREATE TASK
========================= */
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL TASKS (optional filters)
========================= */

export const getAllTasks = async (req, res) => {
  try {
    console.log(req.query);

    const { project_id, assigned_user, status } = req.query;

    const filter = {};
    if (project_id) filter.project_id = project_id;
    if (assigned_user) filter.assigned_user = assigned_user;
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate("assigned_user", "name email")
      .populate("project_id", "name")
      .populate("blocked_by_task", "title status");


      if(tasks.length===0){
        return res.status(200).json({message:'no tasks found '})
      }
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





/* =========================
   UPDATE TASK
========================= */


/*



export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};





*/



/* =========================
   DELETE TASK
========================= */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// find task for  a particular project

export const getTasksByProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    const tasks = await Task.find({ project_id: project_id })
      .populate("assigned_user", "name email")
      .populate("project_id", "name")
      .populate("blocked_by_task", "title status");

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No tasks found for this project",
        tasks: [],
      });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskForUser = async (req, res) => {
  try {
    console.log(req.user)
    const user_id  = req.user._id;

    // const task = await Task.find({
    //   assigned_user: user_id,
    // });

   const task = await Task.find({ assigned_user: user_id })
      .populate("project_id", "name description status start_date end_date manager_id")
      .populate("assigned_user", "name email")
      .populate("blocked_by_task", "title status")
      .populate("comments.user", "name email")


    // console.log(task);
    if (!task) {
      console.log("no task is assigned yet");
      return res.json({ message: "no tasks yet" });
    }

    res.status(200).json({
      success: true,
      message: " got Task  successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error finding task", error });
  }
};




// get task by task id 
export const getTaskByTaskId = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch task by ID
    const task = await Task.findById(id).populate("comments.user", "name email")
  .populate("assigned_user", "name email")
  .populate("project_id", "name description status").
  populate("project_id.manager_id","name email")

    if (!task) {
      return res.status(404).json({ message: "Task not found with this ID" });
    }

    return res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ message: "Server error while fetching task" });
  }
};




// change task status 


// export const changeTaskStatus = async (req, res) => {

//   console.log('this is called ')
//   try {
//     const { id } = req.params;
//     console.log('id is ',id)
//     const { status } = req.body; // get new status from request body

//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     // Update only the status field
//     const task = await Task.findByIdAndUpdate(
//       id,
//       { status }, // only update status
//       { new: true } // return the updated task
//     );

//     task.status = status;
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     await task.save()
//     await task.populate("comments.user", "name email");

//     return res.status(200).json({ message: "Task status updated", task });
//   } catch (error) {
//     console.error("Error updating task status:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };





// change task status by dependency
export const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // find task first
    const task = await Task.findById(id).populate("blocked_by_task","title status ");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    /* ---------------- EXTERNAL DEPENDENCY ---------------- */
    if (task.dependency_type === "EXTERNAL") {
      return res.status(403).json({
        message: "Task has external dependency. Status cannot be changed.",
      });
    }

    /* ---------------- INTERNAL DEPENDENCY ---------------- */
    if (task.dependency_type === "INTERNAL") {
      if (!task.blocked_by_task) {
        return res.status(400).json({
          message: "Internal dependency task not linked",
        });
      }

      if (task.blocked_by_task.status !== "DONE") {
        return res.status(403).json({
          message: `Task is blocked until "${task.blocked_by_task.title}" is completed`,
        });
      }
    }

    /* ---------------- UPDATE STATUS ---------------- */
    task.status = status;
    await task.save();

    await task.populate("comments.user", "name email");

    return res.status(200).json({
      message: "Task status updated successfully",
      task,
    });

  } catch (error) {
    console.error("Error updating task status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};






// get task  by status 


export const getUserTaskCountByStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const counts = await Task.aggregate([
      { $match: { assigned_user: id} }, // filter by user
      { $group: { _id: "$status", count: { $sum: 1 } } } // group by status
    ]);

    // Transform result into an object like { TODO: 2, IN_PROGRESS: 1, DONE: 3 }
    const result = {};
    counts.forEach(item => {
      result[item._id] = item.count;
    });

    res.status(200).json({ success: true, counts: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// add comment on task 
export const addComment = async (req, res) => {
  try {


    console.log('adding comments')
    const {id}=req.params;
    const  userId = req.user._id; // task id
    console.log('user id ',req.user._id)
    const { comment } = req.body; // comment text
    // const userId = req.user._id; // assuming you have user info in req.user from auth middleware

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ success: false, message: "Comment cannot be empty" });
    }


    console.log('comment is ',comment)
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }



    // Add comment to task
    task.comments.push({
      text: comment,
      user: userId,
    });

    await task.save();

    // Optionally populate user info for response
    await task.populate("comments.user", "name email");

    res.status(200).json({ success: true, task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'error' });
  }
};



export const ReassignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_user } = req.body;

    if (!assigned_user) {
      return res.status(400).json({
        success: false,
        message: "assigned_user is required",
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.assigned_user = assigned_user;
    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assigned_user", "name email");


    res.status(200).json({
      success: true,
      task: updatedTask,
      message: "Task reassigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







// import Task from "../models/Task.js";

// Update task (any field: title, description, status, assigned_user, comments, etc.)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // e.g., { status: "DONE" } or { comment: "New comment" }

    // Fetch the task with its dependency populated
    const task = await Task.findById(id).populate("blocked_by_task");

    if (!task) return res.status(404).json({ message: "Task not found" });

    // ====== Handle dependency ======
    if (task.blocked_by_task) {
      switch (task.dependency_type) {
        case "INTERNAL":
          if (task.blocked_by_task.status !== "DONE") {
            return res.status(400).json({
              message: `Cannot update: blocked by internal task "${task.blocked_by_task.title}"`,
            });
          }
          break;

        case "EXTERNAL":
        case "APPROVAL":
          if (!task.is_external_ready) {
            return res.status(400).json({
              message: `Cannot update: external/approval dependency not ready`,
            });
          }
          break;
      }
    }

    // ====== Handle comments separately if passed ======
    if (updates.comment) {
      task.comments.push({
        user: updates.user_id, // should be passed in body
        text: updates.comment,
      });
      delete updates.comment;
      delete updates.user_id;
    }

    // ====== Update all other fields ======
    Object.assign(task, updates);
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};








// get list of all the tasks
export const ALLTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks

    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ message: "No tasks are assigned" });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks, // send the array directly
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching tasks" });
  }
};




