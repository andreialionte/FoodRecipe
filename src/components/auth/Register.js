import React, { useState } from "react";
import { auth } from "./firebase";
import "./FormStyles.css";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(""); 

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleGuest = async (event) => {
    event.preventDefault();
    navigate("/recipeFinder");
    signOut(auth);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password === password2) {
        // Check if the email is already in use
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.length === 0) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name,
          });
          console.log(user);
          setError("Register successful!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setError("Email is already in use");
        }
      }
    } catch (error) {
      setError(error.message);
    }

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    if (email === "" || password === "" || password2 === "" || name === "") {
      setError("Complete all fields");
      return;
    }

    if (password.length < 6 || password2.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (error.message === "Firebase: Error (auth/invalid-email).") {
      setError("Invalid email address");
    }

    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Email is already in use");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <input
          type="email"
          placeholder="Email"
          htmlFor="email"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="text"
          placeholder="Name"
          htmlFor="name"
          value={name}
          onChange={handleName}
        />
        <input
          type="password"
          placeholder="Password"
          htmlFor="password"
          value={password}
          onChange={handlePassword}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          htmlFor="password2"
          value={password2}
          onChange={handlePassword2}
        />
        {error && <p>{error}</p>}
        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleGuest}>
            Login as a Guest
          </button>
        </div>
        <p>
          You already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
