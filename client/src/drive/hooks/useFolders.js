import {  useReducer } from "react"
import { driverReducer } from "../helpers/driverReducer"
import { typesDrive } from "../types/types"

let infoLocal = {};


const init = () =>{
    // window.location.reload(true)
    infoLocal = JSON.parse(localStorage.getItem('folders'))
    return {
      ...infoLocal
    }
}

export const useFolders = () => {

  const [state, dispatch] = useReducer(driverReducer, [], init)

  const onFilesList = ( data = null  ) => {
    
    if ( data.folders === null || data.folders === undefined )return
    const files = data.folders
    const action = {
      type: typesDrive.files,
      payload:{
        files,
        isLoading:true
      }
    }
    dispatch( action )
  }

  const onFoldersList = ( data ) => {

    if ( data.folders === null || data.folders === undefined )return;
    const { folders } =  data
    const action = {
      type: typesDrive.folders,
      payload: {
        folders,
        isLoading:true
      }
    }
    localStorage.setItem('folders', JSON.stringify(action.payload))
    dispatch( action )
  }

  const onFolderSearch = (name) =>{
    const action = {
      type: typesDrive.foldersSearch,
      payload: {
        search: name
      }
    }
    dispatch( action )
  }  



  return {
    
    ...state,
    state,
    onFoldersList,
    onFolderSearch,
    onFilesList
  }


}
