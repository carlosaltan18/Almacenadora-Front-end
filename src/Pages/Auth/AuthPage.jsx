import { Login } from "../../Components/Login/Login.jsx";
import { Register } from "../../Components/Register/Register.jsx";

/* Importar css o cualquier paquete adicional*/
import { useRoutes } from "react-router-dom";
import { testConnection } from "../../services/api.js"
import { useState, useEffect } from "react"
//import { routes } from ".routes.jsx"

import './AuthPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await testConnection();
        console.log("Conexión exitosa:", isConnected);
      } catch (error) {
        console.error("No se pudo conectar al servidor", error);
      }
    };

    checkConnection();
  }, []); 


  const handleAuthPage = ()=>{
    setIsLogin((prev)=> !prev)
  }


  
  return (
    <div className="auth-container">
    {
      isLogin ? (
        <Login switchAuthAndler={handleAuthPage} />
      ) : (
        <Register switchAuthAndler={handleAuthPage}/>
      )
    
    
   }
 
    </div>

)
}