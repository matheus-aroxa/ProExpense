import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import { useNavigate, useParams } from 'react-router-dom';
import { backend, useAuth } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

export default function EditExpensePage(){

    const navigate = useNavigate(); 
    //----------------------------------------------------------------
    const { authState } = useAuth(); //CONTEXTO
    const { expenseId } = useParams(); //id da expense obtido atraves de query param
    //----------------------------------------------------------------
    const [expense, setExpense] = useState(); //Guarda o objeto da expense a ser editada
    //----------------------------------------------------------------
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const [date, setDate] = useState();
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState(); 
    const [categoryName, setCategoryName] = useState(); 
    //----------------------------------------------------------------
    
    //passa os dados da expense para os states que serão utilizados no formulario
    function populateStates(expense){
        setName(expense.name);
        setDescription(expense.description);
        setValue(expense.amount);
        setDate(expense.expenseDate);
        setCategoryId(expense.categoryID);
    }
    //----------------------------------------------------------------
    //states para tratamento de erros
    const [isUpdated, setIsUpdated] = useState();
    const [isDeleted, setIsDeleted] = useState();
    const [shouldDisable, setShouldDisable] = useState();
    const [error, setError] = useState(null);

    
    function handleSubmit(e){
        e.preventDefault();

        //verifica se a expense deve ser atualizada
        if(expense.name !== name || expense.description !== description || expense.amount !== value || expense.categoryID !== categoryId || expense.expenseDate !== date){
            
            let body = {
                "id": expense.id,
                "name": name,
                "amount": value,
                "description": description,
                "expenseDate": date,
                "userID": expense.userID,
                "categoryID": categoryId
            }

            backend.put(`api/expenses`, body,
                 {
                    headers: {
                        Authorization: `Bearer ${authState.token}`
                    }
                })
            .then(() => setIsUpdated("Expense updated successfully"))
            .catch(() => setError("Failed to update expense"));
        }
    }

    function deleteExpense(){
         backend.delete(`api/expenses/${expense.id}`,
                 {
                    headers: {
                        Authorization: `Bearer ${authState.token}`
                    }
                })
            .then(() => {
                setIsDeleted("Expense deleted successfully");
                setShouldDisable(true);
            })
            .catch(() => setError("Failed to delete expense"));
    }

    
    useEffect(() => {

        const userId = authState.user?.id;
        const token = authState.token;

        if(!userId || !token) return;

        //Requisição para puxar os dados completos da expense
        backend.get(`api/expenses/${expenseId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setExpense(res.data);
            populateStates(res.data);
        });

        //Requisição para puxar as categorias do usuario
        backend.get(`api/categories/userId/${userId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setCategories(res.data);
            let cat = categories?.filter(c => c.id === categoryId);
            if(cat?.lenght > 0){
                setCategoryName(cat[0].name);
            }
        });


        
    }, [authState.user?.id, authState.token]);

    return (
        <>
            <Header />
            <section className="register-expense-container">
                <div className="register-expense-form-container">
                    
                    <form className="register-expense-form" onSubmit={(e) => {handleSubmit(e)}}>

                        <h2>Edit expense</h2>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}><DeleteIcon id="delete-icon" fontSize="large" onClick={deleteExpense}></DeleteIcon></div>

                        {isUpdated && <div className="user-message" style={{color: "green"}}>{isUpdated}</div>}
                        {isDeleted && <div className="user-message" style={{color: "green"}}>{isDeleted}</div>}
                        {error && <div className="error-message" style={{color: "green"}}>{error}</div>}

                        <div className="input-group">

                            <label for="expense-name">Expense name</label>

                            <input type="text" name="expense-name" id="expense-name" placeholder='Name for the expense'
                             onChange={(e) => { setName(e.target.value) }} value={name} ></input>

                        </div>

                        <div className="input-group">

                            <label for="expense-description">Expense description</label>

                            <input type="text" name="expense-description" id="expense-description" placeholder='A short description for the expense'
                             onChange={(e) => { setDescription(e.target.value) }} value={description}></input>

                        </div>

                        <div className="input-group">

                            <label for="expense-value">Expense value</label>

                            <input type="number" name="expense-value" id="expense-value" placeholder='Value of the expense'
                             step={0.01} onChange={(e) => { setValue(e.target.value) }} value={value}></input>

                        </div>

                        <div className="input-group ">
                            
                            <select required onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>

                                <option value="" disabled>Category</option>
                                
                                {categories ?
                                categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))
                                : "There's no categories"}
                            </select>

                            <button className="secondary-button" style={{marginTop: "20px"}} type="button" onClick={() => navigate("/register-category")}>Register category</button>

                        </div>

                        <div className="input-group">

                            <label for="expense-date">Expense date</label>

                            <input type="date" name="expense-date" id="expense-date" onChange={(e) => { setDate(e.target.value) }} value={date?.slice(0,10)}></input>

                        </div>

                        <div className="register-expense-actions buttons-group">

                            <button type='submit' >Update</button>

                            <button className="secondary-button" type="button" onClick={() => { navigate("/dashboard"); }}>Back</button>

                        </div>

                    </form>

                </div>
            </section>
        </>
    );
}