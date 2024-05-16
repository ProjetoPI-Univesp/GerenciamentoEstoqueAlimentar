require('dotenv').config();

const mongoose = require("mongoose");

const uri = `${process.env.DB_HOST}`;

function main() {
    mongoose.connect(uri).then(() => {
        console.log("Successful for BD");
    }).catch((err) => {
        console.log("Error: ", err);
    });
}

module.exports = { main };
