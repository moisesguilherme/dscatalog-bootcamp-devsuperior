import React from 'react'
import { createNativeStackNavigator } from  '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import {Home, Catalog} from '../pages'


export type RootStackParamList = {
  Home: undefined;
  Catalog: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

//const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home}/>
            <Stack.Screen name="Catalog" component={Catalog}/>
        </Stack.Navigator>
    )
}

export default Routes;