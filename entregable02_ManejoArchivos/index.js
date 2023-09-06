const { log } = require("console");
const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  static incrementalId = 1;

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
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
      const products = await fs.promises.readFile(this.path, "utf-8");
      const productsParse = JSON.parse(products);
      for (let i = 0; i < productsParse.length; i++) {
        const e = productsParse[i];
        if (e.id === id) {
          return e;
        }
      }
      return "No existen productos con el id seleccionado";
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (title && description && price && thumbnail && code && stock) {
        const products = await this.getProducts();

        const obj = {
          id: this.controlaId(products),
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        };

        products.push(obj);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        console.log("Todos los requerimientos son obligatorios");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, newInfoProduct) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      let updatedProduct = {};

      products.forEach((element) => {
        if (element.id === id) {
          updatedProduct = { ...element, ...newInfoProduct };
          products[products.indexOf(element)] = updatedProduct;
        }
      });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      let notFounderMsg = true;

      products.forEach((element) => {
        if (element.id === id) {
          products.splice(products.indexOf(element), 1);
          notFounderMsg = false;
        }
      });

      if (notFounderMsg) {
        console.log("No existen productos con el id seleccionado");
      }

      await fs.promises.writeFile(this.path, JSON.stringify(products));
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

//Test area ------------------------------------------------------------------------------------
async function testArea() {
  const product1 = new ProductManager("./info.json");

  //getProducts()
  // const res = await product1.getProducts();
  // console.log(res);

  //getProductById(id)
  // const res = await product1.getProductById(1);
  // console.log(res);

  // addProduct(title, description, price, thumbnail, code, stock);
  // product1.addProduct(
  //   "producto prueba",
  //   "Este es un producto prueba",
  //   500,
  //   "Sin imagen",
  //   "abc123",
  //   250
  // );

  // updateProduct(id, newInfoProduct);
  // product1.updateProduct(2, {
  //   title: "Título modificado por 2",
  //   description: "Este es un mensaje modificado por 2.",
  //   price: 350,
  // });

  //deleteProduct(id)
  // product1.deleteProduct(1);
}

testArea();
