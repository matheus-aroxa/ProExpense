import React from 'react';
import './styles.css';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export default function PageNotFound() {
    return (
        <div className="page-not-found-container">
            <DoNotDisturbIcon className="not-found-icon" fontSize={"large"}/>
            <h1>Page not found</h1>
        </div>
    );
}