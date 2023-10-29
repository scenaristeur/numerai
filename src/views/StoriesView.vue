<template>
    <div>


        <div>
            <h3>Stories Caroussel</h3>
            <button v-if="user != null" @click="userStories">My 10 last Stories</button>
            <button @click="updateStories">Last 10 Stories</button>
            <!-- <button @click="addStory">Add Story</button>
        <button @click="startListener">Start Listener</button>
        <button @click="stopListener">Stop Listener</button> -->

            <div id="carouselExampleCaptions" class="carousel slide">
                <!-- <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div> -->
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="@/assets/history/1_believe_photo.png" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Read Stories</h5>
                            <p>Swipe right or left to read stories.</p>
                        </div>
                    </div>
                    <div v-for="s in stories" :key="s.id" class="carousel-item" @click="readStory(s)">
                        <img :src="getStoryFirstImage(s)" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>{{ s.name }}</h5>
                            <p>Some representative placeholder content for the first slide.
                                <button type="button" class="btn btn-info" @click="readStory(s)">Read</button>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="carousel-item">
                <img src="https://picsum.photos/1024/480/?image=4" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div> -->
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
<!-- 
            <ul>
                <li v-for="s in stories" :key="s.id">
                    {{ s.name }} / by {{ s.userName }}, {{ s.userId }} / {{ s.messages.length }} messages / {{ s.adventure
                    }} /
                    {{ s.date }} / {{ s.likes }}
             


                </li>
            </ul> -->
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

        </div>
        <div v-if="reading !=null">


            <h2>{{ reading.name }} par {{ reading.userName }}</h2>

            <ul class="list-group">
                <li v-for="m of reading.messages" :key="m.id" 
                :class="
                m.isUser ? 'list-group-item list-group-item-info  d-flex justify-content-between align-items-start '
                : 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-start '
            "
                >

                    <!-- {{ m.isUser ? "User" : "AI" }} : {{ m.text }}


                    <div v-if="!m.isUser">
                        <img :src="m.image.base64" width="320" /><br>
                        <small>{{ m.model }}, {{ m.worker }}, {{ m.duration }} secs.</small>
                      
                    </div> -->

                    <div class="ms-2 me-auto">
                        <div class="fw-bold ">{{ m.isUser ? "User" : "AI" }} </div>
                        {{ m.text }}
                      </div>
                      <!-- {{ m.image.base64 }} -->
                      <span v-if="!m.isUser" class="bg-primary ">
                      <!-- <span>
                       
                    </span> -->
                    <img :src="m.image.base64" width="320" /></span>

                </li>

            </ul>



            <!-- {{ reading }} -->




        </div>
    </div>
</template>

<script>




export default {
    name: "StoriesView",
    data() {
        return {
            unsubscribe: null,
            reading: null
        }
    },
    created() {
        //  this.startListener()
        this.updateStories()
    },
    methods: {
        readStory(s) {
            console.log(s)
            this.reading = s
            this.$store.dispatch('firestore/getStoryImages', s)
        },
        getStoryFirstImage(s) {
            console.log(s)
            this.reading = s
            this.$store.dispatch('firestore/getStoryFirstImage', s)
        },
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