import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8088/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load user data. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      setError(null);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Adventure Time</h1>
        <p>Join the ultimate adventure in this immersive RPG world.</p>
      </header>

      {loggedInUser ? (
        <div>
          <h2>Welcome back, {loggedInUser.fullname}!</h2>
          <p>You have successfully logged in.</p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
          <div>
            <p>Don't have an account? <Link to="/signup">Sign-up here</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
