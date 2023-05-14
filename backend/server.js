const app = require('./app');

const connectDatabase = require('./config/database');

global.__basedir = __dirname; // Globally Declaring basedir to use in API files

// Handling Uncaught Exception eg. console.log(youtube) // Youtube is not defined
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

// Config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({path: "config/config.env"});
}

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://loalhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(() => {
        process.exit(1);
    })
})