import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './styles.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const { login } = useAuth(); //guarda a função de login definida no contexto

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");

        } catch (err) {
            if (err.response && err.response.data.message === "Bad credentials") {
                setError("Credenciais inválidas. Verifique seu email e senha.");
            } else {
                setError("Não foi possível fazer login. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Email" 
                            name="email" 
                            onChange={(event) => setEmail(event.target.value)} 
                            value={email} 
                            disabled={loading}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password" 
                            name="password" 
                            onChange={(event) => setPassword(event.target.value)} 
                            value={password} 
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="buttons-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                        <button 
                            id="secondary-button" 
                            onClick={() => navigate("/register")}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}