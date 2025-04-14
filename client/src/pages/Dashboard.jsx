import React ,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditModal from "./EditModal/EditModal.jsx";
import './Dashboard.css';
import FinzarcLogo from '../assets/finzarc_logo.jpg';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    console.log(userId);

    const [showModal, setModal] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [taskData, setTaskData] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks?userId=${user.id}`);
            const data = await res.json();
            console.log(data);
            setTasks(data || {}); // Add this line to update state
        }
        catch (err) {
            console.error('Fetch error:', err);
            alert("Something went wrong :/");
        }
    }


    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user?.id]); 


        const editTasks = async (taskToEditId) => {
            try{
                console.log("Sending for editing",taskToEditId);
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/edit?userId=${userId}&taskId=${taskToEditId}`);
                const data = await res.json();
                console.log("editing",data.taskId, data.taskData);
                setTaskData(data.taskData);
                setTaskId(taskToEditId);
                setModal(true);
            }
            catch (err) {
                console.error("Error fetching task data:", err);
            }
        };

                
        const createNewTask = async (e) => {
            try{
                
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/create`, {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({ userId }),
                    })
                
                const data = await res.json();
                console.log("New Task ID is : ", data.taskId, data.task);
                if (data){
                    const newTaskId = data.taskId;
                    setTaskId(newTaskId);
                    editTasks(newTaskId);
                }
                
                
            }catch (err) {
                console.error('Fetch error:', err);
                alert("Something went wrong :/");
              }
        };

    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="dashboard-container">
             <div className="logo-container">
                <img src={FinzarcLogo} alt="Finzarc Logo" className="logo-image" />
            </div>
          <header className="dashboard-header">
            <h1 className="welcome-message">Welcome to the Finzarc Task Manager App {user.id.split('@')[0]}!</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </header>
      
          <div className="tasks-grid">
            {Object.entries(tasks).map(([taskId, task]) => (
              <div 
                key={taskId} 
                className="task-card"
                onClick={() => editTasks(taskId)}
              >
                <h3>{task.title || 'Untitled Task'}</h3>
                <p className="task-description">
                  {task.description || 'No description'}
                </p>
                <div className="task-footer">
                  <span className={`task-status ${task.status === 'complete' ? 'completed' : 'pending'}`}>
                    {task.status === 'complete' ? '✓ Completed' : '◯ Pending'}
                  </span>
                  <span className="task-modified">
                    {new Date(task.lastModified).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
      
          <button 
            className="new-task-button"
            onClick={createNewTask}
            aria-label="Add new task"
          >
            <span className="plus-icon">+</span>
          </button>
      
          {showModal && (
            <EditModal
              userId={userId}
              taskId={taskId}
              taskData={taskData}
              onClose={() => setModal(false)}
              fetchTasks={fetchTasks}
            />
          )}
        </div>
      );
    }

export default Dashboard;