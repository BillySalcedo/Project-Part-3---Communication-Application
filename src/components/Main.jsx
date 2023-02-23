import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Nav from "./Nav";
import Login from "./Login";
import Welcome from "./Welcome";
import Logout from "./Logout";
import Register from "./Register";
import ManageDocuments from "./ManageDocuments";
import ManageUsers from "./ManageUsers";
import GroupChat from "./GroupChat";
import LoginSuccessful from "./LoginSuccessful";
import RegisterSuccessful from "./RegisterSuccess";
import EditUser from "./EditUser"

export default function Main() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Navigation bar */}
        <Route element={<Nav />}>
          {/* Sub-routes that render under the navigation bar */}
          <Route path="ManageDocuments" element={<ManageDocuments />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="GroupChat" element={<GroupChat />} />
          <Route path="LoginSuccessful" element={<LoginSuccessful />} />
          <Route path="EditUser" element={<EditUser />} />
        </Route>

        {/* Routes that don't have the navigation bar */}
        <Route path="Login" element={<Login />} />
        <Route path="RegisterSuccess" element={<RegisterSuccessful />} />
        <Route path="Welcome" element={<Welcome />} />
        <Route path="Register" element={<Register />} />
        <Route path="Logout" element={<Logout />} />

        {/* Default route */}
        <Route path='/' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
