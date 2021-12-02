import React from 'react'
import { createStackNavigator } from  '@react-navigation/stack';
import { Home, Catalog, ProductDetails, Login} from '../pages';
import { NavBar } from "../components";
import { Text } from "react-native";

import { colors, nav } from '../styles';

const Stack = createStackNavigator();

const HeaderText: React.FC = () => <Text style={nav.leftText}>DS Catalog</Text>


export type RootStackParamList = {
  Home: undefined;
  Catalog: undefined;
  ProductDetails: {id: Number};
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};


const Routes: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: " ",
                headerStyle: {                   
                    backgroundColor: colors.primary,
                },
                headerLeft: () => <HeaderText />,
                headerRight: () => <NavBar/>
            }}
        >
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
            <Stack.Screen 
                name="Login" 
                component={Login}
            />
        </Stack.Navigator>
    )
}

export default Routes;