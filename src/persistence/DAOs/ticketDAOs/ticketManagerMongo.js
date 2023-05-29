import { ticketModel } from "../../Mongo/models/ticket.model.js";


export default class TicketManager {
    async create(ticket) {
        try {
          const newTicket = await ticketModel.create(ticket);
          return newTicket;
        } catch (error) {
          console.log(error);
        }
      }
}