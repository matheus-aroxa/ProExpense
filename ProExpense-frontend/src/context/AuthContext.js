import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

//instancia única do axios para toda a aplicação
export const backend = axios.create({
    baseURL: 'https://proexpense-backend.onrender.com'
    // baseURL: 'http://localhost:8080'
});

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // SUBSTITUA SEU useState ATUAL POR ESTE:
    const [authState, setAuthState] = useState(() => {
        try {
            const token = localStorage.getItem('token');
            const expiresAt = localStorage.getItem('expiresAt');
            const userString = localStorage.getItem('user');

            // Verificamos se temos todos os dados necessários
            if (!token || !expiresAt || !userString) {
                return { token: null, expiresAt: null, user: null };
            }

            // Verificamos se o token não expirou
            if (new Date().getTime() >= parseInt(expiresAt)) {
                // Limpa o localStorage se o token estiver expirado
                localStorage.removeItem('token');
                localStorage.removeItem('expiresAt');
                localStorage.removeItem('user');
                return { token: null, expiresAt: null, user: null };
            }

            // Se tudo estiver certo, tentamos converter o usuário de string para objeto
            const user = JSON.parse(userString);
            return { token, expiresAt, user };

        } catch (error) {
            // Se JSON.parse falhar ou qualquer outro erro ocorrer,
            // garantimos um estado de deslogado.
            console.error("Falha ao hidratar o estado de autenticação:", error);
            return { token: null, expiresAt: null, user: null };
        }
    });

    useEffect(() => {
        if (authState.token && authState.user) {
            backend.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
            localStorage.setItem('token', authState.token);
            localStorage.setItem('expiresAt', authState.expiresAt);
            localStorage.setItem('user', JSON.stringify(authState.user));
        } else {
            delete backend.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('expiresAt');
            localStorage.removeItem('user');
        }
    }, [authState]);

    const login = async (email, password) => {
        try {
            const loginResponse = await backend.post("/auth/login", { email, password });
            const { token, expiresAt } = loginResponse.data;

            //define o token como padrao nas requisições
            backend.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userResponse = await backend.get(`/api/users/email/${email}`);
            const user = userResponse.data;

            setAuthState({ token, expiresAt, user });

            return loginResponse.data;
        } catch (error) {
            setAuthState({ token: null, expiresAt: null, user: null });
            throw error;
        }
    };

    const logout = () => {
        setAuthState({ token: null, expiresAt: null, user: null });
    };

    const value = { authState, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}