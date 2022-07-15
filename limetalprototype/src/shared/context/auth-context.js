import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{},
    token:null,
    userName:null,
    userId:null,
    userType:"",
    userEmail:null
});