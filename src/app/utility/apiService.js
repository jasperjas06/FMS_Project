import {create} from 'apisauce'

export const api=create({
  baseURL:"http://192.168.1.26:9870/api/",
  headers:{
    "Content-Type":"application/json",
  }
})

// export const logIn=api.post(`/login`,email,password)
// .then((res)=>{
//   console.log(res);
// }).catch((e)=>console.log(e.message))
