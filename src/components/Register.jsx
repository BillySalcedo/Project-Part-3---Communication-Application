import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

function Register() {
    // Define state variables to hold form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Get existing users from local storage or create an empty array
    const users = useRef(JSON.parse(localStorage.getItem("users")) || []);

    // Get the navigate function from the react-router-dom package
    const navigate = useNavigate();

    // Update the users in local storage whenever the users ref changes
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users.current));
    }, [users]);

    // Function to handle form submission
    function registerUser(e) {
        e.preventDefault(); // Prevent form submission from reloading the page

        // Validate form data
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email address.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Check if user already exists
        const existingUser = users.current.find(user => user.email === email || user.fullname === name);
        if (existingUser) {
            alert("Email and fullname already in use.");
            return;
        }

        // Check if email and password combination is correct for an existing user
        const existingUserPassword = users.current.find(user => user.email === email);
        if (existingUserPassword && existingUserPassword.password !== password) {
            alert("Incorrect password.");
            return;
        }

        // Add new user to users array and update local storage
        const newUser = {
            id: Date.now(),
            fullname: name,
            email: email,
            password: password
        };
        users.current.push(newUser);
        alert("User registered successfully.");
        localStorage.setItem("users", JSON.stringify(users.current));

        // Navigate to the success page
        navigate("/RegisterSuccess");
    }

    return (
        <div>
            <h1 className='register-header'>Register</h1>
            <form onSubmit={(e) => { registerUser(e); }}>
                <div className='register-div-fullname'>
                    <label htmlFor="fullname" className='label-register'>Full Name</label>
                    <input type="text" className='input-register' id="fullname" name="fullname" placeholder="Enter a Full Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='register-div-fullname'>
                    <label htmlFor="email" className='label-register'>Email</label>
                    <input type="email" className='input-register' id="email" name="email" placeholder="Enter an Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='register-div-fullname'>
                    <label htmlFor="password" className='label-register'>Password</label>
                    <input type="password" className='input-register' id="password" name="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='register-div-fullname'>
                    <label htmlFor="confirm" className='label-register'>Confirm Password</label>
                    <input type="password" className='input-register' id="confirm" name="confirm" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='register-div-button'>
                    <input type="submit" className='button-register' value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register;
