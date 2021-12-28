import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...props }) => {
    let isAuth = true
    return (<Route {...props} render = {() => isAuth ? (children) : <Redirect to={'/'} />} />)
}

export default PrivateRoute;