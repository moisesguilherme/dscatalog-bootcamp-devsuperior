import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { text, theme } from "../styles";

import eyesOpened from "../assets/eyes-opened.png"
import eyesClosed from "../assets/eyes-closed.png"
import arrow from "../assets/arrow.png"
import { isAuthenticated, login } from '../services/auth';
import { NavigationContainer } from '@react-navigation/native';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassord] = useState(true);
    const [userFetchData, setUserFechData] = useState({});
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });

    async function handleLogin() {
        const data = await login(userInfo);
        setUserFechData(data);
        navigation.navigate("Dashboard");
    }


    return (
        <View style={theme.container}>
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>Login</Text>
                <View style={theme.form}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={
                            (e) => {
                                const newUserInfo = { ...userInfo };
                                newUserInfo.username = e;
                                setUserInfo(newUserInfo);
                            }
                        }
                    />
                    <View style={theme.passwordGroup}>
                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            value={userInfo.password}
                            style={theme.textInput}
                            secureTextEntry={hidePassword}
                            onChangeText={
                                (e) => {
                                    const newUserInfo = { ...userInfo };
                                    newUserInfo.password = e;
                                    setUserInfo(newUserInfo);
                                }
                            }
                        />
                        <TouchableOpacity
                            style={theme.toggle}
                            onPress={() => setHidePassord(!hidePassword)}
                        >
                            <Image
                                source={hidePassword ? eyesOpened : eyesClosed}
                                style={theme.eyes}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => handleLogin()}
                >
                    <View style={theme.buttonTextContainer}>
                        <Text style={text.primaryText}>Fazer Login</Text>
                    </View>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow}></Image>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
};


export default Login;

