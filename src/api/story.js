import { v4 as uuidv4 } from 'uuid'
export class Story {
  constructor(options= {}) {
    this.options = options
    this.id = uuidv4()
    this.messages = []
  }
}
