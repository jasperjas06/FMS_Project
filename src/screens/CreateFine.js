import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Block, Button, Input, Text } from '../components';
import { useTheme } from '../hooks';
import { api } from '../app/utility/apiService';
import { getToken } from '../app/auth/Store';
import Toast from "react-native-toast-message";
import {useNavigation} from '@react-navigation/core';

function CreateFine(props) {
    const navigation=useNavigation()
    const {assets, colors, gradients, sizes} = useTheme();
    const [fine,setFine]= React.useState('')
    const [amount,setAmount]= React.useState('')

    const handleSubmit=async()=>{
        let token = await getToken();
        api.post('admin/Fine',{fine:fine,amount:amount},{
            headers:{
                "Content-Type":"application/json",
                'auth': token
            }
        })
        .then((res)=>{
            // console.log(res.data);
            if(res.ok){
                Toast.show({
                    type:"success",
                    position: "top",
                    text1: res.data.messag,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {}
                  });
                //   navigation.navigate('Department')
            }
            else{
                Toast.show({
                    type:"error",
                    position: "top",
                    text1: res.data,
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {}
                  });
            }
        })
        .catch((e)=>{
            console.log(e);
        })
    }
  return (
    // <View style={styles.container}>
    //     <View style={{top:200,flex:1}}>
    <Block safe  marginBottom={sizes.sm} >
      <Block paddingHorizontal={sizes.sm} marginTop={20}>
        <Block
          blur
          flex={0}
          intensity={90}
          radius={sizes.sm}
          overflow="hidden"
          // justify="space-evenly"
          tint={colors.blurTint}
          paddingVertical={sizes.sm}>
          <Text marginTop={1} bold size={22} center padding={20}>
            Create Fine
          </Text>
            
        <Input
        marginTop={50}
        // margin={20}
            // disabled
            // value={`${amount}`}
            secondary
            autoCapitalize="none"
            marginBottom={sizes.m}
            label={'Fine Name'}
            placeholder={'eg. Dress code'}
            // success={Boolean(registration.name && isValid.name)}
            // danger={Boolean(registration.name && !isValid.name)}
            // onChangeText={(value) => handleChange({name: value})}
              onChangeText={(value) => setFine(value)}
          />
          <Input
        marginTop={20}
        // margin={20}
            // disabled
            // value={`${amount}`}
            secondary
            autoCapitalize="none"
            marginBottom={sizes.m}
            label={'Fine Amount'}
            placeholder={'Enter the fine amount'}
            // success={Boolean(registration.name && isValid.name)}
            // danger={Boolean(registration.name && !isValid.name)}
            // onChangeText={(value) => handleChange({name: value})}
              onChangeText={(value) => setAmount(value)}
          />
          <Button
                marginTop={50}
            onPress={handleSubmit}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.dark}>
            <Text bold white transform="uppercase">
              {'create'}
            </Text>
          </Button>
        </Block>
        </Block>
        </Block>
        
        
    //     </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

export default CreateFine;