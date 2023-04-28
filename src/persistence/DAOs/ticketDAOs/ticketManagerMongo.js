import { ticketModel } from "../../Mongo/models/ticket.model.js";


export default class TicketManager {
    async createTicket(amount, purchaser) {
        try {
          const newTicket = await ticketModel.create({});
          return newTicket;
        } catch (error) {
          console.log(error);
        }
      }
}