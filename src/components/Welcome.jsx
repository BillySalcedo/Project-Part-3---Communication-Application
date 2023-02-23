import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';

function Welcome() {
  // Get the navigate function from the router
  const navigate = useNavigate();

  // Navigate to the login page when the Login button is clicked
  const handleLogin = () => {
    navigate('/Login');
  };

  // Navigate to the registration page when the Register button is clicked
  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="welcome-div">
      <h1 className="welcome-header">Welcome to Users Module</h1>
      <p className="welcome-paragraph"> Existing Users</p>
      <button className="welcome-login" type="button" onClick={handleLogin}>Login</button>
      <p className="welcome-paragraph"> New Users</p>
      <button className="welcome-register" type="button" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Welcome;
