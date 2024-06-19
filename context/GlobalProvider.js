import {createContext,useContext,useState,useEffect} from 'react'
import { getCurrentUser } from '../lib/appwrite';
const GlobalContext=createContext();
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const[isLoggedin,setisLoggedin]=useState(false)
    const[user,setUser]=useState(null)
    const[isLoading,setisLoading]=useState(true)

    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            if(res){
                setisLoggedin(true)
                setUser(res)
            }else{
                setisLoggedin(flase)
                setUser(null)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setisLoading(false)
        })
    },[])
    return(
        <GlobalContext.Provider
        value={{
            isLoggedin,
            setisLoggedin,
            user,
            setUser,
            isLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider