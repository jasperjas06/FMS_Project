import React from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {Block, Input, Text, Button} from '../components';
import {useTheme} from '../hooks';
import {Picker} from '@react-native-picker/picker';
import {api} from '../app/utility/apiService';
import Toast from "react-native-toast-message";
import {useNavigation} from '@react-navigation/core';
import { getToken } from '../app/auth/Store';
function AddFine(props) {
  const {assets, colors, gradients, sizes} = useTheme();
  const [selectedDepartment, setSelectedDepartment] = React.useState();
  const [selectedFine, setSelectedFine] = React.useState();
  const [selectedRegNo, setSelectedRegNo] = React.useState();
  const [amount, setAmount] = React.useState('');
  const [Token, setToken] = React.useState('');
  const [value, setValue] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [fine, setFine] = React.useState([]);
  const [student, setStudent] = React.useState([]);
  const navigation= useNavigation()

  React.useEffect(() => {
    let getkey=async()=>{
      let token = await getToken();
      // console.log(token);
      setToken(token)
    }
    getkey()
   
    let dep = api
      .get(`/getDep`)
      .then((response) => {
        // console.log(response.data.data);
        setValue(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });

    let fine = api
      .get(`/getFine`)
      .then((response) => {
        // console.log(response.data.data);
        setFine(response?.data.data);
        setData(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
    let amount = () => {
      let fine = selectedFine;
      data.map((item, index) => {
        if (fine === item.fine) {
          return setAmount(item.amount);
        }
        // console.log(item.amount);
      });
    };
if(selectedDepartment){
  let student = api.post(`/student/dep`, {department: selectedDepartment},{headers:{
      "Content-Type":"application/json",
      'auth': Token
    }})
      .then((response) => {
        //   console.log("fghj");
        // console.log(response,"data");
        setStudent(response?.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
}
    // let student = api.post(`/student/dep`, {department: selectedDepartment},{headers:{
    //   "Content-Type":"application/json",
    //   'auth': Token
    // }})
    //   .then((response) => {
    //     //   console.log("fghj");
    //     console.log(response,"data");
    //     // setStudent(response?.data);
    //   })
    //   .catch((e) => {
    //     console.log(e.message, 'err');
    //   });
    amount();
  }, [selectedDepartment, selectedFine]);
  const handleSubmit = () => {
    api.post(`/fine/add`,{department:selectedDepartment,RegNo:selectedRegNo,reason:selectedFine,amount:amount},{headers:{
      "Content-Type":"application/json",
      'auth': Token
    }})
    .then((response)=>{
      if(!response.ok){
        // console.log();
        // console.log(response)
        Toast.show({
          type: "error",
          position: "top",
          text1: response.data,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
      }
      else{
        Toast.show({
          type: "success",
          position: "top",
          text1: response.data?.message,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
      }
    
    })
    .catch((e)=>{
      console.log(e.message,"err"); 
    })
  };
// console.log(Token);
  return (
    <Block safe marginTop={sizes.md}>
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
            Fine
          </Text>
          <View style={{margin:20}}></View>
          <Text bold>Department</Text>
          <View style={styles.pick}>
            <Picker
              style={styles.textD}
              selectedValue={selectedDepartment}
              mode="dropdown"
              placeholder="Select department"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDepartment(itemValue)
              }>
              <Picker.Item
                label="Select department"
                value={null}
                enabled={false}
              />
              {value?.map((items, index) => {
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

          <Text bold>Register No</Text>
          <View style={styles.pick}>
            <Picker
              style={styles.textD}
              selectedValue={selectedRegNo}
              mode="dropdown"
              placeholder="Select department"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRegNo(itemValue)
              }>
              <Picker.Item
                label="Select Register No"
                value={null}
                enabled={false}
              />
              {student?.map((items, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={items?.name}
                    value={items?._id}
                  />
                );
              })}
            </Picker>
          </View>

          <Text bold>Reason</Text>
          <View style={styles.pick}>
            <Picker
              style={styles.textD}
              selectedValue={selectedFine}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedFine(itemValue)
              }>
              <Picker.Item label="Select Fine" value={null} enabled={false} />
              {fine?.map((items, index) => {
                return (
                  <Picker.Item
                    key={index}
                    label={items?.fine}
                    value={items?.fine}
                  />
                );
              })}
            </Picker>
          </View>
          <Input
            disabled
            value={`${amount}`}
            secondary
            autoCapitalize="none"
            marginBottom={sizes.m}
            label={'Amount'}
            placeholder={'amount'}
            // success={Boolean(registration.name && isValid.name)}
            // danger={Boolean(registration.name && !isValid.name)}
            // onChangeText={(value) => handleChange({name: value})}
            //   onChangeText={(value) => setName(value)}
          />
          <View style={{margin: 30}}></View>
          <Button
            onPress={handleSubmit}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.success}>
            <Text bold white transform="uppercase">
              {'Submit'}
            </Text>
          </Button>

          <Button
            onPress={()=>{navigation.navigate('UpdateFine')}}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.secondary}>
            <Text bold white transform="uppercase">
              {'Update Fine'}
            </Text>
          </Button>
        </Block>
      </Block>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {},
  pick: {
    borderWidth: 0.3,
    borderRadius: 5,
    height: 45,
    margin: 4,
    marginBottom: 20,
  },
});

export default AddFine;
