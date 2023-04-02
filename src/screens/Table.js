import React from 'react';
import { View, StyleSheet } from 'react-native';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
function Table(props) {
  return (
    <View style={styles.container}>
      <DataTable
            data={[ 
                { name: 'Muhammad Rafeh', age: 21, gender: 'male' },
                { name: 'Muhammad Akif', age: 22, gender: 'male' },
                { name: 'Muhammad Umar', age: 21, gender: 'male' },
                { name: 'Amna Shakeel', age: 22, gender: 'female' },
                { name: 'Muhammad Ammar', age: 20, gender: 'male' },
                { name: 'Muhammad Moiz', age: 13, gender: 'male' }
            ]} // list of objects
            colNames={['name', 'age', 'gender']} //List of Strings
            colSettings={[
              { name: 'name', type: COL_TYPES.STRING, width: '40%' }, 
              { name: 'age', type: COL_TYPES.INT, width: '30%' }, 
              {name: 'gender', type: COL_TYPES.STRING, width: '30%'}
            ]}//List of Objects
            noOfPages={2} //number
            backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
            headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default Table;