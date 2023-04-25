import { purchaseService } from "../services/purchase.services.js";

export const purchaseController = async (req, res) => {
  const { cid } = req.params;
  const purchase  = await purchaseService(cid);
  res.json(purchase);
};
