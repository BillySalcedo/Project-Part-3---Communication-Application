import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; // import NavLink and Outlet from react-router-dom
import "../css/Nav.css";

const Nav = () => {
  // Declare a state variable called activeLink and a function to update it called setActiveLink
  const [activeLink, setActiveLink] = useState("");

  // Define a function that updates the activeLink state variable with the name of the link that was clicked
  const handleOnClick = (link) => {
    setActiveLink(link);
  };

  // Render the navigation bar and links using the NavLink component from react-router-dom
  return (
    <>
      <nav>
        <NavLink
          exact="true" // Only match when the path is exactly "/GroupChat"
          to="/GroupChat" // The destination URL to link to
          activeclassname="active" // Add a class name to the active link
          onClick={() => handleOnClick("group-chat")} // Call the `handleOnClick` function with the string "group-chat" as an argument
          className={`nav-btn ${activeLink === "group-chat" ? "active" : ""}`}
        // Use a template literal to set the `className` prop dynamically based on whether this link is currently active or not. 
        // If it is active, add the "active" class; otherwise, add an empty string.
        >
          Group Chat
        </NavLink>

        <NavLink
          exact="true"
          to="/ManageUsers"
          activeclassname="active"
          onClick={() => handleOnClick("manage-users")}
          className={`nav-btn ${activeLink === "manage-users" ? "active" : ""
            }`}
        >
          Manage Users
        </NavLink>
        <NavLink
          exact="true"
          to="/ManageDocuments"
          activeclassname="active"
          onClick={() => handleOnClick("manage-documents")}
          className={`nav-btn ${activeLink === "manage-documents" ? "active" : ""
            }`}
        >
          Manage Documents
        </NavLink>
        <NavLink
          exact="true"
          to="/Logout"
          activeclassname="active"
          onClick={() => handleOnClick("logout")}
          className={`nav-btn ${activeLink === "logout" ? "active" : ""}`}
        >
          Logout
        </NavLink>
      </nav>
      <Outlet /> {/* Render the child routes using the Outlet component from react-router-dom */}
    </>
  );
};

export default Nav;
