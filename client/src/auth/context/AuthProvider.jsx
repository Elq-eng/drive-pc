/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "./AuthReducer"
import { types } from "../types/types"
import { useFolders } from "../../drive/hooks/useFolders"

const init = () => {

  const user = JSON.parse( localStorage.getItem('user'))

  return { 
    logged: !!user,
    user: user
  }

}


export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer( AuthReducer, [] , init)
  const { onFilesList  } = useFolders()
  const [dataInfo, setDataInfo] = useState({});
  const [ folders ,setFolders] = useState(null);
  const [isChangeButton, setIsChangeButton] = useState(false);


  // login
  const onLogin = ( name = '') =>{
    
    const user = { id:'ELQUIN', name}
    const action = {
      type: types.login,
      payload: user  
    }

    localStorage.setItem('user', JSON.stringify(user))

    dispatch( action )
  }

  const onLogout = () =>{

    localStorage.removeItem('user')
    const action = {
      type: types.logout,
    }
    dispatch( action )
    setDataInfo({})
  }
  
  const onLoadData = ( folders ) => {
    setDataInfo(folders)
  }

  const onLoadDataFile = async( q )=>{

    const resp = await fetch(`http://localhost:8080/folders/files/${q}`)
    const files = await resp.json()
    setFolders(files.files)
  }

  const onChangeButton = () => {
    setIsChangeButton(!isChangeButton)
  }


  useEffect(() => {
    if(folders===null) return 
    setDataInfo({folders})
  }, [folders]);
  
  return (
    <AuthContext.Provider value={{...authState, onLogin, onLogout, onLoadData, dataInfo, onLoadDataFile, onChangeButton, isChangeButton}}>{children}</AuthContext.Provider>
  )
}
