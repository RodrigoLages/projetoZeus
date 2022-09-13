const router = require("express").Router();
const Compra = require("../models/Compra");

//Create
router.post("/", async (req, res) => {
  const { cost, obs, date } = req.body;

  const compra = {
    cost,
    obs,
    date,
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
  try {
    const compras = await Compra.find();

    res.status(200).json({ compras });
  } catch {
    res.status(500).json({ error: error });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const compra = await Compra.findOne({ _id: id });

    if (!compra) {
      res.status(422).json({ msg: "Id not found" });
      return;
    }

    await Compra.deleteOne({ _id: id });

    res.status(200).json({ msg: "Object deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
