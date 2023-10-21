import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/configDB.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();
const PORT = "8080";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Routers
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
