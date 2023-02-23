import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';

function Logout() {
  const navigate = useNavigate();

  // Remove the 'loggedIn' item from localStorage on mount
  useEffect(() => {
    localStorage.removeItem('loggedIn');
  }, []);

  // Navigate to the login page
  const handleLogin = () => {
    navigate('/Login');
  };

  // Navigate to the register page
  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="logout-div">
      {/* Heading */}
      <h2 className="logout-header">Welcome to the Users Module</h2>

      {/* Login button */}
      <p className="logout-paragraph">Existing Users</p>
      <button className="logout-login" type="button" onClick={handleLogin}>
        Login
      </button>

      {/* Register button */}
      <p className="logout-paragraph">New Users</p>
      <button className="logout-register" type="button" onClick={handleRegister}>
        Register
      </button>

      {/* Logout message */}
      <p className="logout-paragraph">You have been logged out</p>
    </div>
  );
}

export default Logout;
