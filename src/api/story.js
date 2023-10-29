import { v4 as uuidv4 } from 'uuid'

export class Story {
  constructor(options = {}) {
    this.options = options

    this.id = uuidv4()
    this.messages = []
    this.images = []
  }

  onNewUserMessage(userMessage) {
    let message_id = uuidv4()
    console.log('userMessage', message_id, userMessage)
    this.messages.push({
      id: message_id,
      text: userMessage,
      isUser: true,
      date: Date.now()
    })

    console.log(this)
  }
}
