import { Router } from "express";

const router = Router();

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/newProduct", (req, res) => {
  res.render("newProduct");
});

export default router;
