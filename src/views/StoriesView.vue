<template>
    <div>

        <div>
            <BCarousel fade controls indicators>
                <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=10" />
                <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=11" />
                <BCarouselSlide img-src="https://picsum.photos/1024/480/?image=12" />
              </BCarousel>
          </div>
        <h3>Stories Caroussel</h3>
        <button v-if="user !=null" @click="userStories">My 10 last Stories</button>
        <button @click="updateStories">Last 10 Stories</button>
        <!-- <button @click="addStory">Add Story</button>
        <button @click="startListener">Start Listener</button>
        <button @click="stopListener">Stop Listener</button> -->

        <ul>
            <li v-for="s in stories" :key="s.id">
                {{ s.name }} / by {{ s.userName }}, {{ s.userId }} / {{ s.messages.length }} messages / {{ s.adventure }} /
                {{ s.date }} / {{ s.likes }}
                <!-- <hr>
               
                <ul>
                    <li v-for="m in s.messages" :key="m.id">
                        {{ m.isUser ? 'user' : 'ia' }} : {{ m.text }}
                        <div v-if="!m.isUser">

                            <small>{{ m.model }}, {{ m.worker }}, {{ m.duration }}</small>
                            <img :src="m.image.base64" width="100" />
                        </div>
                    </li>
                </ul> -->



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
    created() {
        //  this.startListener()
        this.updateStories()
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
        async userStories() {
            this.$store.dispatch('firestore/userStories')
        },
    },
    computed: {
        stories() {
            return this.$store.state.firestore.stories
        },
        user() {
            return this.$store.state.firestore.user
        }
    }
}
</script>

<style scoped></style>