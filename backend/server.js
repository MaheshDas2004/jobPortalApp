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

app.get('/', (req, res) => {
  res.send("Job Portal Backend is running");
});

app.use("/api/auth/candidate", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/auth/employee", require("./routes/employeeAuth"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});