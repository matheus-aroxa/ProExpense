import React, { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { backend, useAuth } from '../../context/AuthContext'

export default function ExpensesTable({expenses}){

    const { authState } = useAuth();
    const navigate = useNavigate();

    const [userCategories, setUserCategories] = useState();

    useEffect(() => {
        const userId = authState.user?.id;
        const token = authState.token;

        backend.get(`api/categories/userId/${userId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setUserCategories(res.data));
    }, [authState.user?.id, authState.token]);

    return (
        <div>
            {(expenses && expenses.length > 0) ? <table className="expenses-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>

                {   //formatação mes/dia/ano
                    expenses.map(expense => {

                        const category = userCategories.find(cat => cat.id === expense.categoryID);
                        const categoryName = category ? category.name : "No category";
                    
                    return <tr key={expense.id} onClick={() => navigate(`/expense/${expense.id}`)}>
                        <td>{expense.name}</td>
                        <td>{expense.description}</td>
                        <td>{categoryName}</td>
                        <td>$ {expense.amount.toFixed(2)}</td>
                        <td>{expense?.expenseDate.slice(0,10)}</td>
                    </tr>
                }
                    
                )}
            </tbody>
        </table> : <h1 style={{color: "#fff"}}>There's no expenses</h1>}
        </div>
    );
}