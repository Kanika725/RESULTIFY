const express = require("express");
const app = express();

var cors = require('cors');

require("dotenv").config({path: './config/config.env'});
const dbConfig = require("./config/db");
const PORT = 5000 | process.env.PORT;
app.use(express.json());
app.use(cors());

const employeeRoute = require("./routes/employeeRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");


app.use("/api/employee/", employeeRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultsRoute);


app.listen(PORT, ()=>{console.log(`Server running on PORT ${PORT}`)});