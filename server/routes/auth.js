const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
const DATA = path.join(__dirname, '..','db','users.json');

//Simple Login & Register logic
router.post('/register', async (req, res) => {
    try{
        const { id, password, email } = req.body;

        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (users[id])
        {
            return res.status(409).json({ error: 'User exists' });
        }

        users[id] = { password, email, tasks: {} }; //Using JSON for quick access and development

        await fs.writeFile(DATA, JSON.stringify(users, null, 2));
        return res.status(200).json({ success: 'Registeration Successful' });

    }
    catch (err)
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { id, password } = req.body;

        const data = await fs.readFile(DATA, 'utf-8');
        const users = JSON.parse(data);

        if (!users[id])
        {
            return res.status(404).json({ error: 'User not found' });
        }

        if (users[id].password != password)
        {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'Login Successful', user:{id, email:users[id].email} });
  
        }

    catch (err)
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    // Not using JWT but for good practice
    return res.status(200).json({ message: 'Logged out successfully' });
  });

  module.exports = router;