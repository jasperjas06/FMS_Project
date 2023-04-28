import React from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import {api} from '../app/utility/apiService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Button, Input,Text} from '../components';
import {useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/core';
import Toast from "react-native-toast-message";
import { getToken } from '../app/auth/Store';
import jwtDecode from 'jwt-decode';
function UpdateFine(props) {
  const navigation= useNavigation()
  const [data, setData] = React.useState([]);
  const [status,setStatus] = React.useState('paid')
  const [token,setToken] = React.useState('')
  const [updateData, setUpDateData] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const {assets, colors, gradients, sizes} = useTheme();

  const handleSubmit=(props)=>{
    try {
    //  console.log(updateData,"kjjj");
    api.post(`fine/update`,{id:updateData?.id,status:status})
    .then((res)=>{
      // console.log(res);
      if(res.ok){
        Toast.show({
          type:"success",
          position: "top",
          text1: 'Fine Updated',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
        navigation.navigate('Fine')
      }
      else{
        Toast.show({
          type:"error",
          position: "top",
          text1: 'Server Error 🚨',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
      }
    })
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    let user = async()=>{
      let token = await getToken();
      // console.log(token);
      let decode= jwtDecode(token)
      // console.log(decode.department);
      setToken(decode.department)
    }
    let student = api
      .get(`/fine/allnotpaid`)
      .then((response) => {
        // console.log(response.data);
        if (!response.ok) {
          console.log('Somthing went wrong');
        } else {
          let arr = [];
          response.data?.map((item, index) => {
            // console.log(item?.status);
            arr.push({
              name: item?.RegNo?.name,
              id: item.RegNo?._id,
              fineid: item._id,
              amount: item.amount,
              fine: item.reason,
              status: item.status,
              edit: (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible),
                      setUpDateData({name:item?.RegNo?.name,id:item?._id,reason:item?.reason,amount:item.amount});
                  }}>
                  <Icon name="pencil" size={20} />
                </TouchableOpacity>
              ),
            });
            // console.log(arr,"jjj");
            return setData(arr);
          });
        }
        // setValue(response?.data.data);
      })
      .catch((e) => {
        console.log(e.message, 'err');
      });
    // console.log(data);
   user() 
  }, []);
  // console.log(updateData);
  return (
    <View style={styles.container}>
      <View>
        <DataTable
          data={data} // list of objects
          colNames={['name', 'fine', 'amount', 'edit']} //List of Strings
          // colSettings={[
          //   { name: 'name', type: COL_TYPES.STRING, width: '40%' },
          //   { name: 'fine', type: COL_TYPES.STRING, width: '30%' },
          //   {name: 'amount', type: COL_TYPES.INT, width: '30%'},
          //   {name:'edit', width:'30%'},
          //   {name:'status', width:'30%'},
          // ]}//List of Objects
          noOfPages={1} //number
          // backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
          headerLabelStyle={{color: 'grey', fontSize: 12}} //Text Style Works
        />
      </View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View>
          {/* <Text>Hello World</Text> */}
          {/* <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </TouchableOpacity> */}
            <Text marginTop={80} bold size={22} center>
            Update Fine
          </Text>
          <Block safe marginTop={sizes.md}>
            <Block paddingHorizontal={sizes.sm}>
              <Block>
              <Input
                // marginTop={100}
                  disabled
                  value={updateData?.name}
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Name'}
                  placeholder={'Name'}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  //   onChangeText={(value) => setName(value)}
                />
                <Input
                marginTop={10}
                  disabled
                  value={updateData.reason}
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Reason'}
                  placeholder={'Reason'}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  //   onChangeText={(value) => setName(value)}
                />
                <Input
                marginTop={10}
                  disabled
                  value={`${updateData.amount}`}
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Amount'}
                  placeholder={'Amount'}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  //   onChangeText={(value) => setName(value)}
                />
                
                <Input
                marginTop={10}
                  disabled
                  value={status}
                  secondary
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={'Status'}
                  placeholder={'Status'}
                  // success={Boolean(registration.name && isValid.name)}
                  // danger={Boolean(registration.name && !isValid.name)}
                  // onChangeText={(value) => handleChange({name: value})}
                  //   onChangeText={(value) => setName(value)}
                />
                <Button
                marginTop={50}
            onPress={handleSubmit}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.success}>
            <Text bold white transform="uppercase">
              {'Submit'}
            </Text>
          </Button>
          <Button
                marginTop={50}
            onPress={()=>setModalVisible(!modalVisible)}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.dark}>
            <Text bold white transform="uppercase">
              {'Back'}
            </Text>
          </Button>
              </Block>
              
            </Block>
          </Block>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UpdateFine;
