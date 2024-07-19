import { useState } from "react";
import toast from "react-hot-toast";
import { editTaskRequest } from "../../services/api";

export const useEditTask = () => {
    const [updatedTask, setUpdatedTask] = useState(null)

    const updateTask = async(id, task)=>{
        const response = await editTaskRequest(id, task)
        if(response.error){
            toast.error(
                response?.err?.response?.data?.message ||
                'Error updating task'
            )
        }
        setUpdatedTask(response.data)
        toast.success('Task updated successfully')
    }
  return {
    updatedTask,
    isFetching: !updateTask,
    updateTask
  }
}