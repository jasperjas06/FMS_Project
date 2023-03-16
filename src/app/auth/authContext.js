import React, { useState } from 'react';
const AuthContext= React.createContext();
export default AuthContext

export const AuthToken=()=>{

    const [user,setUser]=useState(null)
    return(
        <AuthContext.Provider value={{user,setUser}}/>
    )
}