import { Router } from "express";
import { cartsManager } from "../components/CartsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cart = await cartsManager.getCart();

    if (!cart.length) {
      res.status(400).json({ message: "Cart is empty" });
    } else {
      res.status(200).json({ cart });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartsManager.getCartById(+cid);

    if (!cart) {
      res.status(200).json({ message: "Cart is empty" });
    } else {
      res.status(200).json({ message: "Products in cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    await cartsManager.addProductToCart(req.body);

    res.status(200).json({ message: "The product was added to cart" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:cid/products/:idProduct", async (req, res) => {
  try {
    const { cid, idProduct } = req.params;

    await cartsManager.addProductToCartById(cid, idProduct);

    res.status(200).json({ message: "The product was added to cart" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
