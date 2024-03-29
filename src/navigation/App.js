import React, {useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {useData, ThemeProvider, TranslationProvider} from '../hooks';
import Auth from './Auth';
import Menu from './Menu';
import {getToken} from '../app/auth/Store'



export default () => {
  const {isDark, theme, setTheme} = useData();
  const [Token,setToken]=useState(null)

  /* set the status bar based on isDark constant */
  useEffect(()=>{
    const Restore=async()=>{
    let result= await getToken();
    setToken(result)
    // console.log(result,"res");
  }
  Restore()
  },[Token])



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
          {Token?<Menu />:<Auth />}
          {/* <Menu/> */}
          {/* <Auth/> */}
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};

