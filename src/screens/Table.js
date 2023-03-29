import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable, Searchbar} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store'
import {useNavigation} from '@react-navigation/core';
export default function Table() {
  const numberOfItemsPerPageList = [2, 3, 4];
  const itemsPerPage = 2;
  const navigation = useNavigation()
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
    {
      id: 5,
      name: 'deva',
      food: 'xyz',
      age: '23',
    },
  ];

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
  const hadlePress=async()=>{
    // let key = "authToken"
    try {
      // SecureStore.deleteItemAsync(key)
      // console.log("deleted");
      navigation.navigate('Home')
      
    } catch (error) {
      console.log(error);
      
    }
  }
  React.useEffect(() => {
    setPage(0);
 }, [numberOfItemsPerPage]);
//  console.log(data.length/itemsPerPage);
 
  
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
        <DataTable.Pagination 
        page={page}
        numberOfPages={Math.floor(data.length / itemsPerPage)}
        onPageChange={page=>setPage(page)}
        label={`${from + 1}-${to} of ${data.length}`}
        />
      </DataTable>

      <TouchableOpacity >
      <Searchbar placeholder="Search"/>
      <Text onPress={hadlePress} >LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
