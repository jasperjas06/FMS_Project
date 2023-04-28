import { Picker } from '@react-native-picker/picker';
import React,{useEffect,useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import { api, createStaff, token, url } from '../app/utility/apiService';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {useTheme, useTranslation} from '../hooks';
import Toast from "react-native-toast-message";
import { getToken, removeToken } from '../app/auth/Store';
import axios from 'axios';

function StaffRegister(props) {
  const {assets, colors, gradients, sizes} = useTheme();
  const {t} = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [value, setValue] = useState([]);

  useEffect(() => {
    let dep = api.get(`/getDep`)
      .then((response) => {
        setValue(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
  }, []);

  const handleSubmit = async() => {
    // console.log(name, email, selectedDepartment);
    let token = await getToken();
    // console.log(token);
    api.post(`staff/register`,{name:name,email:email,department:selectedDepartment},
    {headers:{
      "Content-Type":"application/json",
      'auth': token
    }}
    )
    .then((response)=>{
      // console.log(response.data);
      Toast.show({
        position: "top",
        text1: response.data,
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {}
      });
    })
    .catch((e)=>{
      console.log(e.message,"err"); 
    })

  //   let body={name:name,email:email,department:selectedDepartment}
  //   // let response = await createStaff(body)
  //   // console.log(response,"res");
  //   let token = await getToken();
  // console.log(token);
  // if (token) {
  //   token = JSON.parse(token);
  // }
  //  await axios({
  //   method:'POST',
  //   url:`http://192.168.67.8:9870/api/staff/register`,
  //   body: JSON.stringify(body),
  //   headers:{'auth':token}
  // }).then((response)=>{
  //   console.log(response);
  // }).catch((e)=>{
  //   console.log(e);
  // })
  };
  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        
        <Block paddingHorizontal={sizes.sm}>
          
          <Block 
          blur
          flex={0}
          intensity={90}
          radius={sizes.sm}
          overflow="hidden"
          // justify="space-evenly"
          tint={colors.blurTint}
          paddingVertical={sizes.sm}>
            <Text marginTop={1} bold size={22} center>
          Create staff
        </Text>
        <View style={{margin:20}}></View>
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
                <View style={{margin:10}}></View>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  // onChangeText={(value) => setEmail(value)}
                  // success={Boolean(registration.email && isValid.email)}
                  // danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => setEmail(value)}
                />
                <View style={{margin:10}}></View>
                <Text bold >Department</Text>
                <View style={styles.pick}>
                <Picker
                style={styles.textD}
                  selectedValue={selectedDepartment}
                  mode="dropdown"
                  placeholder='Select department'
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
                <View style={{margin:10}}></View>
                <Button
                // onPress={handleSignUp}
                onPress={handleSubmit}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.secondary}
                // disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {"Submit"}
                </Text>
              </Button>
              {/* <Button
                // onPress={handleSignUp}
                onPress={()=>{removeToken()}}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.secondary}
                // disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {"Clear"}
                </Text>
              </Button> */}
              <View style={{margin:10}}></View>
              </Block>
        </Block>
      </Block>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default StaffRegister;
