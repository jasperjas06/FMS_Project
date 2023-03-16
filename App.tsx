import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import { getToken } from './src/app/auth/Store';
import jwtDecode from 'jwt-decode';
import Auth from './src/navigation/Auth';

export default function App() {

  return (
    <DataProvider>
      <AppNavigation/>
    </DataProvider>
  );
}
