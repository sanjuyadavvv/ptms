import Permission from "../models/Permission.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import mongoose from "mongoose";


export const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Permission name required" });
    }

    const alreadyExists = await Permission.findOne({ name });
    if (alreadyExists) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    const permission = await Permission.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      permission,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating permission" });
  }
};



export const addPermissionToUser = async (req, res) => {
  try {
    
    const {id, permissionname } = req.params;

    // 1️⃣ find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ find permission
    const permission = await Permission.findOne({ name: permissionname });
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // 3️⃣ prevent duplicate permission
    if (user.permissions.includes(permission._id)) {
      return res.status(400).json({
        message: "Permission already assigned to user",
      });
    }

    // 4️⃣ assign permission
    user.permissions.push(permission._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Permission assigned to user successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};






export const removePermissionFromUser = async (req, res) => {
  try {
    const { id,permissionname } = req.params;

console.log('remoe permissions',id,permissionname)
    if (!permissionname) {
      return res.status(400).json({
        success: false,
        message: "Permission name is required",
      });
    }

    // 1️⃣ Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(user)
    // 2️⃣ Find permission
    const permission = await Permission.findOne({ name: permissionname });
    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found",
      });
    }

    // 3️⃣ Check assignment
    if (!user.permissions.includes(permission._id)) {
      return res.status(400).json({
        success: false,
        message: "Permission not assigned to user",
      });
    }

    // 4️⃣ Remove permission
    user.permissions.pull(permission._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Permission removed successfully",
      permissions: user.permissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};





export const addMultiplePermissionsToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body; // array of names

console.log(permissions)
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({
        message: "Permissions array required",
      });
    }

    // 1️⃣ find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ find permission docs by names
    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });

    if (permissionDocs.length === 0) {
      return res.status(404).json({
        message: "No valid permissions found",
      });
    }

    // 3️⃣ remove duplicates (already assigned)
    const newPermissionIds = permissionDocs
      .map((p) => p._id)
      .filter(
        (pid) =>
          !user.permissions.some(
            (up) => up.toString() === pid.toString()
          )
      );

    // 4️⃣ push new permissions
    user.permissions.push(...newPermissionIds);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Permissions assigned successfully",
      addedPermissions: permissionDocs.map((p) => p.name),
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getALLPermissions=async(req,res)=>{
  try {
  const availablePerm=  await Permission.find();
  if(!availablePerm){
    return res.status(500).json({message:"no permissisn yet "})
  }
  return res.status(200).json({message:'permissions fetched',availablePerm})
  } catch (error) {
    console.log(error)
  }


}




// get permission by role

export const getRolePermissions=async(req,res)=>{
 try {

const {id}=req.params

console.log('role id is ',id)
  const user = await Role.findById(id).populate("default_permissions","name")
  if(!user){
    return res.status(401).json({message:"no user"})
  }

  console.log(user);
  return res.status(200).json({message:'roles found',user})
} catch (error) {
  console.error(error);
}

}














export const removeRolePermission = async (req, res) => {
try {
    const { id,permissionId} = req.params;


    console.log(permissionId)

    // find role
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // remove permissionId from array
   role.default_permissions = role.default_permissions.filter(
      (perm) => perm._id.toString() !== permissionId
    );

    console.log(role.default_permissions)

    await role.save();

    // populate for response
    const updatedRole = await Role.findById(id).populate(
      "default_permissions",
      "name"
    );
    console.log(updatedRole)

    return res.status(200).json({
      success: true,
      message: "Permission removed successfully",
      permissions: updatedRole.default_permissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};