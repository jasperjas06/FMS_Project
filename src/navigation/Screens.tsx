import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Login from '../screens/Login';
import Table from '../screens/Table';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      /> */}

      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Table"
        component={Table}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
