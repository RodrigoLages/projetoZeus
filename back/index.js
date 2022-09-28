const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Config CORS
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Config JSON response
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// User Model
const User = require("./models/User");

// Open route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Eae galerinha do balacobaco"});
});

// Private Route
app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id;

  // check if user exists
  const user = await User.findById(id, '-password');
  if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ msg: "Usuário não logado" });
  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(403).json({ msg: 'Token inválido' });
    console.log(err);
  }
}

// Separate Routes
const authRoutes = require("./routes/authRoute")
app.use("/auth", authRoutes);

const compraRoutes = require("./routes/compraRoute");
app.use("/compra", checkToken, compraRoutes);

// Connect to localhost:4000
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.5izclx1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
