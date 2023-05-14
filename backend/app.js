const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Route Imports
const user = require("./routes/userRoute");
const company = require("./routes/companyRoute");
const apply = require("./routes/applyRoute");
const upload = require("./routes/uploadRoute");
const coordinator = require("./routes/coordinatorRoute");
const exportRoute = require("./routes/exportRoute");
const interview = require("./routes/interviewRoute");
const announcement = require("./routes/announcementRoute");
const placements = require("./routes/placementsRoute");
const notification = require("./routes/notificationRoute");

app.use("/api/user", user);
app.use("/api/company", company);
app.use("/api/apply", apply);
app.use("/api/upload", upload);
app.use("/api/coordinator", coordinator);
app.use("/api/export", exportRoute);
app.use("/api/interview", interview);
app.use("/api/announcement", announcement);
app.use("/api/placements", placements);
app.use("/api/notification", notification);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
   // res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
   res.send("Server is running")
})

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app;