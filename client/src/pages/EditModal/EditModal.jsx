import React, { useEffect, useState } from "react";
import './EditModal.css';


function EditModal({userId, taskId, taskData, onClose, fetchTasks}){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastEdited, setLastEdited] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title || '');
      setDescription(taskData.description || '');
      setLastEdited(taskData.lastModified || '');
      setStatus(taskData.status || '');
    }
  }, [taskData]);

  useEffect(() => {
    if (!taskId) return;

    const timeout = setTimeout(() => {
      saveTask();
    }, 1000);

    return () => clearTimeout(timeout); 
  }, [title, description, taskId, status]);

  const saveTask = async () => {
    try{
      console.log("Title is", title);
      const updatedTask = {
        userId: userId,
        taskId: taskId,
        title: title,
        description: description,
        lastModified: new Date().toISOString(),
        status: status
      }
      console.log("Saving", updatedTask);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      const result = await res.json();
      console.log(result);
      setLastEdited(updatedTask.lastModified);
      
      if(fetchTasks) fetchTasks();
    }catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleStatusToggle = () => {
    const newStatus = status === 'complete' ? 'incomplete' : 'complete';
    setStatus(newStatus);
  };

  const handleDone = () => {
    saveTask();
    onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={handleDone}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
          />
        </h2>
  
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="modal-textarea"
        />
  
        <div className="modal-status-row">
          <label className="status-toggle">
            <input
              type="checkbox"
              checked={status === 'complete'}
              onChange={handleStatusToggle}
              className="status-checkbox"
            />
            <span>{status === 'complete' ? 'Completed' : 'Pending'}</span>
          </label>
          <p className="last-edited">Last edited: {new Date(lastEdited).toLocaleString()}</p>
        </div>
  
        <div className="modal-actions">
          <button className="done-button" onClick={handleDone}>Done</button>
          <button className="delete-button" disabled>
            <svg className="dustbin-icon" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;