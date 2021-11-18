import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { theme } from '../styles'

const Home: React.FC = ({ }) => {

    return (
        <View style={theme.container}>
            <Text>Bem vindo ao APP</Text>
            <TouchableOpacity 
                style={{
                    width: 150,
                    backgroundColor: '#069',
                    padding: 10,
                    borderRadius: 4
                }}
            
            >
                <Text>Clique aqui</Text>
            </TouchableOpacity>
        </View>
    )

};


export default Home;