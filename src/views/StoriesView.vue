<template>
    <div>

      

  
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

        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://picsum.photos/1024/480/?image=4" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://picsum.photos/1024/480/?image=4" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://picsum.photos/1024/480/?image=4" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

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