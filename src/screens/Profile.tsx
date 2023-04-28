import React, {useCallback} from 'react';
import {Platform, Linking,View,Image,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import Logout from '../assets/images/logout.png'
import User from '../assets/images/user.png'
import Left from '../assets/images/left.png'
import Edit from '../assets/images/edit.png'
import Rvs from '../../assets/rvscas.png'
// import {DataTable} from 'react-native-paper';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { getToken, removeToken } from '../app/auth/Store';
import jwtDecode from 'jwt-decode';
import { api } from '../app/utility/apiService';
const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const [profile,setProfile]=React.useState({})
  const {user} = useData();
  const [data,setData]=React.useState([])
  const [student,setStudent]=React.useState(false)
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );
  

  React.useEffect(()=>{
    const user =async()=>{
      let token = await getToken();
      let decode = jwtDecode(token)
      // console.log(decode);
      setStudent(decode?.isStudent)

      if(token){
        api.post('profile',{id:decode?.id})
        .then((res)=>{
          // console.log(res.data);
          setProfile(res.data?.data)
        })
        .catch((e)=>{
          console.log(e);
          
        })
      }
       api.post(`fine/personalfine`,{id:decode?.id})
       .then((res)=>{
        // console.log(res.data,);
        if(res.ok){
          setData(res?.data)
        }
       })
       .catch((e)=>{
        console.log(e);
        
       })

    }

    // let profile=()=>{
    //   api.post()
    // }

    user()
  },[])
  // console.log(profile.department?.department);
  

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              {/* <Image
                radius={0}
                width={10}
                height={18}
                color={colors.black}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              /> */}
              <Image source={Left} style={{height:30,width:30}}></Image>
              <Text p black marginLeft={sizes.s}>
                {t('profile.title')}
              </Text>
            </Button>
            {/* logout */}
            <Button
              row
              flex={0}
              justify="flex-start"
              style={{left:280,bottom:40}}
              onPress={() => {removeToken()
                //  navigation.navigate('Login')
                }
                }
              >
              
              <Image source={Logout} style={{height:30,width:30}}>

              </Image>
              <Text p black marginLeft={sizes.s}>
                {"Logout"}
              </Text>
            </Button>
            <Block flex={0} align="center">
              {/* <Image
                width={200}
                height={200}
                radius={100}
                marginBottom={sizes.sm}
                // source={{uri: user?.avatar}}
                source={require('../assets/images/photo3.png')}
              /> */}
              <Image source={User} style={{height:100,width:100}}></Image>
              {/* <View style={{top:20}}> */}
              <Text bold center size={20}>Personal Info:</Text>
              <Text h5 center black>
                Name: {profile.name}
              </Text>
              {!profile.department?(null):(<Text p center black>
                Department: {profile?.department?.department}
              </Text>)}
              <Text p center black>
                Email: {profile?.email}
              </Text>
              <Text p center black>
                {profile?.isCashier ===true?"Cashier":"Not Cashier"}
              </Text>
              <Block 
              // onPress={()=>navigation.navigate('EditProfile')}
              >
                <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
                <Image source={Edit} style={{height:30,width:30,right:30}}></Image>
              <Text p center black style={{bottom:20}}>Edit Profile</Text>
                </TouchableOpacity>
              </Block>
              {/* </View> */}
                {/* <Text bold>My_Fines</Text> */}
              <View style={{width: '100%', alignSelf: 'center'}}>
              {/* <Block row marginVertical={sizes.m}> */}
                {student?(<>
                  <Text bold center>My_Fines</Text>
                <DataTable 
            data={data} // list of objects
            colNames={['name', 'reason', 'amount']} //List of Strings
            
            noOfPages={2} //number
            // backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
            headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
        /></>):(
            <Image source={Rvs} style={{height:300,width:300,left:25}}></Image> 
        )}
        </View>
              </Block>

          
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            
            <Block row justify="space-between" wrap="wrap">
              
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
