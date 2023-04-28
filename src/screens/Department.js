import React from 'react';
import { View, StyleSheet,Modal,TouchableOpacity } from 'react-native';
import { Block, Button, Text } from '../components';
import DataTable, {COL_TYPES} from 'react-native-datatable-component'
import { useTheme } from '../hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import { api } from '../app/utility/apiService';
// import { TouchableOpacity } from 'react-native-gesture-handler';

function Department(props) {
    const {assets, colors, gradients, sizes} = useTheme();
    const [modalVisible,setModalVisible]= React.useState(false);
    const [data,setData]=React.useState([])
    const navigation = useNavigation();
    React.useEffect(()=>{
        let getDep=()=>{
            api.get('getDep')
            .then((res)=>{
                // console.log(res.data);
                let arr=[]
                if(res.ok){
                    res.data.data?.map((item,index)=>{
                        arr.push({
                            department:item?.department,
                            edit: (
                                <TouchableOpacity
                                  onPress={() => {
                                    // setModalVisible(!modalVisible),
                                    //   setUpDateData({name:item?.RegNo?.name,id:item?._id,reason:item?.reason,amount:item.amount});
                                  }}>
                                  <Icon name="pencil" size={20} />
                                </TouchableOpacity>
                              ),
                        })
                        // console.log(arr);
                    })
                    return setData(arr)
                    // console.log(arr,"gh");
                }
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        getDep()
    },[])
  return (
    <View style={styles.container}>
        {/* <Text>Department</Text> */}
        <DataTable
          data={data} // list of objects
          colNames={['department', 'edit']} //List of Strings
          noOfPages={1} 
          headerLabelStyle={{color: 'grey', fontSize: 16}} //Text Style Works
        />
        <Block>
        <Button
                marginTop={50}
            onPress={()=>navigation.navigate('CreateDep')}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.dark}>
            <Text bold white transform="uppercase">
              {'Create Department'}
            </Text>
          </Button>
        </Block>
        {/* <Block> */}
        {/* <View style={{flex:1}}>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
        </Modal>
        </View> */}
        {/* </Block> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default Department;