const Database = require('../db/config')

module.exports = {
  async create(request, response) {
    const db = await Database()
    let roomId = ''
    const password = request.body.password
    let isRoom = true 

    while(isRoom) {
      // gera o número da sala
      for(var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
      // verifica se o número da sala já existe
      const roomsExistsIds = await db.all(`SELECT * FROM rooms`)
      isRoom = roomsExistsIds.some(roomExistId => roomExistId === roomId)

      if(!isRoom)
    
        await db.run(`INSERT INTO rooms (id, password) VALUES (${parseInt(roomId)}, ${password})`)
    
      }
    
      await db.close()
  
      response.redirect(`/room/${roomId}`)
    },

    async open(request, response) {
      const db = await Database()

      const roomId = request.params.room
      
      const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
      const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
      let haveQuestions = true;

      if(questions.length == 0 && questionsRead == 0) {
        haveQuestions = false;
      }

      console.log(haveQuestions)
      
      response.render("room", {roomId, questions, questionsRead, haveQuestions})
    },

    enter(request, response) {
      const { roomId } = request.body

      response.redirect(`/room/${roomId}`)
    },
}
