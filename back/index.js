require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//forma de ler json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//rota da API
const compraRoutes = require("./routes/compraRoute");
app.use("/compra", compraRoutes);

//entregar um porta
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
