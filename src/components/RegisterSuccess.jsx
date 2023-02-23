import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterSuccess.css';

function RegisterSuccess() {
  // Get the navigation object from useNavigate hook
  const navigate = useNavigate();

  // Navigate to the welcome page when the button is clicked
  function handleClick() {
    navigate('/Welcome');
  }

  return (
    // Render the Registration Success page with a header, paragraph, and button
    <div>
      <h1 className='header-register-success'>Registration Successful</h1>
      <p className='para-register-success'>Thank you for your registration</p>
      <button className='button-register-success' onClick={handleClick}>Click to return to home page</button>
    </div>
  );
}

export default RegisterSuccess;
