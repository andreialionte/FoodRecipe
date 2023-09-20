import React, {useState} from "react";
import {auth} from "../auth/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showUser, setShowUser] = useState();


    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
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
    <h1>{showUser}</h1>
    <button type="submit">Submit</button>
</form>
</div>
</div>

    )
}

export default Login; 

