import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header/Header";
import ExpensesTable from '../../components/expenses-table/ExpensesTable';
import { backend, useAuth } from '../../context/AuthContext';
import './styles.css';
import Chart from '../../components/chart/Chart';

export default function DashboardPage(){

    const { authState, logout} = useAuth();
    //--------------------------------------------------
    const [page, setPage] = useState(0);
    const [expenses, setExpenses] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        const userId = authState.user?.id;
        const token = authState.token;

        if(!userId || !token){
            return;
        }

        setError(null);
        
        backend.get(`api/expenses/userId/${userId}?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setExpenses(res.data))
        .catch(err => setError("Failed to load expenses"));

    }, [authState.user?.id, authState.token, page]);

    const navigate = useNavigate();

    return (
        <div className="dashboard-page-wrapper">
            
            <Header />
            
            <div className="expenses-dashboard-actions">
                
                <div style={{display: "flex", gap: "24px"}}>

                    <button className="primary-button round" onClick={() => {navigate("/register-expense")}}>Register a new expense</button>
                    {page > 0 && <button className="primary-button round" onClick={() => setPage(page - 1)}>Previous</button>}
                    {page !== (expenses?.page.totalPages - 1) && <button className="primary-button round" onClick={() => setPage(page + 1)}>Next</button>}

                </div>

            </div>
            
            {error ? <div className="error-message">{error}</div> : <ExpensesTable expenses={expenses?.content} />}
        
        </div>
    );
}