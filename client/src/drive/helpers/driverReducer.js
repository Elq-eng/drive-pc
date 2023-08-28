import { typesDrive } from "../types/types";




export const driverReducer = ( state = [], action ) =>{
  switch (action.type) {

    case typesDrive.folders:
      return {
        ...state,
        ...action.payload
      }
    case typesDrive.foldersSearch:
      {
      // console.log(state.folders.filter( folder => folder === action.payload.search ))
        state = JSON.parse(localStorage.getItem('folders'))
        let folder = state.folders.filter( folder => folder === action.payload.search)
        
        folder = { folders: folder, isLoading: folder.length == 0 ? false : true  }
        localStorage.setItem('folders', JSON.stringify(folder))
        return folder
      }
    case typesDrive.files:
      {
        let folders =  {folders: action.payload.files, isLoading: true}
        localStorage.setItem('folders', JSON.stringify(folders))
        return {...folders}
      }
    default:
      return state
  }
}