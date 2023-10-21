import { Schema, SchemaType, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: SchemaType.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export default cartModel = model("Cart", cartSchema);
