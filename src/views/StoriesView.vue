<template>
    <div>
        <ReadingStory v-if="reading != null" />

        <div>
            <!-- <h3>Stories Caroussel</h3> -->
            <!-- <button v-if="user != null" @click="userStories">My 10 last Stories</button>
            <button @click="updateStories">Last 10 Stories</button> -->
            <!-- <button @click="addStory">Add Story</button>
        <button @click="startListener">Start Listener</button>
        <button @click="stopListener">Stop Listener</button> -->




            <!-- <div id="carouselExampleCaptions" class="carousel slide"> -->
            <!-- <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div> -->
            <!--<div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="@/assets/history/1_believe_photo.png" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Read Stories</h5>
                            <p>Swipe right or left to read stories.</p>
                        </div>
                    </div>
                    <div v-for="s in stories" :key="s.id" class="carousel-item" @click="readStory(s)">

                        {{ getStoryFirstImg(s) }}

                        <img :src="getStoryFirstImage(s)" class="d-block w-100" alt="...">

                        <img :src="getStoryFirstImg(s)" />

                        <div class="carousel-caption d-none d-md-block">
                            <h5>{{ s.name }}</h5>
                            <p>Some representative placeholder content for the first slide.
                                <button type="button" class="btn btn-info" @click="readStory(s)">Read</button>
                            </p>
                        </div>
                    </div> -->
            <!-- <div class="carousel-item">
                <img src="https://picsum.photos/1024/480/?image=4" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div> -->
            <!--  </div>
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
            </div>-->

            <ul class="list-group">
                <li v-for="s in stories" :key="s.id" type="button"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                    @click="readStory(s)">


                    <!-- , {{ s.userId }}
                     /  {{ s.adventure }} / -->
                    <!-- {{ s.date }} /<br> -->
                    <FirebaseImage :story="s" />
                    <div class="ms-2 me-auto">
                        <h4 class="fw-bold">{{ s.name }}</h4>
                        by {{ s.userName }}
                        <br><small>{{ s.id }}</small>
                    </div>



                    <div style="text-align: right">
                        <span class="badge bg-primary rounded-pill">{{ s.messages.length }} messages</span>
                        <span class="badge bg-primary rounded-pill"> {{ s.likes }} likes</span>
                    </div>
                    <!-- First image : {{ getStoryFirstImg(s) }}
                    <img :ref="s.id" :src="getStoryFirstImg(s) " /> -->




                </li>
            </ul>
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

    </div>
</template>

<script>


import FirebaseImage from '@/components/FirebaseImage.vue'
import ReadingStory from '@/views/ReadingStory.vue'


export default {
    name: "StoriesView",
    components: {
        FirebaseImage, ReadingStory
    },
    data() {
        return {
            unsubscribe: null,
            //reading: null
        }
    },
    created() {
        //  this.startListener()
        this.updateStories()
    },
    methods: {
        readStory(s) {
            console.log(s)
            this.$store.commit('core/setReading', s)
            //this.reading = s
           // this.$store.dispatch('firestore/getStoryImages', s)
        },
        async getStoryFirstImg(story) {
            // import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET
            // "https://firebasestorage.googleapis.com/v0/b/numerai-1.appspot.com/o/images%2Fcb5bd2d2-85f2-47c8-97d4-7b3c10176766%2Fbcfbcf61-9b3e-4f2a-8f8c-2b09ec8f4994?alt=media&token=2f75091b-218f-416d-b6bb-e75692a68bad&_gl=1*1cosygo*_ga*NTY2NDEwNzc4LjE2OTU1Njg1Njk.*_ga_CW55HF8NVT*MTY5ODU5NjE3Ni4xNy4xLjE2OTg2MDEwNTAuNjAuMC4w"
            // let path = "https://firebasestorage.googleapis.com/v0/b/numerai-1.appspot.com/o/images/"
            // path+=story.id+'%2F'
            // path+=story.messages[1].id+'?alt=media'


            // console.log(path)

            // console.log("img", img)
            //     return path
            let src = await this.$store.dispatch('firestore/getImage', story)
            console.log(src)
            return src
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
        },
        reading() {
            return this.$store.state.core.reading
        }
    }
}
</script>

<style scoped></style>