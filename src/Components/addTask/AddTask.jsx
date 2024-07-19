import { useEffect } from "react";
import { useState } from "react";
import { Input } from "../Register/Input.jsx";
import { useGetTasks } from '../../shared/hooks/useGetTask'
import { validateName, validateDescription, validateEndDate, validateStartDate, nameTaskValidationMessage, descriptionValidationMessage, starDateValidationMessage, endDateValidationMessage } from '../../shared/validators/validator.js';
import { useAddTask } from "../../shared/hooks/useAddTask.jsx";
import { useUserDetails } from "../../shared/hooks/useUserDetails.jsx"
import '../addTask/addTask.css'
import { ListaTarea } from "../ListaPendiente/ListaTarea.jsx";

export const AddTask = () => {
  const { addTask, isLoading } = useAddTask()
  const { isLogged, logoutSys } = useUserDetails()
  const { getTasks, tasks } = useGetTasks()


  const handleLogout = () => {
    logoutSys()
  }
  const [formData, setFormData] = useState(
    {
      name: {
        value: '',
        isValid: false,
        showError: false
      },
      description: {
        value: '',
        isValid: false,
        showError: false
      },
      startDate: {
        value: '',
        isValid: false,
        showError: false
      },
      endDate: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  );
  const isSubmitButtonDisable = !formData.name.isValid ||
    !formData.description.isValid ||
    !formData.startDate.isValid ||
    !formData.endDate.isValid;

  const handleValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ));
  };

  const handleValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'name':
        isValid = validateName(value);
        break;
      case 'description':
        isValid = validateDescription(value);
        break;
      case 'startDate':
        isValid = validateStartDate(value);
        break;
      case 'endDate':
        isValid = validateEndDate(value);
        break;
      default:
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
    ));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    /* const user = JSON.parse(localStorage.getItem('user'));
     const token = localStorage.getItem('token');
     const userId = user.uid;*/
    addTask(
      formData.name.value,
      formData.description.value,
      formData.startDate.value,
      formData.endDate.value
    );
    setFormData({
      name: { value: "", isValid: false, showError: false },
      description: { value: "", isValid: false, showError: false },
      startDate: { value: "", isValid: false, showError: false },
      endDate: { value: "", isValid: false, showError: false },
    })
  };

  return (
    <>
      <div className="container">
        <div className="al-img">
          <ListaTarea></ListaTarea>
        </div>
        <form
          className="form"
          onSubmit={handleAddTask}>
          <h1 class="display-6">Create your tasks</h1>
          <Input
            className='controls'
            field='name'
            label='Name Task'
            value={formData.name.value}
            onChangeHandler={handleValueChange}
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.name.showError}
            validationMessage={nameTaskValidationMessage}

          />
          <Input
            className='controls'
            field='description'
            label='Description Task'
            value={formData.description.value}
            onChangeHandler={handleValueChange}
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.description.showError}
            validationMessage={descriptionValidationMessage}

          />
          <Input
            className='controls'
            field='startDate'
            label='Start Date of task'
            value={formData.startDate.value}
            onChangeHandler={handleValueChange}
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.startDate.showError}
            validationMessage={starDateValidationMessage}

          />
          <Input
            className='controls'
            field='endDate'
            label='End date of task'
            value={formData.endDate.value}
            onChangeHandler={handleValueChange}
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.endDate.showError}
            validationMessage={endDateValidationMessage}

          />
          <button onClick={handleAddTask} disabled={isSubmitButtonDisable} className="al-btn text-#1f1f20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>
          <button onClick={handleLogout} className="al-btn text-#1f1f20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log out</button>
        </form>

      </div>
    </>
  )
}

