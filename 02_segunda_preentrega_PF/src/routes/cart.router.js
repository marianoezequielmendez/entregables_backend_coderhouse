import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("cart");
});

router.put("/:cid", async (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;
    res.status(200).json({ message: "Success", quantity });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
