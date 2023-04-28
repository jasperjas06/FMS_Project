import {create} from 'apisauce'
import axios from 'axios'
import { getToken } from '../auth/Store';
let baseUrl = "http://192.168.67.8:9870/api/";

export const api=create({
  baseURL:baseUrl,
  // headers:{
  //   "Content-Type":"application/json",
  //   'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2E0MThlZDM4ZDIyZTZkZDZjN2E4NyIsImlzU3RhZmYiOnRydWUsImlzQ2FzaGllciI6dHJ1ZSwiaWF0IjoxNjgxNTM5NDc0fQ.dUYKcTz8NNqjlUgkZyoA09wxlOmr6gZz58kjMuocyf8'
  // }
})
export const url="http://192.168.67.8:9870/api/";

export const token=async()=>{
let res=await getToken()
let data= res
return data
}


