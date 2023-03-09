import { View, Text } from 'react-native'
import React from 'react'
import {DataTable} from "react-native-paper"
import { SelectList } from 'react-native-dropdown-select-list'
export default function Table() {
    const [selected, setSelected] = React.useState("");
    const data=[
        {
            id:1,
            name:"jasper",
            food:"xyz",
            age:"23"
        },
        {
            id:2,
            name:"mathi",
            food:"xyz",
            age:"23"
        },
        {
            id:3,
            name:"velava",
            food:"xyz",
            age:"23"
        },
        {
            id:4,
            name:"sanjay",
            food:"xyz",
            age:"23"
        },
        {
            id:5,
            name:"deva",
            food:"xyz",
            age:"23"
        }
    ]
    const data2 = [
        {key:'1', value:'123456', disabled:true, lable:"mobile"},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]
  return (
    <View>
      <Text>Table</Text>
      <DataTable>
        <DataTable.Header>
            <DataTable.Title>Sl</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Favourite Food</DataTable.Title>
            <DataTable.Title>Age</DataTable.Title>
        </DataTable.Header>

        {data.map((item,index)=> <DataTable.Row>
            <DataTable.Cell>{index+1}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.food}</DataTable.Cell>
            <DataTable.Cell>{item.age}</DataTable.Cell>
        </DataTable.Row>
    )}
        {/* <DataTable.Row>
            <DataTable.Cell>Jasper</DataTable.Cell>
            <DataTable.Cell>xyz</DataTable.Cell>
            <DataTable.Cell>23</DataTable.Cell>
        </DataTable.Row> */}
      </DataTable>
      <SelectList 
        setSelected={(val:any) => setSelected(val)} 
        data={data2} 
        save="value"
    />
    </View>
  )
}