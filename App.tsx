import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import { getToken } from './src/app/auth/Store';
import jwtDecode from 'jwt-decode';
import Auth from './src/navigation/Auth';

export default function App() {
const [token,setToken]=React.useState()
  const restoreToken=async()=>{
    const token=await getToken()
    console.log(token);
    
    if(!token) return
    setToken(jwtDecode(token))
}
React.useEffect(()=>{
  restoreToken()
},[])
  return (
    <DataProvider>
      {/* {token?<AppNavigation />:<Auth/>} */}
      <AppNavigation/>
    </DataProvider>
  );
}
