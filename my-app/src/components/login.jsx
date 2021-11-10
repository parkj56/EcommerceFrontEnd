import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import useForm from '../../components/useForm';
import useLogin from '../../components/useLogin';
import './login.css';

const Login = () => {
    const history = useHistory();
    const send = useLogin();
    
    const { formValues, handleChange, handleSubmit } = useForm(() => login(formValues, send, history));

    return (
        <div class='body'>
            <form onSubmit={handleSubmit} >
                <div class="mb-3">
                    <label for="usernameInput" class="form-label">Username</label>
                    <input type="username" name="username" value={formValues.username} onChange={handleChange} class="form-control" id="usernameInput" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                </div>
                <button class="login-button" type="submit" >Submit</button>
                <p>Not registered? Sign up <Link to="/register">here.</Link></p>
            </form>
        </div>
        )
}

export default Login;

function login(values, send, history) {
        send(values);
        history.push("/");
}

