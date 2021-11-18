import React from 'react'
import { createNativeStackNavigator } from  '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import {Home, Catalog} from '../pages'

const Routes: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    headerShown: false
                }}
                name="Home" 
                component={Home}/>
            <Stack.Screen name="Catalog" component={Catalog}/>
        </Stack.Navigator>
    )
}

export default Routes;