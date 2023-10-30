<template>
    <div>
        <button @click="close" ref="close">Close</button>


        <!-- Reading {{ reading }} -->


        <div v-if="reading != null">


            <h2>{{ reading.name }} par {{ reading.userName }}</h2>

            <ul class="list-group">
                <li v-for="m of reading.messages" :key="m.id" :class="m.isUser ? 'list-group-item list-group-item-info  d-flex justify-content-between align-items-start '
                    : 'list-group-item list-group-item-secondary d-flex justify-content-between align-items-start '
                    ">

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
                        <!-- <img v-if="m.image" :src="m.image.base64" width="320" /></span> -->
                        <FirebaseImage :story="reading" :message_id="m.id" />
                    </span>

                </li>

            </ul>



            <!-- {{ reading }} -->




        </div>

    </div>
</template>

<script>
import FirebaseImage from '@/components/FirebaseImage.vue'
export default {
    name: "ReadingStory",
    components: {
        FirebaseImage
    },
    methods: {
        close() {
            this.$store.commit('core/setReading', null)
        }
    },
    computed: {
        reading() {
            return this.$store.state.core.reading
        }
    },
    mounted() {
        this.$refs.close.scrollIntoView({
            behavior: 'smooth'
        });
    }
}
</script>

<style scoped></style>