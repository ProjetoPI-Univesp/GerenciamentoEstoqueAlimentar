const Exits = require("../models/exits");
const soldStock = require("./soldStock");

// Add Exit
const addExits = (req, res) => {
  const newExit = new Exits({
    userID: req.body.userID,
    productID: req.body.productID,
    schoolID: req.body.schoolID,
    stockSold: req.body.stockSold,
    exitDate: req.body.exitDate,
    totalExitAmount: req.body.totalExitAmount,
  });

  newExit
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.stockSold);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Exits Data
const getExitsData = async (req, res) => {
  const findAllExitsData = await Exits.find({ "userID": req.params.userID })
    .sort({ _id: -1 })
    .populate("productID")
    .populate("schoolID"); // -1 for descending order
  res.json(findAllExitsData);
};

// Get total exits amount
const getTotalExitsAmount = async (req, res) => {
  let totalExitAmount = 0;
  const exitsData = await Exits.find({ "userID": req.params.userID });
  exitsData.forEach((exit) => {
    totalExitAmount += exit.totalExitAmount;
  });
  res.json({ totalExitAmount });
};

const getMonthlyExits = async (req, res) => {
  try {
    const exits = await Exits.find();

    // Initialize array with 12 zeros
    const exitsAmount = [];
    exitsAmount.length = 12;
    exitsAmount.fill(0);

    exits.forEach((exit) => {
      const monthIndex = parseInt(exit.exitDate.split("-")[1]) - 1;

      exitsAmount[monthIndex] += exit.totalExitAmount;
    });

    res.status(200).json({ exitsAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addExits, getMonthlyExits, getExitsData, getTotalExitsAmount };
