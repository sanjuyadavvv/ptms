import Project from "../models/project.js";

// create projet - manager and admin both can create
// add middlewares to check access

export const createProject = async (req, res) => {
  const {
    name,
    description,
    status,
    manager_id,
    start_date,
    end_date,
  } = req.body;

  try {
    const exisiting = await Project.findOne({ name });
    if (exisiting) {
      return res.status(400).json({ message: "project slready exist" });
    }

    const project = await Project.create({
      name,
      description,
      status,
      manager_id,
      start_date,
      end_date,
    });

    res.status(201).json({ message: "project created successully",project});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// get projects
export const getProjects = async (req, res) => {
  try {
    const allProject = await Project.find().populate("manager_id" ,"name email ");
    // console.log(allProject)
    return res
      .status(200)
      .json(
        { message: "got all the projects successfully  " ,
         projects: allProject },
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error getting all the projects " });
  }
};



// export const getProjectForManager=async(req,res)=>{
//   try {
//     const {employee_id}=req.params;


//     console.log(employee_id)
//     const projects=await  Project.find({manager_id:employee_id})
//     console.log(projects)
//     const count=projects.length
//     if(count==0){
//       res.status(200).json({message:'No project is assigned yet,Enjoy your free time  '})
//     }
//     res.status(200).json({message:'project found successfully ',projects})
    
//   } catch (error) {
//     res.status(500).json({message:error})
//   }
// }













export const getProjectForManager = async (req, res) => {
  try {


    console.log('get request called ')
    const { employee_id } = req.params;

    if (!employee_id) {
      return res.status(400).json({ message: "Manager ID is required" });
    }

    const projects = await Project.find({ manager_id: employee_id }).populate("manager_id", "name email"); 

    if (projects.length === 0) {
      return res.status(200).json({
        message: "No project is assigned yet. Enjoy your free time 😄",
        projects: []
      });
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      count: projects.length,
      projects
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


import mongoose from "mongoose";


export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid project ID" });
    }

    // Find project and populate manager info
    const project = await Project.findById(id).populate("manager_id", "name email role");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const getProjectByUserReq=async(req,res)=>{

  console.log('this is being called ')
  try{
     const user_id = req.user._id;
     console.log('id is ',user_id)

    if (!user_id) {
      return res.status(400).json({ message: "Manager ID is required" });
    }

    const project = await Project.find({ manager_id: user_id })
      .populate("manager_id", "name email")
    

    // console.log(task);
    if (project.length === 0) {
      console.log("no task is assigned yet");
      return res.json({ message: "no tasks yet" });
    }

    res.status(200).json({
      success: true,
      message: " got project   successfully",
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error finding project", error });
  }
  
}








// Update project details by ID
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate project ID
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid project ID" });
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body, // data from request body
      { new: true, runValidators: true } // return the updated document & validate fields
    ).populate("manager_id", "name email role"); // optional: populate manager info

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

console.log(updateProject)

    // await updateProject.save()
    res.status(200).json({ success: true, message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




export const deleteProject=async(req,res)=>{
try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
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


}



export const changeProjectStatus=async(req,res)=>{

 try {
    const { id } = req.params;
    const { status } = req.body; // get new status from request body

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update only the status field
    const project = await Project.findByIdAndUpdate(
      id,
      { status }, // only update status
      { new: true } // return the updated task
    );

    if (!project) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "project status updated", project });
  } catch (error) {
    console.error("Error updating task status:", error);
    return res.status(500).json({ message: "Server error" });
  }


}


