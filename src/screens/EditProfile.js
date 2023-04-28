import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Block, Button, Input, Text } from '../components';
import {useNavigation} from '@react-navigation/core';
import { useTheme, useTranslation } from '../hooks';
function EditProfile(props) {
   const navigation = useNavigation()
   const isAndroid = Platform.OS === 'android';
   const {t} = useTranslation();
   const [name,setName]=React.useState('')
 
   const {assets, colors, gradients, sizes} = useTheme();
  return (
    <Block safe marginTop={200} >
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0,marginTop:20}} >
          {/* <Image 
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.card3}
            height={sizes.height * 0.3}>
           
          </Image> */}
        </Block>
        {/* register form */}
        <Block
          keyboard
          
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
           style={{marginTop:50}}
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
            style={{marginTop:20}}
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text marginTop={16} bold size={22} center>
                {"Edit Profile"}
              </Text>
              
              <Block paddingHorizontal={sizes.sm}>
                
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={"Name"}
                  // keyboardType="email-address"
                  placeholder={"Enter Your Name"}
                  onChangeText={(value) => setName(value)}
                  // success={Boolean(registration.email && isValid.email)}
                  // danger={Boolean(registration.email && !isValid.email)}
                  // onChangeText={(value) => handleChange({email: value})}
                />
                
              </Block>
              
              <Button
                // onPress={handleSignUp}
                // onPress={handleSubmit}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.secondary}
                // disabled={Object.values(isValid).includes(false)}
                >
                <Text bold white transform="uppercase">
                  {"Update"}
                </Text>
              </Button>
              
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default EditProfile;