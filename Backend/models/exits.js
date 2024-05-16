const mongoose = require("mongoose");

const ExitSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    schoolID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
      required: true,
    },
    stockSold: {
      type: Number,
      required: true,
    },
    exitDate: {
      type: String,
      required: true,
    },
    totalExitAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Exits = mongoose.model("exits", ExitSchema);
module.exports = Exits;
