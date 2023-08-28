import queryString from "query-string";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const useFecth = (url= '') => {

  const location = useLocation()
  const { q = ''} = queryString.parse( location.search )
  

  const [state, setState] = useState({
    data:null,
    isLoading: false
  });


  const getFolders = async() =>{
    const resp = await fetch(url)
    const data = await resp.json()
    setState({
      data,
      isLoading: true
    })
  }



  useEffect(() => {
    if( q === '') { getFolders() }
  }, [url]);

  return {
    ...state
  }

}
