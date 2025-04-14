import React ,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditModal from "./EditModal/EditModal.jsx";

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    console.log(userId);

    const [showModal, setModal] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try{
                const res = await fetch(`http://localhost:5000/api/tasks?userId=${user.id}`);

            const data = await res.json();
            console.log(data);
            }
            catch (err) {
                console.error('Fetch error:', err);
                alert("Something went wrong :/");
              }
            }

        if (user) 
            {fetchTasks();}
        },);


        const editTasks = async (taskToEditId) => {
            try{
                console.log("Sending for editing",taskToEditId);
                const res = await fetch(`http://localhost:5000/api/tasks/edit?userId=${userId}&taskId=${taskToEditId}`);
                const data = await res.json();
                console.log("editing",data.taskId, data.taskData);
                setTaskData(data.taskData);
                setModal(true);
            }
            catch (err) {
                console.error("Error fetching task data:", err);
            }
        };

                
        const createNewTask = async (e) => {
            try{
                
                const res = await fetch('http://localhost:5000/api/tasks/create', {
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
        <div>
           <h1>Welcome to your dashboard {user.id} </h1>
           <br>
           </br>
           <button type="submit" onClick={createNewTask}>+</button>
           <br>
           </br>
           
           <button type="submit" onClick={handleLogout}>Logout</button>
           {showModal && (
    <EditModal
        userId={userId}
        taskId={taskId}
        taskData={taskData} // You can even pass empty {} for now
        onClose={() => setModal(false)}
    />
)}
        </div>


    )
};

export default Dashboard;