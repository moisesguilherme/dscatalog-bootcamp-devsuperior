import React from 'react'
import { createNativeStackNavigator } from  '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import {Home, Catalog, ProductDetails} from '../pages'


export type RootStackParamList = {
  Home: undefined;
  Catalog: undefined;
  ProductDetails: {id: Number};
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

//const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home}
            />
            <Stack.Screen 
                name="Catalog" 
                component={Catalog}
            />
            <Stack.Screen 
                name="ProductDetails" 
                component={ProductDetails}
            />
        </Stack.Navigator>
    )
}

export default Routes;