import React, { useState } from 'react';
import { getToken } from './Store';
const AuthContext= React.createContext();
export default AuthContext

export const AuthToken=async()=>{
    const [user,setUser]=useState(null)
    let token=await getToken()
    setUser(token)
    return(
        <AuthContext.Provider value={user}/>
    )
}