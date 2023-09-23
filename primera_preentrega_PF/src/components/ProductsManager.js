// import { log } from "console";
import { existsSync, promises } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  static incrementalId = 1;

  async getProducts() {
    try {
      if (existsSync(this.path)) {
        const info = await promises.readFile(this.path, "utf-8");
        return JSON.parse(info);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await promises.readFile(this.path, "utf-8");
      const productsParse = JSON.parse(products);
      for (let i = 0; i < productsParse.length; i++) {
        const e = productsParse[i];
        if (e.id === id) {
          return e;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    thumbnail = []
  ) {
    try {
      if (title && description && code && price && stock) {
        const products = await this.getProducts();

        const obj = {
          id: this.controlaId(products),
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          thumbnail: thumbnail,
        };

        products.push(obj);
        await promises.writeFile(this.path, JSON.stringify(products));

        return obj;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, newInfoProduct) {
    try {
      const products = JSON.parse(await promises.readFile(this.path, "utf-8"));
      let updatedProduct = {};

      products.forEach((element) => {
        if (element.id === id) {
          updatedProduct = { ...element, ...newInfoProduct };
          products[products.indexOf(element)] = updatedProduct;
        }
      });

      await promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(await promises.readFile(this.path, "utf-8"));
      let notFounderMsg = true;

      products.forEach((element) => {
        if (element.id === id) {
          products.splice(products.indexOf(element), 1);
          notFounderMsg = false;
        }
      });

      if (notFounderMsg) {
        return false;
      }

      await promises.writeFile(this.path, JSON.stringify(products));
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  controlaId(matriz) {
    let id = 1;

    for (let index = 0; index < matriz.length; index++) {
      const element = matriz[index];

      if (element.id === id) {
        id++;
      } else {
        for (let j = 0; j < matriz.length; j++) {
          const e = matriz[j];
          if (e.id === id) {
            id++;
          }
        }
      }
    }

    return id;
  }
}

export const productManager = new ProductManager(
  "./src/database/products.json"
);
