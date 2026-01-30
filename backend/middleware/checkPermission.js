import User from "../models/User.js";



export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
        .populate({
          path: "role",
          populate: { path: "default_permissions" }
        })
        .populate("permissions");



//  admin has all the permissions 

        if (req.user.role.name === "ADMIN") return next();


      const rolePerms = user.role.default_permissions.map(p => p.name);
      const userPerms = user.permissions.map(p => p.name);

      const allPermissions = [...new Set([...rolePerms, ...userPerms])];

      if (!allPermissions.includes(permissionName)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: "Authorization error" });
    }
  };
};
