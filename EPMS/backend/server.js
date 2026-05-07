const express = require("express");
const cors = require("cors");

const app = express();


app.use(express.json());

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");

app.use(cors({
  origin: "http://localhost:5173",
  withCredentials: true
}));

app.use(express.json());
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
dotenv.config();
connectDB();

app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/salaries", require("./routes/salaryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));