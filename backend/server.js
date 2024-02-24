require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000

// routers
const memberRoutes = require("./routes/members");
const eventRoutes = require("./routes/events");

app.use(cors())
app.use(express.json())

// routes
app.use("/members", memberRoutes);
app.use("/events", eventRoutes);


// connect to db
mongoose.connect(process.env.CONN, {dbName: "UBCANI"}).then(() => {
    app.listen(PORT, () => {
        console.log("App is running on port " + PORT)
    })
})
.catch((err) => console.log(err));