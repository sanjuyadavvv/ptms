import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Users from "./admin/User";
import DashBoard from "./admin/DashBoard";
import AllUser from "./admin/AllUser";
import AdminLayout from "./pages/AdminLayout";
import CreateProject from "./admin/CreateProject";
import ManagerDashboard from "./manager/ManagerDashboard";
import CreateTask from "./manager/CreateTask";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
// import Home from "./pages/Home";
import EmpDashboard from "./Employee/EmpDashboard";
import CreateTaskModal from "./manager/CreateTaskModal";
import TaskDetails from "./manager/TaskDetail";
import CreateRole from "./admin/CreateRole";
import GetAllRoles from "./admin/GetAllRoles";
import GetAllProject from "./admin/GetAllProject";
import UpdateProject from "./admin/UpdateProject";
import ManagerProject from "./manager/ManagerProject";

import UpdateProjectManager from "./manager/UpdateProjectManager";
import ViewProject from "./Employee/ViewProject";
import EditPermissions from "./admin/EditPermissions";
import EditPermissionByRole from "./admin/EditPermissionByRole";
import CreatePermission from "./admin/CreatePermission";
import AllTasks from "./manager/AllTasks";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/admin' element={<DashBoard/>}/> */}
        {/* <Route path='/admin'  element={<AdminLayout/>}/>
      <Route path='createuser' element={<Users/>}/>
      <Route path='getusers' element={<AllUser/>}/> */}


     <Route path='/' element={<Login/>}></Route>



        <Route path="/admin" element={<AdminLayout />}>
          <Route path="createuser" element={<Users />}></Route>
          <Route path="getusers" element={<AllUser />}>
           
          </Route>
          <Route path='create-project' element={<CreateProject/>}></Route>
          <Route path='createrole' element={<CreateRole/>}></Route>
          <Route path='getrole' element={<GetAllRoles/>}>
          </Route>
          <Route path='updateProject' element={<UpdateProject/>}></Route>
          <Route path='getallprojects' element={<GetAllProject/>}></Route>
          <Route path='createpermission' element={<CreatePermission/>}></Route>
          
        </Route>





  <Route path="/manager" element={<ManagerDashboard/>}>
  <Route path="update-project" element={<UpdateProject />} />
</Route>

<Route path='createproject' element={<ManagerProject/>} ></Route>
<Route path='updateproject/:id' element={<UpdateProjectManager/>}></Route>

<Route path='/create/:id' element={<CreateTaskModal/>}></Route>

  <Route path='/viewproject/:id' element={<ViewProject/>}></Route>

        <Route path='/emp' element={<EmpDashboard/>}></Route>
       

  <Route path='/editpermission/:id' element={<EditPermissions/>}></Route>
  <Route path='/editrolepermission/:id' element={<EditPermissionByRole/>}></Route>
  <Route path='/alltasks' element={<AllTasks/>}></Route>
      
      <Route path='/task/:id' element={<TaskDetails/>}></Route>
      </Routes>

         <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
