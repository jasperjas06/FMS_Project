import { View, Text } from 'react-native'
import React from 'react'
import {DataTable} from "react-native-paper"

export default function Table() {
    const data=[
        {
            name:"jasper",
            food:"xyz",
            age:"23"
        },
        {
            name:"mathi",
            food:"xyz",
            age:"23"
        },
        {
            name:"velava",
            food:"xyz",
            age:"23"
        },
        {
            name:"sanjay",
            food:"xyz",
            age:"23"
        },
        {
            name:"deva",
            food:"xyz",
            age:"23"
        }
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
    </View>
  )
}