import { createTicketService } from "../services/ticket.services.js";
import { findUser } from "../services/user.services.js";
import { purchaseService } from "../services/purchase.services.js";

export const createTicketController = async (req, res) => {
  const { email } = req.session;
  const { cid } = req.params;
//   const user = await findUser(email);
  const purchase = await purchaseService(cid);
  let amount;
    console.log("a",purchase)
    console.log("b", email)
//   const ticket = await createTicketService(amount, user);
//   res.json(ticket);
};
