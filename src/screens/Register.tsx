import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet, TextInput, View,ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {api} from '../app/utility/apiService';
import {Picker} from '@react-native-picker/picker';
// import Toast from 'react-native-toast-message';

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

const Register = (props: any) => {
  const {data} = props;
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [value, setValue] = useState([]);
  const [regNo, setRegNo] = useState('');
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
  useEffect(() => {
    let dep = api
      .get(`/getDep`)
      .then((response: any) => {
        // console.log(response?.data.data);
        setValue(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
  }, []);
  // let arr = [value];
  // console.log(arr);
  
  const handleSubmit = () => {
    // console.log(name, email, password, selectedDepartment, regNo);
    api.post(`student/register`,{name:name,email:email,password:password,department:selectedDepartment,RegNo:regNo})
    .then((response:any)=>{
      if(response.ok){
        ToastAndroid.show(response.data?.message,ToastAndroid.SHORT)
        // Toast.show({
        //   type:'success',
        //   text1:response.data?.message
        // })
        // alert(response.data?.message) 
      }
      else
      ToastAndroid.show(response.data?.message,ToastAndroid.SHORT)
    })
    .catch((e)=>{
      console.log(e.message,"err"); 
    })
  };
  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.card2}
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
            style={{bottom: 20, top: -1}}
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text marginTop={1} bold size={22} center>
                {t('register.subtitle')}
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
                <Input
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Name'}
                  placeholder={t('common.namePlaceholder')}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  onChangeText={(value) => setName(value)}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  onChangeText={(value) => setEmail(value)}
                  // success={Boolean(registration.email && isValid.email)}
                  // danger={Boolean(registration.email && !isValid.email)}
                  // onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => setPassword(value)}
                  // onChangeText={(value) => handleChange({password: value})}
                  // success={Boolean(registration.password && isValid.password)}
                  // danger={Boolean(registration.password && !isValid.password)}
                />
                {/* <Input
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'department'}
                  placeholder={"Enter department"}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  onChangeText={(value) => setName(value)}
                /> */}
                <Text style={{ fontSize:29, fontWeight:"900"}}>Department</Text>
                <View style={styles.pick}>
                <Picker
                style={styles.textD}
                  selectedValue={selectedDepartment}
                  mode="dropdown"
                  // translation=""
                  placeholder='Select department'
                  //  translation={{
                  //       PLACEHOLDER: "Select an item"
                  //     }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedDepartment(itemValue)
                    
                  }>
                    <Picker.Item label='Select department' value={null} enabled={false}/>
                  {value.map((items,index) => {
                    return (
                      <Picker.Item
                      key={index}
                        label={items?.department}
                        value={items?._id}
                      />
                    );
                  })}
                </Picker>
                </View>
                <Input
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Register Number'}
                  placeholder={'Register Number'}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  onChangeText={(value) => setRegNo(value)}
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
                  {"t('common.agree')"}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {"t('common.terms')"}
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
                  {t('common.signup')}
                </Text>
              </Button>
              <Button
                secondary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate('Login')}>
                <Text bold secondary transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* <Toast/> */}
    </Block>
  );
};

export default Register;

const styles = StyleSheet.create({
  text: {
    padding: 2,
    borderWidth: 0.3,
    height: 40,
  },
  dropdown:{
    borderWidth:0.2,
    // borderBottomColor:"red"
  },
  textD:{

  },
  pick:{
    borderWidth:0.3,
    borderRadius:5,
    height:45,
    margin:4,
    marginBottom:20
  }
});
