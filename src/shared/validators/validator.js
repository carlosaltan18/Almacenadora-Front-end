/* Validación de correo */
export const validateName = (name) =>{
    return (name)
}

export const validateLastname = (lastname) =>{
    return (lastname)
}


export const validateDescription = (description) =>{
    return (description)
}
export const validateStartDate = (startDate) =>{
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(startDate)
}
export const validateEndDate = (endDate) =>{
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(endDate)
}


export const validateUsername = (username)=>{
    const regex = /^\S{3,8}$/
    return regex.test(username)
}

/*--------------------- VALIDACIÓN DE CONTRASEÑA ---------------------------- */
export const validatePassword = (password)=>{
    const regex = /^\S{6,12}$/
    return regex.test(password)
}

/* --------------------- MENSAJES DE VALIDACIÓN DE CAMPOS ------------------------------ */
export const usernameValidationMessage = 'El nombre de usuario debe ser de entre 3 y 8 caracteres, sin espacios.'
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios'
export const lastNameValidationMessage = 'Debe ingresar su apellido, sin espacios'
export const nameValidationMessage = 'Debe ingresar su nombre, sin espacios'

export const nameTaskValidationMessage = 'Debe ingresar el nombre de la tarea'
export const descriptionValidationMessage = 'Debes de ingresar la description de la tareas'

export const starDateValidationMessage = 'Debes de ingresar la fecha de inicio en yyyy/MM/dd'
export const endDateValidationMessage = 'Debes de ingresar la fecha de finalización en yyyy/MM/dd'



