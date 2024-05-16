const express = require("express");
const app = express();
const school = require("../controller/school");

// Add School
app.post("/add", school.addSchool);

// Get All School
app.get("/get/:userID", school.getAllSchools)

module.exports = app;
