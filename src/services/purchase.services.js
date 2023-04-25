import { cartDao, productsDao } from "../persistence/DAOs/factory.js"

export const purchaseService = async(cid) => {
    const cart = await cartDao.getCartById(cid)
   const {products} = cart
   const removed = []
  
    products.forEach(async (product, i) => {
    const searchProd = await productsDao.getProdutcById(product.pid._id)
    if(product.quantity <= searchProd.stock){
      console.log("1")
       await productsDao.updateStock(searchProd._id, searchProd.stock, product.quantity)
    } else {
      console.log("2")
        removed.push( products.splice(i,1) )
       await cartDao.updateProducts(cid, products)
    }
   })
   await cartDao.getCartById(cid)
   return {cart: cart, removed: removed}
}