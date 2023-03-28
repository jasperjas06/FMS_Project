import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
// import { SelectList } from 'react-native-dropdown-select-list'
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import { api, dep } from '../app/utility/apiService';
import { removeToken } from '../app/auth/Store';
import AuthContext from '../app/auth/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store'
// import { useNavigation } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
export default function Table() {
  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useState();
  // const [user,setUser]=React.useContext(AuthContext);
  const [selected, setSelected] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const data = [
    {
      id: 1,
      name: 'jasper',
      food: 'xyz',
      age: '23',
    },
    {
      id: 2,
      name: 'mathi',
      food: 'xyz',
      age: '23',
    },
    {
      id: 3,
      name: 'velava',
      food: 'xyz',
      age: '23',
    },
    {
      id: 4,
      name: 'sanjay',
      food: 'xyz',
      age: '23',
    },
    {
      id: 5,
      name: 'deva',
      food: 'xyz',
      age: '23',
    },
  ];
  const data2 = [
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'hjg', value: '233'},
    {label: 'ytyu', value: 'ba4343nana'},
    {label: '456', value: 'ap45556ple'},
    {label: 'xdc', value: 'ban23ana'},
  ];
  // data2.map((item)=>{
  //     let abc = {lable:item.label, value:item.value}
  //  setItems(data2)
  // return setItems
  // })
  console.log(selectedLanguage,"id");
  useEffect(()=>{
    let dep= api.get(`/getDep`)
    .then((response:any)=>{
        // console.log(response?.data.data);
        setValue(response?.data.data)
      })
      .catch((e)=>{
        console.log(e.message,"err");
        
      })
    //   console.log(dep);
      
  },[])
//   setValue(dep)
//   console.log(dep);
  let arr=[value]
//   arr.push(value)
  console.log(arr,"hggh");
  const logOut=()=>{

  }
  const hadlePress=async()=>{
    let key = "authToken"
    try {
      SecureStore.deleteItemAsync(key)
      console.log("deleted");
      // navigation.navigate('Login')
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <View style={{top:25}}>
      <Text>Table</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sl</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Favourite Food</DataTable.Title>
          <DataTable.Title>Age</DataTable.Title>
        </DataTable.Header>

        {data.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{index +1}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.food}</DataTable.Cell>
            <DataTable.Cell>{item.age}</DataTable.Cell>
          </DataTable.Row>
        ))}
        {/* <DataTable.Row>
            <DataTable.Cell>Jasper</DataTable.Cell>
            <DataTable.Cell>xyz</DataTable.Cell>
            <DataTable.Cell>23</DataTable.Cell>
        </DataTable.Row> */}
      </DataTable>
      {/* <SelectList 
        setSelected={(val:any) => setSelected(val)} 
        data={data2} 
        save="value"
    /> */}

      {/* <Picker
        selectedValue={selectedLanguage}
        // mode="dropdown"
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
            {arr[0].map((items)=>{
                return <Picker.Item label={items?.department} value={items?._id}  />
                
            })}

      </Picker> */}
      <TouchableOpacity >
        
      <Text onPress={hadlePress} >LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
