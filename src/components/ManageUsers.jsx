import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import myImage from '../img/img.png';
import { useNavigate } from "react-router-dom";
import "../css/ManageUsers.css";

function UserListPage() {
  // State to store the list of users, and whether to show the delete confirmation modal
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // State to store the ID of the user to be deleted
  const [userToDelete, setUserToDelete] = useState(null);
  // Access the React Router navigate function
  const navigate = useNavigate();

  // Check if the user is logged in
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || [];
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      // If not logged in, redirect to the welcome page
      navigate("/Welcome");
    }
  }, [navigate]);

  // Get the list of users from local storage and update state
  useEffect(() => {
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(usersList);
  }, []);

  // Function to handle the delete button
  function handleDelete(id) {
    // Prevent deleting the currently logged in user
    if (id === Number(loggedIn)) {
      return;
    }
    setUserToDelete(id);
    setShowDeleteModal(true);
  }
  // Function to confirm the user deletion
  function confirmDelete(userId) {
    const updatedUsers = users.filter((user) => user.id !== userToDelete);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowDeleteModal(false);

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = messages.filter(message => {
      if (message.userId === userToDelete) {
        return false;
      }
      return true;
    });
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  }

  // Function to handle the edit button
  function handleEdit(id) {
    navigate(`/EditUser?userId=${id}`);
  }

  return (
    <>
      {/* Page header */}
      <h1 className="header-manage-users"> Users </h1>

      {/* User list table */}
      <table className="table-users">
        <thead>
          <tr>
            <td className="td-container1">Name </td>
            <td className="td-container2">User Email ID </td>
            <td className="td-container2"></td>
          </tr>
        </thead>
        <tbody>
          {/* Map over the users and create a table row for each one */}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="td-container3">{user.fullname}</td>
              <td className="td-container4">{user.email}</td>
              <td className="td-container4">
                {/* Edit button */}
                <button
                  className="edit"
                  onClick={() => handleEdit(user.id)}>Edit&nbsp;
                </button>

                {/* Delete button */}
                {loggedIn === user.id ? null : (
                  <button className="delete" onClick={() => handleDelete(user.id)}>|&nbsp;Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete}>
          <div>
            <h1>Confirm User Deletion</h1>
            <img src={myImage} alt="Question Mark" />
            <p className="question1">Are you sure?</p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default UserListPage;
