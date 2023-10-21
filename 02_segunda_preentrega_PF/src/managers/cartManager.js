import BasicManager from "./basicManager";
import { cartModel } from "../db/models/cart.model.js";

class CartManager extends BasicManager {
  constructor(model) {
    super(cartModel);
  }
}

export const cartManager = new CartManager();
