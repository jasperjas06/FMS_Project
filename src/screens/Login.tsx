import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
// import {AsyncStorage} from 'react-native'
import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import { api } from '../app/utility/apiService';
import {getToken, storeToken} from '../app/auth/Store.js'
// import jwtDecode from 'jwt-decode'
import jwt_decode from "jwt-decode";
import AuthContext from '../app/auth/authContext';

// import { api } from '../utilities/apiService';
// import { logIn } from '../utilities/apiService';



const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Login = () => {
  // const authContext=useContext(AuthContext)
  const [loginFaild, setLoginFaild]=useState(false)
    const navigation= useNavigation()
  const [data,setData]=useState([])
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
//   const [terms,setTerms]=useState(false)
  // const {isDark} = useData();
  const {t} = useTranslation();
  // const navigation = useNavigation();
  // const [isValid, setIsValid] = useState<IRegistrationValidation>({
  //   name: false,
  //   email: false,
  //   password: false,
  //   agreed: false,
  // });
  // const [registration, setRegistration] = useState<IRegistration>({
  //   name: '',
  //   email: '',
  //   password: '',
  //   agreed: false,
  // });
  const {assets, colors, gradients, sizes} = useTheme();

  // const handleChange = useCallback(
  //   (value) => {
  //     setRegistration((state) => ({...state, ...value}));
  //   },
  //   [setRegistration],
  // );

  // const handleSignUp = useCallback(() => {
  //   if (!Object.values(isValid).includes(false)) {
  //     /** send/save registratin data */
  //     console.log('handleSignUp', registration);
  //   }
  // }, [isValid, registration]);

  // useEffect(() => {
  //   setIsValid((state) => ({
  //     ...state,
  //     name: regex.name.test(registration.name),
  //     email: regex.email.test(registration.email),
  //     password: regex.password.test(registration.password),
  //     agreed: registration.agreed,
  //   }));
  // }, [registration, setIsValid]);
  const handleSubmit=()=>{
    // console.log(email);
    
    api.post(`/login`,{"email":email,"password":password})
    .then((response:any)=>{
      
      
      console.log(response.data);
    // if(!response.ok) return setLoginFaild(true);

    // setLoginFaild(false);
    console.log("abc");
    const decode= jwt_decode(response.data)
    // const data01= JSON.stringify(response.data.token)
    console.log(decode);
    
    // const user=jwtDecode(response.data.token)
    // console.log(user);
    
    storeToken(response.data)

      
    })
    .catch((e)=>{
      console.log(e.message,"err");
      
    })

  }
  // let newtoken= getToken()
  // console.log(newtoken,"token");
  // useEffect(()=>{
  //   const reStroeToken=async()=>{
  //     let newToken= await getToken()
  //     let token= jwtDecode(newToken)
  //     // console.log(token,"token");
      
  //   }
  //   reStroeToken()
  // },[])
  


  // export const value=data ;
  return (
    <Block safe marginTop={sizes.md} >
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0,marginTop:20}} >
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.card3}
            height={sizes.height * 0.3}>
            {/* <Button
              row
              flex={0}
              justify="flex-start"
              // onPress={() => navigation.goBack()}
              >
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button> */}

            {/* <Text h4 center white marginBottom={sizes.md}>
              {t('register.title')}
            </Text> */}
          </Image>
        </Block>
        {/* register form */}
        <Block
          keyboard
          
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
           style={{marginTop:50}}
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
            style={{marginTop:20}}
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text marginTop={16} bold size={22} center>
                {"Login"}
              </Text>
              {/* social buttons */}
              {/* <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    // color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    // color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    // color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block> */}
              {/* <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block> */}
              {/* form inputs */}
              <Block paddingHorizontal={sizes.sm}>
                {/* <View style={styles.text}>
                <TextInput 
                placeholder='Name'
                style={{fontSize:15}}
                />
                </View>
                 */}
                {/* <Input
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Name'}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  onChangeText={(value) => setName(value)}
                /> */}
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={"Email"}
                  keyboardType="email-address"
                  placeholder={"Enter Your Email"}
                  onChangeText={(value) => setEmail(value)}
                  // success={Boolean(registration.email && isValid.email)}
                  // danger={Boolean(registration.email && !isValid.email)}
                  // onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={"Password"}
                  placeholder={"Enter Your Password"}
                  onChangeText={(value) => setPassword(value)}
                  // onChangeText={(value) => handleChange({password: value})}
                  // success={Boolean(registration.password && isValid.password)}
                  // danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              {/* <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  // checked={registration?.agreed}
                  // onPress={(value) => handleChange({agreed: value})}
                  onPress={(value) => setTerms(value)}
                />
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {t('common.terms')}
                  </Text>
                </Text>
              </Block> */}
              <Button
                // onPress={handleSignUp}
                onPress={handleSubmit}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.secondary}
                // disabled={Object.values(isValid).includes(false)}
                >
                <Text bold white transform="uppercase">
                  {"sigin"}
                </Text>
              </Button>
              <Button
                secondary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                // onPress={() => navigation.navigate('Pro')}
                onPress={() => {navigation.navigate('Register'),data}}
                >
                <Text bold secondary transform="uppercase">
                  {"Student Register"}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  text:{
    padding:2,
    borderWidth:0.3,
    height:40
  }
})

