import React from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const backend = axios.create({
    baseURL: 'http://localhost:8080/auth'
});

export default function RegisterPage(){

    const navigate = useNavigate();

    //states do formulario
    const [name, setName] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    const [password, setPassword] = React.useState(null);
    //states de feedback
    const [loading, setLoading] = React.useState(false);
    const [isCreated, setIsCreated] = React.useState(null);
    const [error, setError] = React.useState(null);


    function register(event){
        event.preventDefault();
        setError(null);
        setLoading(true);

        backend.post("/signup", {
            name : name,
            email : email,
            password: password,
        })
            .then(res => {
                setIsCreated("User created successfully, go back to login page");
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    return (
        <div className="register-page-container">
            <div className="register-page-form-container">
                <form className="form" onSubmit={register}>
                    <h2>Register</h2>
                    {isCreated && <div className="user-message" style={{color: "green"}}>{isCreated}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={event => { setName(event.target.value) }} disabled={loading} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={event => { setEmail(event.target.value) }} disabled={loading} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={event => { setPassword(event.target.value) }} disabled={loading} required />
                    </div>
                    <div className="buttons-group">
                        <button type="submit" disabled={loading} >Register</button>
                        <button id="secondary-button" onClick={() => navigate("/")} disabled={loading}>Go to login</button>
                    </div>
                </form></div>
        </div>
    );
}
