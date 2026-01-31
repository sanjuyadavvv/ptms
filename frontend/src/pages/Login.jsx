// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { googleLogin } from "../redux/auth/authThunk.js";
// import toast from "react-hot-toast";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const { loading, error } = useSelector((state) => state.auth);

//   const adminPassword = "SECRET";

//   const handlePassword = () => {
//     if (password === adminPassword) {
//       navigate("/admin");
//     } else {
//       toast.error("Wrong password!");
//     }
//   };

//   const handleGoogleLogin = (res) => {
//     if (!role) {
//       toast.error("Choose a role first");
//       return;
//     }

//     if (role === "ADMIN") {
//       toast("Enter password to continue as ADMIN");
//       return;
//     }

//     dispatch(
//       googleLogin({
//         token: res.credential,
//         desiredRole: role,
//       })
//     )
//       .unwrap()
//       .then((data) => {
//         const userRole = data.user.role;

//         if (userRole === "MANAGER") navigate("/manager");
//         else navigate("/emp");
//       })
//       .catch(() => {});
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-900 to-purple-900">
//       <div className="bg-gray-900 p-12 rounded-2xl shadow-2xl w-full max-w-lg text-center flex flex-col items-center">
//         {/* Logo / Title */}
//         <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">PTMS</h1>
//         <p className="text-gray-300 text-lg mb-8">Project Task Management System</p>

//         {/* Role Selection */}
//         <div className="flex justify-center gap-4 mb-6 w-full">
//           {["ADMIN", "MANAGER", "EMPLOYEE"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRole(r)}
//               className={`flex-1 px-4 py-3 rounded-lg font-semibold transition 
//                 text-lg
//                 ${
//                   role === r
//                     ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         <p className="text-gray-300 mb-6">
//           Selected Role:{" "}
//           <span className="font-semibold text-white">{role || "None"}</span>
//         </p>

//         {/* Admin Password */}
//         {role === "ADMIN" && (
//           <div className="mb-6 w-full">
//             <input
//               type="password"
//               placeholder="Enter Admin Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
//             />
//             <button
//               onClick={handlePassword}
//               className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold text-white text-lg transition"
//             >
//               Submit
//             </button>
//           </div>
//         )}

//         {/* Google Login */}
//         <div className="my-4 w-full flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleLogin}
//             onError={() => toast.error("Login Failed")}
//           />
//         </div>

//         {/* Loading & Error */}
//         {loading && <p className="text-yellow-400 mt-3">Logging in...</p>}
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>

//       {/* Footer / Decorative Text */}
//       <p className="absolute bottom-5 text-gray-400 text-sm">
//         © 2026 PTMS. All rights reserved.
//       </p>
//     </div>
//   );
// };

// export default Login;








import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../redux/auth/authThunk.js";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("");           // selected role
  const [password, setPassword] = useState("");   // admin password
  const [roles, setRoles] = useState([]);         // fetched roles

  const adminPassword = "SECRET"; // admin secret

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/getrole");
        setRoles(res.data.roles || []); // expecting { roles: [...] }
      } catch (err) {
        toast.error("Failed to fetch roles,check your internet connection");
      }
    };
    fetchRoles();
  }, []);

  // Handle Admin password submit
  // const handleAdminPassword = () => {
  //   if (password === adminPassword) {
  //     navigate("/admin");
  //   } else {
  //     toast.error("Wrong password!");
  //   }
  // };

  // Google Login
  const handleGoogleLogin = (res) => {
    if (!role) {
      toast.error("Select a role first");
      return;
    }

    // if (role === "ADMIN") {
    //   toast("Enter password to continue as ADMIN");
    //   return;
    // }



    dispatch(
      googleLogin({
        token: res.credential,
        desiredRole: role,
      })
  
    )
      .unwrap()
      .then((data) => {
        console.log(data)
        const userRole = data.user.role.name;
        console.log('checking userRole in frontend',userRole)
        if (userRole === "MANAGER") navigate("/manager");
        else if(userRole==="ADMIN") navigate("/admin")
        // else navigate("/emp");
      else navigate('/default')
      })
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-900 via-blue-900 to-purple-900">
      <div className="bg-gray-900 p-12 rounded-2xl shadow-2xl w-full max-w-md text-center flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">PTMS</h1>
        <p className="text-gray-300 text-lg mb-8">Project Task Management System</p>

        {/* Role Selection Dropdown */}
        <div className="mb-6 w-full">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Role--</option>
            {roles.map((r) => (
              <option key={r._id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Admin Password */}
        {/* {role === "ADMIN" && (
          <div className="mb-6 w-full">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <button
              onClick={handleAdminPassword}
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold text-white text-lg transition"
            >
              Submit
            </button>
          </div>
        )} */}

        {/* Google Login (for non-admin) */}
        {role &&  (
          <div className="my-4 w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Login Failed")}
            />
          </div>
        )}
      </div>

      <p className="absolute bottom-5 text-gray-400 text-sm">
        © 2026 PTMS. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
