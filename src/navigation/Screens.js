import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Login from '../screens/Login';
import Table from '../screens/Table.js';
import StaffRegister from '../screens/StaffRegister';
import AddFine from '../screens/AddFine';
import UpdateFine from '../screens/UpdateFine';
import Department from '../screens/Department';
import CraeteDep from '../screens/CraeteDep';
import CreateFine from '../screens/CreateFine';
import EditProfile from '../screens/EditProfile';
import EditStudent from '../screens/EditStudent';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
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
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Table"
        component={Table}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Staff"
        component={StaffRegister}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Fine"
        component={AddFine}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="UpdateFine"
        component={UpdateFine}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Department"
        component={Department}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CreateDep"
        component={CraeteDep}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateFine"
        component={CreateFine}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditStudent"
        component={EditStudent}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};
