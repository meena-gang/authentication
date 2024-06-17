const express = require("express");
const connection = require('./config/db')
const userRouter = require('./routes/user.route')

const server = express();
server.use(express.json());
server.use('/user',userRouter);



server.listen(3000, async() => {
    try {
    await connection;
    console.log('Server is running on port 3000 and database is connected');
    } catch (error) {
        console.log('Error in connecting to database');
    }
})