const connection = require('../database/connection')

module.exports = {
  async index(req, res){
    const userEmail = req.headers.authorization

    const usuarios = await connection('usuario')
      .where('email', userEmail)
      .select('*')

    return res.json(usuarios)  
  }
}