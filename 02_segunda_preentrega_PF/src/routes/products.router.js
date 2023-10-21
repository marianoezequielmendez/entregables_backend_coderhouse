import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productsManager.findAllProducts(req.query);
  res.status(200).json({ status: "success", products });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsManager.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  const { title, price, code, stock } = req.body;
  if (!title || !price || !code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!stock) {
    delete req.body.stock;
  }

  try {
    await productsManager.createOne(req.body);
    const products = await productsManager.findAll();
    res.render("products", {
      products: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateOne/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newInfo = {
      ...productsManager,
      ...req.query,
    };

    const productUpdated = await productsManager.updateOne(id, newInfo);
    return res.status(200).json({ productUpdated });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/deleteOne/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await productsManager.deleteOne(id);
    res.status(200).json({ message: "Product deleted", productDeleted });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
