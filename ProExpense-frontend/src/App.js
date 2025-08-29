import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

function App(props) {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={props.router} />
      </AuthProvider>
    </div>
  );
}

export default App;
