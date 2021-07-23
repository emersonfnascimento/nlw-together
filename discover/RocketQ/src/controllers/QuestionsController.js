const Database = require('../db/config')
module.exports = {
  async index(request, response) {
    const db = await Database()

    const roomId = request.params.room
    const questionId = request.params.question
    const action = request.params.action
    const password = request.body.password

    // Verificar se a senha está correta
    const isValidRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if(isValidRoom.password === password) {
      if(action === "delete") {
        await db.run(`DELETE FROM questions WHERE room = ${roomId} AND id = ${questionId}`)
      } else if(action === "check") {
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId} AND room = ${roomId}`)
      }
      response.redirect(`/room/${roomId}`)
    } else {
      response.render('passwordIncorrect', {roomId})
    }


  },

  async create(request, response) {
    const db = await Database()
    const { question } = request.body
    const { roomId } = request.params

    await db.run(`INSERT INTO questions(
      title,
      read,
      room
    ) VALUES(
      "${question}",
      0,
      ${roomId}
    )`)

    response.redirect(`/room/${roomId}`)
  }
}
