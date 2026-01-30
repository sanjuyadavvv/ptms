import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
// Create Role

export const createRole = async (req, res) => {
  try {
    console.log(req.body)
    const { name, default_permissions, description } = req.body;

    if (!name) return res.status(400).json({ message: "Role name is required" });

    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: "Role already exists" });


    //     const validPermissionIds = default_permissions.filter((id) =>
    //   mongoose.Types.ObjectId.isValid(id)
    // );

    // ✅ ensure permissions exist
    const permissions = await Permission.find({
      _id: { $in: default_permissions },
    });

    if (permissions.length !== default_permissions.length) {
      return res
        .status(400)
        .json({ message: "Invalid permission IDs provided" });
    }

  
    


   const role = await Role.create({
      name,
      description,
      default_permissions,
    });




    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ message: "Roles fetched successfully", roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};




export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) return res.status(400).json({ message: "Role is required" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};




// // 
// export const getRolePermission=async(req,res)=>{
//   try {
    
//      const {id}=req.params;

  
//  const role= await Role.findById(id)


// if(!role){
//   return res.status(401).json({message:"role not found "})
// }

// const permission=role.default_permissions

// if(role.default_permissions){
//   return res.status(200).json({message:'permissions found',permission})
// }
//   } catch (error) {
//     console.log(error)
//   }
 
// }




export const deleteRole=async(req,res)=>{
  try {
    
    const {id}= req.params;
const role=await Role.findByIdAndDelete(id)
if(!role){
  return res.status(401).json({message:"role not found"})
}

return res.status(200).json({message:"role deleted successfully" })

  } catch (error) {
    console.log(error)
    return res.status(400).json({message:'error deleting role'})

  }

}





export const addPermissionByRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissionName } = req.body;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const permission = await Permission.findOne({ name: permissionName });
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // ✅ populated-safe duplicate check
    const alreadyAssigned = role.default_permissions.some(
      (p) => p.toString() === permission._id.toString()
    );

    if (alreadyAssigned) {
      return res.status(400).json({
        message: "Permission already assigned to role",
      });
    }

    role.default_permissions.push(permission._id);
    await role.save();

    const updatedRole = await Role.findById(id).populate(
      "default_permissions",
      "name"
    );

    res.status(200).json({
      success: true,
      message: "Permission assigned successfully",
      permissions: updatedRole.default_permissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
