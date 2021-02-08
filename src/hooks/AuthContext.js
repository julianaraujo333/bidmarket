import React, {createContext, useCallback, useState, useContext} from 'react';
import api from "./../services/api";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
   
    const [data, setData] = useState(() =>{
        const token = localStorage.getItem('@BidMarket:token');
        const user = localStorage.getItem('@BidMarket:user');

        if(token && user){
            return{token, user: JSON.parse(user)}
        }
        return{}
    })
    const signIn = useCallback ( async({email, password  }) =>{

        const response = await api.post('/auth/login', {
            email,
            password,
        });
        const {token, user} = response.data.data;
        localStorage.setItem('@BidMarket:token', response.data.data.token);
        localStorage.setItem('@BidMarket:user', JSON.stringify(response.data.data));

        setData({token, user});
        
    },[]);

    return(
        <AuthContext.Provider value ={{user: data.user, signIn}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthPovider');
    }
    return context;
}
