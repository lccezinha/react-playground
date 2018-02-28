const product = {
  name: 'Product 1',
  price: 10.0,
  discount: 0.05
}

function clone(object) {
  return { ...object }
}

const newProduct = clone(product)
newProduct.name = 'Product 2'

console.log(product, newProduct)
