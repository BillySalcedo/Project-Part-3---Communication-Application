import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginSuccessful.css";

function LoginSuccessful() {
  const [welcomeEmail, setWelcomeEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/Welcome");
      return;
    }

    // Get user email from local storage
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the given id
    const user = users.find((user) => user.id.toString() === id.toString());
    if (user) {
      setWelcomeEmail(user.email);
    }
  }, [navigate]);

  return (
    <>
      {/* Heading */}
      <h1 className="header-login-success">Login Successful</h1>

      {/* Welcome message */}
      <p className="paragraph">
        <b>Welcome!</b> {welcomeEmail}
      </p>
    </>
  );
}

export default LoginSuccessful;
