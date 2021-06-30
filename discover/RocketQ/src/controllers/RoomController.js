const Database = require('../db/config')

module.exports = {
  async create(request, response) {
    const db = await Database()
    let roomId = ''
    const password = request.body.password

    for(var i = 0; i < 6; i++) {
      roomId += Math.floor(Math.random() * 10).toString()
    }

    await db.run(`INSERT INTO rooms (id, password) VALUES (${parseInt(roomId)}, ${password})`)

    await db.close()

    response.redirect(`/room/${roomId}`)
  }
}
