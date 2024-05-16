const express = require("express");
const app = express();
const exits = require("../controller/exits");

// Add Exits
app.post("/add", exits.addExits);

// Get All Exits
app.get("/get/:userID", exits.getExitsData);
app.get("/getmonthly", exits.getMonthlyExits);

app.get("/get/:userID/totalsaleamount", exits.getTotalExitsAmount);

module.exports = app;
