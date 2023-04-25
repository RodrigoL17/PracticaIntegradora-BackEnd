

export default class UserRespDTO {
    constructor (user){
    this.fullName = `${user.first_name} ${user.last_name}`
    this.rol = user.rol
    this.email = user.email
    }
}

