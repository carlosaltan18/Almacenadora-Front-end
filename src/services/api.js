
import axios from "axios"

const apiClient = axios.create({
    //baseURL: 'http://localhost:2656/',
    baseURL: 'https://almacenadora-backend-main.vercel.app/',
    timeout: 1000
})
apiClient.interceptors.request.use(
    (config)=>{
        const userDetails = localStorage.getItem('user')
        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `${token}`
            console.log(token)
        }
        return config
    },
    (err)=> Promise.reject(err)
)

//Aqui necesitamos exportar métodos del backend hacia el front
export const testConnection = async () => {
    try {
      // Realiza una solicitud GET de prueba al servidor backend
      const response = await axios.get("https://almacenadora-backend-main.vercel.app/");
      
      // Si la solicitud tiene éxito, devuelve true
      return true;
    } catch (error) {
      // Si hay algún error, devuelve false
      return false;
    }
  };
// //////////////////////////////////////////////////// //
// ///////////  Métodos Post UwU ///////////////////// //
// //////////////////////////////////////////////////// //

//Método Login para el usuario -> HACER UN HOOK
export const loginRequest = async(user)=>{
    try {
        return await apiClient.post('user/login', user)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const registerRequest = async(user)=>{
  try {
      return await apiClient.post('user/signUp', user)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const addTaksRequest = async (data) => {
    try {
        //const token = localStorage.getItem("token");
        //console.log(token)
    
        return await apiClient.post('task/add', data);
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const getAllTask = async () => {
    try {
        const res = await apiClient.get('task/getAll')
        return res.data
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const editTaskRequest = async (id, task) => {
    try {
        return await apiClient.put(`task/edit/${id}`, task)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteTaskRequest = async (id) => {
    try {
        return await apiClient.delete(`task/delete/${id}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateStateTaskRequest = async (id)=> {
    try {
        return await apiClient.put(`task/completeTask/${id}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}