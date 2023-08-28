/* eslint-disable react/prop-types */

import { useContext, useEffect } from "react";
import { useFolders } from "../hooks/useFolders";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../../auth/context/AuthContext";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const InputFilter = ({typeFile, title, nameButton }) => {
  
  const {  inputValue,setselectedFile,onInputForm, onResetInput } = useForm( {inputValue:''})
  const { onFoldersList  } = useFolders()
  const { state, onFolderSearch  } = useFolders()
  const { onLoadData, onChangeButton, isChangeButton  } = useContext(AuthContext)
  const location = useLocation()
  const { q = '' } = queryString.parse( location.search )

  const onSubmitInputValue = (e) =>{
    e.preventDefault()

    if( !isChangeButton ){
      const formData = new FormData()
      formData.append(`${q}/archivo`, setselectedFile)
      onSendFile(formData)
      console.log(inputValue,setselectedFile)
    }
    else{
      if( inputValue.length <= 1 ) return ;
      onFolderSearch( inputValue )
      onResetInput()
    }

  }

  const onSendFile = async(formData) => {
    try {
      const resp = await fetch(`http://localhost:8080`, {
        method:'POST',
        body: formData
      }) 
      const resp2 = await resp.json()
      alert(JSON.stringify(resp2))
      window.location.reload()
    } catch (error) {
      alert(error)
    }
  }

  const onChangeButtonIn = (e) => {
    e.preventDefault()
    onChangeButton()
  }
  


  useEffect(() => {
    onLoadData(state)
    if(state === undefined)return;    
    onFoldersList(state)
  }, [state]);

  return (
  <div className="col text-center">

    <form onSubmit={ onSubmitInputValue }>

      <h1 className="text-white">{title}</h1>

      <input
        type={typeFile}
        className="form-control"
        value={inputValue}
        placeholder="Empiece la busquedad"
        name="inputValue"
        multiple
        onChange={onInputForm}
/>
      <button
      className="btn btn-primary mt-3"
      >{nameButton}</button>
      <button className="btn btn-outline-primary mt-3 ms-3" onClick={ onChangeButtonIn }>Cambiar</button>
    </form>
  </div>  
    
  )
}
