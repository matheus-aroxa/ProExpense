import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import App from "./App";
import RegisterPage from "./pages/register-page/RegisterPage";
import RegisterExpensePage from './pages/register-expense-page/RegisterExpensePage';
import RegisterCategoryPage from './pages/register-category/RegisterCategoryPage';
import EditExpensePage from './pages/edit-expense-page/EditExpensePage';

const router = createBrowserRouter(
    [
        {
            path: "/", element: <LoginPage />
        },
        {
            path: "/*", element: <PageNotFound />
        },
        {
            path: "/dashboard", element: <DashboardPage />
        },
        {
            path: "/register", element: <RegisterPage />
        },
        {
            path: "/register-expense", element: <RegisterExpensePage />
        },
        {
            path: "/register-category", element: <RegisterCategoryPage />
        },
        {
            path: "/expense/:expenseId", element: <EditExpensePage />
        }
    ]
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App router={router}/>
  </React.StrictMode>
);

