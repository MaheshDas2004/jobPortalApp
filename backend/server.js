require('dotenv').config();
const express = require("express");
const connectDB = require("./config/conn");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send("Job Portal Backend is running");
});

app.use("/api/auth/candidate", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/auth/employer", require("./routes/employerAuth"));
app.use("/api/applications", require("./routes/application"));

const http = require('http');
const { initSocket } = require('./config/socket');

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});