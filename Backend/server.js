const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const schoolRoute = require("./router/school");
const purchaseRoute = require("./router/purchase");
const exitsRoute = require("./router/exits");
const cors = require("cors");
const User = require("./models/users");


const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// School API
app.use("/api/school", schoolRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Exits API
app.use("/api/exits", exitsRoute);


app.get("/api/register", async (req, res) => {
  try {
    const newUser = new User(req.query);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------


// Here we are listening to the server
app.listen(PORT, () => {
  console.log("Running in port: " + PORT);
});
