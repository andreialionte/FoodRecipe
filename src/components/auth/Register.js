import React, { useState } from "react";
import { auth} from "./firebase";
import "./FormStyles.css";
import { createUserWithEmailAndPassword,updateProfile, signOut } from "firebase/auth"; 

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

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

  const handleGuest = async(event) =>{
    event.preventDefault()
    navigate("/")

     signOut(auth)
    }   


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password === password2) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
       await updateProfile(user, {
          displayName: name,
        }); // Use the updateProfile function with the user object
        console.log(user);
      }
    } catch (error) {
      setError(error.message);
    }
    if (password !== password2) {
      setError("Passwords do not match");
      // stop the createuserwithemailandpassword function from running
      return;
    }
    if (email === "" || password === "" || password2 === "" || name === "") {
      setError("Complete all fields");
      return;
    }
    if (
      email.includes("@") !== "" && password !== "" && password2 !== "" && password === password2){
      setError("Register successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    if (password.length < 6 || password2.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        {/* <label id="email">Email</label> */}
        <input
          type="email"
          placeholder="Email"
          htmlFor="email"
          value={email}
          onChange={handleEmail}
        />
        {/* <label id="password">Password</label> */}
        <input
          type="text"
          placeholder="Name"
          htmlFor="name"
          value={name}
          onChange={handleName}
        />
        {/* <label id="password">Password</label> */}
        <input
          type="password"
          placeholder="Password"
          htmlFor="password"
          value={password}
          onChange={handlePassword}
        />
        {/* <label id="password2">Confirm Password</label> */}
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
        <button type="button" onClick={handleGuest}> Login as a Guest </button>
        </div>
        <p>You already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
