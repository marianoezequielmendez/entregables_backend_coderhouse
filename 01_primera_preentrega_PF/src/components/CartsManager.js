import { existsSync, promises } from "fs";

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getCart() {
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

  async getCartById(id) {
    try {
      const cart = await promises.readFile(this.path, "utf-8");
      const cartParse = JSON.parse(cart);
      for (let i = 0; i < cartParse.length; i++) {
        const e = cartParse[i];
        if (e.id === id) {
          return e;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(products) {
    try {
      const cart = await this.getCart();

      const obj = {
        ...products,
        id: this.controlaId(cart),
      };

      cart.push(obj);
      await promises.writeFile(this.path, JSON.stringify(cart));

      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCartById(idCart, idProduct) {
    try {
      const carts = await this.getCart();
      const cart = await this.getCartById(+idCart);

      const index = cart.products.findIndex(
        (product) => product.product === +idProduct
      );

      if (index === -1) {
        cart.products.push({
          product: +idProduct,
          quantity: 1,
        });
      } else {
        cart.products[index].quantity += 1;
      }

      const cartIndex = carts.findIndex((cart) => cart.id === +idCart);
      carts[cartIndex] = cart;

      const result = await promises.writeFile(this.path, JSON.stringify(carts));
      return result;
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

export const cartsManager = new CartsManager("./src/database/cart.json");
