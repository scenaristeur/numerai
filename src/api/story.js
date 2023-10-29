import { v4 as uuidv4 } from 'uuid'

export class Story {
  constructor(options = {}) {
    this.options = options

    this.id = uuidv4()
    this.messages = []
    this.images= []
  }

  onNewUserMessage(userMessage) {
    console.log('userMessage', userMessage)
    this.messages.push({
      id: uuidv4(),
      text: userMessage,
      isUser: true,
      date: Date.now()
    })




    console.log(this)
  }
}
