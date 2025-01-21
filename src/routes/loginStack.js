import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/login';
import Signup from '../pages/signup';
import HomePage from '../pages/homePage';

const Stack = createStackNavigator();

export default function Navigator(){
    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='HomePage' component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};