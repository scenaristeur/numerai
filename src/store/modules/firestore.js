import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getStorage, ref, uploadString, listAll, getDownloadURL } from 'firebase/storage'

// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });

import {
  collection,
  addDoc,
  getDocs,
  doc,
  // getDoc,
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
//https://firebase.google.com/docs/auth/web/google-signin?hl=fr
const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
const auth = getAuth()
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage()

// Create a storage reference from our storage service
//const storageRef = ref(storage);

// Create a child reference

// imagesRef now points to 'images'

// Initialize Cloud Firestore and get a reference to the service

const state = () => ({
  db: getFirestore(app),
  unsubscribe: null,
  stories: null,
  auth: auth,
  user: null
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
  async getImage(context, story) {
    console.log(context)

    let path = ['images', story.id, story.messages[1].id].join('/')
    console.log('path', path)

    return await getDownloadURL(ref(storage, path))
  
  },

  async uploadB64Image(context, options) {
    console.log(context, options)
    const storage = getStorage()
    //   let  storageRef = ref(storage, 'text')

    //   // // Raw string is the default if no format is provided
    //   const message = 'This is my message.'
    //   uploadString(storageRef, message).then((snapshot) => {
    //     console.log('Uploaded a raw string!', snapshot)
    //   })

    //  storageRef = ref(storage, 'b64')
    //   // Base64 formatted string
    //   const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB'
    //   uploadString(storageRef, message2, 'base64').then((snapshot) => {
    //     console.log('Uploaded a base64 string!', snapshot)
    //   })
    //   storageRef = ref(storage, 'b64url')
    //   // Base64url formatted string
    //   const message3 = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB'
    //   uploadString(storageRef, message3, 'base64url').then((snapshot) => {
    //     console.log('Uploaded a base64url string!', snapshot)
    //   })
    let path = ['images', options.story_id, options.message_id].join('/')
    let storageRef = ref(storage, path)
    // const imagesRef = ref(storage, 'images')
    // Data URL string
    // const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB'
    uploadString(storageRef, options.data_url, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!', path, snapshot)
    })

    // // Data URL string
    // console.log(context, options)
    // try {
    // //const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB'
    // uploadString(imagesRef, options.data_url, options.metadata).then((snapshot, err) => {
    //   console.log('Uploaded a data_url string!', snapshot, err)
    // })}
    // catch(e){
    //   console.log(e)
    // }
  },
  async checkIfUserLoggedIn(context) {
    context.state.auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('user connexted', user)
        context.state.user = user
        // User is signed in.
      } else {
        // No user is signed in.
      }
    })
  },

  async signInWithPopup(context) {
    context.state.auth = auth
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        context.state.user = user
        context.state.token = token
        console.log(user, token)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log('ERROR', errorCode, errorMessage, email, credential)
        // ...
      })
  },
  async signOut(context) {
    signOut(context.state.auth)
      .then(() => {
        // Sign-out successful.
        console.log('signed out')
        context.state.user = null
      })
      .catch((error) => {
        // An error happened.
        console.log('ERROR', error)
      })
  },
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

  async getStoryImages(context, story) {
    console.log(context)
    const imagesRef = ref(storage, 'images/' + story.id)
    // Find all the prefixes and items.
    listAll(imagesRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log('folderRef', folderRef)
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log('itemRef', itemRef)
        })
      })
      .catch((error) => {
        console.log('error', error)
        // Uh-oh, an error occurred!
      })
  },
  async getStoryFirstImage(context, story) {
    console.log(context)
    console.log(story.id, story.name)
    const imagesRef = ref(storage, 'images/' + story.id, story.messages[0].id)
    // Find all the prefixes and items.
    listAll(imagesRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log('1st image folderRef', folderRef)
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log('1st image itemRef', itemRef)
        })
      })
      .catch((error) => {
        console.log('1st image error', error)
        // Uh-oh, an error occurred!
      })
  },

  async publishStory(context, story) {
    try {
      story.userId = context.state.user.uid
      story.userName = context.state.user.displayName
      const docRef = await addDoc(collection(context.state.db, 'stories'), story)
      console.log('Document written with ID: ', docRef.id)

      story.messages.forEach((m) => {
        console.log(m)

        if (m.image != undefined) {
          // const metadata = {
          //   id: m.id,
          //   story_id: story.id
          // }
          const data_url = m.image.base64
          const options = { message_id: m.id, story_id: story.id, data_url: data_url }
          context.dispatch('uploadB64Image', options)
          delete m.image
        }
      })
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
  async userStories(context) {
    console.log('user stories')
    let stories = []
    const storiesRef = collection(context.state.db, 'stories')
    //const q = query(collection(context.state.db, 'cities'), where('state', '==', 'CA'))
    const q = query(
      storiesRef,
      where('userId', '==', context.state.user.uid),
      orderBy('date', 'desc'),
      limit(10)
    )
    console.log('Q', q)

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
      stories.push(doc.data())
    })
    context.state.stories = stories
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
