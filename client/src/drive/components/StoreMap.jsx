/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useContext, useEffect } from 'react'
import '../css/StoreMap.css'
import { useFolders } from '../hooks/useFolders'
import { AuthContext } from '../../auth/context/AuthContext'
import queryString  from 'query-string'
import { useNavigate, useLocation } from 'react-router-dom'


export const StoreMap = () => {
  const { folders,isLoading,onFoldersList, onFilesList } = useFolders()
  const {dataInfo,onLoadDataFile} = useContext(AuthContext)
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search)
  
  // console.log('storeMap',folders)

  useEffect(() => {
    if(dataInfo === undefined)return;
    if(q ==='') {onFoldersList(dataInfo) }
  }, [dataInfo]);
  
  useEffect(() => {
    if(q==='') return 
    onLoadDataFile(q)
  }, [q]);

  const onChangeFiles = (e) => {
    const { innerText } = e.target
    navigate(`?q=${ innerText }`)
  }

  useEffect(() => {
    if( q === ''  || dataInfo === undefined) return;
    onFilesList(dataInfo)
  }, [dataInfo]);

  return (
    <>
    {
      !isLoading 
      ? <h1 className="text-white">Cargando datos...</h1> 
      : 
      folders?.map( (folder,key) => (
        <div key={key} className="row d-flex">

          <button
            name={folder}
            className="btn mt-4 d-flex buttonStore"
            onClick={onChangeFiles}
          >
            <div className="col-2">
              <img src="../../../public/images/folder.png" alt="" />
            </div>
            <div className="col-9 ">
              <h2 className="text-white">{folder}</h2>
            </div>
          </button>
          
        </div> 
      ))
    }

    </>
  )
}
