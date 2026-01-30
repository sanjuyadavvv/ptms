import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";






const EditPermissionByRole = () => {
  const { id } = useParams();

  console.log(id)
  const { user } = useSelector((state) => state.auth);

  const [allPerms, setAllPerms] = useState([]);
  const [assignedPerms, setAssignedPerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionPerm, setActionPerm] = useState(null);



  // const[rolePerms,setRolePerms]=useState([])

  const token = localStorage.getItem("token");

  /* ---------------- FETCH ASSIGNED PERMISSIONS ---------------- */
  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/rolepermission/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.user.default_permissions)
        setAssignedPerms(res.data.user.default_permissions|| []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPermissions();
  }, [id, token]);

  /* ---------------- FETCH ALL PERMISSIONS ---------------- */
  useEffect(() => {
    const fetchAllPermissions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/allperms",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAllPerms(res.data.availablePerm || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPermissions();
  }, [token]);

  /* ---------------- FILTER AVAILABLE PERMISSIONS ---------------- */
  const availablePerms = useMemo(() => {
    const assignedIds = new Set(assignedPerms.map((p) => p._id));
    return allPerms.filter((p) => !assignedIds.has(p._id));
  }, [allPerms, assignedPerms]);

  /* ---------------- ADD PERMISSION ---------------- */
const addPermission = async (permissionName) => {
  setLoading(true);
  setActionPerm(permissionName);

  try {
    await axios.post(
      `http://localhost:3000/api/auth/addrolepermissions/${id}`,
      { permissionName }, // ✅ correct
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const addedPerm = allPerms.find((p) => p.name === permissionName);
    if (addedPerm) {
      setAssignedPerms((prev) => [...prev, addedPerm]);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setActionPerm(null);
    setLoading(false);
  }
};






  /* ---------------- REMOVE PERMISSION ---------------- */
  const removePermission = async (permissionId) => {
    setLoading(true);
    setActionPerm(permissionId);

    try {

      console.log(`permission id is ${permissionId}`)
      const res=  await axios.delete(
        `http://localhost:3000/api/auth/removerolepermission/${id}/${permissionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(res)

      setAssignedPerms((prev) =>
        prev.filter((p) => p._id !== permissionId)
      );
    } catch (err) {
      console.log(err);
    }

    setActionPerm(null);
    setLoading(false);
  };










 
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Edit Permissions —{" "}
        <span className="text-indigo-600">{user?.name}</span>
      </h1>

      {loading && (
        <p className="text-sm text-gray-400 mb-4 animate-pulse">
          Updating permissions...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---------------- ASSIGNED PERMISSIONS ---------------- */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">
            Assigned Permissions
          </h2>

          {assignedPerms.length === 0 ? (
            <p className="text-gray-500">No permissions assigned</p>
          ) : (
            <ul className="space-y-3">
              {assignedPerms.map((perm) => (
                <li
                  key={perm._id}
                  className="flex justify-between items-center border border-red-200 bg-red-50 rounded-lg px-4 py-2"
                >
                  <span className="font-medium text-gray-800">
                    {perm.name}
                  </span>
                  <button
                    disabled={loading && actionPerm === perm.name}
                    onClick={() => {   console.log(`permission id is ${perm._id}`);removePermission(perm._id)}}
                    className="text-sm bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ---------------- AVAILABLE PERMISSIONS ---------------- */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">
            Available Permissions
          </h2>

          {availablePerms.length === 0 ? (
            <p className="text-gray-500">
              All permissions already assigned
            </p>
          ) : (
            <ul className="space-y-3">
              {availablePerms.map((perm) => (
                <li
                  key={perm._id}
                  className="flex justify-between items-center border border-indigo-200 bg-indigo-50 rounded-lg px-4 py-2"
                >
                  <span className="font-medium text-gray-800">
                    {perm.name}
                  </span>
                  <button
                    disabled={loading && actionPerm === perm.name}
                    onClick={() => addPermission(perm.name)}
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPermissionByRole
