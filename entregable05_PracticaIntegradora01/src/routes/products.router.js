import { Router } from "express";
import { productsManager } from "../dao/managers/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAll();
    res.status(200).json({ message: "products", products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productsManager.findById(idProduct);
    res.status(200).json({ message: "product", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!stock) {
    delete req.body.stock;
  }

  try {
    const newProduct = await productsManager.createOne(req.body);
    res.status(200).json({ message: "Product created", newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
