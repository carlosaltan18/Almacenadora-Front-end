import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLogin } from "../../shared/hooks/UseLogin.jsx";
import './login.css' 

//importe de iconos


export const Login = ({ switchAuthAndler }) => {
  
  // ///////////////////////////////////// //
  /*        Codigo para validar datos      */
  // ///////////////////////////////////// //
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    username: {
      value: '',
      isValid: false,
      showError: false
    },
    password: {
      value: '',
      isValid: false,
      showError: false
    }
  });

  // Boton para validar la información
  const isSubmitButtonDisable = !formData.username.isValid || !formData.password.isValid;
  
  //No hare un OnBlur (el que cuando te sale marca error) por estetica
  
  //Este pedira los datos
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e)
    console.log(formData.username.value)
    if (formData.username.isValid && formData.password.isValid) {
      login(formData.username.value, formData.password.value);
    }
    setFormData({
      username: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      }
    })
    
  };
  
  
  
  // ///////////////////////////////////// //
  /* Codigo de la animación de los inputs */
  // ///////////////////////////////////// //
  useEffect(() => {
    //Se importa la clase de input
    const inputs = document.querySelectorAll(".form__input");
    //Se agrega la animación para que suba
    function addFocus() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }
    //Funcion para que baje
    function removeFocus() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach(input => {
      input.addEventListener("focus", addFocus);
      input.addEventListener("blur", removeFocus);

      return () => {
        input.removeEventListener("focus", addFocus);
        input.removeEventListener("blur", removeFocus);
      };
    });
  });

  const handleChange = (e)=>{
    console.log(e.target)
    setFormData((prevData)=> (
      {
        ...prevData,
        [e.target.name]: {
          ...prevData[e.target.name],
          value: e.target.value,
          isValid: true
        }
      }
    ))
  }
  
  /* /////////////// */
  /* Este es el JSX*/
  /* /////////////// */
  return (
    <div className="content flex items-center justify-center min-h-screen bg-#606d80-100 w-full">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            My friend, Please fill the fields :3
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">User</span>
            <input value={formData.username.value} onChange={handleChange} name='username' type="username" className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" />             
              
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            
            <input value={formData.password.value} onChange={handleChange} name='password' type="password" className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" />
            
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={handleLogin}
          >
            Sign in
          </button>
          
          <div className="text-center text-gray-400 ">
            Don't have an account?
            <span className="font-bold text-black px-2" onClick={switchAuthAndler} >Sign up for free</span>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src="https://www.corporacionbi.com/gt/almaguate/wp-content/uploads/2022/12/Bodf.png"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-#000 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              -Nuestro deber es facilitarte la vida
              <br />
              -Programa de almacenadora de kinal
              <br />
              -Grupo 7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

