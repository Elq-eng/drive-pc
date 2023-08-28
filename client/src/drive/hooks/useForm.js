import { useContext, useState } from 'react'
import { AuthContext } from '../../auth/context/AuthContext';

export const useForm = (initialState = {}) => {

  const [formState, setFormState] = useState(initialState);
  const [setselectedFile, setSetselectedFile] = useState(null);
  const { isChangeButton } = useContext(AuthContext);  

  const onInputForm = ({target}) =>{
    // TODO: MIRAR COMO ENVIAR EL FILES
    if(!isChangeButton){
      const { name,value, files } = target 
      console.log(name, {...files})
      setFormState({[name]: value})
      setSetselectedFile(files[0])
      
    }
    else{
      const { name, value } = target
      setFormState({
        ...formState,
        [name]: value
      })
    }
  }

  const onResetInput = () => {
    setFormState(initialState)
  }

  return {
    ...formState,
    formState,
    setselectedFile,
    onInputForm,
    onResetInput
  }
}
