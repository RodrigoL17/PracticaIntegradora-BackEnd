import { chatModel } from "../models/chat.model.js";

export default class ChatManager {
    async getChat(){
        try {
            const chat = await chatModel.find()
            return chat
        } catch (error) {
            console.log(error)
        }
    }

    async createChat(){
        try {
            const chat = await chatModel.create({})
        } catch (error) {
            
        }
    }

    async addMessage(info){
        try {
            const chat =await this.getChat()
            console.log("ch", chat)
            console.log("inf", info)
            chat[0].messages.push(info)
            console.log("ch2", chat)
            chat[0].save()
        } catch (error) {
            console.log(error)
        }
    }
}