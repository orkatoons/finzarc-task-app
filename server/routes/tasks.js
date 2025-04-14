const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
const DATA = process.env.DATA_PATH || './data/users.json';

router.get('/tasks', async (req, res) => {
    const id = req.query.userId;
    console.log(id);
        if(!id){
            return res.status(400).json({"error":"Missing user ID"});
        }

    try{
        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (!users[id]){
            return res.status(404).json({"error":"User not found"});
        }
        const tasks = users[id].tasks || {};
        console.log(tasks);
        return res.status(200).json(tasks);


    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/tasks/create', async (req, res) => {
    try{
        const {userId} = req.body;
        const id = userId;

        if(!id){
            return res.status(400).json({"error":"Missing user ID"});
        }

        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (!users[id]){
            return res.status(404).json({"error":"User not found"});
        }

        const usertasks = users[id].tasks || {};
        const generateTaskId = (Object.keys(usertasks).length + 1).toString();

        const newTask = {
            title: "Untitled",
            description: "Description...",
            status: "incomplete",
            lastModified: Date.now()
        };

        usertasks[generateTaskId] = newTask;
        users[id].tasks = usertasks;

        console.log(`Created Task ${generateTaskId} for ${userId}`);

        await fs.writeFile(DATA, JSON.stringify(users, null, 2));

        return res.status(201).json({ taskId : generateTaskId, task:newTask });

    }
    catch (err)
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/tasks/edit', async (req, res) => {
    const {userId, taskId} = req.query;
    console.log(userId, taskId);
        if(!userId){
            return res.status(400).json({"error":"Missing user ID"});
        }

    try{
        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (!users[userId]){
            return res.status(404).json({"error":"User not found"});
        }

        const task = users[userId].tasks[taskId];
        console.log("sending back ",task);
        return res.status(200).json({taskId:taskId, taskData: task});


    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/tasks/update', async (req, res) => {
    try{
        const {userId, taskId, title, description, lastModified, status} = req.body;
        const id = userId;
        console.log(req.body);

        if(!id){
            return res.status(400).json({"error":"Missing user ID"});
        }

        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (!users[id]){
            return res.status(404).json({"error":"User not found"});
        }

        const task = users[userId].tasks[taskId];
        task.title = title;
        task.description = description;
        task.lastModified = lastModified || new Date().toISOString();
        task.status = status;

        users[id].tasks[taskId] = task;

        console.log(`Updated Task ${taskId} for ${userId}`);

        await fs.writeFile(DATA, JSON.stringify(users, null, 2));

        return res.status(200).json({ "message" : "Task Updated Successfully" });

    }
    catch (err)
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;