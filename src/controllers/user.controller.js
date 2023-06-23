import userServices from "../services/user.services.js";

const getAll = async (req, res) => {
    const users = await userServices.getAll()
    res.json({users: users})
}

const deleteMoreThanTwoDaysLogin = async (req, res) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const deltedUsers = await userServices.deleteByLastLogin(twoDaysAgo)
    res.json({message:"usuarios eliminados", deltedUsers: deltedUsers})
}

const deleteById = async (req, res) => {
    const {id} = req.params
    const user = await userServices.deleteById(id)
    res.json({message:"usuario eliminado", user: user})
}

export default { getAll, deleteById, deleteMoreThanTwoDaysLogin }