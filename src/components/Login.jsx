import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function LoginPage() {
  // Declare state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();
  
  // Update the email state when the email input changes
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // Update the password state when the password input changes
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // Handle the form submission
  function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check if either the email or password input fields are blank or contain only whitespace characters
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter your email and password.');
      return;
    }
    
    // If the entered email is not in a valid format, alert the user and stop the submission
    if (!validateEmail(email)) {
      alert("Invalid Email Address");
      return;
    }
 
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Get the list of users from local storage or an empty array if it's not set yet
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the entered email and password match a user's email and password
    const matchedUser = users.find(user => user.email === email && user.password === password);

    // If the entered email and password are valid, set the logged in user ID in local storage and redirect to login-successful.html
    if (matchedUser) {
      localStorage.setItem("loggedIn", matchedUser.id);
      navigate(`/LoginSuccessful?id=${matchedUser.id}`);
    } else { // If the entered email and password are not valid, alert the user and stop the submission
      alert("Wrong Email or Password");
      return;
    }
  }

  // Validate the email format using a regular expression pattern
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  // Render the login form
  return (
    <div className="login">
      <h1 className='login-header'>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className='email-login-div'>
          <label className='email-label'> Email </label>
          <input
            className="input-login"
            type="text"
            id="email"
            placeholder="Enter Your Email"
            size="20"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className='password-login-div'>
          <label className='password-label'> Password </label>
          <input
            className="input-password"
            type="password"
            id="password"
            placeholder="Password"
            size="20"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <input type="submit" value="Login" className="button-login" />
      </form>
    </div>
  );
}

export default LoginPage;
