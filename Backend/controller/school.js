const School = require("../models/school");

// Add School
const addSchool = async (req, res) => {
    console.log(req.body)
  const addSchool = await new School({
    userID : req.body.userId,
    name: req.body.name,
    category: req.body.category,
    address: req.body.address,
    city: req.body.city,
    image: req.body.image
  });

  addSchool.save().then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
      console.log(err);
    });
};

// Get All Schools
const getAllSchools = async (req, res) => {
  const findAllSchools = await School.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllSchools);
};

module.exports = { addSchool, getAllSchools };
