import express from "express";
import { productManager } from "./ProductsManager.js";

const app = express();

app.get("/products", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productManager.getProducts();

    if (!products.length) {
      res.status(400).json({ message: "Products not found" });
    } else {
      if (limit) {
        products.splice(limit);
        res.status(200).json({ message: "Products found", products });
      } else {
        res.status(200).json({ message: "Products found", products });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;

  try {
    console.log(idProduct);
    const product = await productManager.getProductById(+idProduct);

    if (!product) {
      res.status(200).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: "Product found", product });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(8080);
