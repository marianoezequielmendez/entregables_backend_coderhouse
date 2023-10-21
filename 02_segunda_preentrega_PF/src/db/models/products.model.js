import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = model("Products", productsSchema);
