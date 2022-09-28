const router = require("express").Router();
const Compra = require("../models/Compra");
const jwt = require("jsonwebtoken");

//Create
router.post("/", async (req, res) => {
  const { cost, obs, date } = req.body;
  
  const token = req.headers.authorization.split(' ')[1];
  const userID = jwt.decode(token).id;

  const compra = {
    cost,
    obs,
    date,
    userID,
  };

  if (!cost) {
    res.status(422).json({ msg: "cost missing" });
    return;
  }

  try {
    const novaCompra = await Compra.create(compra);

    res.status(201).json({ novaCompra });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read
router.get("/", async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userID = jwt.decode(token).id;

  try {
    const fullCompras = await Compra.find();
    const compras = fullCompras.filter((item) => item.userID === userID);

    res.status(200).json({ compras });
  } catch {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const token = req.headers.authorization.split(' ')[1];
  const userID = jwt.decode(token).id;

  try {
    const compra = await Compra.findOne({ _id: id });

    if (!compra) return res.status(422).json({ msg: "Registro não encontrado" });

    if (userID !== compra.userID) return res.status(403).json({ msg: "Acesso Negado" });

    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update
router.patch("/:id", async (req, res) => {
  const _id = req.params.id;
  const { cost, obs, date, userID } = req.body;

  const token = req.headers.authorization.split(' ')[1];
  if (userID !== jwt.decode(token).id) return res.status(403).json({ msg: "Acesso Negado" });

  const compra = {
    _id,
    cost,
    obs,
    date,
    userID,
  };

  try {
    //const aaa = await Compra.findOne({ _id: id });
    const updatedCompra = await Compra.updateOne({ _id: _id }, compra);

    if (updatedCompra.matchedCount === 0) {
      res.status(422).json({ msg: "Registro não encontrado" });
      return;
    }

    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const token = req.headers.authorization.split(' ')[1];
  const userID = jwt.decode(token).id;

  try {
    const compra = await Compra.findOne({ _id: id });

    if (!compra) return res.status(422).json({ msg: "Id not found" });
    if (compra.userID !== userID) return res.status(403).json({ msg: "Acesso Negado" });

    await Compra.deleteOne({ _id: id });

    res.status(200).json({ msg: "Object deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
