import React from 'react';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import { backend, useAuth } from '../../context/AuthContext'
import './styles.css';

export default function RegisterCategoryPage(){

    const {authState} = useAuth();

    const [name, setName] = React.useState();
    const [isCreated, setIsCreated] = React.useState();

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        let body = {
            name: name,
            userID: authState.user?.id
        }
        backend.post("api/categories", body)
        .then(res => setIsCreated("Category created successfully"))
        .catch(err => setIsCreated("failed to create category"));   
    }

    return(
        <>
                    <Header />
                    <section className="register-expense-container">
                        <div className="register-expense-form-container">
                            <form className="register-expense-form" onSubmit={(e) => {handleSubmit(e)}}>
                                <h2>Register category</h2>
                                {isCreated && <div className="user-message" style={{color: "green"}}>{isCreated}</div>}
                                <div className="input-group">
                                    <label for="expense-name">Category name</label>
                                    <input type="text" name="expense-name" id="expense-name" placeholder='Name for the expense' onChange={(e) => {setName(e.target.value)}}></input>
                                </div>
                                <div className="register-expense-actions buttons-group">
                                    <button type='submit'>Register</button>
                                    <button className="secondary-button" type="button" onClick={() => { navigate("/register-expense"); }}>Back</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </>
    )
}