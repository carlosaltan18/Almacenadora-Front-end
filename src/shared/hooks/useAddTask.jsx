import { useState } from "react";
import toast from "react-hot-toast";
import { addTaksRequest } from "../../services/api.js";

export const useAddTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async (name, description, startDate, endDate) => {
      setIsLoading(true);
      const data = {
          name,
          description,
          startDate,
          endDate
      };
      const response = await addTaksRequest(data);
      setIsLoading(false);
      if (response.error) {
          if (response?.err?.response?.data?.errors) {
              let arr = response?.err?.response?.data?.errors;
              arr.forEach(error => {
                  toast.error(error.msg);
              });
          } else {
              toast.error(
                  response?.err?.response?.data?.msg ||
                  response?.err?.data?.msg ||
                  'Error generating task. Try again.'
              );
          }
      } else {
          toast.success('Task registered successfully!');
      }
  };

  return {
      addTask,
      isLoading
  };
};