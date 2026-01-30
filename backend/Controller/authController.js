import User from "../models/User.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
export const createUserByAdmin = async (req, res) => {
  const { name, email, role, is_active, permissions = [] } = req.body;
  try {
    console.log(email);
    const exisitngUser = await User.findOne({ email });
    if (exisitngUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });

    // 2️⃣ Create user with role ObjectId
    const user = await User.create({
      name,
      email,
      role: roleDoc._id,
      is_active,
      permissions: permissionDocs.map((p) => p._id),
    });

    res.status(201).json({
      message: "user created successfully ",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating user " });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // remove password from result
    // console.log(users);

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("error finding users ", error);
    res.status(500).json({ message: "Server error" });
  }
};

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token, desiredRole } = req.body;
    // console.log("token is ", token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // console.log("ticket dekhte hn", ticket);

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email }).populate("role", "name");

    // console.log(
    //   `user role name is ${user.role.name} and desired role is ${desiredRole}`,
    // );

    if (user.role.name !== desiredRole) {
      return res.status(403).json({
        message: `You cannot log in as ${desiredRole}. Your role is ${user.role.name}.`,
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log("error logging with google", err);
    res.status(401).json({ message: "error in authorization", error: err });
  }
};

// fetch employes
export const fetchEmployees = async (req, res) => {
  try {
    // 1️⃣ Pehle Role ka ObjectId fetch karo
    const employeeRole = await Role.findOne({ name: "EMPLOYEE" });
    if (!employeeRole) {
      return res
        .status(404)
        .json({ success: false, message: "EMPLOYEE role not found" });
    }

    // 2️⃣ Users fetch karo jinka role us ObjectId ke barabar ho
    const employees = await User.find({ role: employeeRole._id }).select(
      "name email _id",
    ); // select only required fields

    // 3️⃣ Return response
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// see permissions of a particular user using it;s id

export const getUserPermissions = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const user = await User.findById(id)
      .populate({
        path: "role",
        populate: { path: "default_permissions" }, // this is an array of permission objects
      })
      .populate("permissions", "name"); // user's extra permissions

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const rolePermissions = user.role?.default_permissions || [];
    const userPermissions = user.permissions || [];

    // Merge & remove duplicates based on _id
    const merged = [...rolePermissions, ...userPermissions];

    const uniquePermissionsMap = new Map();
    merged.forEach((p) => {
      if (!uniquePermissionsMap.has(p._id.toString())) {
        uniquePermissionsMap.set(p._id.toString(), {
          _id: p._id,
          name: p.name,
        });
      }
    });

    const uniquePermissions = Array.from(uniquePermissionsMap.values());

    res.status(200).json({
      success: true,
      permissions: uniquePermissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchALLUser = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role", "name")
      .select("name email role");

    const employees = users.filter((u) => u.role?.name !== "ADMIN");

    res.status(200).json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(401).json({ message: "user does not exist" });
    }
    return res.status(200).json({ message: "user deleted successfully " });
  } catch (error) {
    console.log(error);
  }
};
