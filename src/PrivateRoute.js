import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

function PrivateRoute({
   component:Component,
    ...rest
}) {
    const { user } = useContext(AppContext)
   
    return (
        <Route
         {...rest}
        render={
            props=>user?(<Component
                {...props}
            />):(
                <Redirect to={"/login"}></Redirect>
            )
        }></Route>
    )
}

export default PrivateRoute