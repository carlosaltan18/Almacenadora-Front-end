import { useState } from "react";
import toast from "react-hot-toast";
import { registerRequest } from "../../services/api.js";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    

    const register = async(name,
        lastname,
        username, 
        password) =>{
        setIsLoading(true);
        const user = {
            name,
            lastname,
            username,
            password
        }

        //Consultar al API
        const response = await registerRequest(user);
        setIsLoading(false);
        
        if(response.error){
            //? para parametros opcionales
            if(response?.err?.response?.data?.errors){
                let arr = response?.err?.response?.data?.errors
                for (const error of arr) {
                  return toast.error(
                    error.msg
                  )
                }
              }
                return toast.error(
                    response?.err?.response?.data?.msg ||
                    response?.err?.data?.msg ||
                    'Error general al intentar registrar el usuario. Intenta de nuevo.'
                )
        }else {
          // Registro exitoso
          toast.success('¡Usuario registrado exitosamente!');
      }
      
  }

  return {
      register, 
      isLoading
  }
}
