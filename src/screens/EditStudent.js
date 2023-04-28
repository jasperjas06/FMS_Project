import React from 'react';
import {View, StyleSheet} from 'react-native';
import {api} from '../app/utility/apiService';
import {getToken} from '../app/auth/Store';
import jwtDecode from 'jwt-decode';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Modal} from 'react-native';
import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';
import { Picker } from '@react-native-picker/picker';
import Toast from "react-native-toast-message";


function EditStudent(props) {
  const [id, setId] = React.useState('');
  const [data, setData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [updateData, setUpDateData] = React.useState({});
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [regno, setRegno] = React.useState('');
  const [selected,setSelected]= React.useState('')

  const {assets, colors, gradients, sizes} = useTheme();
  React.useEffect(() => {
    let token = async () => {
      let user = await getToken();
      let decode = jwtDecode(user);
      // console.log(decode.department);
      setId(decode?.department);
      api
        .post(`student/dep`, {department: decode?.department})
        .then((res) => {
          let arr = [];
          res.data?.map((item, index) => {
            // console.log(item,"item");
            return arr.push({
              name: item.name,
              email: item.email,
              regno: item.RegNo,
              cashier: item.isCashier === true ? 'Cashier' : 'Not Cashier',
              edit: (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible), setUpDateData({item});
                  }}>
                  <Icon name="pencil" size={20} />
                </TouchableOpacity>
              ),
            });
          });
          return setData(arr);
          // }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    let userdata = () => {};
    userdata();
    token();
  }, []);
  const handleSubmit = () => {
    let body = {name:name,email:email,RegNo:regno};
    api.post(`/student/update`,{
      id:updateData.item._id,body:body
    })
    .then((res)=>{
      console.log(res.data);
      if(res.ok){
        Toast.show({
          type:"success",
          position: "top",
          text1: res.data,
          visibilityTime: 5000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
        setModalVisible(!modalVisible)
      }else{
        Toast.show({
          type:"error",
          position: "top",
          text1: res.data,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {}
        });
      }
    }).catch((e)=>{
      console.log(e);
    })
  };
  // console.log(updateData?.item, 'update');
  return (
    <View style={{flex: 1, marginTop: 40}}>
      <View>
        <DataTable
          data={data} // list of objects
          colNames={['name', 'email', 'regno', 'cashier', 'edit']} //List of Strings
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
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View>
            {/* <Text>Hello World</Text> */}
            {/* <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </TouchableOpacity> */}
            <Text marginTop={80} bold size={22} center>
              Edit Student
            </Text>
            <Block safe marginTop={sizes.md}>
              <Block paddingHorizontal={sizes.sm}>
                <Block>
                  <Input
                    // marginTop={100}
                    // disabled
                    value={updateData?.item?.name}
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
                    // disabled
                    value={updateData?.item?.email}
                    secondary
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={'Email'}
                    placeholder={'Email'}
                    // success={Boolean(registration.name && isValid.name)}
                    // danger={Boolean(registration.name && !isValid.name)}
                    // onChangeText={(value) => handleChange({name: value})}
                    //   onChangeText={(value) => setName(value)}
                  />
                  {/* <Input
                    marginTop={10}
                    disabled
                    value={updateData?.item?.cashier}
                    secondary
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={'Cashier'}
                    placeholder={'Cashier'}
                    // success={Boolean(registration.name && isValid.name)}
                    // danger={Boolean(registration.name && !isValid.name)}
                    // onChangeText={(value) => handleChange({name: value})}
                    //   onChangeText={(value) => setName(value)}
                  /> */}
                  {/* <Picker
                  selectedValue={selected}
                  mode="dropdown"
                  placeholder='Select department'
                  onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                  }>
                    <Picker.Item label="Not Cashier" value={false} />
                    <Picker.Item label="Cashier" value={true} />
                  </Picker> */}

                  <Input
                    marginTop={10}
                    // disabled
                    value={updateData?.item?.RegNo}
                    secondary
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={'Register No'}
                    placeholder={'Register No'}
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
                    onPress={() => setModalVisible(!modalVisible)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditStudent;
