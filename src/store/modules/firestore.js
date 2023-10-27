import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  limit
} from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,

  authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_FIRESTORE_APP_ID,

  measurementId: import.meta.env.VITE_FIRESTORE_MESUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service

const state = () => ({
  db: getFirestore(app),
  unsubscribe: null,
  stories: null
})

const mutations = {
  incrementLevel(state) {
    state.level = state.level + 1
    console.log(state.level)
  },
  setConfig(state, c) {
    state.config = c
  }
}

const actions = {
  async startListener(context) {
    const q = query(collection(context.state.db, 'cities'), where('state', '==', 'CA'))
    context.state.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = []
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().name)
      })
      console.log('Current cities in CA: ', cities.join(', '))
    })
  },
  async stopListener(context) {
    context.state.unsubscribe()
    console.log('listener stopped')
  },
  async publishStory(context, story){
    try {
        const docRef = await addDoc(collection(context.state.db, 'stories'), story)
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
  },
  async addStory(context) {
    try {
      const docRef = await addDoc(collection(context.state.db, 'stories'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    const citiesRef = collection(context.state.db, 'cities')

    await setDoc(doc(citiesRef, 'SF'), {
      name: 'San Francisco',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 860000,
      regions: ['west_coast', 'norcal']
    })
    await setDoc(doc(citiesRef, 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 3900000,
      regions: ['west_coast', 'socal']
    })
    await setDoc(doc(citiesRef, 'DC'), {
      name: 'Washington, D.C.',
      state: null,
      country: 'USA',
      capital: true,
      population: 680000,
      regions: ['east_coast']
    })
    await setDoc(doc(citiesRef, 'TOK'), {
      name: 'Tokyo',
      state: null,
      country: 'Japan',
      capital: true,
      population: 9000000,
      regions: ['kanto', 'honshu']
    })
    await setDoc(doc(citiesRef, 'BJ'), {
      name: 'Beijing',
      state: null,
      country: 'China',
      capital: true,
      population: 21500000,
      regions: ['jingjinji', 'hebei']
    })
  },
  async updateStories(context) {
    // const storiessCollectionRef = collection(db, 'stories');
    // console.log("000 Stories", storiessCollectionRef)
    let stories = []
    //const querySnapshot = await getDocs(collection(context.state.db, 'stories'))
    const storiesRef = collection(context.state.db, 'stories')
       const q = query(storiesRef, orderBy('date', 'desc'), limit(10))
    console.log('Q', q)

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
      stories.push(doc.data())
    })
    context.state.stories = stories

    // const docRef = doc(context.state.db, 'cities', 'SF')
    // const docSnap = await getDoc(docRef)

    // if (docSnap.exists()) {
    //   console.log('Document data:', docSnap.data())
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log('No such document!')
    // }
    // const storiesRef = collection(context.state.db, 'stories')

    // const q = query(storiesRef, orderBy('last', 'desc'), limit(10))
    // console.log('Q', q)

    // const querySnapshot2 = await getDocs(q)
    // console.log('Q snap 2', querySnapshot2)
    // // context.state.stories = JSON.parse(JSON.stringify(querySnapshot2.docs))
    // let stories = []
    // console.log(querySnapshot2)
    // querySnapshot2.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data())
    //   stories.push(doc.data())
    // })
    // context.state.stories = stories
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
