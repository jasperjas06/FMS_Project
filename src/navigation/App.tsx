import React, {useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import Menu from './Menu';
import {useData, ThemeProvider, TranslationProvider} from '../hooks';
import Auth from './Auth';
import { getToken } from '../app/auth/Store';
import jwtDecode from 'jwt-decode';
import AuthContext from '../app/auth/authContext';

export default () => {
  const {isDark, theme, setTheme} = useData();
  const [Token,setToken]=useState(null)

  /* set the status bar based on isDark constant */
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    // const reStroeToken=async()=>{
    //   let newToken= await getToken()
    //   setToken(newToken)
    //   // let token= jwtDecode(newToken)
    //   // console.log(token,"token");
      
    // }
    // reStroeToken()
    const restoreToken=async()=>{
      const token=await getToken()
      if(!token) return
      setToken(jwtDecode(token))
  }
    restoreToken()
    return () => {
      StatusBar.setBarStyle('default');
    };
    
  }, [isDark,Token]);

// console.log(Token);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };



  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
        {/* <AuthContext.Provider value={{Token,setToken}}> */}
          {Token?<Menu  />:<Auth />}
          {/* <Menu /> */}
          {/* <Auth/> */}
          {/* </AuthContext.Provider> */}
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
