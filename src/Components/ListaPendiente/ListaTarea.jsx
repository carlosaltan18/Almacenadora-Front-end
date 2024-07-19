import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useGetTasks } from '../../shared/hooks/useGetTask'
import editIcon from '../../../src/assets/img/editIcon.png'
import trashIcon from '../../../src/assets/img/eliminar.png'
import { EditTask } from '../editTask/EditTask.jsx'
import { DeleteTask } from '../deleteTask/DeleteTask.jsx'
import { useDeleteTask } from '../../shared/hooks/useDeleteTask.jsx'
import { useUpdateStateTask } from '../../shared/hooks/useUpdateStateTask.jsx'

export const ListaTarea = () => {
  const { getTasks, isLoading, tasks } = useGetTasks()
  const { deleteTask } = useDeleteTask()
  const { updateState } = useUpdateStateTask()
  const [selectedTask, setSelectedTask] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    getTasks()
  }, [])

  const openEditForm = (task) => {
    console.log(task)
    setSelectedTask(task)
    setShowEditForm(true)
    getTasks()
  }

  const closeEditForm = () => {
    setSelectedTask(null)
    setShowEditForm(false)
    getTasks()

  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const isoDate = date.toISOString().split('T')[0]
    const isoDateParts = isoDate.split('-')
    return `${isoDateParts[0]}-${isoDateParts[1]}-${isoDateParts[2]}`
  }

  const getBackgroundColor = (state) => {
    switch (state) {
      case 'INCOMPLETE':
        return 'red'
      case 'COMPLETE':
        return 'yellow'
      default:
        return 'white'
    }
  }

  const openDelForm = (task) => {
    setSelectedTask(task)
    setShowConfirmDelete(true)
    getTasks()
  }

  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask._id)
      getTasks()
      setSelectedTask(null)
      setShowConfirmDelete(false)
      window.location.reload();
    }
  }

  const cancelDelete = () => {
    setSelectedTask(null)
    setShowConfirmDelete(false)
    getTasks()
  }

  const handleCheckboxChange = (task) => {
    updateState(task._id)
    window.location.reload();
  }

  return (
    <div className="container">
      {isLoading ? (
        <p>Cargando tareas...</p>
      ) : (
        <>
          {showEditForm && <EditTask task={selectedTask} onClose={closeEditForm} />}
          {showConfirmDelete && <DeleteTask onDelete={confirmDelete} onCancel={cancelDelete} />}
          <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-hover  table-dark ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">State</th>
                  <th scope="col">Name Creator</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{formatDate(task.endDate)}</td>
                    <td style={{
                      color: getBackgroundColor(task.state),
                      textAlign: 'center',
                      display: 'flex'
                    }}>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id={`taskCheckbox-${index}`}
                          onChange={() => handleCheckboxChange(task)}
                          checked={task.state === 'COMPLETE'}
                        ></input>
                      </div>{task.state}</td>
                    <td>{task.nameCreator} {task.lastnameCreator}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={editIcon}
                          alt="Editar"
                          style={{ cursor: 'pointer', width: '20px', marginRight: '20%' }}
                          onClick={() => openEditForm(task)}
                        />
                        <img
                          src={trashIcon}
                          alt="Eliminar"
                          style={{ cursor: 'pointer', width: '20px' }}
                          onClick={() => openDelForm(task)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </>
      )}
    </div>
  )
}
