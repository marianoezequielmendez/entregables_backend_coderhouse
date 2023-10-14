import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
  products: {
    type: Object,
  },
});

export const cartsModel = model("Carts", cartsSchema);
