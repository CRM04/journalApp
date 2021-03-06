import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={ (props) => ((isAuth) ? <Component {...props}></Component> : <Redirect to='/auth/login'/>) }/>
    )
}

PrivateRoute.protoTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
