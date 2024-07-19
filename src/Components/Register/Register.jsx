import { useState } from "react"
import { Input } from "./Input.jsx"
import { validateName, validateLastname, validatePassword, validateUsername,
   passwordValidationMessage, nameValidationMessage, usernameValidationMessage,
  lastNameValidationMessage} from '../../shared/validators/validator.js'
import { useRegister } from '../../shared/hooks/UseRegister.jsx'
import './Register.css'

export const Register = ({switchAuthAndler}) => {
  const {register, isLoading} = useRegister();
  const [formData, setFormData] = useState(
    {
      name: {
        value: '',
        isValid: false,
        showError: false
      },
      lastname: {
        value: '',
        isValid: false,
        showError: false
      },
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
        }
      )
    
      const isSubmitButtonDisable = !formData.name.isValid ||
      !formData.lastname.isValid ||
      !formData.username.isValid ||
      !formData.password.isValid;

      const handleValueChange = (value, field) =>{
        setFormData((prevData) => (
          {
            ...prevData,
            [field]: {
              ...prevData[field],
              value
            }
          }
        ))
      }


      const handleValidateOnBlur = (value, field) =>{
        let isValid = false; 
        switch (field) {
          case 'name': 
            isValid = validateName(value);
          break;
          case 'lastname': 
            isValid = validateLastname(value);
          break;
          case 'username':
              isValid = validateUsername(value); 
          break;
          case 'password':
            isValid = validatePassword(value)
          break;
        }
        setFormData((prevData) => (
          {
            ...prevData,
            [field]: {
                ...prevData[field],
                isValid,
                showError: !isValid
            }
        }
        ))
      }


      const handleRegister = async(e) => {
        e.preventDefault();
        register(
            formData.name.value, 
            formData.lastname.value, 
            formData.username.value,
            formData.password.value,            
        )
    }
    const img = 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <>
    <div className=" al-div flex items-center justify-center  min-h-screen bg-100 w-full">
      <div className="content relative flex flex-col m-6 space-y-8 bg-white md:flex-row md:space-y-8 md:p-8">
      <form action="" className="flex flex-col items-center " onSubmit={handleRegister}>
        <h2 className="display-6 m-2 mb-3" >Registration</h2>
        <Input 
          field='name'
          label='Name'
          value={formData.name.value}
          onChangeHandler={handleValueChange}
          type='text'
          onBlurHandler={handleValidateOnBlur}
          showErrorMessage={formData.name.showError}
          validationMessage={nameValidationMessage}
          
        />
        <Input 
          field='lastname'
          label='Lastname'
          value={formData.lastname.value}
          onChangeHandler={handleValueChange}
          type='text'
          onBlurHandler={handleValidateOnBlur}
          showErrorMessage={formData.lastname.showError}
          validationMessage={lastNameValidationMessage}
        />
        <Input
          field='username'
          label='Username'
          value={formData.username.value}
          onChangeHandler={handleValueChange}
          type='text'
          onBlurHandler={handleValidateOnBlur}
          showErrorMessage={formData.username.showError}
          validationMessage={usernameValidationMessage}
        />
        <Input
          field='password'
          label='Password'
          value={formData.password.value}
          onChangeHandler={handleValueChange}
          type='password'
          onBlurHandler={handleValidateOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        
        <button onClick={handleRegister} disabled={isSubmitButtonDisable} size='lg' className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
        <span onClick={switchAuthAndler} className="cursor-pointer block  bottom-8 text-#fff-700">
        ¿Ya tienes una cuenta? ¡Inicia sesión acá!
        </span>
      </form>
      
      
    </div>
    
  </div> 
  </>
  
  )
}

