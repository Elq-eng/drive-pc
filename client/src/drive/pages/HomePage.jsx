import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import { InputFilter } from "../components/InputFilter.jsx";
import { StoreMap } from "../components/StoreMap.jsx";
import { useFecth } from "../hooks/useFecth.js";
import queryString from "query-string";
import { useLocation } from 'react-router-dom' 


export const HomePage = () => {

  const { user, onLogout } = useContext(AuthContext);
  let { onLoadData, isChangeButton } = useContext(AuthContext);
  const { data } = useFecth('http://localhost:8080/folders/storage')
  const navigate = useNavigate()
  const location = useLocation()

  const { q = '' } = queryString.parse( location.search )

  const logout = () => {
    onLogout()
    localStorage.removeItem('folders')
    navigate('/')
  }

  const onTest = (folders) => {
    if( q==='') onLoadData( folders )
  }

  useEffect(() => {
    if (data === null) return ;
    onTest(data)
  }, [ data ])

  
  return (
    <>
    <div className="d-flex justify-content-between">
      <h1 className="text-white"> { user.name } </h1>
      <button
      onClick={logout}
      className="btn btn-danger"> Salir </button>
    </div>

    <section className="row">
    {
      isChangeButton 
      ? <div className="col-12">
          <InputFilter title='Busqueda' typeFile='text' nameButton='Buscar'/>
        </div>
      : 
      <div className="col-12">
        <InputFilter title="Subir Archivos" typeFile='file' nameButton='Subir' />
      </div>
    }


      <StoreMap />
    
    </section>

    
    </>
  )
}
