import { Router } from "express";
import { productManager } from "../components/ProductsManager.js";

const router = Router();

router.get("/", async (req, res) => {
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

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;

  try {
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

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await productManager.addProduct(
      body.title,
      body.description,
      body.code,
      body.price,
      body.status,
      body.stock,
      body.thumbnail
    );

    if (!newProduct) {
      res.status(400).json({ message: "All requirements are mandatory" });
    } else {
      res
        .status(200)
        .json({ message: "The product was added successfully", newProduct });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:idProduct", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.body;
    const { idProduct } = req.params;

    if (id) {
      throw new Error("It is not possible to modify the identifier");
    }

    await productManager.updateProduct(+idProduct, body);

    res.status(200).json({ message: "The product was updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;

  const deleteRes = await productManager.deleteProduct(+idProduct);
  console.log(deleteRes);

  if (!deleteRes) {
    res
      .status(400)
      .json({ message: "There are no products with the selected id" });
  } else {
    res.status(200).json({ message: "The product was successfully removed" });
  }
});

export default router;
