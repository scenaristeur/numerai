import { v4 as uuidv4 } from 'uuid'
export class Story {
  constructor() {
    this.id = uuidv4()
    this.messages = []
  }
}
