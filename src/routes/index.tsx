import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/auth'

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes = () => {
    const { user } = useAuth()

    return (
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}

export default Routes;