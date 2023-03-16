import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {  Register } from "../screens";
import Login from "../screens/Login";

const Stack = createStackNavigator();
const Auth = ({ params = {} }) => {
  return (

      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
        initialParams = {{}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
  );
};

export default Auth;