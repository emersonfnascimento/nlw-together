module.exports = {
  index(request, response) {
    const roomId = request.params.room
    const questionId = request.params.question
    const action = request.params.action
    const password = request.body.password

    console.log(`room = ${roomId} | question = ${questionId} | action = ${action} | password = ${password}`)
  }
}
