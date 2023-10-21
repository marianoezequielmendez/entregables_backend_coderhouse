import mongoose from "mongoose";
import { productsModel } from "../db/models/products.model.js";
import BasicManager from "./basicManager.js";

class ProductsManager extends BasicManager {
  constructor() {
    super(productsModel);
  }

  async findAllProducts(obj) {
    const { limit = 10, page = 1, sort, ...queryFilter } = obj;
    const response = await productsModel.paginate(queryFilter, {
      limit,
      page,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : "",
      lean: true,
    });

    return response;
  }
}

export const productsManager = new ProductsManager();
