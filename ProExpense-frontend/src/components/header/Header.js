import React from 'react';
import './styles.css';
import XIcon from '@mui/icons-material/X';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){

    const navigate = useNavigate();

    return (
        <header className="dashboard-header">
            <Link id="x-icon" to="https://x.com/mir0mori"><XIcon fontSize="large" /></Link>
            <h1>ProExpense</h1>
            <button className="primary-button" onClick={() => {navigate("/")}}>Logout</button>
        </header>
    );
}
