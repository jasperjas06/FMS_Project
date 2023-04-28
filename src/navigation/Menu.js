import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Linking, StyleSheet} from 'react-native';
import jwt_decode from 'jwt-decode';
import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import {getToken} from '../app/auth/Store';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();

    // const user = async () => {
    //   let token = await getToken();
    //   var decoded = jwt_decode(token);
    //   console.log(decoded, 'user');
    //   if (decoded?.isAdmin === true) {
    //     setPage([
    //       {name: t('screens.home'), to: 'Home', icon: assets.home},
    //       {name: 'Department', to: 'Department', icon: assets.office},
    //       {name: 'Staff', to: 'Staff', icon: assets.components},
    //       {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    //     ]);
    //   }
    //   if (decoded?.isStaff === true) {
    //     setPage([
    //       {name: t('screens.home'), to: 'Home', icon: assets.home},
    //       {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    //       {name: 'Fine', to: 'Fine', icon: assets.menu},
    //     ]);
    //   }
    // };
    // user();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );
  const [page, setPage] = useState([]);
  React.useEffect(()=>{
    const user = async () => {
      let token = await getToken();
      var decoded = jwt_decode(token);
      // console.log(decoded, 'user');
      if (decoded?.isAdmin === true) {
        setPage([
          {name: t('screens.home'), to: 'Home', icon: assets.home},
          {name: 'Department', to: 'Department', icon: assets.office},
          {name: 'Staff', to: 'Staff', icon: assets.components},
          {name: 'Fine', to: 'CreateFine', icon: assets.basket},
          {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
        ]);
      }
      if (decoded?.isStaff === true) {
        setPage([
          {name: t('screens.home'), to: 'Home', icon: assets.home},
          {name: 'Fine', to: 'Fine', icon: assets.menu},
          {name: 'EditStudent', to: 'EditStudent', icon: assets.users},
          {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
        ]);
      }
      if (decoded?.isStudent === true) {
        setPage([
          {name: t('screens.home'), to: 'Home', icon: assets.home},
          {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
          // {name: 'Fine', to: 'Fine', icon: assets.menu},
        ]);
      }
    };
    user();
  })
  

  // const handleWebLink = useCallback((url) => Linking.openURL(url), []);
  
  // screen list for Drawer menu
  const screens = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    {name: 'Staff', to: 'Staff', icon: assets.components},
    {name: t('screens.articles'), to: 'Table', icon: assets.document},
    {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    // {name: t('screens.register'), to: 'Register', icon: assets.register},
    {name: 'Fine', to: 'Fine', icon: assets.menu},
    {name: 'Department', to: 'Department', icon: assets.office},
  ];

  const Admin = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    {name: 'Department', to: 'Department', icon: assets.office},
    {name: 'Staff', to: 'Staff', icon: assets.components},
    {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {t('app.name')}
            </Text>
            <Text size={12} semibold>
              {t('app.native')}
            </Text>
          </Block>
        </Block>
        {page?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};