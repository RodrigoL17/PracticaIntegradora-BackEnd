import {ticketDao} from "../persistence/DAOs/factory.js"

export const createTicketService = async (ticket) => {
    const ticketc = await ticketDao.createTicket(ticket)
    return ticketc
}