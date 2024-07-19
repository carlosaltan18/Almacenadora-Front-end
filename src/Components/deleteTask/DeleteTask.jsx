import React from 'react';
import '../deleteTask/DeleteTask.css'

export const DeleteTask = ({ onDelete, onCancel }) => {
  return (
    <div className="confirm-delete-box">
      <div className="confirm-delete-content">
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
        <div className="confirm-delete-buttons">
          <button type="button" class="btn btn-success" onClick={onDelete}>Confirm</button>
          <button type="button" class="btn btn-danger" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}