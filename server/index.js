const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "*", // change "*" to your frontend URL if deploying
  credentials: true,
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);


app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

