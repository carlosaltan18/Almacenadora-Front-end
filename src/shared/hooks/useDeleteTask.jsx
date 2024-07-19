import toast from 'react-hot-toast'
import { deleteTaskRequest } from '../../services/api'

export const useDeleteTask = () => {
    const deleteTask = async (id) => {
        const response = await deleteTaskRequest(id)
        if (response.error) {
            return toast.error('You can delete only your tasks')
        }
        return toast.success('Deleted task')
    }
    return {
        deleteTask
    }
}