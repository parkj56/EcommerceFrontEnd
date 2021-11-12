import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './register.css'

import useForm from './useLogin';
import useLogin from './userForm';
import NewUser from './newUser';

const Register = () => {
    const history = useHistory();
    const [error, setError] = useState("");
    const { register, userInfo } = NewUser();
    const send = useLogin();
    const sendRegistration = () => {
        console.log(formValues);
        register(formValues);
        history.push("/login");
    }
    const { formValues, handleChange, handleSubmit } = useForm(sendRegistration);

    useEffect(() => {
        if (userInfo.userName) {
            const loginInfo = {
                username: userInfo.userName,
                password: formValues.password
            };
            send(loginInfo, setError);
        }    
    }, [userInfo])

    return (
        <div class='body'>
        <form onSubmit={handleSubmit} >
            <h1>{error}</h1>
            <div class="mb-3">
                <label for="firstnameInput" class="form-label">First Name</label>
                <input type="text" name="firstname" value={formValues.firstname} onChange={handleChange} class="form-control" id="firstnameInput" />
            </div>
            <div class="mb-3">
                <label for="lastnameInput" class="form-label">Last Name</label>
                <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} class="form-control" id="lastnameInput" />
            </div>
            <div class="mb-3">
                <label for="usernameInput" class="form-label">Username</label>
                <input type="text" name="username" value={formValues.username} onChange={handleChange} class="form-control" id="usernameInput" />
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="password" name="password" value={formValues.password} onChange={handleChange} class="form-control" id="passwordInput" />
            </div>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email address</label>
                <input type="email" name="email" value={formValues.email} onChange={handleChange} class="form-control" id="emailInput" />
            </div>
            <div class="mb-3">
                <label for="phoneInput" class="form-label">Phone</label>
                <input type="phone" name="phonenumber" value={formValues.phonenumber} onChange={handleChange} class="form-control" id="phoneInput" />
            </div>
            <button type="submit" class="login-button">Submit</button>
        </form>
        </div>
    )
}

export default Register;
