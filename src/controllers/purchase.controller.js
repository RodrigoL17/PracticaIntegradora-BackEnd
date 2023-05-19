import { checkStockAndObtainProductsToRemove, cartFilter } from "../services/purchase.services.js";
import { createTicketService } from "../services/ticket.services.js";
import cartService from "../services/cart.services.js";

export const purchaseController = async (req, res) => {
  const { cid } = req.params;
  const { email} = req.user;
  const productsToRemove = await checkStockAndObtainProductsToRemove(cid)
  const cartFiltered = await cartFilter (productsToRemove, cid)
  const amount = cartFiltered.reduce((acc,prod) => {
    return acc + (prod.pid.price * prod.quantity);
  }, 0);
  const ticket = await createTicketService(amount, email)
  const cart = await cartService.updateProds(cid, productsToRemove)
  res.json({message: "Su compra se ha realizado con exito", ticket: ticket,cart: cart ,productosSinStock: productsToRemove.map(prod => prod.pid._id)})
};
