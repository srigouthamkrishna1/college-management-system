import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        let initialUser = localStorage.getItem("User");
        initialUser=JSON.parse(initialUser)
        console.log("initial",initialUser?.role);
        if(initialUser){
            if(initialUser?.role){
                navigate('/dashboard')
            }
            setUser(initialUser);
        }
        else{
            setUser({});
        }
        




    }, []);
    const updateRegisterInfo = (info) => {
        console.log(info);
        setRegisterInfo(info);
    }
    const logoutUser = () => {
        localStorage.removeItem("User")
        setUser(null);
    }


    return (<AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, setUser, logoutUser }}>{children}</AuthContext.Provider>)
}