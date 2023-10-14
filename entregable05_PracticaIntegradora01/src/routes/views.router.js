import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { productsManager } from "../dao/managers/productsManager.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/addProduct", (req, res) => {
  res.render("createProducts");
});

router.get("/home/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await usersManager.findById(idUser);
  const products = await productsManager.findAll();

  res.render("home", {
    first_name: user.first_name,
    last_name: user.last_name,
    products: products,
  });
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
