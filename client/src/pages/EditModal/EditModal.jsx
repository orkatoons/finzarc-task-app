import React, { useEffect, useState } from "react";
import './EditModal.css';


function EditModal({userId, taskId, taskData, onClose}){
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
    if (!taskId) return; // Don't run if no taskId

    const timeout = setTimeout(() => {
      saveTask(); // auto-save after 1s of no changes
    }, 1000);

    return () => clearTimeout(timeout); // clear timeout on retype
  }, [title, description, taskId]); // Watching title and description for changes
  
  const saveTask = async () => {
    try{
      const updatedTask = {
        userId: userId,
        taskId: taskId,
        title: title,
        description: description,
        lastModified: new Date().toISOString(),
        status: status
      }
      console.log("Saving", updatedTask);
      const res = await fetch('http://localhost:5000/api/tasks/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      const result = await res.json();
      console.log(result);
      setLastEdited(updatedTask.lastModified);
    }catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDone = () => {
    saveTask(); // final save
    onClose();  // close modal
  };

    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <h2>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
            </h2>

            <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p>Last edited: {lastEdited}</p>

            <button>
            {taskData?.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
            </button>

        <div className="modal-actions">
          <button onClick={handleDone}>Done</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
    );
}

export default EditModal;