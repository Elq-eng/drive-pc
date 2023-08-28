import { useContext } from 'react'
import '../styles/styleLogin.css'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate()

  const login = () =>{
    const lastPath = localStorage.getItem('lastPath') || '/drive';
    onLogin('Elquin Cascavita')
    navigate( lastPath, { replace: true})
  }

  return (
      <div className="contenedor">
        <div className="loginDiv">
          <h1 className="text-white">Bienvenido a Drive</h1>
          <button
          onClick={login}
          className="btn btn-primary">Login</button>
        </div>
      </div>

    )


}
