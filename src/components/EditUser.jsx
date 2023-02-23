import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EditUser.css';


function EditUser() {
  const navigate = useNavigate();

  // Use useState to manage the state of the form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Redirect to the welcome page if the user is not logged in
    if (!localStorage.getItem('loggedIn')) {
      navigate('/welcome');
      return;
    }

    // Parse the user ID from the URL and retrieve the corresponding user information from local storage
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('=') + 1);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const targetId = parseInt(id);
    const user = users.find(user => user.id === targetId);

    // If the user is found, update the state of the form inputs with their information
    if (user) {
      setFullName(user.fullname);
      setEmail(user.email);
    }
  }, [navigate]);

  const handleSave = (event) => {
    event.preventDefault();

    // Check if full name or email is empty or only contains whitespace characters
    if (fullName.trim() === '' || email.trim() === '') {
      alert('Full name and email address cannot be blank.');
      return;
    }

    // Validate the email address using a regular expression pattern
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
      alert("Invalid email address.");
      return;
    }

    // Check if the full name or email already exists in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const targetId = parseInt(window.location.href.substring(window.location.href.lastIndexOf('=') + 1));
    const isExisting = users.some(user => user.id !== targetId && (user.fullname === fullName || user.email === email));
    if (isExisting) {
      alert('Full name and/or email already exists.');
      return;
    }

    // Update the user information with the new full name and email
    const updatedUsers = users.map(user => {
      if (user.id === targetId) {
        return {
          ...user,
          fullname: fullName,
          email: email,
        };
      }
      return user;
    });

    // Save the updated user information to local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update the messages whose userId matches the id of the edited user
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = messages.map(message => {
      if (message.userId === targetId) {
        return {
          ...message,
          username: fullName,
        };
      }
      return message;
    });

    // Save the updated messages back to the localStorage
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Show a success message and redirect to the ManageUsers page
    alert('User information updated successfully.');
    navigate(`/ManageUsers?id=${targetId}`);
  };

  return (
    <div>
      <h1 className='header-edit-user'> Edit User Information </h1>
      <form className="form-user" onSubmit={handleSave}>
        <label className="full-name-user" htmlFor="name-input">Full Name</label>
        <input className="input-user" type="text" id="name-input" name="name" value={fullName} onChange={event => setFullName(event.target.value)} /><br /><br /><br />
        <label className="full-name-user1" htmlFor="email-input">Email</label>
        <input className="input-user" type="text" id="email-input" name="email" value={email} onChange={event => setEmail(event.target.value)} /><br /><br />
        <input className="save-button" type="submit" value="Save" id="save-button" />
      </form>
    </div>
  );
}
export default EditUser;