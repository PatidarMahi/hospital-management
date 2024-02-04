const express = require('express');
const cors = require("cors");
const { connection } = require('./Config/database');
const { ErrorMiddleware } = require('./Middleware/Error');
const sls = require('serverless-http');
const patientRoutes = require('./Routes/patientRoute');
const app = express();
const path = require('path');
const hospitalRoutes = require('./Routes/hospitalRoute');
const psychiatristRoutes = require('./Routes/psychiatristRoutes');


app.use(express.json());

app.use(cors({
    origin: "*"
}));


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/", (req, res) => {
    res.send({ Message: "Welcome to Hospital Management" });
});

// Routes
app.use(hospitalRoutes);
app.use(psychiatristRoutes);
app.use(patientRoutes);



app.listen(process.env.PORT || 4700, async () => {
    try {
        await connection;
        console.log(`Connected to the Database at ${process.env.PORT}`);
    }
    catch (err) {
        console.log({ err });
        console.log("Connection Failed!");
    }
    console.log(`Server is running...`);
});

app.use(ErrorMiddleware);

module.exports.handler = sls(app);