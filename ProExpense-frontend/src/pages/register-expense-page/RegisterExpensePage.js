import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { backend, useAuth} from '../../context/AuthContext'
import './styles.css';

export default function RegisterExpensePage(){

    const {authState} = useAuth();

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const [date, setDate] = useState();
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [isCreated, setIsCreated] = useState();

    useEffect(() => {

        const userId = authState.user?.id;
        const token = authState.token;

        if(!userId || !token){
            return;
        }

        backend.get(`api/categories/userId/${authState.user?.id}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            setCategories(response.data);
        })
        .catch(err => setIsCreated("Failed to register expense"));
    }, [authState.user?.id, authState.token]); 

    

    function registerExpense(e){
        e.preventDefault();
        let body = {name: name,
                    amount: value,
                    description: description,
                    expenseDate: date,
                    userID: authState.user?.id,
                    categoryID: categoryId}

        backend.post("api/expenses", body);
        setIsCreated("Expenses registered successfully");
    }

    return (
        <>
            <Header />
            <section className="register-expense-container">
                <div className="register-expense-form-container">
                    {isCreated && <div className="user-message" style={{color: "green"}}>{isCreated}</div>}
                    <form className="register-expense-form" onSubmit={registerExpense}>
                        <h2>Register expense</h2>
                        <div className="input-group">
                            <label for="expense-name">Expense name</label>
                            <input type="text" name="expense-name" id="expense-name" placeholder='Name for the expense' onChange={(e) => { setName(e.target.value) }}></input>
                        </div>
                        <div className="input-group">
                            <label for="expense-description">Expense description</label>
                            <input type="text" name="expense-description" id="expense-description" placeholder='A short description for the expense' onChange={(e) => { setDescription(e.target.value) }}></input>
                        </div>
                        <div className="input-group">
                            <label for="expense-value">Expense value</label>
                            <input type="number" name="expense-value" id="expense-value" placeholder='Value of the expense' step={0.01} onChange={(e) => { setValue(e.target.value) }}></input>
                        </div>
                        <div className="input-group ">
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                                <option value="" disabled>Category</option>
                                <hr />
                                {categories ?
                                categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))
                                : "There's no categories"}
                            </select>
                            <button className="secondary-button" style={{marginTop: "20px"}} type="button" onClick={() => navigate("/register-category")}>Register category</button>
                        </div>
                        <div className="input-group">
                            <label for="expense-date">Expense date</label>
                            <input type="date" name="expense-date" id="expense-date" onChange={(e) => { setDate(e.target.value) }}></input>
                        </div>
                        <div className="register-expense-actions buttons-group">
                            <button type='submit'>Register</button>
                            <button className="secondary-button" type="button" onClick={() => { navigate("/dashboard"); }}>Back</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}