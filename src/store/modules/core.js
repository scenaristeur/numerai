// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
// import { v4 as uuidv4 } from 'uuid';
import { Story } from '@/api/story.js'
import { HordeClient } from '@/api/horde_client.js'

const state = () => ({
  showMenu: false,
  showConfig: false,
  level: 0,
  stories: [],
  story: null,
  hordeClient: new HordeClient()
})

const mutations = {
  createStory(state, options) {
    console.log(state, options)
    let story = new Story(options)
    console.log('STORY', story)
    state.story = story
    state.stories.push(story)
  },
  incrementLevel(state) {
    state.level = state.level + 1
    console.log(state.level)
  },
  setConfig(state, c) {
    state.config = c
  },
  showMenu(state, v) {
    state.showMenu = v
  },
  setShowConfig(state, value) {
    state.showConfig = value
    console.log(this.setShowConfig)
  }
}

const actions = {
  async publishStory(context, storyName) {
    let story = context.state.story.getClean(storyName)
console.log("Published Story", story)
    
    context.dispatch('firestore/publishStory', story, {root:true})
  },
  async newUserMessage(context, userMessage) {
    context.state.story.onNewUserMessage(userMessage)
    await context.dispatch('getCompletion', context.state.story)
  },
  async getCompletion(context, story) {
    console.log(context.state, story)
    let completion = await context.state.hordeClient.getCompletion(story)
    console.log('completion', completion)
  }
  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
