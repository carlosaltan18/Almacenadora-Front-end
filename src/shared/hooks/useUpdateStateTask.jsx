import toast from "react-hot-toast";
import { updateStateTaskRequest } from "../../services/api";

export const useUpdateStateTask = () => {
    const updateState = async (id) => {
        const response = await updateStateTaskRequest(id)
        if (response.error) {
            return toast.error('You can mark only your tasks')
        }
        return toast.success('updated task status')
    }
    return {
        updateState
    }
}
