<template>
    <div>
        <h3>Stories</h3>
        <button @click="updateStories">Update Stories</button>
        <button @click="addStory">Add Story</button>
        <button @click="startListener">Start Listener</button>
        <button @click="stopListener">Stop Listener</button>
       
<ul>
    <li v-for="s in stories" :key="s.id">
        {{  s.name}} / {{ s.messages.length }} / {{s.adventure }} / {{ s.date }} / {{ s.likes }}
<ul>
    <li v-for="m in s.messages" :key="m.id">
        {{ m.isUser ? 'user' : 'ia' }} : {{ m.text }}
        <div v-if="!m.isUser">

        <small>{{ m.model }}, {{ m.worker }}, {{ m.duration }}</small>
    </div>
    </li>
</ul>



    </li>
</ul>

    </div>
</template>

<script>




export default {
    name: "StoriesView",
    data() {
        return {
            unsubscribe: null
        }
    },
    methods: {
        async startListener() {
            this.$store.dispatch('firestore/startListener')
        },
        async stopListener() {
            this.$store.dispatch('firestore/stopListener')
        },
        async addStory() {
            this.$store.dispatch('firestore/addStory')
        },
        async updateStories() {
            this.$store.dispatch('firestore/updateStories')
        },
    },
    computed: {
        stories() {
            return this.$store.state.firestore.stories
        }
    }
}
</script>

<style scoped></style>