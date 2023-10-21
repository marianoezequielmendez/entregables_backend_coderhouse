import express from "express";
import productsRouter from "./src/router/products.router.js";
import cartsRouter from "./src/router/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080);
