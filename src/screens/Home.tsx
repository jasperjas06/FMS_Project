import React, {useCallback, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import jwt_decode from 'jwt-decode';
import { getToken, removeToken } from '../app/auth/Store';
import { api } from '../app/utility/apiService';
import { View } from 'react-native';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
const Home = () => {
  const [admin,setAdmin]=React.useState(false)
  const [data,setData]=React.useState([])
  const [data2,setData2]=React.useState([])
  const [department,setDepartment]=React.useState('')
  const [id,setId]=React.useState('')
  const [totalNotPaid,setTotalNotPaid]=React.useState('')
  const [totalPaid,setTotalPaid]=React.useState('')
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );
  React.useEffect(()=>{
    let user =async()=>{
      let token = await getToken();
      var decoded = jwt_decode(token);
      // console.log(decoded.department); 
      if(token){
        setAdmin(decoded?.isAdmin)
        setDepartment(decoded?.department)
        setId(decoded?.department)
      }
    }
    let getoverAllFine = () =>{
      api.get(`fine/paid`)
      .then((res)=>{
        // console.log(res.data.data,'res');
        if(res.ok){
          setTotalPaid(res.data.data)
        }
      })
      .catch((e)=>{
        console.log(e,"err");
        
      })
    }
    let getAllPending = ()=>{
      api.get(`fine/pending`)
      .then((res)=>{
        // console.log(res.data.data); 
        if(res.ok){
          setTotalNotPaid(res.data.data)
        }
      })
      .catch((e)=>{
        console.log(e,"geterr");
        
      })
    }
    let getDepart= ()=>{
      let arr=[]
      api.post(`fine/departnot`,{id:department})
      .then((res)=>{
        // console.log(res.data);
        if(res.ok){
          setData2(res?.data)
        } 
      })
      .catch((e)=>{
        console.log(e);
        
      })
    }

    let tabledata= ()=>{
      let arr=[];
      api.get(`/fine/allnotpaid`)
      .then((res)=>{
        // console.log(res.data?.department);
        res.data?.map((item,index)=>{
          // console.log(item.department);
          if(item.department === department){
            arr.push({
              name: item?.RegNo?.name,
              amount: item.amount,
              reason: item.reason,
            })
          }else{
            arr.push({
              name: item?.RegNo?.name,
              amount: item.amount,
              reason: item.reason,
            });
          }
          
          })
        return setData(arr)
        
      })
      .catch((e)=>{
        console.log(e);
        
      })
    }

    const departpending=()=>{
      api.post(`fine/deptpending`,{department:id})
      .then((res)=>{
        // console.log(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
    }


    user()
    getoverAllFine()
    getAllPending()
    tabledata()
    getDepart()
    departpending()
  },[])
// console.log(data,'rr');

  return (
    <Block>
      {/* search input */}
      {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block> */}

      {/* toggle products list */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        {/* <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.following')}
            </Text>
          </Block>
        </Button> */}
        {/* <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        /> */}
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            {/* <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.home}
              />
            </Block> */}
            <Text  bold size={22} center font={fonts?.[tab === 1 ? 'medium' : 'normal']}  >
              {'Home'}
            </Text>
          </Block>
        </Button>
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
        {/* <Product /> */}
          {/* {products?.map((product) => (
            <Product {...product} key={`card-${product?.id}`} />
          ))} */}
          <Block>
          <Text>OverAll Fine Collected</Text>
          <Text bold size={22} center marginTop={10}>{totalPaid}</Text>
          </Block>
          <Block>
          <Text>OverAll Fine Pending</Text>
          <Text bold size={22} center marginTop={10}>{totalNotPaid}</Text>
          </Block>
        </Block>
        <View>
          <Text marginTop={80} bold size={22} center>Student Details</Text>
          <DataTable
          data={data} // list of objects
          colNames={['name', 'reason', 'amount', ]} 
          noOfPages={1} //number
          // backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
          headerLabelStyle={{color: 'grey', fontSize: 12 }} //Text Style Works
        />
        {/* {admin?<DataTable
          data={data} // list of objects
          colNames={['name', 'reason', 'amount', ]} 
          noOfPages={1} //number
          // backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
          headerLabelStyle={{color: 'grey', fontSize: 12 }} //Text Style Works
        />:
        <DataTable
          data={data2} // list of objects
          colNames={['name', 'reason', 'amount', ]} 
          noOfPages={1} //number
          // backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
          headerLabelStyle={{color: 'grey', fontSize: 12 }} //Text Style Works
        />} */}
        </View>
        {/* <Button onPress={()=>removeToken()}>
          <Text>Hello</Text>
        </Button> */}
      </Block>
    </Block>
  );
};

export default Home;
