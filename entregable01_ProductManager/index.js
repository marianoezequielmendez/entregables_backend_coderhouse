class ProductManager {
  constructor() {
    this.products = [];
  }
  static incrementalId = 1;

  addProduct(title, description, price, thumbnail, code, stock) {
    if (title && description && price && thumbnail && code && stock) {
      if (this.products.length <= 0) {
        this.products.push({
          id: ProductManager.incrementalId,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        });

        ProductManager.incrementalId++;
      } else {
        this.products.forEach((e) => {
          if (code != e.code) {
            this.products.push({
              id: ProductManager.incrementalId++,
              title: title,
              description: description,
              price: price,
              thumbnail: thumbnail,
              code: code,
              stock: stock,
            });
          } else {
            console.log(
              "El código del producto se encuentra repetido. Seleccione otro código."
            );
          }
        });
      }
    } else {
      console.log("Todos los requerimientos son obligatorios");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    if (this.products.length > 0) {
      for (let index = 0; index < this.products.length; index++) {
        const element = this.products[index];
        if (id === element.id) {
          return element;
        }
      }
    }
    return "Not Found";
  }
}

//Test area ------------------------------------------------------------------------------------
//Paso 1 = Se creará una instancia de la clase “ProductManager”
const product1 = new ProductManager();

//Paso 2 = Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(product1.getProducts());
console.log("--------------------");

//Paso 3 = Se llamará al método “addProduct”
product1.addProduct(
  "Producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

//Paso 4 = Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(product1.getProducts());
console.log("--------------------");

//Paso 5 = Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
product1.addProduct(
  "Producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log("--------------------");

//Paso 6 = Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(product1.getProductById(1));
console.log(product1.getProductById(2));
