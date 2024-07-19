import React, { useState, useEffect } from 'react'
import '../editTask/EditTask.css'
import { useEditTask } from '../../shared/hooks/useEditTask.jsx'
import cancelBtn from '../../../src/assets/img/cancelar.png'
import { useGetTasks } from '../../shared/hooks/useGetTask'

export const EditTask = ({ task, onClose }) => {
  const { updateTask } = useEditTask()
  const { getTasks, isLoading, tasks } = useGetTasks()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const isoDate = date.toISOString().split('T')[0]
    return isoDate
  }

  const [formData, setFormData] = useState({
    name: task.name,
    description: task.description,
    startDate: formatDate(task.startDate),
    endDate: formatDate(task.endDate),
    state: task.state
  })


  useEffect(() => {
    setFormData({
      name: task.name,
      description: task.description,
      startDate: formatDate(task.startDate),
      endDate: formatDate(task.endDate),
      state: task.state
    }, 
    getTasks())
  }, [task])

  const handleValueChange = (e, fieldName) => {
    const { value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }

  const handleEditTask = (e) => {
    e.preventDefault()
    updateTask(task._id, formData)
  }

  return (
    <div className="edit-task-overlay">
      <div className="edit-task-modal">
        <div className="modal-header">
          <img src={cancelBtn} className="close-btn" onClick={onClose}></img>
        </div>
        <form className="form" onSubmit={handleEditTask}>
          <h1 class="display-6">Form to edit task</h1>
          <br></br>
          <label htmlFor="name">Name Task</label>
          <div class="input-group input-group-sm mb-3">
            <input
              class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              id="name"
              type="text"
              value={formData.name}
              required
              onChange={(e) => handleValueChange(e, 'name')}
            />
          </div>

          <label htmlFor="description">Description Task</label>
          <div class="input-group input-group-sm mb-3">
            <input
              class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
              id="description"
              type="text"
              required
              value={formData.description}
              onChange={(e) => handleValueChange(e, 'description')}
            />
          </div>


          <label htmlFor="startDate">Start Date of task</label>
          <input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleValueChange(e, 'startDate')}
          />

          <label htmlFor="endDate">End date of task</label>
          <input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleValueChange(e, 'endDate')}
          />
          <br></br>
          <label htmlFor="endDate">State</label>
          <select
            class="form-select form-select-sm" aria-label="Small select example"
            id="state"
            value={formData.state}
            onChange={(e) => handleValueChange(e, 'state')}
          >
            <option value="INCOMPLETE">INCOMPLETE</option>
            <option value="COMPLETE">COMPLETE</option>
          </select>
          <br></br>
          <button type="submit" class="btn btn-dark">Edit Task</button>
        </form>
      </div>
    </div>
  )
}
