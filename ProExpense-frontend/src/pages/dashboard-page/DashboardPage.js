import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header";
import ExpensesTable from '../../components/expenses-table/ExpensesTable';
import { backend, useAuth } from '../../context/AuthContext';
import './styles.css';
import Chart from '../../components/chart/Chart';

export default function DashboardPage(){
    
    const { authState, logout} = useAuth();

    const [expenses, setExpenses] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        const userId = authState.user?.id;
        const token = authState.token;

        if(!userId || !token){
            return;
        }

        setError(null);
        
        backend.get(`api/expenses/userId/${userId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setExpenses(res.data))
        .catch(err => setError("Failed to load expenses"));

    }, [authState.user?.id, authState.token]);

    const navigate = useNavigate();

    return (
        <div className="dashboard-page-wrapper">
            <Header />
            <div className="expenses-dashboard-actions">
                <button id="register-expense-button" onClick={() => {navigate("/register-expense")}}>Register a new expense</button>
            </div>
            {error ? <div className="error-message">{error}</div> : <ExpensesTable expenses={expenses} />}
        </div>
    );
}