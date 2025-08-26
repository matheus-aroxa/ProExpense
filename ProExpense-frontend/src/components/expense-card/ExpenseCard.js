import React from 'react';
import './styles.css';

export default function ExpenseCard(){
    return (
        <div className="card-container">
            <div className="card-info">
                <h1>Barbeiro</h1>
                <h2>R$25,00</h2>
            </div>
        </div>
    );
}