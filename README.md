# 📝 Task Manager App  
*A Google Keep–inspired MERN stack productivity tool*

---

## 🚀 Overview

Welcome to the **Task Manager App**, my latest creation built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack.

Designed for simplicity and speed, the UI takes inspiration from **Google Keep**, offering a clean, intuitive interface for managing daily tasks and notes.

---

## ✨ Features (Completed)

### 🔐 Authentication & Access Control
- Fully functional **Login & Signup**
- Secure route protection (dashboard only accessible when logged in)
- Validation feedback for:
  - Invalid email format
  - Minimum password length
  - Minimum username length
  - User not found (login)

### 🧠 Task Creation & Editing
- Create new tasks via `+` button on the bottom-right
- Tasks editable via modal with live preview sync to dashboard
- Toggle task status between `pending` and `completed`

### 🔄 Auto-Save Functionality
Tasks are saved automatically in the following scenarios:
- ✅ Clicking **Done** while editing
- ⏱️ **1-second debounce** after user stops typing
- 🔁 Changing task status
- 🖱️ Clicking outside the modal
- 🔄 Dashboard reflects updates in real-time after each save

---

## 🧪 Features in Progress

- 🔃 **Drag and reorder tasks** via drag-and-drop in the grid
- ⏰ **Task deadlines**
- 🗑️ **Task deletion**
- 🏷️ **Labeling / Tagging support**
- 🔐 **Google OAuth login**

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** JSON (to be updated to Mongo)
- **Authentication:** Local Storage
- **Styling:** Custom CSS
- **Hosting:** Render.com (Backend) & Vercel (Frontend)

---

## ⚙️ API Endpoints
GET /api/tasks?userId=:id → Fetch all tasks
POST /api/tasks/create → Create a new task
GET /api/tasks/edit → Fetch a task by ID
POST /api/tasks/update → Save or update a task
