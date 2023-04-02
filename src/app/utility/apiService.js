import {create} from 'apisauce'
import { useEffect, useState } from 'react';

// function Abc(){
//   const [data,setData]=useState()
//   return
// }
let db= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk2ZTAzNzdhMzlmNmYzNjJlZDI5NCIsImlzU3RhZmYiOnRydWUsImlzQ2FzaGllciI6dHJ1ZSwiaWF0IjoxNjgwNDM2NzYwfQ.8YwbYofzz0ZgJ4hlTDr7Btbi1D2CBwb-bh8rmh6KOS8"
let token = JSON.stringify(db)
console.log(token);
export const api=create({
  baseURL:"http://192.168.67.8:9870/api/",
  headers:{
    "Content-Type":"application/json",
    'auth':db
  }
})