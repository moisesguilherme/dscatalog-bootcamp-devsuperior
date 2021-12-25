import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { tabbar } from '../styles';


interface TabBarProps {
    screen: string;
    setScreen: Function;
}


const TabBar: React.FC<TabBarProps> = (props) => {

    const { screen, setScreen } = props;


    function changeScreen(page: string){
        setScreen(page);
    }

    function isActive(page: string){
        if(screen === page)
            return true;
        
        return false;
    }


    return(
        <View style={tabbar.container}>
            <TouchableOpacity 
                style={[tabbar.pill, isActive('products') && tabbar.pillActive]}
                onPress={() => changeScreen('products')}
                activeOpacity={0.7}
                >
                <Text style={[tabbar.pillText, isActive('products') && tabbar.pillTextActive]}>Produto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tabbar.pill, isActive('categories') && tabbar.pillActive]}
                onPress={() => changeScreen('categories')}
                activeOpacity={0.7}
            >
                <Text style={[tabbar.pillText, isActive('categories') && tabbar.pillTextActive]}>Categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[tabbar.pill, isActive('users') && tabbar.pillActive]}
                onPress={() => changeScreen('users')}
                activeOpacity={0.7}
                >
                <Text style={[tabbar.pillText, isActive('users') && tabbar.pillTextActive]}>Usuários</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TabBar;
