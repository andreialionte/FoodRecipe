import React, { useState } from "react";
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleGuest = async (event) => {
    event.preventDefault();
    navigate("/recipeFinder");
    signOut(auth);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const authUser = userCredential.user;
      const user = authUser;
      if (user) {
        navigate("/recipeFinder");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            htmlFor="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Password"
            htmlFor="password"
            value={password}
            onChange={handlePassword}
          />
          {error !== null && <div className="error">{error}</div>}
          <div className="buttons">
            <button type="submit">Submit</button>
            <button onClick={handleGuest}>Login as a guest</button>
          </div>
          <p styles={{ color: "black" }}>
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
