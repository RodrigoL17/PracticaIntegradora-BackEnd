import {ticketDao} from "../persistence/DAOs/factory.js"

const create = async (ticket) => {
    const ticketc = await ticketDao.create(ticket)
    return ticketc
}

export default {create}