import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import {MainNavigator} from './MainNavigator';
import Register from '../screens/Register';
import RegisterForm from '../screens/RegisterForm';
import {RegisterInterface} from '../data';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterForm: {registerData: RegisterInterface};
  RegisterCategory: {registerData: RegisterInterface};
  MainNavigator: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
