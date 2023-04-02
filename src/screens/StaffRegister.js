import { Picker } from '@react-native-picker/picker';
import React,{useEffect,useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import { api } from '../app/utility/apiService';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import {useTheme, useTranslation} from '../hooks';
import Toast from "react-native-toast-message";

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
        // console.log(response.data.data);
        setValue(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
  }, []);

  const handleSubmit = () => {
    // console.log(name, email, selectedDepartment);
    api.post(`staff/register`,{name:name,email:email,department:selectedDepartment})
    .then((response)=>{
      console.log(response.data);
      // if(!response.ok){
      //   Toast.show({
      //     type: "error",
      //     position: "top",
      //     text1: response.data,
      //     // text2: "This is some something 👋",
      //     visibilityTime: 1000,
      //     autoHide: true,
      //     topOffset: 30,
      //     bottomOffset: 40,
      //     onShow: () => {},
      //     onHide: () => {}
      //   });
      // }
      // else
      Toast.show({
        // type: "success",
        position: "top",
        text1: response.data,
        // text2: "This is some something 👋",
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
