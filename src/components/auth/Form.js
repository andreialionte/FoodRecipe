import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import {auth} from "./firebase";
import "./FormStyles.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Form = () => {
    return(
        <div>
            <Register />
            <Login />
        </div>
    )
}

export default Form;