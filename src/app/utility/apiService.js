import {create} from 'apisauce'
import { useEffect, useState } from 'react';

// function Abc(){
//   const [data,setData]=useState()
//   return
// }
export const api=create({
  baseURL:"http://192.168.1.14:9870/api/",
  headers:{
    "Content-Type":"application/json",
  }
})

// useEffect(()=>{
  // const [data,setData]=useState()

  // export  const dep= api.get(`/getDep`)
  // .then((response)=>{
  //     // console.log(response?.data.data);
  //     let data=[]
  //     return data=response?.data.data
      
  //   })
  //   .catch((e)=>{
  //     console.log(e.message,"err");
      
  //   })
  //   console.log(dep);
    
// },[])

// export default data