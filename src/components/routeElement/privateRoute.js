import React from 'react';
import { Navigate } from 'react-router-dom';
// import { Container } from './styles';

function PrivateRoute({children}) {
    let check = localStorage.getItem("check");
    if(check != null)
        return <Navigate to="/home" />;
    return (
        <>
            {children}
        </>
    );
}

export default PrivateRoute;