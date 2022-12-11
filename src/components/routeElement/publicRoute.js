import React from 'react';
import { Navigate } from 'react-router-dom';
// import { Container } from './styles';

function PublicRoute({children}) {
    let check = localStorage.getItem("check");
    if(check == null)
        return <Navigate to="/" />;
    return (
        <>
            {children}
        </>
    );
}

export default PublicRoute;