import React from 'react';
import './styles.css';

const Login = ({ onLogin }) => (
    <div className="login-container">
        <h2>Login</h2>
        <button className="login-button" onClick={onLogin}>Login with Google</button>
    </div>
);

export default Login;
