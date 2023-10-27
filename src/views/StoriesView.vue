<template>
    <div>
        <h3>Stories</h3>
        <button @click="updateStories">Update Stories</button>
        <button @click="addStory">Add Story</button>
        <button @click="startListener">Start Listener</button>
        <button @click="stopListener">Stop Listener</button>

    </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where, onSnapshot } from "firebase/firestore";

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

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




export default {
    name: "StoriesView",
    data() {
        return {
            unsubscribe: null
        }
    },
    methods: {

        async startListener() {
            const q = query(collection(db, "cities"), where("state", "==", "CA"));
            this.unsubscribe = onSnapshot(q, (querySnapshot) => {
                const cities = [];
                querySnapshot.forEach((doc) => {
                    cities.push(doc.data().name);
                });
                console.log("Current cities in CA: ", cities.join(", "));
            });

        },
        async stopListener() {
            this.unsubscribe()
        },
        async addStory() {
            try {
                const docRef = await addDoc(collection(db, "stories"), {
                    first: "Ada",
                    last: "Lovelace",
                    born: 1815
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }


            const citiesRef = collection(db, "cities");

            await setDoc(doc(citiesRef, "SF"), {
                name: "San Francisco", state: "CA", country: "USA",
                capital: false, population: 860000,
                regions: ["west_coast", "norcal"]
            });
            await setDoc(doc(citiesRef, "LA"), {
                name: "Los Angeles", state: "CA", country: "USA",
                capital: false, population: 3900000,
                regions: ["west_coast", "socal"]
            });
            await setDoc(doc(citiesRef, "DC"), {
                name: "Washington, D.C.", state: null, country: "USA",
                capital: true, population: 680000,
                regions: ["east_coast"]
            });
            await setDoc(doc(citiesRef, "TOK"), {
                name: "Tokyo", state: null, country: "Japan",
                capital: true, population: 9000000,
                regions: ["kanto", "honshu"]
            });
            await setDoc(doc(citiesRef, "BJ"), {
                name: "Beijing", state: null, country: "China",
                capital: true, population: 21500000,
                regions: ["jingjinji", "hebei"]
            });


        },
        async updateStories() {
            // const storiessCollectionRef = collection(db, 'stories');
            // console.log("000 Stories", storiessCollectionRef)
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });

            const docRef = doc(db, "cities", "SF");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }


        },
    }
}
</script>

<style scoped></style>