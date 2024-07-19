import { useState } from "react"
import toast from "react-hot-toast"
import { getAllTask } from "../../services/api.js"

export const useGetTasks = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([])
  
    const getTasks = async () => {
      setIsLoading(true)
      try {
        const response = await getAllTask()
        setIsLoading(false)
        if (response.error) {
          toast.error(
            response?.err?.response?.data?.msg ||
              response?.err?.data?.msg ||
              "Error getting tasks. Try again."
          )
        } else {
          setTasks(response.tasks)
        }
      } catch (error) {
        console.error(error)
        setIsLoading(false)
        toast.error("Error getting tasks. Try again.")
      }
    }
  
    return {
      getTasks,
      isLoading,
      tasks,
    }
  }