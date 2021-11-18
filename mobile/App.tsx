import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from "./src/routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}



export default App;