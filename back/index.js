const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
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

// Open route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Rota aberta"});
});

// Middleware
const middleware = require("./middlewares/auth")

// Separate Routes
const authRoutes = require("./routes/authRoute")
app.use("/auth", authRoutes);

const compraRoutes = require("./routes/compraRoute");
app.use("/compra", middleware, compraRoutes);


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
