import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AddToDo, EditToDo, Home, Profile, Splash, Welcome } from '../pages';

const Stack = createNativeStackNavigator();

const Routers = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'fade',
                headerShown: false
            }}
            initialRouteName='Splash'
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AddToDo" component={AddToDo} />
            <Stack.Screen name="EditToDo" component={EditToDo} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}

export default Routers

const styles = StyleSheet.create({})