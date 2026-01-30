import { Link, Outlet } from "react-router-dom";

import React from "react";




const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>

        <Link to='/admin/createuser' className="block p-2 rounded hover:bg-blue-700">
          Create User
        </Link>

        <Link to='/admin/create-project' className="block p-2 rounded hover:bg-blue-700">
          Create Project
        </Link>

        <Link to='/admin/getallprojects' className="block p-2 rounded hover:bg-blue-700">
          Get All  Project
        </Link>

        <Link to='/admin/getusers'  className="block p-2 rounded hover:bg-blue-700">
          Get All Users
        </Link>


         <Link to='/admin/createrole'  className="block p-2 rounded hover:bg-blue-700">
          Create New Role 
        </Link>

 <Link to='/admin/getrole'  className="block p-2 rounded hover:bg-blue-700">
          VIEW ALL ROLES 
        </Link>


<Link to='/admin/updateProject' className="block p-2 rounded hover:bg-blue-700">
Update Project</Link>

<Link to='/admin/createpermission' className="block p-2 rounded hover:bg-blue-700">Create Permission</Link>
<Link to='/alltasks' className="block p-2 rounded hover:bg-blue-700">View All Task</Link>

      </aside>




      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">



        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
