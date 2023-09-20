import React, {useState} from "react";
import {auth} from "../auth/firebase"
import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }


    const handleGuest = async(event) =>{
        event.preventDefault()
        navigate("/")

         signOut(auth)
        }   

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            console.log(user.email);
            console.log(user.uid);
            console.log(user.displayName);
        }catch(error){
            console.log(error.message);
            
        }
        navigate("/")
    }


    return (
        <div>
            <div className="register">
<form onSubmit={handleSubmit}>
    <h1>Login</h1>
    {/* <label id="email">Email</label> */}
    <input type="email" placeholder="Email" htmlFor="email" value={email} onChange={handleEmail}/>
    {/* <label id="password">Password</label> */}
    <input type="password" placeholder="Password" htmlFor="password" value={password} onChange={handlePassword}/>
    <div className="buttons">
    <button type="submit">Submit</button>
    <button onClick={handleGuest}>Login as a guest</button>
    </div>
    <p styles={{color: "black"}}>Don't have an account? <a href="/register">Register</a></p>
</form>
</div>
</div>

    )
}

export default Login; 

