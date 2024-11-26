// Core packages==============================+++++++++++++================================
const path = require("path");                                     // Path
const dotenv = require("dotenv");                                 // Environment Variables
const express = require("express");                               // Express Framework
const mongoose = require("mongoose");                             // Mongoose ODM
const methodOverride = require("method-override");                // Method Override Middleware
const morgan = require("morgan");                                 // HTTP Request Logger
dotenv.config();                              // Load environment variables from .env file

const app = express();                      // Express App Instance
const miceController = require("./controllers/mice.js"); // Import the mice controller
const Mouse = require("./models/mouse.js"); // Import the mouse model into this file

// Set the view engine to ejs
// app.set("view engine", "ejs");

//DB CONNECTION============================================================================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`connected to the ${mongoose.connection.name} database.`);
});

// NODE MOUNTING============================================================================
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));// MIDDLEWARE
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new


// ROUTES===================================================================================

//GET / (views/index)
app.get("/", miceController.index);

// GET /mice (mice/index)
app.get("/mice", miceController.miceIndex);

// GET /mice/new (new)
app.get("/mice/new", miceController.newMice);

//GET /mice/:miceId (show)
app.get("/mice/:miceId", miceController.showMice);

// POST /mice (create)
app.post("/mice", miceController.createMice);

// DELETE /mice/:miceID (delete)
app.delete("/mice/:miceId", miceController.deleteMice);

// GET /mice/:miceID/edit (edit)
app.get("/mice/:miceID/edit", miceController.editMice);

// PUT /mice/:miceID (update)
app.put("/mice/:miceId", miceController.updateMice);

// LISTENER=================================================================================
app.listen(3003, () => {
  console.log("I can hear you on Port 3003");
});
